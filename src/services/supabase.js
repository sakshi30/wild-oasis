import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://fyzcymehgmgiglliulnb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5emN5bWVoZ21naWdsbGl1bG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NjE2MjgsImV4cCI6MjA1NTUzNzYyOH0.oWoorEyBF0wue13Cgr4QQQg_HvM5ibPGxoSF_gyJ8LM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
export { supabaseUrl };
