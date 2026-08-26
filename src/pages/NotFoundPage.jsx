import PlaceholderLayout from '../components/common/PlaceholderLayout';
import { AlertTriangleIcon } from '../components/common/Icons';

export default function NotFoundPage() {
  return (
    <PlaceholderLayout
      tag="404 Error"
      tagColor="rose"
      icon={<AlertTriangleIcon size={32} />}
      title="Page Not Found"
      description="The feeder line or page you are looking for does not exist or has been relocated. Return to the PowerWatch home dashboard to monitor live outages and updates."
      plannedFeatures={[]}
    />
  );
}
