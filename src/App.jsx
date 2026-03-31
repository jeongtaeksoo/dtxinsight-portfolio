import Hero from './components/Hero'
import About from './components/About'
import NarrativeScroll from './components/NarrativeScroll'
import DigitalHealthProjects from './components/DigitalHealthProjects'
import ResearchProjects from './components/ResearchProjects'
import Publications from './components/Publications'
import Skills from './components/Skills'
import BlogBoard from './components/BlogBoard'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <DigitalHealthProjects />
      <ResearchProjects />
      <Publications />
      <NarrativeScroll />
      <Skills />
      <section id="blog" className="py-16">
        <BlogBoard />
      </section>
    </Layout>
  );
}

export default App;
