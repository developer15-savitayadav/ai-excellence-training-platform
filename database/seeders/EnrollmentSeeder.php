<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Development-only starter enrollments so dashboards and charts have real,
 * relational rows to read. Never runs in production.
 */
class EnrollmentSeeder extends Seeder
{
    public function run(): void
    {
        $courses = Course::query()->published()->orderBy('sort_order')->take(6)->get();
        $students = User::query()->where('role', '!=', 'admin')->where('role', '!=', 'instructor')->get();

        if ($courses->isEmpty() || $students->isEmpty()) {
            return;
        }

        foreach ($students as $studentIndex => $student) {
            foreach ($courses->take(3) as $i => $course) {
                $progress = [100, 62, 24, 88, 41, 15][($studentIndex + $i) % 6];

                Enrollment::updateOrCreate(
                    ['user_id' => $student->id, 'course_id' => $course->id],
                    [
                        'progress' => $progress,
                        'hours_completed' => (int) round($course->hoursValue() * ($progress / 100)),
                        'status' => $progress >= 100 ? 'completed' : 'active',
                        'enrolled_at' => now()->subDays(15 + ($studentIndex * 9) + ($i * 12))->toDateString(),
                        'last_accessed_at' => now()->subDays(($studentIndex + $i) % 6),
                        'completed_at' => $progress >= 100 ? now()->subDays(5 + $i) : null,
                    ],
                );
            }
        }
    }
}
