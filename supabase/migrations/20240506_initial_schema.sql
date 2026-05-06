-- Initial Schema for SafeNet AI / SCAMSHIELD

-- 1. Profiles Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  language_pref TEXT DEFAULT 'en',
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Scam Reports Table
CREATE TABLE IF NOT EXISTS public.scam_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  incident_title TEXT NOT NULL,
  scam_type TEXT,
  platform TEXT,
  description TEXT,
  severity TEXT DEFAULT 'High',
  status TEXT DEFAULT 'pending',
  evidence_url TEXT,
  ai_analysis JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Threat Alerts Table
CREATE TABLE IF NOT EXISTS public.threat_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT DEFAULT 'High',
  category TEXT,
  platform TEXT,
  tags TEXT[] DEFAULT '{}',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scam_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threat_alerts ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies

-- Profiles: Users can only see/edit their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Scam Reports: Authenticated users can insert, everyone can view
CREATE POLICY "Authenticated users can insert reports" ON public.scam_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view reports" ON public.scam_reports
  FOR SELECT USING (true);

-- Threat Alerts: Everyone can view alerts
CREATE POLICY "Anyone can view alerts" ON public.threat_alerts
  FOR SELECT USING (true);

-- 6. Trigger for automatic profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
