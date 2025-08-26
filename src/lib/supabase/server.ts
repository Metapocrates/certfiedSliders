// lib/supabase/server.ts
//--------------------------------------------------------------------------
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr"; // '@supabase/ssr' for App Router


export function createSupabaseServer() {
    const cookieStore = cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: any) {
                    try { cookieStore.set({ name, value, ...options }); } catch { }
                },
                remove(name: string, options: any) {
                    try { cookieStore.set({ name, value: "", ...options }); } catch { }
                },
            },
        }
    );
}