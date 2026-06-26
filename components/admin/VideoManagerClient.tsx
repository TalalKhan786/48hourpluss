// components/admin/VideoManagerClient.tsx
'use client';

import { useState } from 'react';
import { ShowcaseVideo } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Loader2, 
  Upload, 
  X, 
  Search, 
  Film 
} from 'lucide-react';

interface VideoManagerClientProps {
  initialVideos: ShowcaseVideo[];
}

export default function VideoManagerClient({ initialVideos }: VideoManagerClientProps) {
  const [videos, setVideos] = useState<ShowcaseVideo[]>(initialVideos);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsLoading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // Form State
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [badgeText, setBadgeText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const resetForm = () => {
    setEditId(null);
    setTitle('');
    setBadgeText('');
    setVideoUrl('');
    setOrder(0);
    setIsActive(true);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsSheetOpen(true);
  };

  const handleOpenEdit = (v: ShowcaseVideo) => {
    setEditId(v.id);
    setTitle(v.title);
    setBadgeText(v.badgeText);
    setVideoUrl(v.videoUrl);
    setOrder(v.order);
    setIsActive(v.isActive);
    setIsSheetOpen(true);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingVideo(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.url) {
        setVideoUrl(data.url);
      } else {
        alert(data.error || 'Failed to upload video');
      }
    } catch (err) {
      console.error('Video upload failure:', err);
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const compiledVideo = {
      id: editId,
      title,
      badgeText,
      videoUrl,
      order: Number(order),
      isActive,
    };

    try {
      const response = await fetch('/api/showcase-videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compiledVideo),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save video details');
      }

      // Re-query list
      const updatedResponse = await fetch('/api/showcase-videos');
      const updatedList = await updatedResponse.json();
      setVideos(updatedList);
      setIsSheetOpen(false);
      resetForm();
    } catch (err: any) {
      alert(err.message || 'Saving failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this video?')) return;

    try {
      const response = await fetch(`/api/showcase-videos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setVideos(videos.filter((v) => v.id !== id));
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete video');
      }
    } catch (err) {
      console.error('Delete API trigger failure:', err);
    }
  };

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Video Showcase Manager</h2>
          <p className="text-gray-400 mt-1">Upload and manage active video tracks on your homepage split-screen wall [1].</p>
        </div>
        <Button onClick={handleOpenCreate} className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold flex gap-2 self-start">
          <Plus className="w-4 h-4" />
          Add Video
        </Button>
      </div>

      <div className="flex items-center border border-gray-800 rounded-md bg-gray-900/30 px-3 max-w-md">
        <Search className="w-4 h-4 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent py-2 text-sm text-white focus:outline-none placeholder-gray-500"
        />
      </div>

      {/* Main videos table */}
      <div className="overflow-x-auto border border-gray-800 rounded-lg bg-gray-900/20">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-black text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-800">
            <tr>
              <th className="p-4">Video Preview</th>
              <th className="p-4">Title</th>
              <th className="p-4">Badge Overlay</th>
              <th className="p-4">Order</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredVideos.map((v) => (
              <tr key={v.id} className="hover:bg-gray-900/30">
                <td className="p-4">
                  <div className="relative w-28 h-16 rounded bg-gray-950 overflow-hidden border border-gray-800">
                    <video src={v.videoUrl} className="w-full h-full object-cover" muted />
                  </div>
                </td>
                <td className="p-4 font-semibold text-white max-w-xs truncate">{v.title}</td>
                <td className="p-4 font-mono text-purple-400">{v.badgeText}</td>
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
                    <Button onClick={() => handleOpenEdit(v)} variant="ghost" size="icon" className="hover:bg-gray-800 text-gray-400 hover:text-white">
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

      {/* Slide Entry Form Panel Drawer */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent 
          side="right" 
          className="bg-black border-gray-800 text-white flex flex-col h-full p-0 w-full sm:max-w-lg"
        >
          <form onSubmit={handleSaveVideo} className="flex flex-col h-full m-0">
            {/* Header */}
            <div className="p-6 border-b border-gray-900 bg-black">
              <SheetTitle className="text-yellow-400 flex items-center gap-2">
                <Film className="w-5 h-5" />
                {editId ? 'Edit Video Details' : 'Add New Video'}
              </SheetTitle>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-black/40">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400">Video Title / Label</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded bg-gray-900 border border-gray-800 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none"
                  placeholder="e.g. Production Quality Sourcing"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400">Category Badge Overlay</label>
                  <input
                    type="text"
                    required
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="w-full rounded bg-gray-900 border border-gray-800 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none"
                    placeholder="e.g. Product Demo or Ingredients"
                  />
                </div>
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
              </div>

              {/* Dynamic Video File Upload */}
              <div className="space-y-2 border-t border-gray-900 pt-4">
                <label className="text-xs font-semibold text-gray-400 block">Video Source File</label>
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
                          <span className="text-xs text-gray-500 mt-1">Upload .mp4 Video File</span>
                        </>
                      )}
                      {/* Accepts mp4 video uploads! */}
                      <input type="file" accept="video/mp4,video/*" className="hidden" onChange={handleVideoUpload} disabled={uploadingVideo} />
                    </label>
                  )}
                  <div className="text-xs text-gray-500 leading-normal">
                    Upload an MP4 video file. For optimal full-screen results, use a 16:9 widescreen orientation.
                  </div>
                </div>
              </div>

              {/* Active Toggle Switch */}
              <div className="flex items-center justify-between border-t border-gray-900 pt-4">
                <div>
                  <div className="text-sm font-semibold text-white">Active Video Visibility</div>
                  <div className="text-xs text-gray-500">Draft videos remain hidden from the storefront homepage.</div>
                </div>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-10 h-6 rounded-full bg-gray-800 border-gray-700 checked:bg-yellow-500 cursor-pointer accent-yellow-500"
                />
              </div>
            </div>

            {/* Sticky Symmetrical Footer */}
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
                  'Save Video'
                )}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}