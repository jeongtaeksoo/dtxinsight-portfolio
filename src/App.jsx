import Hero from './components/Hero'
import NarrativeScroll from './components/NarrativeScroll'
import ResearchProjects from './components/ResearchProjects'
import Publications from './components/Publications'
import Skills from './components/Skills'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Hero />
      <NarrativeScroll />
      <ResearchProjects />
      <Publications />
      <Skills />
    </Layout>
  );
}

export default App;
