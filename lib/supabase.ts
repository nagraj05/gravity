import { createClient } from '@supabase/supabase-js'
import { useAuth } from '@clerk/nextjs'
import { useCallback, useMemo } from 'react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function useSupabaseClient() {
  const { getToken } = useAuth()

  const getAuthenticatedClient = useCallback(async () => {
    const token = await getToken({ template: 'supabase' })
    
    // If no token, return the public client (anon key only)
    if (!token) {
      return supabase
    }

    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
  }, [getToken])

  return useMemo(() => ({ getAuthenticatedClient }), [getAuthenticatedClient])
}