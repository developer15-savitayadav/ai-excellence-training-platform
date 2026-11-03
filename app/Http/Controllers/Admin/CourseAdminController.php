<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Course;
use App\Models\Instructor;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CourseAdminController extends Controller
{
    public function index(Request $request)
    {
        $filters = [
            'q' => trim((string) $request->query('q', '')),
            'status' => (string) $request->query('status', 'all'),
            'tier' => (string) $request->query('tier', 'all'),
            'category' => (string) $request->query('category', 'all'),
            'sort' => (string) $request->query('sort', 'created_at'),
            'direction' => strtolower((string) $request->query('direction', 'desc')) === 'asc' ? 'asc' : 'desc',
        ];

        $sortable = ['title', 'price', 'created_at', 'rating', 'sort_order'];
        if (! in_array($filters['sort'], $sortable, true)) {
            $filters['sort'] = 'created_at';
        }

        $courses = Course::query()
            ->with(['instructor:id,name,avatar'])
            ->withCount(['enrollments', 'certificates'])
            ->withAvg('enrollments as avg_progress', 'progress')
            ->when($filters['q'] !== '', function ($query) use ($filters) {
                $term = $filters['q'];
                $query->where(function ($w) use ($term) {
                    $w->whereLike('title', "%{$term}%")
                        ->orWhereLike('slug', "%{$term}%")
                        ->orWhereLike('category', "%{$term}%");
                });
            })
            ->when($filters['status'] !== 'all', fn ($q) => $q->where('status', $filters['status']))
            ->when($filters['tier'] !== 'all', fn ($q) => $q->where('tier', $filters['tier']))
            ->when($filters['category'] !== 'all', fn ($q) => $q->where('category', $filters['category']))
            ->orderBy($filters['sort'], $filters['direction'])
            ->paginate(12)
            ->withQueryString()
            ->through(fn (Course $c) => [
                'id' => $c->id,
                'title' => $c->title,
                'slug' => $c->slug,
                'tagline' => $c->tagline,
                'description' => $c->description,
                'category' => $c->category,
                'tier' => $c->tier,
                'status' => $c->status,
                'level' => $c->level,
                'price' => $c->price,
                'originalPrice' => $c->original_price,
                'duration' => $c->duration,
                'hours' => $c->hours,
                'schedule' => $c->schedule,
                'lessonCount' => $c->lesson_count,
                'rating' => (float) $c->rating,
                'reviewCount' => $c->review_count,
                'image' => $c->image,
                'sortOrder' => $c->sort_order,
                'instructorId' => $c->instructor_id,
                'instructor' => $c->instructor?->name,
                'enrollments' => $c->enrollments_count,
                'certificates' => $c->certificates_count,
                'learning' => $c->learning ?? [],
                'included' => $c->included ?? [],
                'forWhom' => $c->for_whom,
                'prerequisite' => $c->prerequisite,
                'takeaway' => $c->takeaway,
                'avgProgress' => round((float) ($c->avg_progress ?? 0), 1),
                'createdAt' => $c->created_at?->toDateString(),
            ]);

        return Inertia::render('Admin/Courses/Index', [
            'courses' => $courses,
            'filters' => $filters,
            'instructors' => Instructor::active()->orderBy('name')->get(['id', 'name']),
            'categories' => Course::query()
                ->whereNotNull('category')
                ->distinct()
                ->orderBy('category')
                ->pluck('category'),
            'stats' => [
                'total' => Course::count(),
                'published' => Course::published()->count(),
                'draft' => Course::where('status', 'draft')->count(),
                'enrollments' => \App\Models\Enrollment::count(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['slug'] = $this->uniqueSlug($data['slug'] ?? $data['title']);

        $course = Course::create($data);

        Activity::log($request->user()->id, 'course.created', "Created course {$course->title}", $course);

        return back()->with('success', "{$course->title} was created.");
    }

    public function update(Request $request, Course $course)
    {
        $data = $this->validated($request, $course);
        if (array_key_exists('slug', $data) && $data['slug']) {
            $data['slug'] = $this->uniqueSlug($data['slug'], $course->id);
        }

        $course->update($data);

        Activity::log($request->user()->id, 'course.updated', "Updated course {$course->title}", $course);

        return back()->with('success', "{$course->title} was updated.");
    }

    public function updateStatus(Request $request, Course $course)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['published', 'draft', 'archived'])],
        ]);

        $course->update($data);

        Activity::log(
            $request->user()->id,
            'course.status',
            "Set {$course->title} to {$data['status']}",
            $course,
        );

        return back()->with('success', "{$course->title} is now {$data['status']}.");
    }

    public function destroy(Request $request, Course $course)
    {
        $title = $course->title;
        $course->delete();

        Activity::log($request->user()->id, 'course.deleted', "Deleted course {$title}");

        return back()->with('success', "{$title} was deleted.");
    }

    /** @return array<string, mixed> */
    private function validated(Request $request, ?Course $course = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'slug' => ['nullable', 'string', 'max:180', 'alpha_dash'],
            'tagline' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:80'],
            'instructor_id' => ['nullable', 'integer', 'exists:instructors,id'],
            'status' => ['required', Rule::in(['published', 'draft', 'archived'])],
            'tier' => ['required', Rule::in(['short-term', 'professional', 'career'])],
            'level' => ['nullable', 'string', 'max:40'],
            'duration' => ['nullable', 'string', 'max:60'],
            'hours' => ['nullable', 'string', 'max:60'],
            'schedule' => ['nullable', 'string', 'max:120'],
            'price' => ['required', 'string', 'max:60'],
            'original_price' => ['nullable', 'numeric', 'min:0'],
            'rating' => ['nullable', 'numeric', 'between:0,5'],
            'review_count' => ['nullable', 'integer', 'min:0'],
            'lesson_count' => ['nullable', 'integer', 'min:0'],
            'image' => ['nullable', 'string', 'max:500'],
            'for_whom' => ['nullable', 'string'],
            'prerequisite' => ['nullable', 'string', 'max:255'],
            'takeaway' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'learning' => ['nullable', 'array'],
            'learning.*' => ['string', 'max:500'],
            'included' => ['nullable', 'array'],
            'included.*' => ['string', 'max:500'],
        ]);

        foreach (['rating', 'review_count', 'lesson_count', 'sort_order'] as $field) {
            if (($data[$field] ?? null) === null) {
                unset($data[$field]);
            }
        }

        if (array_key_exists('learning', $data) && $data['learning'] === null) {
            $data['learning'] = [];
        }
        if (array_key_exists('included', $data) && $data['included'] === null) {
            $data['included'] = [];
        }

        return $data;
    }

    private function uniqueSlug(string $value, ?int $ignoreId = null): string
    {
        $base = Str::slug($value) ?: 'course';
        $slug = $base;
        $i = 2;

        while (Course::where('slug', $slug)->when($ignoreId, fn ($q) => $q->whereKeyNot($ignoreId))->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }
}
