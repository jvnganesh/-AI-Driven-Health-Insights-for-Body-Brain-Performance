/*
  # Add User Health Data Tables

  1. New Tables
    - `user_health_data`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `name` (text)
      - `age` (integer)
      - `gender` (text)
      - `height` (numeric)
      - `weight` (numeric)
      - `activity_level` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_health_data` table
    - Add policies for authenticated users to:
      - Read their own health data
      - Create their own health data
      - Update their own health data
*/

CREATE TABLE IF NOT EXISTS user_health_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  age integer NOT NULL,
  gender text NOT NULL,
  height numeric NOT NULL,
  weight numeric NOT NULL,
  activity_level text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_age CHECK (age > 0 AND age < 150),
  CONSTRAINT valid_height CHECK (height > 0),
  CONSTRAINT valid_weight CHECK (weight > 0)
);

ALTER TABLE user_health_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own health data"
  ON user_health_data
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own health data"
  ON user_health_data
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health data"
  ON user_health_data
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_health_data_updated_at
  BEFORE UPDATE
  ON user_health_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();