import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? '');
    });
  }, []);

  const handleSignOut = async () => {
    if (!supabase) return;

    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
        <div className="mb-10 flex flex-col gap-5 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-3 block font-body text-sm uppercase tracking-[0.18em] text-ocean">
              Dashboard
            </span>
            <h1 className="font-display text-5xl text-black md:text-6xl">
              Dashboard
            </h1>
            {email && (
              <p className="mt-3 font-body text-base text-black/55">
                Signed in as {email}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="btn-secondary justify-center"
          >
            Sign out
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Link
            to="/admin/posts"
            className="group border border-black/10 bg-cream p-6 transition-colors hover:border-ocean/35 hover:bg-sky-50"
          >
            <h2 className="mb-3 font-display text-2xl text-black transition-colors group-hover:text-ocean">
              Manage posts
            </h2>
            <p className="font-body text-sm leading-relaxed text-black/60">
              Create, edit, delete, draft, and publish the first database-backed posts.
            </p>
          </Link>

          <Link
            to="/admin/gallery"
            className="group border border-black/10 bg-cream p-6 transition-colors hover:border-ocean/35 hover:bg-sky-50"
          >
            <h2 className="mb-3 font-display text-2xl text-black transition-colors group-hover:text-ocean">
              Manage gallery
            </h2>
            <p className="font-body text-sm leading-relaxed text-black/60">
              Upload, edit, reorder, hide, and publish gallery photos.
            </p>
          </Link>

          <div className="border border-black/10 bg-cream p-6 opacity-70">
            <h2 className="mb-3 font-display text-2xl text-black">Site settings</h2>
            <p className="font-body text-sm leading-relaxed text-black/60">
              Coming after the content workflow is stable.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
