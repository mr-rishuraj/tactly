-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  persona VARCHAR(50) NOT NULL,
  use_case VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT valid_persona CHECK (
    persona IN ('student', 'founder', 'professional', 'creator', 'job_seeker', 'other')
  ),
  CONSTRAINT valid_use_case CHECK (
    use_case IS NULL OR use_case IN ('networking', 'cold_outreach', 'professional_communication', 'job_search', 'content_creation', 'other')
  )
);

-- Create index on email for faster lookups
CREATE INDEX idx_waitlist_email ON public.waitlist(email);

-- Create index on created_at for sorting
CREATE INDEX idx_waitlist_created_at ON public.waitlist(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON public.waitlist
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow public reads
CREATE POLICY "Allow public reads" ON public.waitlist
  FOR SELECT
  USING (true);
