import Hero from './components/Hero'
import ProfileDetails from './components/ProfileDetails'
import ProfessionalDevelopment from './components/ProfessionalDevelopment'
import ResearchProjects from './components/ResearchProjects'
import DigitalHealthProjects from './components/DigitalHealthProjects'
import Publications from './components/Publications'
import Skills from './components/Skills'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Hero />
      <ProfileDetails />
      <ProfessionalDevelopment />
      <ResearchProjects />
      <DigitalHealthProjects />
      <Publications />
      <Skills />
    </Layout>
  );
}

export default App;
