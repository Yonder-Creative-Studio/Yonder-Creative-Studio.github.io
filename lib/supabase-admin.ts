import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 使用 service_role key 可以在伺服器端繞過 RLS 權限直接上傳檔案
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);