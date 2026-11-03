<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class StudentAdminController extends Controller
{
    public function index(Request $request)
    {
        $filters = [
            'q' => trim((string) $request->query('q', '')),
            'status' => (string) $request->query('status', 'all'),
            'sort' => (string) $request->query('sort', 'created_at'),
            'direction' => strtolower((string) $request->query('direction', 'desc')) === 'asc' ? 'asc' : 'desc',
        ];

        $sortable = ['name', 'email', 'created_at', 'last_login_at'];
        if (! in_array($filters['sort'], $sortable, true)) {
            $filters['sort'] = 'created_at';
        }

        $students = User::query()
            ->students()
            ->withCount(['enrollments', 'certificates'])
            ->when($filters['q'] !== '', function ($query, $term = null) use ($filters) {
                $term = $filters['q'];
                $query->where(function ($w) use ($term) {
                    $w->whereLike('name', "%{$term}%")
                        ->orWhereLike('email', "%{$term}%")
                        ->orWhereLike('phone', "%{$term}%");
                });
            })
            ->when($filters['status'] === 'active', fn ($q) => $q->where('is_active', true))
            ->when($filters['status'] === 'inactive', fn ($q) => $q->where('is_active', false))
            ->orderBy($filters['sort'], $filters['direction'])
            ->paginate(12)
            ->withQueryString()
            ->through(fn (User $u) => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'phone' => $u->phone,
                'avatar' => $u->avatar,
                'bio' => $u->bio,
                'role' => $u->role,
                'isActive' => (bool) $u->is_active,
                'enrollments' => $u->enrollments_count,
                'certificates' => $u->certificates_count,
                'createdAt' => $u->created_at?->toDateString(),
                'lastLoginAt' => $u->last_login_at?->diffForHumans(),
            ]);

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
            'filters' => $filters,
            'stats' => [
                'total' => User::students()->count(),
                'active' => User::students()->where('is_active', true)->count(),
                'inactive' => User::students()->where('is_active', false)->count(),
                'new' => User::students()->where('created_at', '>=', now()->startOfMonth())->count(),
            ],
        ]);
    }

    public function update(Request $request, User $student)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($student->id)],
            'phone' => ['nullable', 'string', 'max:30'],
            'role' => ['required', Rule::in(['student', 'instructor', 'admin'])],
            'is_active' => ['required', 'boolean'],
            'bio' => ['nullable', 'string', 'max:1000'],
        ]);

        if ($student->id === $request->user()->id) {
            $data['role'] = 'admin';
            $data['is_active'] = true;
        }

        $student->update($data);

        Activity::log(
            $request->user()->id,
            'student.updated',
            "Updated student {$student->name}",
            $student,
        );

        return back()->with('success', "{$student->name} was updated.");
    }

    public function destroy(Request $request, User $student)
    {
        abort_if($student->id === $request->user()->id, 403, 'You cannot delete your own account here.');

        $name = $student->name;
        $student->delete();

        Activity::log($request->user()->id, 'student.deleted', "Removed student {$name}");

        return back()->with('success', "{$name} was removed.");
    }
}
