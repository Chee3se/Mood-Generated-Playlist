import {Link} from "@inertiajs/react";

export default function Layout ({ auth, children }) {
    return (
        <div className='dark bg-black text-green-600'>
            <nav className='fixed top-0 z-10 w-full  flex flex-row justify-between items-center bg-black text-white p-4 '>

                <div className='flex flex-row gap-4 items-center'>
                    <img src="/spotify.png" className='w-10'/>
                    <Link href='/' className='font-bold text-lg pl-3'>Home</Link>
                </div>
                <div>
                    <Link href={route('generate')} className='font-bold text-lg pl-3'>Generate</Link>
                </div>
                <div className='flex flex-row gap-4 items-center justify-end'>
                    {auth?.user ? (
                        <div className='flex flex-row gap-4 items-center'>
                            <span className='font-bold'>{auth.user.name}</span>
                            <Link href={route('logout')} method='post' as='button' className='font-bold text-lg pl-3'>Logout</Link>
                        </div>
                    ) : (
                        <div className='flex flex-row gap-4 items-center'>
                            <Link href={route('login')} className='font-bold text-lg pl-3'>Login</Link>
                            <Link href={route('register')} className='font-bold text-lg pl-3'>Register</Link>
                        </div>
                    )}
                </div>
            </nav>
            <main className='bg-gradient-to-b from-gray-900 to-black min-h-screen'>
                {children}
            </main>
        </div>
    )
}
