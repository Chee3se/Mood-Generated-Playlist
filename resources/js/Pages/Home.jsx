import { Head, Link } from '@inertiajs/react';

import Layout from '../Layouts/Layout';

export default function Home({ auth}) {
    return (
        <Layout>
        <Head title='Home'/>


        <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
            <h1>Hy emil</h1>
        </div>
        </Layout>
    )
}




