import Navigation from '../../components/navigation/navigation.jsx';
import ProfilePage from '@/components/profilePage/profilePage.jsx';
import NavSidebar from '../../components/navigation/navSidebar/navSidebar.jsx';
import Footer from '../../components/footer/footer.jsx';

export default function Profile() {
    return (
        <div className="profile">
            <Navigation />
            <ProfilePage />
            <NavSidebar />
        </div>
    )
}