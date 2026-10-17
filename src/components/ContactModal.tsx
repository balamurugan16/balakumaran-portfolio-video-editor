import React, { useState } from 'react';
import { X, Send, Mail, Phone, Instagram, Check } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, profile }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Wedding Video Reel');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const subject = encodeURIComponent(`Video Editing Inquiry from ${name || 'Recruiter'}`);
    const body = encodeURIComponent(
      `Hi Bala,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}`
    );
    setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl border border-zinc-200 shadow-2xl p-6 my-auto text-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-5">
          <h3 className="font-display font-bold text-base text-zinc-950">
            Get in Touch with Balakumaran D
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Contact Links */}
        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 mb-5 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Email:</span>
            <a href={`mailto:${profile.email}`} className="font-medium text-zinc-900 hover:underline">
              {profile.email}
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Phone:</span>
            <a href={`tel:${profile.phone}`} className="font-medium text-zinc-900 hover:underline">
              {profile.phone}
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Instagram:</span>
            <a
              href={profile.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-pink-600 hover:underline"
            >
              {profile.instagramHandle}
            </a>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-zinc-900">Message Ready</h4>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto">
              Opening your email client to send this directly to {profile.email}.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-medium cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-700 font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900"
                />
              </div>
              <div>
                <label className="block text-zinc-700 font-medium mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-700 font-medium mb-1">Project Need</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900"
              >
                <option value="Wedding / Ceremony Video Editing">Wedding / Ceremony Video Editing</option>
                <option value="Talking Head / Content Creator Reels">Talking Head / Content Creator Reels</option>
                <option value="Couple Photoshoot & Portrait Reels">Couple Photoshoot & Portrait Reels</option>
                <option value="Marketing Campaign Short-Form">Marketing Campaign Short-Form</option>
                <option value="General Freelance Opportunity">General Freelance Opportunity</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-700 font-medium mb-1">Brief Details / Links</label>
              <textarea
                rows={3}
                required
                placeholder="Tell me a bit about your timeline and video requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-zinc-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs text-zinc-600 hover:text-zinc-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
