import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vftmhrgtjdgprgrfkyxj.supabase.co'
const supabaseKey = 'sb_publishable_TR5LDD7h5ZjfYEgvi7HCgQ_HHHldjlN'

export const supabase = createClient(supabaseUrl, supabaseKey)