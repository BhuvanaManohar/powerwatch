import PlaceholderLayout from '../components/common/PlaceholderLayout';
import { MapPinIcon } from '../components/common/Icons';

export default function LiveMapPage() {
  return (
    <PlaceholderLayout
      tag="Map Phase"
      tagColor="blue"
      icon={<MapPinIcon size={32} />}
      title="Live Outage Map"
      description="The full-screen interactive geographic outage map is scheduled for implementation in a later phase. In this upcoming phase, live OpenStreetMap tiles, feeder polygon overlays, and real-time GPS incident clustering will be integrated."
      plannedFeatures={[
        'Full-screen vector map with neighborhood boundary zoom',
        'Direct GPS pinpointing for rapid citizen outage logging',
        'Live feeder and substation power route overlays',
        'Dynamic outage severity heatmaps and restoration countdowns'
      ]}
    />
  );
}
