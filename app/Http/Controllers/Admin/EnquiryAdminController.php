<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Enquiry;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EnquiryAdminController extends Controller
{
    public function index(Request $request)
    {
        $filters = [
            'q' => trim((string) $request->query('q', '')),
            'status' => (string) $request->query('status', 'all'),
            'sort' => (string) $request->query('sort', 'created_at'),
            'direction' => strtolower((string) $request->query('direction', 'desc')) === 'asc' ? 'asc' : 'desc',
        ];

        $sortable = ['created_at', 'name', 'status', 'program'];
        if (! in_array($filters['sort'], $sortable, true)) {
            $filters['sort'] = 'created_at';
        }

        $enquiries = Enquiry::query()
            ->when($filters['q'] !== '', function ($query) use ($filters) {
                $term = $filters['q'];
                $query->where(function ($w) use ($term) {
                    $w->whereLike('name', "%{$term}%")
                        ->orWhereLike('email', "%{$term}%")
                        ->orWhereLike('phone', "%{$term}%")
                        ->orWhereLike('program', "%{$term}%")
                        ->orWhereLike('message', "%{$term}%");
                });
            })
            ->when($filters['status'] !== 'all', fn ($q) => $q->where('status', $filters['status']))
            ->orderBy($filters['sort'], $filters['direction'])
            ->paginate(15)
            ->withQueryString()
            ->through(fn (Enquiry $e) => [
                'id' => $e->id,
                'name' => $e->name,
                'email' => $e->email,
                'phone' => $e->phone,
                'audience' => $e->audience,
                'program' => $e->program,
                'batchTiming' => $e->batch_timing,
                'message' => $e->message,
                'status' => $e->status,
                'createdAt' => $e->created_at?->toIso8601String(),
                'createdAtLabel' => $e->created_at?->diffForHumans(),
            ]);

        return Inertia::render('Admin/Enquiries/Index', [
            'enquiries' => $enquiries,
            'filters' => $filters,
            'stats' => [
                'total' => Enquiry::count(),
                'new' => Enquiry::where('status', 'new')->count(),
                'contacted' => Enquiry::where('status', 'contacted')->count(),
                'enrolled' => Enquiry::where('status', 'enrolled')->count(),
                'closed' => Enquiry::where('status', 'closed')->count(),
            ],
        ]);
    }

    public function update(Request $request, Enquiry $enquiry)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['new', 'contacted', 'enrolled', 'closed'])],
        ]);

        $enquiry->update($data);

        Activity::log(
            $request->user()->id,
            'enquiry.updated',
            "Marked enquiry from {$enquiry->name} as {$data['status']}",
            $enquiry,
        );

        return back()->with('success', "Enquiry from {$enquiry->name} is now {$data['status']}.");
    }

    public function destroy(Request $request, Enquiry $enquiry)
    {
        $name = $enquiry->name;
        $enquiry->delete();

        Activity::log($request->user()->id, 'enquiry.deleted', "Deleted enquiry from {$name}");

        return back()->with('success', "Enquiry from {$name} was deleted.");
    }
}
