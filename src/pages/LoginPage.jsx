import PlaceholderLayout from '../components/common/PlaceholderLayout';
import { UsersIcon } from '../components/common/Icons';

export default function LoginPage() {
  return (
    <PlaceholderLayout
      tag="Security & Access"
      tagColor="amber"
      icon={<UsersIcon size={32} />}
      title="Login"
      description="Authentication and secure role-based portals will be implemented in a later phase. Citizens and electricity department technicians will be able to log in to manage verified incident reports, dispatch crews, and customize localized outage alerts."
      plannedFeatures={[
        'Citizen passkey & phone OTP verification',
        'Electricity department staff & dispatch control portal',
        'Saved neighborhood subscriptions for instant SMS/Push alerts',
        'Personal report history and verified resolution tracking'
      ]}
    />
  );
}
