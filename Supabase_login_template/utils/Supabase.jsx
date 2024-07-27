import { createClient } from "@supabase/supabase-js";



const SupabaseUrl = KEY
const SupabaseKey = KEY
const supabase = createClient(SupabaseUrl, SupabaseKey);

export default supabase;


