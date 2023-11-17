import {createClient} from '@supabase/supabase-js'


const URL = "https://sifzwlyaemercwatbyvc.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpZnp3bHlhZW1lcmN3YXRieXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0ODQ0MjYsImV4cCI6MjAxNTA2MDQyNn0.OaybCKuMTDwKuJulAm-lNrMY_ms3Lv1uLFvX1Qvfcqk"
export const supabase = createClient(URL, API_KEY);