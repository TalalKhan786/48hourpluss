import { getVideoReviews, getTextReviews } from '@/lib/db';
import ReviewsManagerClient from '@/components/admin/ReviewsManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
  const videoReviews = await getVideoReviews({ includeInactive: true });
  const textReviews = await getTextReviews({ includeInactive: true });

  return <ReviewsManagerClient initialVideoReviews={videoReviews} initialTextReviews={textReviews} />;
}