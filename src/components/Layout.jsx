import React from 'react';
import Header from './Header';
import Contact from './Contact';

const Layout = ({ children }) => {
    return (
        <div className="relative min-h-screen bg-background text-text font-sans">
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="w-full max-w-[1200px] mx-auto flex flex-col gap-[120px] px-4">
                    {children}
                </main>
                <Contact />
            </div>
        </div>
    );
};

export default Layout;
