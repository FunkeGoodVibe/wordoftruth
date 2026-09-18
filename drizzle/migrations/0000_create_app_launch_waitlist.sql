CREATE TABLE public.app_launch_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  wants_testing boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX app_launch_waitlist_email_key ON public.app_launch_waitlist (lower(email));

GRANT INSERT ON public.app_launch_waitlist TO anon;
GRANT INSERT ON public.app_launch_waitlist TO authenticated;
GRANT ALL ON public.app_launch_waitlist TO service_role;

ALTER TABLE public.app_launch_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the waitlist"
  ON public.app_launch_waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
