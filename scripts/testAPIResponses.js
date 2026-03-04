/**
 * API Response Structure Verification
 * Tests that all CMS API endpoints return data in standardized format
 */

import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5000/api/cms-items';

const endpoints = [
  { name: 'Projects', url: '/projects/items' },
  { name: 'Testimonials', url: '/testimonials/items' },
  { name: 'Special Offers', url: '/special-offers/items' },
  { name: 'Leadership', url: '/leadership/items' },
  { name: 'Why Choose Us', url: '/why-choose/items' },
  { name: 'Location Cards', url: '/location-cards/items' },
  { name: 'Footer Items', url: '/footer/items' },
];

async function testEndpoint(name, url) {
  try {
    const response = await fetch(API_BASE + url);
    const json = await response.json();
    
    const hasData = json.data !== undefined && Array.isArray(json.data);
    const itemCount = hasData ? json.data.length : 0;
    
    console.log(`${hasData ? '✅' : '❌'} ${name.padEnd(20)} | Items: ${itemCount} | Has 'data' key: ${hasData}`);
    
    if (hasData && itemCount > 0) {
      const firstItem = json.data[0];
      const keys = Object.keys(firstItem).filter(k => !k.startsWith('_') && k !== '__v');
      console.log(`   Fields: ${keys.slice(0, 5).join(', ')}${keys.length > 5 ? '...' : ''}`);
    }
    
    return hasData;
  } catch (error) {
    console.log(`❌ ${name.padEnd(20)} | Error: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('        CMS API RESPONSE STRUCTURE TEST');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  const results = [];
  
  for (const endpoint of endpoints) {
    const passed = await testEndpoint(endpoint.name, endpoint.url);
    results.push({ name: endpoint.name, passed });
    console.log(''); // blank line
  }
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('                      SUMMARY');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  
  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${total - passed}/${total}\n`);
  
  if (passed === total) {
    console.log('🎉 All endpoints return data in standardized format!');
    console.log('   Admin CMS should now display all items correctly.\n');
  } else {
    console.log('⚠️  Some endpoints need fixing:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`   - ${r.name}`);
    });
    console.log('');
  }
  
  console.log('═══════════════════════════════════════════════════════════\n');
}

runTests();
