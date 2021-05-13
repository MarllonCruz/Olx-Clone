import React from 'react';
import { Link } from 'react-router-dom';

const Page = () => {
    return (
        <div>
            <h1>Página Inicial</h1>

            <Link to="/about">About</Link>
        </div>
    );
}

export default Page;