<?php

namespace App\Http\Controllers;

use App\Models\Instructor;
use App\Models\User;
use App\Services\DashboardService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(private DashboardService $dashboard) {}

    /**
     * Send each signed-in user to the dashboard that matches their role.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return match (true) {
            $user->isAdmin() => redirect()->route('admin.dashboard'),
            $user->isInstructor() => redirect()->route('instructor.dashboard'),
            default => $this->student($request),
        };
    }

    public function student(Request $request)
    {
        return Inertia::render('Dashboard/Student', [
            'dashboard' => $this->dashboard->student($request->user()),
        ]);
    }

    public function instructor(Request $request)
    {
        $instructor = $this->resolveInstructor($request->user());

        return Inertia::render('Dashboard/Instructor', [
            'dashboard' => $this->dashboard->instructor($instructor),
            'preview' => $request->user()->isAdmin(),
        ]);
    }

    public function admin()
    {
        return Inertia::render('Dashboard/Admin', [
            'dashboard' => $this->dashboard->admin(),
        ]);
    }

    private function resolveInstructor(User $user): Instructor
    {
        if ($user->isAdmin()) {
            return Instructor::query()->orderBy('id')->firstOrFail();
        }

        $instructor = Instructor::where('user_id', $user->id)->first()
            ?? Instructor::where('email', $user->email)->first();

        if ($instructor) {
            if (! $instructor->user_id) {
                $instructor->update(['user_id' => $user->id]);
            }

            return $instructor;
        }

        return Instructor::create([
            'user_id' => $user->id,
            'name' => $user->name,
            'slug' => Str::slug($user->name).'-'.$user->id,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'status' => 'active',
        ]);
    }
}
