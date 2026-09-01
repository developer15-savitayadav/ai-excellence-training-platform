import { useState, useRef, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';   
import { Search, ArrowRight, ArrowUpRight, LayoutDashboard, UserRound, LogOut } from 'lucide-react';
import CoursesMegaMenu from './CoursesMegaMenu';

const navLinks = [
    { name: 'Home', href: '/' },
    {name:'About',href: '/about' },
    { name: 'Fee', href: '/fee' },
    { name: 'Programmes', href: '/programmes' },
    { name: 'Career', href: '/career' },
    { name: 'Contact', href: '/contact' },

];

function isActive(url, href) {
    if (href === '/') return url === '/';
    return url === href || url.startsWith(`${href}/`) || url.startsWith(`${href}?`);
}

function Logo() {
    return (
        <Link href="/" className="flex shrink-0 items-center gap-2">
            <img
                src="/assets/images/Logo1.png"
                alt="AI Excellence Academy"
                className="h-20 w-40 object-contain"
            />
        </Link>
    );
}

function HamburgerIcon({ open }) {
    return (
        <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
            {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
        </svg>
    );
}

export default function Navbar() {
    const { auth } = usePage().props;
    const url = usePage().url;
    const user = auth?.user;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setUserDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    function handleLogout() {
        setUserDropdownOpen(false);
        setMobileOpen(false);
        router.post('/logout');
    }

    function handleSearch(e) {
        e.preventDefault();
        if (searchQuery.trim()) {
            setMobileOpen(false);
            router.get('/courses', { search: searchQuery });
        }
    }

    return (
        <>
            <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5">
                <nav
                    className={`mx-auto flex h-20 max-w-[1200px] items-center justify-between gap-1 rounded-2xl border pl-6 pr-6 transition-all duration-300 ${
                        scrolled
                            ? 'border-black/[0.08] bg-white shadow-[0_16px_45px_-15px_rgba(15,22,22,0.25)] backdrop-blur-xl'
                            : 'border-black/[0.05] bg-white shadow-[0_8px_30px_-18px_rgba(15,22,22,0.2)] backdrop-blur-lg'
                    }`}
                >
                    <Logo />

                    <div className="hidden items-center gap-1 md:flex">
                        {navLinks.slice(0, 2).map((link) => {
                            const active = isActive(url, link.href);
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative rounded-full px-4 py-2 text-[16px] font-medium tracking-[-0.01em] transition-colors duration-200 ${
                                        active ? 'text-black' : 'text-black/55 hover:text-black'
                                    }`}
                                >
                                    {link.name}
                                    <span
                                        className={`absolute inset-x-4 bottom-0 h-[2px] rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] transition-all duration-300 ${
                                            active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                                        }`}
                                    />
                                </Link>
                            );
                        })}
                        <CoursesMegaMenu />
                        {navLinks.slice(2).map((link) => {
                            const active = isActive(url, link.href);
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative rounded-full px-4 py-2 text-[16px] font-medium tracking-[-0.01em] transition-colors duration-200 ${
                                        active ? 'text-black' : 'text-black/55 hover:text-black'
                                    }`}
                                >
                                    {link.name}
                                    <span
                                        className={`absolute inset-x-4 bottom-0 h-[2px] rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] transition-all duration-300 ${
                                            active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                                        }`}
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <form onSubmit={handleSearch} className="relative hidden lg:block">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 w-[168px] rounded-full border border-black/[0.08] bg-black/[0.03] pl-9 pr-4 text-[13px] text-black outline-none transition-all duration-300 placeholder:text-black/35 "
                            />
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />
                        </form>

                        <div className="hidden items-center gap-2 md:flex">
                            {user ? (
                                <>
                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                            className={`flex items-center gap-1.5 rounded-full border p-1 pr-2.5 transition-all duration-200 ${
                                                userDropdownOpen
                                                    ? 'border-black/[0.12] bg-white shadow-sm'
                                                    : 'border-transparent hover:border-black/[0.08] hover:bg-white/70'
                                            }`}
                                            aria-label="Account menu"
                                        >
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] text-[13px] font-semibold text-white">
                                                {user.name?.charAt(0)?.toUpperCase() || '?'}
                                            </span>
                                            <svg
                                                className={`h-3.5 w-3.5 text-black/40 transition-transform duration-200 ${
                                                    userDropdownOpen ? 'rotate-180' : ''
                                                }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>

                                        {userDropdownOpen && (
                                            <div className="absolute right-0 top-full mt-0 w-60 origin-top-right rounded-2xl border border-black/[0.08] bg-white/95 p-1.5 shadow-[0_24px_60px_-15px_rgba(15,22,22,0.28)] backdrop-blur-xl">
                                                <div className="mb-1 flex items-center gap-3 rounded-xl bg-black/[0.03] px-3 py-2.5">
                                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] text-sm font-semibold text-white">
                                                        {user.name?.charAt(0)?.toUpperCase() || '?'}
                                                    </span>
                                                    <div className="min-w-0">
                                                        <p className="truncate text-[13px] font-semibold text-black">{user.name}</p>
                                                        <p className="truncate text-xs text-black/50">{user.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    
                                    <Link
                                        href="/register"
                                        className="group inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-5 py-2 text-[13.5px] font-semibold text-white shadow-[0_10px_28px_-8px_rgba(152,44,220,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-8px_rgba(152,44,220,0.6)]"
                                    >
                                        Get Started
                                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                                    </Link>
                                </>
                            )}
                        </div>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 md:hidden ${
                                mobileOpen
                                    ? 'border-black/[0.12] bg-black text-white'
                                    : 'border-black/[0.08] bg-white/70 hover:bg-white'
                            }`}
                            aria-label="Toggle menu"
                        >
                            <HamburgerIcon open={mobileOpen} />
                        </button>
                    </div>
                </nav>
            </header>

            {mobileOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div
                        className="absolute inset-0 bg-[#0f1616]/30 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="absolute inset-x-3 top-[84px] animate-menu-pop overflow-hidden rounded-3xl border border-black/[0.07] bg-white shadow-[0_30px_70px_-20px_rgba(15,22,22,0.35)]">
                        <div className="max-h-[calc(100vh-120px)] overflow-y-auto p-3">
                            <form onSubmit={handleSearch} className="relative mb-2">
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-2xl border border-black/[0.08] bg-black/[0.03] px-4 py-3 pl-11 text-sm text-black outline-none transition-all placeholder:text-black/35 focus:border-[#982cdc]/40 focus:bg-white focus:ring-4 focus:ring-[#982cdc]/[0.08]"
                                />
                                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />
                            </form>

                            <div className="">
                                <CoursesMegaMenu onMobileNavigate={() => setMobileOpen(false)} />
                                {navLinks.map((link) => {
                                    const active = isActive(url, link.href);
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`group flex items-center justify-between rounded-2xl px-4 py-1 text-[15px] font-medium transition-colors ${
                                                active
                                                    ? 'bg-[linear-gradient(60deg,#982cdc,#eec369)] bg-clip-text text-transparent'
                                                    : 'text-black/65 hover:bg-black/[0.04] hover:text-black'
                                            }`}
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            <span className={active ? '' : ''}>{link.name}</span>
                                            <ArrowUpRight
                                                className={`h-4 w-4 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                                                    active ? 'text-[#982cdc]' : 'text-black/25'
                                                }`}
                                            />
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="mt-2 border-t border-black/[0.06] pt-3">
                                {user ? (
                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-3 rounded-2xl bg-black/[0.03] px-4 py-3">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] text-sm font-semibold text-white">
                                                {user.name?.charAt(0)?.toUpperCase() || '?'}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-black">{user.name}</p>
                                                <p className="truncate text-xs text-black/50">{user.email}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-2.5 rounded-2xl px-4 py-3 text-[15px] text-black/65 transition-colors hover:bg-black/[0.04] hover:text-black"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            <LayoutDashboard className="h-4 w-4" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-2.5 rounded-2xl px-4 py-3 text-[15px] text-black/65 transition-colors hover:bg-black/[0.04] hover:text-black"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            <UserRound className="h-4 w-4" />
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-2.5 rounded-2xl px-4 py-3 text-left text-[15px] text-black/65 transition-colors hover:bg-red-50 hover:text-red-600"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Log Out
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href="/register"
                                            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-8px_rgba(152,44,220,0.5)]"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            Get Started
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                        <Link
                                            href="/login"
                                            className="inline-flex w-full items-center justify-center rounded-full border border-black/[0.1] bg-white px-6 py-3 text-sm font-semibold text-black/70 transition-colors hover:bg-black/[0.03]"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            Log in
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="h-24" />
        </>
    );
}
