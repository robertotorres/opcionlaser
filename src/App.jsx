import ContactCTA from './components/ContactCTA.jsx';
import Footer from './components/Footer.jsx';
import Gallery from './components/Gallery.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Process from './components/Process.jsx';
import Services from './components/Services.jsx';
import SocialMedia from './components/SocialMedia.jsx';
import Videos from './components/Videos.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Videos />
        <Process />
        <SocialMedia />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
