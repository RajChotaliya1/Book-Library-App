import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yylraetjyaxtvkskifpz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5bHJhZXRqeWF4dHZrc2tpZnB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNDU5NDAsImV4cCI6MjA2MjYyMTk0MH0.lJw9R-Fsxgz2ELbI_fqmHdNV5vw-oz-DQg7NBYgwejk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
