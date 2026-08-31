import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Avatar from '../Components/ui/Avatar';

const defaultNavigation = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25 2.25v2.25A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
        ),
        current: true,
    },
];

function SidebarContent({ user, navigation, onLinkClick }) {
    function handleLogout() {
        router.post('/logout');
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex h-16 items-center px-6 border-b border-black/[0.08]">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="inline-block h-2 w-2 rotate-45 bg-lime transition-transform group-hover:scale-125" />
                    <span className="font-display font-bold text-lg text-body">AI Excellence Academy</span>
                </Link>
            </div>

            <div className="flex items-center gap-3 px-6 py-5 border-b border-black/[0.08]">
                <Avatar name={user?.name || ''} src={user?.profile_photo_url} size="md" />
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-body truncate">{user?.name}</p>
                    <span className="inline-block mt-0.5 rounded-full bg-violet/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet">
                        {user?.role || 'Student'}
                    </span>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={onLinkClick}
                        className={[
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                            item.current
                                ? 'bg-white/[0.06] text-lime'
                                : 'text-muted hover:text-body hover:bg-white/[0.04]',
                        ].join(' ')}
                    >
                        <span className="shrink-0">{item.icon}</span>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="border-t border-black/[0.08] p-3">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:text-danger hover:bg-white/[0.04] transition-colors"
                >
                    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default function DashboardLayout({ children, navigation = defaultNavigation }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-ink">
            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col overflow-y-auto bg-surface border-r border-black/[0.08]">
                    <SidebarContent user={user} navigation={navigation} />
                </div>
            </div>

            {/* Mobile sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-black/[0.08]">
                        <SidebarContent
                            user={user}
                            navigation={navigation}
                            onLinkClick={() => setSidebarOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* Main column */}
            <div className="lg:pl-64">
                {/* Mobile top bar */}
                <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-black/[0.08] bg-surface/70 backdrop-blur-xl px-4 lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-white/[0.06] transition-colors"
                        aria-label="Open menu"
                    >
                        <svg className="h-6 w-6 text-body" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>

                    <Link href="/" className="flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rotate-45 bg-lime" />
                        <span className="font-display font-bold text-lg text-body">AI Excellence Academy</span>
                    </Link>

                    <div className="ml-auto">
                        <Avatar name={user?.name || ''} src={user?.profile_photo_url} size="sm" />
                    </div>
                </div>

                <main className="p-8">{children}</main>
            </div>
        </div>
    );
}
