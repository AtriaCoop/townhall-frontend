import Navigation from '../../components/navigation/navigation.jsx';
import ProfilePage from '@/components/profilePage/profilePage.jsx';
import NavSidebar from '../../components/navigation/navSidebar/navSidebar.jsx';
import Footer from '../../components/footer/footer.jsx';

export default function Profile() {
    return (
        <div className="profile">
            <Navigation />
            <div className='d-flex flex-row-reverse justify-content-end p-4 gap-5'>
                <ProfilePage />
                <NavSidebar />
            </div>
        </div>
    )
}