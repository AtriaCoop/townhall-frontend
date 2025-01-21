import Loading from '@/components/loading/loading.jsx';
import Navigation from '@/components/navigation/navigation';

export default function Home() {
  return (
    <div className="home">
      <Navigation />
      <Loading />
    </div>
  );
}
