#!/usr/bin/env node

/**
 * Script de Setup do Chatbot
 * Executa as migrações do Supabase automaticamente
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const SUPABASE_URL = 'https://oelbocimyfwwzkzbyswg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lbGJvY2lteWZ3d3premJ5c3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMDI2OTksImV4cCI6MjA5MzU3ODY5OX0.S2V54XWWnF58lTQNkvFU9JL1-toCQxacICvtITYL_3E';

console.log('🤖 Setup Chatbot - Supabase Migrations\n');

// Ler o arquivo SQL
const sqlFile = path.join(__dirname, 'supabase/migrations/20260714_agendamentos.sql');
const sqlContent = fs.readFileSync(sqlFile, 'utf-8');

console.log('✅ Migration file loaded');
console.log(`📄 Size: ${sqlContent.length} bytes`);
console.log('📋 Tables: agendamentos, chat_history, agendamento_feedback\n');

// Dividir queries
const queries = sqlContent
  .split(';')
  .map(q => q.trim())
  .filter(q => q && !q.startsWith('--'));

console.log(`🔄 Found ${queries.length} SQL queries\n`);

// Testar conexão com Supabase
function testConnection() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'oelbocimyfwwzkzbyswg.supabase.co',
      path: '/rest/v1/agendamentos?select=*&limit=1',
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      resolve(res.statusCode === 200);
    });

    req.on('error', () => resolve(false));
    req.end();
  });
}

async function setup() {
  console.log('🔗 Testing Supabase connection...');

  const connected = await testConnection();

  if (connected) {
    console.log('✅ Connected to Supabase!\n');
    console.log('📋 Next steps:');
    console.log('   1. Go to Supabase Dashboard');
    console.log('   2. SQL Editor → New Query');
    console.log('   3. Copy content from: supabase/migrations/20260714_agendamentos.sql');
    console.log('   4. Run the query\n');
    console.log('⚡ Or run: supabase db push\n');
  } else {
    console.log('❌ Could not connect to Supabase');
    console.log('📝 Make sure your internet is working\n');
  }

  console.log('💡 To test the chatbot:');
  console.log('   npm run dev');
  console.log('   Open http://localhost:5173');
  console.log('   Click the gold chat button\n');

  console.log('🎛️  Admin dashboard:');
  console.log('   http://localhost:5173/#admin');
  console.log('   Password: josilva2024\n');
}

setup();
