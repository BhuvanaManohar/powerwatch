import PlaceholderLayout from '../components/common/PlaceholderLayout';
import { BoltIcon } from '../components/common/Icons';

export default function CitizenDashboardPage() {
  return (
    <PlaceholderLayout
      tag="Community Portal"
      tagColor="emerald"
      icon={<BoltIcon size={32} />}
      title="Citizen Dashboard"
      description="The citizen dashboard will be implemented in a later phase. This dedicated portal will allow residents to track their active reports, view feeder health in their neighborhood, and receive direct restoration updates from local electricity boards."
      plannedFeatures={[
        'My Active Reports tracking and ticket timeline status',
        'Neighborhood feeder health & scheduled maintenance calendar',
        'Direct feedback loop to confirm when power is restored',
        'Emergency advisory notifications during storm events'
      ]}
    />
  );
}
