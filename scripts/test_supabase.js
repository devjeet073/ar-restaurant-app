const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Read .env.local
const env = fs.readFileSync('.env.local', 'utf8')
  .split('\n')
  .map(l => l.trim())
  .filter(l => l && !l.startsWith('#'))
  .reduce((acc, line) => {
    const idx = line.indexOf('=');
    if (idx > 0) {
      const key = line.slice(0, idx);
      const val = line.slice(idx+1);
      acc[key] = val;
    }
    return acc;
  }, {});

const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('Missing supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(url, key);

(async () => {
  try {
    console.log('Testing Supabase URL:', url);
    const { data, error, status } = await supabase
      .from('restaurants')
      .select('*')
      .limit(5);

    if (error) {
      console.error('Error fetching restaurants:', error);
      process.exit(2);
    }

    console.log('Status:', status);
    console.log('Data:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(3);
  }
})();
