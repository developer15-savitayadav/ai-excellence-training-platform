<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TrainerAdminController extends Controller
{
    public function index(Request $request)
    {
        $filters = [
            'q' => trim((string) $request->query('q', '')),
            'status' => (string) $request->query('status', 'all'),
            'sort' => (string) $request->query('sort', 'name'),
            'direction' => strtolower((string) $request->query('direction', 'asc')) === 'desc' ? 'desc' : 'asc',
        ];

        $sortable = ['name', 'rating', 'created_at', 'years_experience'];
        if (! in_array($filters['sort'], $sortable, true)) {
            $filters['sort'] = 'name';
        }

        $trainers = Instructor::query()
            ->withCount('courses')
            ->with(['courses' => fn ($q) => $q->withCount('enrollments')])
            ->when($filters['q'] !== '', function ($query) use ($filters) {
                $term = $filters['q'];
                $query->where(function ($w) use ($term) {
                    $w->whereLike('name', "%{$term}%")
                        ->orWhereLike('email', "%{$term}%")
                        ->orWhereLike('specialization', "%{$term}%");
                });
            })
            ->when($filters['status'] !== 'all', fn ($q) => $q->where('status', $filters['status']))
            ->orderBy($filters['sort'], $filters['direction'])
            ->paginate(12)
            ->withQueryString()
            ->through(fn (Instructor $i) => [
                'id' => $i->id,
                'name' => $i->name,
                'slug' => $i->slug,
                'email' => $i->email,
                'specialization' => $i->specialization,
                'title' => $i->title,
                'bio' => $i->bio,
                'avatar' => $i->avatar,
                'rating' => (float) $i->rating,
                'yearsExperience' => $i->years_experience,
                'status' => $i->status,
                'userId' => $i->user_id,
                'courses' => $i->courses_count,
                'students' => $i->courses->sum('enrollments_count'),
            ]);

        return Inertia::render('Admin/Trainers/Index', [
            'trainers' => $trainers,
            'filters' => $filters,
            'users' => User::query()
                ->whereIn('role', ['instructor', 'admin'])
                ->orderBy('name')
                ->get(['id', 'name', 'email', 'role']),
            'stats' => [
                'total' => Instructor::count(),
                'active' => Instructor::active()->count(),
                'courses' => \App\Models\Course::whereNotNull('instructor_id')->count(),
                'avgRating' => round((float) Instructor::avg('rating'), 2),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);

        $trainer = Instructor::create([
            ...$data,
            'slug' => $this->uniqueSlug($data['name']),
        ]);

        Activity::log($request->user()->id, 'trainer.created', "Added trainer {$trainer->name}", $trainer);

        return back()->with('success', "{$trainer->name} was added as a trainer.");
    }

    public function update(Request $request, Instructor $trainer)
    {
        $data = $this->validated($request, $trainer);
        $trainer->update($data);

        Activity::log($request->user()->id, 'trainer.updated', "Updated trainer {$trainer->name}", $trainer);

        return back()->with('success', "{$trainer->name} was updated.");
    }

    public function destroy(Request $request, Instructor $trainer)
    {
        $name = $trainer->name;
        $trainer->delete();

        Activity::log($request->user()->id, 'trainer.deleted', "Removed trainer {$name}");

        return back()->with('success', "{$name} was removed.");
    }

    /** @return array<string, mixed> */
    private function validated(Request $request, ?Instructor $trainer = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['nullable', 'email', 'max:255'],
            'user_id' => [
                'nullable',
                'integer',
                'exists:users,id',
                Rule::unique('instructors', 'user_id')->ignore($trainer?->id),
            ],
            'specialization' => ['nullable', 'string', 'max:160'],
            'title' => ['nullable', 'string', 'max:160'],
            'bio' => ['nullable', 'string', 'max:2000'],
            'avatar' => ['nullable', 'string', 'max:500'],
            'rating' => ['nullable', 'numeric', 'between:0,5'],
            'years_experience' => ['nullable', 'integer', 'between:0,60'],
            'status' => ['required', Rule::in(['active', 'inactive'])],
        ]);
    }

    private function uniqueSlug(string $name): string
    {
        $base = Str::slug($name) ?: 'trainer';
        $slug = $base;
        $i = 2;

        while (Instructor::where('slug', $slug)->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }
}
