// Set URL and API Key and rename to environment.ts

export const environment = {
  production: false,
  supabaseUrl: process.env['SUPABASE_URL'] || '',
  supabaseKey: process.env['SUPABASE_KEY']  || '',
}
