<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
class CourseController extends Controller
{
    public function index(Request $request)
    {
        $search = $this->normalizeSearch($request);

        $query = $search !== ''
            ? $this->searchQuery($search)
            : Course::query()->published();

        if ($search !== '') {
            // Relevance: exact title > title se shuru > title mein kahin > baaki
            $escaped = addcslashes($search, '%_\\');
            $query->orderByRaw(
                'CASE
                WHEN title = ? THEN 0
                WHEN title LIKE ? THEN 1
                WHEN title LIKE ? THEN 2
                ELSE 3
             END',
                [$search, "{$escaped}%", "%{$escaped}%"]
            );
        }

        return Inertia::render('Courses/Index', [
            'courses' => $query
                ->with('instructor:id,name,slug,avatar,specialization')
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get()
                ->map(fn(Course $course) => $course->toCatalogueArray()),
            'filters' => ['search' => $search],
        ]);
    }

    public function show($slug)
    {
        $course = Course::query()
            ->published()
            ->with('instructor:id,name,slug,avatar,specialization,bio')
            ->where('slug', $slug)
            ->first();

        return Inertia::render('Courses/Show', [
            'slug' => $slug,
            'dbCourse' => $course ? $this->present($course) : null,
        ]);
    }

    /**
     * Shape a database course like the static catalogue entries the page expects.
     *
     * @return array<string, mixed>
     */
    private function present(Course $course): array
    {
        $instructor = $course->instructor;

        return [
            'id' => $course->id,
            'title' => $course->title,
            'slug' => $course->slug,
            'subtitle' => $course->subtitle,
            'tagline' => $course->tagline ?: $course->subtitle,
            'description' => $course->description,
            'category' => $course->category,
            'duration' => $course->duration,
            'hours' => $course->hours,
            'classesPerWeek' => $course->schedule,
            'schedule' => $course->schedule,
            'price' => $course->price,
            'originalPrice' => $course->original_price,
            'level' => $course->level,
            'badge' => $course->badge,
            'rating' => (float) $course->rating,
            'reviewCount' => $course->review_count,
            'lessonCount' => $course->lesson_count,
            'image' => $course->image,
            'whoItsFor' => $course->for_whom,
            'prerequisite' => $course->prerequisite,
            'walkAwayWith' => $course->takeaway,
            'theDifference' => $course->difference,
            'careerServices' => $course->career_services ?? [],
            'included' => $course->included ?? [],
            'whatYouLearn' => $course->learning ?? [],
            'monthlyJourney' => $course->months ?? [],
            'cta' => $course->cta,
            'ctaNote' => $course->cta_note,
            'instructorProfile' => $instructor ? [
                'name' => $instructor->name,
                'tagline' => $instructor->specialization ?: 'AI Practitioner & Trainer',
                'bio' => $instructor->bio ?: 'Live, hands-on training from practitioners who build real AI systems.',
                'points' => array_values(array_filter(array_map(
                    'trim',
                    preg_split('/[,;]+/', (string) $instructor->specialization) ?: [],
                ))) ?: ['Live, project-based sessions', 'Feedback on your real work', 'Practical, career-focussed guidance'],
            ] : null,
        ];
    }

   public function searchCheck(Request $request)
{
    $search = $this->normalizeSearch($request);

    if (mb_strlen($search) < 2) {
        return response()->json(['count' => 0, 'slug' => null]);
    }

    $matches = $this->searchQuery($search)->limit(2)->get(['slug']);

    return response()->json([
        'count' => $matches->count(),
        'slug'  => $matches->count() === 1 ? $matches->first()->slug : null,
    ]);
}

private function normalizeSearch(Request $request): string
{
    $value = (string) $request->query('search', '');

    // extra spaces hatao, 100 characters se zyada nahi
    return mb_substr(trim(preg_replace('/\s+/u', ' ', $value)), 0, 100);
}

private function searchQuery(string $search): Builder
{
    // Max 5 words, har word title/subtitle/slug mein kahin hona chahiye
    $words = array_slice(array_filter(explode(' ', $search)), 0, 5);

    $query = Course::query()->published();

    foreach ($words as $word) {
        $like = '%' . addcslashes($word, '%_\\') . '%';

        $query->where(function ($q) use ($like) {
            $q->where('title', 'like', $like)
                ->orWhere('subtitle', 'like', $like)
                ->orWhere('slug', 'like', $like);
        });
    }

    return $query;
}
}
