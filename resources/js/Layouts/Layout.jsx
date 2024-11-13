import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Layout({ auth, children }) {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const NavLink = ({ routeName, children, ...props }) => {
        const isActive = route().current(routeName); // Check if the current route matches

        return (
            <div className="relative group">
                <Link
                    href={route(routeName)}
                    {...props}
                    className={`relative font-medium text-lg px-4 py-2 transition-all duration-300
                        ${isActive ? 'text-green-400' : 'text-white hover:text-green-400'}`}
                >
                    <span className="relative z-10">{children}</span>

                    {/* Animated underline - always visible for active state, appears on hover for inactive */}
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-green-400 transition-all duration-300
                        ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                </Link>
            </div>
        );
    };

    return (
        <div className="dark bg-black text-green-600">
            <nav className={`fixed top-0 z-10 w-full transition-all duration-300 ${
                scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-row justify-between items-center h-16">
                        <div className="flex flex-row gap-6 items-center">
                            <div className="relative group">
                                <img
                                    src="/spotify.png"
                                    className="w-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                                    alt="Spotify"
                                />
                                <div className="absolute -inset-2 bg-green-400/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                            </div>
                            <div className="hidden md:flex flex-row gap-6">
                                <NavLink routeName="home">Home</NavLink>
                                <NavLink routeName="generate">Generate</NavLink>
                                <NavLink routeName="history">History</NavLink>
                            </div>
                        </div>

                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        <div className="hidden md:flex flex-row gap-6 items-center">
                            {auth?.user ? (
                                <>
                                    <NavLink routeName="profile.edit">Profile</NavLink>
                                    <NavLink
                                        routeName="logout"
                                        method="post"
                                        as="button"
                                    >
                                        Logout
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink routeName="login">Login</NavLink>
                                    <NavLink routeName="register">Register</NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className={`md:hidden transition-all duration-300 overflow-hidden ${
                    isMenuOpen ? 'max-h-64' : 'max-h-0'
                }`}>
                    <div className="px-4 py-2 space-y-1 bg-black/80 backdrop-blur-md">
                        <NavLink routeName="home">Home</NavLink>
                        <NavLink routeName="generate">Generate</NavLink>
                        <NavLink routeName="history">History</NavLink>
                        {auth?.user ? (
                            <>
                                <NavLink routeName="profile.edit">Profile</NavLink>
                                <NavLink
                                    routeName="logout"
                                    method="post"
                                    as="button"
                                >
                                    Logout
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink routeName="login">Login</NavLink>
                                <NavLink routeName="register">Register</NavLink>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <main className="bg-gradient-to-b from-gray-900 to-black min-h-screen pt-16">
                {children}
            </main>
        </div>
    );
}
