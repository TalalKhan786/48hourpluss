// components/admin/ReviewsManagerClient.tsx
'use client';

import { useState } from 'react';
import { VideoReview, TextReview } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Plus, Trash2, Edit3, Loader2, Upload, X, Star, Video, MessageSquare } from 'lucide-react';

interface ReviewsManagerProps {
  initialVideoReviews: VideoReview[];
  initialTextReviews: TextReview[];
}

export default function ReviewsManagerClient({ initialVideoReviews, initialTextReviews }: ReviewsManagerProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'text'>('video');
  const [videoReviews, setVideoReviews] = useState<VideoReview[]>(initialVideoReviews);
  const [textReviews, setTextReviews] = useState<TextReview[]>(initialTextReviews);
  
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsLoading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // Form States
  const [editId, setEditId] = useState<string | null>(null);
  const [author, setAuthor] = useState('');
  
  // Video-specific states
  const [videoUrl, setVideoUrl] = useState('');
  const [order, setOrder] = useState(0);
  
  // Text-specific states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');
  const [isActive, setIsActive] = useState(true);

  const resetForm = () => {
    setEditId(null);
    setAuthor('');
    setVideoUrl('');
    setOrder(0);
    setRating(5);
    setComment('');
    setDate(new Date().toISOString().split('T')[0]);
    setIsActive(true);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsSheetOpen(true);
  };

  const handleOpenEditVideo = (v: VideoReview) => {
    setEditId(v.id);
    setAuthor(v.author);
    setVideoUrl(v.videoUrl);
    setOrder(v.order);
    setIsActive(v.isActive);
    setIsSheetOpen(true);
  };

  const handleOpenEditText = (t: TextReview) => {
    setEditId(t.id);
    setAuthor(t.author);
    setRating(t.rating);
    setComment(t.comment);
    setDate(t.date);
    setIsActive(t.isActive);
    setIsSheetOpen(true);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingVideo(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await response.json();
      if (response.ok && data.url) {
        setVideoUrl(data.url);
      } else {
        alert(data.error || 'Failed to upload video');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const apiPath = activeTab === 'video' ? '/api/video-reviews' : '/api/text-reviews';
    const body = activeTab === 'video' 
      ? { id: editId, author, videoUrl, order: Number(order), isActive }
      : { id: editId, author, rating: Number(rating), comment, date, isActive };

    try {
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Saving failed');

      if (activeTab === 'video') {
        const res = await fetch('/api/video-reviews');
        setVideoReviews(await res.json());
      } else {
        const res = await fetch('/api/text-reviews');
        setTextReviews(await res.json());
      }

      setIsSheetOpen(false);
      resetForm();
    } catch (err) {
      alert('Failed to save record');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm('Delete this video testimonial?')) return;
    try {
      const res = await fetch(`/api/video-reviews/${id}`, { method: 'DELETE' });
      if (res.ok) setVideoReviews(videoReviews.filter((v) => v.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteText = async (id: string) => {
    if (!confirm('Delete this text review?')) return;
    try {
      const res = await fetch(`/api/text-reviews/${id}`, { method: 'DELETE' });
      if (res.ok) setTextReviews(textReviews.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Reviews & Testimonials</h2>
          <p className="text-gray-400 mt-1">Manage dynamic video clips and verified customer text reviews [1].</p>
        </div>
        <Button onClick={handleOpenCreate} className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold flex gap-2 self-start">
          <Plus className="w-4 h-4" />
          Add {activeTab === 'video' ? 'Video Testimonial' : 'Text Review'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-900 pb-2 gap-4">
        <button
          onClick={() => { setActiveTab('video'); resetForm(); }}
          className={`pb-2 text-sm font-semibold border-b-2 flex items-center gap-2 ${
            activeTab === 'video' ? 'border-yellow-500 text-yellow-500' : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          <Video className="w-4 h-4" />
          Video Testimonials
        </button>
        <button
          onClick={() => { setActiveTab('text'); resetForm(); }}
          className={`pb-2 text-sm font-semibold border-b-2 flex items-center gap-2 ${
            activeTab === 'text' ? 'border-yellow-500 text-yellow-500' : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Text Reviews
        </button>
      </div>

      {/* Tables based on selected tab */}
      {activeTab === 'video' ? (
        <div className="overflow-x-auto border border-gray-800 rounded-lg bg-gray-900/20">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-black text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-800">
              <tr>
                <th className="p-4">Video Clip</th>
                <th className="p-4">Customer Name / Location</th>
                <th className="p-4">Order</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {videoReviews.map((v) => (
                <tr key={v.id} className="hover:bg-gray-900/30">
                  <td className="p-4">
                    <video src={v.videoUrl} className="w-20 h-12 rounded bg-black object-cover" muted />
                  </td>
                  <td className="p-4 font-semibold text-white">{v.author}</td>
                  <td className="p-4 font-mono text-yellow-400">{v.order}</td>
                  <td className="p-4">
                    {v.isActive ? (
                      <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</Badge>
                    ) : (
                      <Badge className="bg-gray-800 text-gray-500 border border-gray-700">Draft</Badge>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button onClick={() => handleOpenEditVideo(v)} variant="ghost" size="icon" className="hover:bg-gray-800 text-gray-400">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => handleDeleteVideo(v.id)} variant="ghost" size="icon" className="hover:bg-red-950/20 text-gray-500 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-800 rounded-lg bg-gray-900/20">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-black text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-800">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Comment</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {textReviews.map((t) => (
                <tr key={t.id} className="hover:bg-gray-900/30">
                  <td className="p-4 font-semibold text-white">{t.author}</td>
                  <td className="p-4 text-amber-400 font-mono">{'★'.repeat(t.rating)}</td>
                  <td className="p-4 text-gray-400 max-w-xs truncate">{t.comment}</td>
                  <td className="p-4 text-gray-500 text-xs">{t.date}</td>
                  <td className="p-4">
                    {t.isActive ? (
                      <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</Badge>
                    ) : (
                      <Badge className="bg-gray-800 text-gray-500 border border-gray-700">Draft</Badge>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button onClick={() => handleOpenEditText(t)} variant="ghost" size="icon" className="hover:bg-gray-800 text-gray-400">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => handleDeleteText(t.id)} variant="ghost" size="icon" className="hover:bg-red-950/20 text-gray-500 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Dynamic Slide Drawer Form */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="bg-black border-gray-800 text-white flex flex-col h-full p-0 w-full sm:max-w-lg">
          <form onSubmit={handleSave} className="flex flex-col h-full m-0">
            <div className="p-6 border-b border-gray-900 bg-black">
              <SheetTitle className="text-yellow-400">
                {editId ? 'Edit Review Record' : `Add New ${activeTab === 'video' ? 'Video Testimonial' : 'Text Review'}`}
              </SheetTitle>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-black/40">
              {/* Author */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400">Customer Name</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full rounded bg-gray-900 border border-gray-800 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none"
                  placeholder="e.g. Ahmad Khan, Lahore"
                />
              </div>

              {activeTab === 'video' ? (
                <>
                  {/* Video Order */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Display Order Index</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={order}
                      onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                      className="w-full rounded bg-gray-900 border border-gray-800 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none"
                    />
                  </div>

                  {/* Video File Uploader */}
                  <div className="space-y-2 border-t border-gray-900 pt-4">
                    <label className="text-xs font-semibold text-gray-400 block">Video Testimonial File</label>
                    <div className="flex flex-col gap-4">
                      {videoUrl ? (
                        <div className="relative w-full aspect-video rounded border border-gray-800 overflow-hidden bg-gray-950 group max-w-sm">
                          <video src={videoUrl} className="w-full h-full object-cover" muted />
                          <button
                            type="button"
                            onClick={() => setVideoUrl('')}
                            className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ) : (
                        <label className="w-full aspect-video rounded border-2 border-dashed border-gray-800 hover:border-yellow-500/50 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-950 max-w-sm">
                          {uploadingVideo ? (
                            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                          ) : (
                            <>
                              <Upload className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-500 mt-1">Upload Customer Video .mp4</span>
                            </>
                          )}
                          <input type="file" accept="video/mp4,video/*" className="hidden" onChange={handleVideoUpload} disabled={uploadingVideo} />
                        </label>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Rating Selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Star Rating (1 - 5)</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full rounded bg-gray-900 border border-gray-800 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none"
                    >
                      {[5, 4, 3, 2, 1].map((num) => (
                        <option key={num} value={num}>{'★'.repeat(num)}</option>
                      ))}
                    </select>
                  </div>

                  {/* Review Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Review Date</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded bg-gray-900 border border-gray-800 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none"
                    />
                  </div>

                  {/* Comments */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Customer Comment</label>
                    <textarea
                      rows={4}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full rounded bg-gray-900 border border-gray-800 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none resize-none"
                      placeholder="Enter customer feedback text..."
                    />
                  </div>
                </>
              )}

              {/* Active Toggle */}
              <div className="flex items-center justify-between border-t border-gray-900 pt-4">
                <div>
                  <div className="text-sm font-semibold text-white">Active Visibility</div>
                  <div className="text-xs text-gray-500">Draft reviews remain hidden from the storefront reviews page.</div>
                </div>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-10 h-6 rounded-full bg-gray-800 border-gray-700 checked:bg-yellow-500 cursor-pointer accent-yellow-500"
                />
              </div>
            </div>

            {/* Symmetrical Sticky Footer */}
            <div className="p-6 border-t border-gray-900 bg-black flex gap-4">
              <Button type="button" onClick={() => setIsSheetOpen(false)} variant="outline" className="flex-1 border-gray-800 text-gray-300 hover:bg-gray-900">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Review'
                )}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}