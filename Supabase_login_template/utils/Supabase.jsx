import { createClient } from "@supabase/supabase-js";



const SupabaseUrl = "https://jgikuxzyfsenajscnvau.supabase.co"
const SupabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnaWt1eHp5ZnNlbmFqc2NudmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2NjY3OTAsImV4cCI6MjAxMTI0Mjc5MH0.ljjM1THnw1MbaxvU0OZq_Fhx-cVwn-X8MoV8tXiyAxU"

const supabase = createClient(SupabaseUrl, SupabaseKey);

export default supabase;


