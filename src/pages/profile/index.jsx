import OrganizationDashboard from '@/components/organizationDashboard/organizationDashboard.jsx';
import Navigation from '../../components/navigation/navigation.jsx';

export default function Profile() {
    return (
        <div className="profile">
            <Navigation />
            <OrganizationDashboard />
        </div>
    )
}