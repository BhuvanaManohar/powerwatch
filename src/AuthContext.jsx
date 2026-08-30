import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseclient';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Failed to fetch profile:', error.message);
      setProfile(null);
      return;
    }
    setProfile(data);
  };

  useEffect(() => {
    let isMounted = true;

    // Load the existing session on first mount
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (!isMounted) return;

      setSession(initialSession);
      setUser(initialSession?.user ?? null);

      if (initialSession?.user) {
        fetchProfile(initialSession.user.id).finally(() => {
          if (isMounted) setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    // Subscribe to future auth state changes (sign in, sign out, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!isMounted) return;

      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        fetchProfile(newSession.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out failed:', error.message);
    }
    // onAuthStateChange will clear session/user/profile automatically
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth() must be used within an <AuthProvider>');
  }
  return context;
}
