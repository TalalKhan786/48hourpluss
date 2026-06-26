// app/admin/showcase-videos/page.tsx

import { getShowcaseVideos } from '@/lib/db';
import VideoManagerClient from '@/components/admin/VideoManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminShowcaseVideosPage() {
  const videos = await getShowcaseVideos();
  return <VideoManagerClient initialVideos={videos} />;
}