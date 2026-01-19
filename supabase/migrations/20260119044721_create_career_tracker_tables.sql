/*
  # Career Tracker Database Schema

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `job_title` (text, required)
      - `company_name` (text, required)
      - `location` (text, optional)
      - `job_type` (text, 'Internship' or 'Full-time')
      - `status` (text, 'Applied', 'Interviewing', 'Offer', 'Rejected')
      - `date_applied` (date, required)
      - `notes` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `dsa_progress`
      - `id` (uuid, primary key)
      - `topic_key` (text, unique, required) - unique identifier for each topic
      - `completed` (boolean, default false)
      - `completed_at` (timestamptz, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Allow all operations for anonymous users (single-user app, no auth)
*/

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_title text NOT NULL,
  company_name text NOT NULL,
  location text DEFAULT '',
  job_type text NOT NULL CHECK (job_type IN ('Internship', 'Full-time')),
  status text NOT NULL CHECK (status IN ('Applied', 'Interviewing', 'Offer', 'Rejected')),
  date_applied date NOT NULL,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS dsa_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_key text UNIQUE NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE dsa_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on jobs"
  ON jobs
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on dsa_progress"
  ON dsa_progress
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_date_applied ON jobs(date_applied DESC);
CREATE INDEX IF NOT EXISTS idx_dsa_progress_topic_key ON dsa_progress(topic_key);