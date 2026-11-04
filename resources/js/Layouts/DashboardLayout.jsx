import { useEffect, useMemo, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Award,
    BarChart3,
    Bell,
    BookOpen,
    ExternalLink,
    GraduationCap,
    Heart,
    LayoutDashboard,
    Layers,
    LogOut,
    Menu,
    MessageSquare,
    Settings,
    UserRound,
    Users,
    X,
} from 'lucide-react';
import Avatar from '../Components/ui/Avatar';
import ToastContainer, { useToast } from '../Components/ui/Toast';

const ADMIN_NAV = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Students', href: '/admin/students', icon: Users },
    { name: 'Trainers', href: '/admin/trainers', icon: GraduationCap },
    { name: 'Courses', href: '/admin/courses', icon: BookOpen },
    { name: 'Enrollments', href: '/admin/enrollments', icon: Layers },
    { name: 'Certificates', href: '/admin/certificates', icon: Award },
    { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
];

const STUDENT_NAV = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'My Learning', href: '/my-learning', icon: BookOpen },
    { name: 'Certificates', href: '/my-certificates', icon: Award },
    { name: 'Wishlist', href: '/wishlist', icon: Heart },
    { name: 'Notifications', href: '/notifications', icon: Bell },
];

const INSTRUCTOR_NAV = [
    { name: 'Dashboard', href: '/instructor/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'My Courses', href: '/instructor/dashboard#courses', icon: BookOpen, base: '/instructor/dashboard' },
    { name: 'My Students', href: '/instructor/dashboard#students', icon: Users, base: '/instructor/dashboard' },
    { name: 'Profile', href: '/profile', icon: Settings },
];

function navFor(user, pathname) {
    if (user?.is_admin) return ADMIN_NAV;
    if (user?.role === 'instructor' || user?.is_instructor) return INSTRUCTOR_NAV;
    return STUDENT_NAV;
}

function isActive(item, pathname) {
    const path = item.base || item.href.split('#')[0];
    if (item.exact) return pathname === path;
    if (path === '/instructor/dashboard') return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
}

function Brand({ compact = false }) {
    return (
        <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-body text-[10px] font-bold tracking-tight text-lime">
                AI
            </span>
            {!compact && (
                <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-bold leading-tight text-body">
                        AI Execellence
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-muted">Academy</span>
                </span>
            )}
        </Link>
    );
}

function SidebarContent({ user, navigation, pathname, onNavigate }) {
    const role = user?.is_admin ? 'Administrator' : user?.role === 'instructor' ? 'Instructor' : 'Student';

    function logout() {
        router.post('/logout');
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex h-16 items-center border-b border-black/[0.06] px-5">
                <Brand />
            </div>

            <div className="mx-3 mt-4 flex items-center gap-3 rounded-xl bg-black/[0.025] px-3 py-3">
                <Avatar name={user?.name || ''} src={user?.avatar} size="md" />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-body">{user?.name}</p>
                    <p className="truncate text-[11px] text-muted">{role}</p>
                </div>
            </div>

            <nav className="mt-5 flex-1 space-y-1 overflow-y-auto px-3 pb-4">
                {navigation.map((item) => {
                    const active = isActive(item, pathname);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onNavigate}
                            className={[
                                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                                active
                                    ? 'bg-violet/[0.08] text-violet'
                                    : 'text-muted hover:bg-black/[0.035] hover:text-body',
                            ].join(' ')}
                        >
                            <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? 'text-violet' : 'text-muted group-hover:text-body'}`} strokeWidth={1.8} />
                            <span className="truncate">{item.name}</span>
                            {item.name === 'Notifications' && item.unread > 0 && (
                                <span className="ml-auto rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold text-white">
                                    {item.unread}
                                </span>
                            )}
                        </Link>
                    );
                })}

                <div className="pt-3">
                    <Link
                        href="/"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-black/[0.035] hover:text-body"
                    >
                        <ExternalLink className="h-[18px] w-[18px] shrink-0" strokeWidth={1.8} />
                        View website
                    </Link>
                </div>
            </nav>

            <div className="border-t border-black/[0.06] p-3">
                <Link
                    href="/profile"
                    onClick={onNavigate}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-black/[0.035] hover:text-body"
                >
                    <UserRound className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    Account settings
                </Link>
                <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-rose-50 hover:text-danger"
                >
                    <LogOut className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    Log out
                </button>
            </div>
        </div>
    );
}

export default function DashboardLayout({ children, navigation: customNavigation, title }) {
    const { auth, notifications, flash } = usePage().props;
    const user = auth?.user;
    const url = usePage().url;
    const pathname = useMemo(() => {
        const raw = url.split('#')[0];
        return raw.split('?')[0] || '/';
    }, [url]);

    const { show } = useToast();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [bellOpen, setBellOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);

    const navigation = useMemo(() => {
        if (customNavigation?.length) {
            return customNavigation.map((item) => ({
                ...item,
                icon: item.icon || LayoutDashboard,
            }));
        }
        return navFor(user, pathname);
    }, [customNavigation, user, pathname]);

    const activeItem = navigation.find((item) => isActive(item, pathname));
    const unread = notifications?.unread || 0;

    useEffect(() => {
        if (flash?.success) {
            show(flash.issued_code ? `${flash.success} ${flash.issued_code}` : flash.success, 'success');
        }
        if (flash?.error) show(flash.error, 'error');
    }, [flash?.success, flash?.error, flash?.issued_code]);

    useEffect(() => {
        setSidebarOpen(false);
        setBellOpen(false);
        setUserOpen(false);
    }, [url]);

    return (
        <div className="min-h-screen bg-[#f4f4f0]">
            {/* Desktop sidebar */}
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] border-r border-black/[0.06] bg-white lg:flex lg:flex-col">
                <SidebarContent user={user} navigation={navigation} pathname={pathname} />
            </aside>

            {/* Mobile sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-body/40 backdrop-blur-[2px]" onClick={() => setSidebarOpen(false)} />
                    <aside className="absolute inset-y-0 left-0 w-[280px] max-w-[86vw] bg-white shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-black/[0.05]"
                            aria-label="Close menu"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        <SidebarContent
                            user={user}
                            navigation={navigation}
                            pathname={pathname}
                            onNavigate={() => setSidebarOpen(false)}
                        />
                    </aside>
                </div>
            )}

            <div className="lg:pl-[260px]">
                {/* Top bar */}
                <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-black/[0.06] bg-[#f4f4f0]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.07] bg-white text-body lg:hidden"
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-sm font-semibold text-body">
                            {title || activeItem?.name || 'Dashboard'}
                        </p>
                        <p className="hidden text-[11px] text-muted sm:block">
                            {user?.is_admin ? 'Administration workspace' : user?.role === 'instructor' ? 'Teaching workspace' : 'Learning workspace'}
                        </p>
                    </div>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => { setBellOpen((v) => !v); setUserOpen(false); }}
                            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.07] bg-white text-muted transition-colors hover:text-body"
                            aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
                        >
                            <Bell className="h-[18px] w-[18px]" />
                            {unread > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
                                    {unread > 9 ? '9+' : unread}
                                </span>
                            )}
                        </button>

                        {bellOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setBellOpen(false)} />
                                <div className="absolute right-0 z-50 mt-2 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-xl">
                                    <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                                        <p className="text-sm font-semibold text-body">Notifications</p>
                                        {unread > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => router.post('/notifications/read-all', {}, { preserveScroll: true })}
                                                className="text-[11px] font-semibold text-violet hover:underline"
                                            >
                                                Mark all read
                                            </button>
                                        )}
                                    </div>
                                    <div className="max-h-[360px] overflow-y-auto">
                                        {(notifications?.latest || []).length === 0 && (
                                            <p className="px-4 py-8 text-center text-sm text-muted">You're all caught up.</p>
                                        )}
                                        {(notifications?.latest || []).map((n) => (
                                            <button
                                                key={n.id}
                                                type="button"
                                                onClick={() => router.patch(`/notifications/${n.id}/read`)}
                                                className={`flex w-full items-start gap-3 border-b border-black/[0.05] px-4 py-3 text-left transition-colors last:border-0 hover:bg-black/[0.02] ${n.read ? '' : 'bg-violet/[0.035]'}`}
                                            >
                                                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-black/15' : 'bg-violet'}`} />
                                                <span className="min-w-0">
                                                    <span className="block text-sm font-medium text-body">{n.title}</span>
                                                    <span className="mt-0.5 block line-clamp-2 text-xs text-muted">{n.message}</span>
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    <Link
                                        href="/notifications"
                                        className="block border-t border-black/[0.06] px-4 py-3 text-center text-xs font-semibold text-violet hover:bg-black/[0.02]"
                                    >
                                        View all notifications
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => { setUserOpen((v) => !v); setBellOpen(false); }}
                            className="flex items-center gap-2 rounded-xl border border-black/[0.07] bg-white py-1.5 pl-1.5 pr-2.5 transition-colors hover:border-black/[0.14]"
                            aria-label="Account menu"
                        >
                            <Avatar name={user?.name || ''} src={user?.avatar} size="sm" />
                            <span className="hidden max-w-[120px] truncate text-xs font-semibold text-body sm:block">
                                {user?.name?.split(' ')[0]}
                            </span>
                        </button>

                        {userOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setUserOpen(false)} />
                                <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-black/[0.08] bg-white py-1.5 shadow-xl">
                                    <div className="border-b border-black/[0.06] px-4 py-2.5">
                                        <p className="truncate text-sm font-semibold text-body">{user?.name}</p>
                                        <p className="truncate text-xs text-muted">{user?.email}</p>
                                    </div>
                                    <Link href="/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted hover:bg-black/[0.03] hover:text-body">
                                        <Settings className="h-4 w-4" /> Account settings
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => router.post('/logout')}
                                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-muted hover:bg-rose-50 hover:text-danger"
                                    >
                                        <LogOut className="h-4 w-4" /> Log out
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </header>

                <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    <div className="mx-auto max-w-[1400px]">{children}</div>
                </main>
            </div>

            <ToastContainer />
        </div>
    );
}
