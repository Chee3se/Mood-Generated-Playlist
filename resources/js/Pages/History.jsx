import React, { useState, useEffect } from 'react';
import {Head, Link} from "@inertiajs/react";
import Layout from '../Layouts/Layout';

export default function History ({auth}) {
    return (
        <Layout auth={auth}>
            <Head title="History"/>
            <div>
                <h1>cau</h1>
            </div>
        </Layout>
    );
};


