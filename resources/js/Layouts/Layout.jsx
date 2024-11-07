import {Link} from "@inertiajs/react";

export default function Layout ({ auth, children }) {
    return (
        <div className='dark bg-black text-green-600'>
            <nav className='fixed top-0 z-10 w-full  flex flex-row justify-between items-center bg-black text-white p-4 '>

                <div className='flex flex-row gap-4 items-center'>
                    <img src="/spotify.png" className='w-10'/>
                    <Link href='/' className='font-bold text-lg pl-3'>Nigga</Link>
                </div>
                <div className='flex flex-row gap-4 items-center justify-end'>
                    <Link href='/login' className='font-bold text-lg pl-3'>Login</Link>
                    <Link href='/register' className='font-bold text-lg pl-3'>Register</Link>
                </div>
            </nav>
            <main className=''>
                {children}
            </main>
        </div>
    )
}
