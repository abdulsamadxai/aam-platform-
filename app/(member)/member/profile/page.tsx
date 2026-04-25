"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Save, CheckCircle2, User as UserIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import type { Member } from "@/types";

const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

export default function MemberProfile() {
  const [profile, setProfile] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('members')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        if (data) setProfile(data as Member);
      } catch {
        toast.error("Failed to load profile. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    setSuccess(false);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Session expired");

      const { error } = await supabase
        .from('members')
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          firm_name: profile.firm_name,
          bio: profile.bio,
          profile_photo_url: profile.profile_photo_url
        })
        .eq('id', user.id);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      toast.error("Only JPEG, PNG, and WEBP images are allowed.");
      return;
    }

    if (file.size > MAX_AVATAR_BYTES) {
      toast.error("File size must be less than 2MB.");
      return;
    }

    setUploading(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Session expired");

      const fileExt = file.name.split('.').pop()?.toLowerCase() ?? "jpg";
      const filePath = `${user.id}-${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { contentType: file.type });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setProfile(prev => prev ? { ...prev, profile_photo_url: publicUrl } : prev);
      toast.success("Avatar updated successfully.");
    } catch {
      toast.error("Failed to upload avatar. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="animate-pulse h-64 bg-aam-near-black border border-white/5" />;
  if (!profile) return <div className="text-aam-error p-8">Profile data not available. Please contact support.</div>;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">Member Profile</h1>
        <p className="text-aam-grey uppercase tracking-widest text-xs font-medium">Manage your professional credentials and identity.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Avatar & Identifiers */}
        <div className="space-y-8">
          <div className="bg-aam-near-black p-10 border border-white/5 text-center space-y-6">
            <div className="relative mx-auto w-32 h-32 bg-black border border-white/10 flex items-center justify-center overflow-hidden">
              {profile.profile_photo_url ? (
                <Image src={profile.profile_photo_url} fill className="object-cover" alt="Profile" />
              ) : (
                <UserIcon className="w-12 h-12 text-aam-dark-grey" />
              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                ref={fileInputRef}
                onChange={handleAvatarUpload}
                disabled={uploading}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                aria-label="Change profile photo"
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-white text-black flex items-center justify-center border-2 border-black hover:bg-aam-grey transition-all disabled:opacity-50"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight">{profile.full_name}</h3>
              <p className="font-mono text-xs text-aam-grey mt-1">{profile.aam_id ?? "PENDING"}</p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <span className="px-3 py-1 border border-white/20 text-[10px] font-bold uppercase tracking-widest text-aam-grey">
                {profile.category} Member
              </span>
            </div>
          </div>

          <div className="bg-black border border-white/10 p-8 space-y-6">
            <div className="space-y-2">
              <div className="text-[10px] uppercase font-bold tracking-widest text-aam-grey">Account Status</div>
              <div className="text-lg font-bold uppercase tracking-widest">{profile.status}</div>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] uppercase font-bold tracking-widest text-aam-grey">Member Since</div>
              <div className="text-lg font-bold uppercase tracking-widest">
                {new Date(profile.joined_at ?? profile.created_at).getFullYear()}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleUpdate} className="bg-aam-near-black p-12 border border-white/5 space-y-10">
            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-white/10 pb-4">Professional Data</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Full Name (Legal)</Label>
                <Input
                  value={profile.full_name ?? ""}
                  onChange={e => setProfile(prev => prev ? { ...prev, full_name: e.target.value } : prev)}
                  className="bg-black border-white/10 rounded-none h-14 text-white"
                  required
                  maxLength={200}
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Email Address</Label>
                <Input value={profile.email ?? ""} disabled className="bg-black/50 border-white/5 text-aam-dark-grey rounded-none h-14 cursor-not-allowed" />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Phone</Label>
                <Input
                  value={profile.phone ?? ""}
                  onChange={e => setProfile(prev => prev ? { ...prev, phone: e.target.value } : prev)}
                  className="bg-black border-white/10 rounded-none h-14 text-white"
                  maxLength={50}
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Firm Affiliation</Label>
                <Input
                  value={profile.firm_name ?? ""}
                  onChange={e => setProfile(prev => prev ? { ...prev, firm_name: e.target.value } : prev)}
                  className="bg-black border-white/10 rounded-none h-14 text-white"
                  maxLength={200}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Bio / Professional Statement</Label>
              <Textarea
                value={profile.bio ?? ""}
                onChange={e => setProfile(prev => prev ? { ...prev, bio: e.target.value } : prev)}
                className="bg-black border-white/10 rounded-none min-h-[160px] resize-none text-white"
                maxLength={1000}
              />
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-6">
              {success ? (
                <div className="flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" />
                  Synchronized
                </div>
              ) : (
                <div className="text-[9px] text-aam-dark-grey uppercase tracking-widest font-bold">Pending local changes...</div>
              )}
              <Button disabled={saving || uploading} type="submit" className="btn-primary min-w-[200px]">
                {saving ? "Updating..." : "Update Dossier"}
                <Save className="ml-3 w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
