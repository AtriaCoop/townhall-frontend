import Navigation from '../components/navigation/navigation.jsx'
import Footer from '../components/footer/footer.jsx'
import Header from '@/components/header/header.jsx';

export default function Home() {
  return (
    <div className="home">
        <Navigation />
        <Header />
        <Footer />
    </div>
  );
}
