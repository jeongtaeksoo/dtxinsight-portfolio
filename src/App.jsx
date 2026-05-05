import Hero from './components/Hero'
import About from './components/About'
import NarrativeScroll from './components/NarrativeScroll'
import DigitalHealthProjects from './components/DigitalHealthProjects'
import ResearchProjects from './components/ResearchProjects'
import Publications from './components/Publications'
import Skills from './components/Skills'
import DeferredBlogSection from './components/DeferredBlogSection'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <DigitalHealthProjects />
      <Skills />
      <ResearchProjects />
      <Publications />
      <NarrativeScroll />
      <DeferredBlogSection />
    </Layout>
  );
}

export default App;
