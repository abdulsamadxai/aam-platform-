"use client";

import { useState, useEffect } from "react";
import { getActiveMembers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Save, CheckCircle2, User } from "lucide-react";

export default function MemberProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Mock fetch profile
    const fetchProfile = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const members = getActiveMembers();
      if (members.length > 0) {
        setProfile(members[0]);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      // Mock update
      await new Promise(resolve => setTimeout(resolve, 500));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse h-64 bg-aam-near-black border border-white/5" />;

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
            <div className="relative mx-auto w-32 h-32 bg-black border border-white/10 flex items-center justify-center">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <User className="w-12 h-12 text-aam-dark-grey" />
              )}
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white text-black flex items-center justify-center border-2 border-black hover:bg-aam-grey transition-all">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight">{profile.full_name}</h3>
              <p className="font-mono text-xs text-aam-grey mt-1">{profile.aam_id}</p>
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
              <div className="text-lg font-bold uppercase tracking-widest">2024</div>
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
                  value={profile.full_name}
                  onChange={e => setProfile({ ...profile, full_name: e.target.value })}
                  className="bg-black border-white/10 rounded-none h-14"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Email Address</Label>
                <Input value={profile.email} disabled className="bg-black/50 border-white/5 text-aam-dark-grey rounded-none h-14 cursor-not-allowed" />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Phone Vector</Label>
                <Input
                  value={profile.phone || ""}
                  onChange={e => setProfile({ ...profile, phone: e.target.value })}
                  className="bg-black border-white/10 rounded-none h-14"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Firm Affiliation</Label>
                <Input
                  value={profile.firm_name || ""}
                  onChange={e => setProfile({ ...profile, firm_name: e.target.value })}
                  className="bg-black border-white/10 rounded-none h-14"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Bio / Professional Statement</Label>
              <Textarea
                value={profile.bio || ""}
                onChange={e => setProfile({ ...profile, bio: e.target.value })}
                className="bg-black border-white/10 rounded-none min-h-[160px] resize-none"
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
              <Button disabled={saving} type="submit" className="btn-primary min-w-[200px]">
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
