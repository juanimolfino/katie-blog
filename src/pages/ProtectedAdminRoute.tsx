import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { isAllowedAdminEmail } from '@/lib/adminAccess';

type AuthStatus = 'loading' | 'authenticated' | 'guest' | 'not-configured' | 'unauthorized';

export function ProtectedAdminRoute() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(
    isSupabaseConfigured ? 'loading' : 'not-configured'
  );

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setAuthStatus('guest');
        return;
      }

      setAuthStatus(
        isAllowedAdminEmail(data.session.user.email) ? 'authenticated' : 'unauthorized'
      );
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setAuthStatus('guest');
        return;
      }

      setAuthStatus(
        isAllowedAdminEmail(session.user.email) ? 'authenticated' : 'unauthorized'
      );
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setAuthStatus('guest');
  };

  if (!isSupabaseConfigured || authStatus === 'not-configured') {
    return <Navigate to="/admin/login" replace />;
  }

  if (authStatus === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream pt-20">
        <p className="font-body text-sm uppercase tracking-[0.18em] text-black/45">
          Checking session...
        </p>
      </div>
    );
  }

  if (authStatus === 'guest') {
    return <Navigate to="/admin/login" replace />;
  }

  if (authStatus === 'unauthorized') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-6 pt-20 text-center">
        <div className="max-w-md">
          <p className="mb-4 font-body text-sm uppercase tracking-[0.18em] text-ocean">
            Admin access
          </p>
          <h1 className="mb-4 font-display text-4xl text-black">Not allowed</h1>
          <p className="font-body text-base leading-relaxed text-black/60">
            This account is signed in, but it is not approved for the admin panel.
          </p>
          <button
            type="button"
            onClick={() => void handleSignOut()}
            className="btn-ocean mt-6"
          >
            Sign out and try another account
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
