import React from 'react';
import Background3D from './Background3D';
import Header from './Header'; // Temporarily using existing Header, will refactor later
import Contact from './Contact'; // Reuse Contact for now

const Layout = ({ children }) => {
    return (
        <div className="relative min-h-screen text-text font-sans selection:bg-primary/30">
            <Background3D />

            {/* Content wrapper with z-index to sit above canvas */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />

                {/* Main Content Area */}
                <main className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col gap-[140px]">
                    {children}
                </main>

                <Contact />
            </div>
        </div>
    );
};

export default Layout;
