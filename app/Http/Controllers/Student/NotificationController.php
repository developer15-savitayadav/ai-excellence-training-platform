<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\AppNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = $request->user()
            ->notifications()
            ->latest()
            ->paginate(20)
            ->through(fn (AppNotification $n) => [
                'id' => $n->id,
                'type' => $n->type,
                'title' => $n->title,
                'message' => $n->message,
                'actionUrl' => $n->action_url,
                'read' => $n->read_at !== null,
                'createdAt' => $n->created_at?->toIso8601String(),
                'createdAtLabel' => $n->created_at?->diffForHumans(),
            ]);

        return Inertia::render('Student/Notifications', [
            'notifications' => $notifications,
            'unread' => $request->user()->notifications()->unread()->count(),
        ]);
    }

    public function read(Request $request, AppNotification $notification)
    {
        abort_unless($notification->user_id === $request->user()->id, 403);

        if (! $notification->read_at) {
            $notification->update(['read_at' => now()]);
        }

        if ($notification->action_url) {
            return redirect($notification->action_url);
        }

        return back();
    }

    public function readAll(Request $request)
    {
        $request->user()->notifications()->unread()->update(['read_at' => now()]);

        return back()->with('success', 'All notifications marked as read.');
    }

    public function destroy(Request $request, AppNotification $notification)
    {
        abort_unless($notification->user_id === $request->user()->id, 403);

        $notification->delete();

        return back()->with('success', 'Notification removed.');
    }
}
