import PlaceholderLayout from '../components/common/PlaceholderLayout';
import { BuildingOfficeIcon } from '../components/common/Icons';

export default function DepartmentDashboardPage() {
  return (
    <PlaceholderLayout
      tag="Utility Operations"
      tagColor="blue"
      icon={<BuildingOfficeIcon size={32} />}
      title="Department Dashboard"
      description="The electricity department dashboard will be implemented in a later phase. This operational hub will provide grid engineers and control room operators with automated incident deduplication, feeder fault triage, crew dispatch tools, and public ETR broadcast controls."
      plannedFeatures={[
        'Automated incident clustering & transformer load fault mapping',
        'Field crew dispatch coordinator with GPS tracking',
        'One-click public broadcast of restoration estimates (ETRs)',
        'Historical grid reliability metrics (SAIDI / SAIFI analytics)'
      ]}
    />
  );
}
