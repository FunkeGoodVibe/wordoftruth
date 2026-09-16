CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members can view profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.resonances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  promise_date DATE NOT NULL,
  promise_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, promise_date)
);
GRANT SELECT, INSERT, DELETE ON public.resonances TO authenticated;
GRANT ALL ON public.resonances TO service_role;
ALTER TABLE public.resonances ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members can view resonances" ON public.resonances FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can add their own resonance" ON public.resonances FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove their own resonance" ON public.resonances FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.promise_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  promise_date DATE NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.promise_comments TO authenticated;
GRANT ALL ON public.promise_comments TO service_role;
ALTER TABLE public.promise_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members can view comments" ON public.promise_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can post their own comment" ON public.promise_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comment" ON public.promise_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX promise_comments_date_idx ON public.promise_comments (promise_date, created_at);

CREATE TABLE public.direct_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.direct_messages TO authenticated;
GRANT ALL ON public.direct_messages TO service_role;
ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Participants can view their messages" ON public.direct_messages FOR SELECT TO authenticated USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can send their own messages" ON public.direct_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id AND sender_id <> recipient_id);
CREATE POLICY "Recipients can mark messages read" ON public.direct_messages FOR UPDATE TO authenticated USING (auth.uid() = recipient_id) WITH CHECK (auth.uid() = recipient_id);
CREATE INDEX direct_messages_pair_idx ON public.direct_messages (sender_id, recipient_id, created_at);

ALTER TABLE public.promise_comments REPLICA IDENTITY FULL;
ALTER TABLE public.direct_messages REPLICA IDENTITY FULL;
ALTER TABLE public.resonances REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.promise_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.direct_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.resonances;