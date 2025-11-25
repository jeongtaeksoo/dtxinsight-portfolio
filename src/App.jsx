import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import About from './components/About';
import ResearchProjects from './components/ResearchProjects';
import DigitalHealthProjects from './components/DigitalHealthProjects';
import Publications from './components/Publications';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <Hero />
        <Highlights />
        <About />
        <ResearchProjects />
        <DigitalHealthProjects />
        <Publications />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
