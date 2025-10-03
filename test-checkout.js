// test-checkout.js
const { chromium } = require('playwright');

(async () => {
  const STORE = process.env.STORE_URL || 'https://store.webbotpro.com';
  const VARIANT_ID = process.env.VARIANT_ID || '44596abc27c7d4ba78c1a43397c6606b:1'; 
  const WAIT_BEFORE_EXIT_MS = 6000;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 🔹 Log kalau ada request ke private_access_tokens
  page.on('request', req => {
    if (req.url().includes('private_access_tokens')) {
      console.log('➡️ Request:', req.method(), req.url());
    }
  });

  page.on('requestfinished', async req => {
    if (req.url().includes('private_access_tokens')) {
      try {
        const res = await req.response();
        const status = res ? res.status() : 'no-response';
        console.log('⬅️ Response:', status, req.url());
      } catch (e) {
        console.log('⬅️ Response: error getting response for', req.url(), e.message);
      }
    }
  });

  page.on('requestfailed', req => {
    if (req.url().includes('private_access_tokens')) {
      console.log('❌ Request failed:', req.method(), req.url(), req.failure()?.errorText);
    }
  });

  // 🔹 Tambahin listener redirect untuk trace kalau checkout dibelokin
  page.on('response', async res => {
    const url = res.url();
    const status = res.status();
    if (status >= 300 && status < 400) {
      const headers = res.headers();
      if (headers['location']) {
        console.log(`🔀 Redirect from ${url} → ${headers['location']}`);
      }
    }
  });

  try {
    console.log('1) Navigating to store root...');
    await page.goto(STORE, { waitUntil: 'domcontentloaded' });

    console.log('2) Adding product to cart via cart URL:', VARIANT_ID);
    await page.goto(`${STORE}/cart/${VARIANT_ID}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    console.log('3) Opening checkout page...');
    await page.goto(`${STORE}/checkout`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const shotPath = 'checkout_page.png';
    await page.screenshot({ path: shotPath, fullPage: true });
    console.log('📸 Screenshot saved:', shotPath);

    console.log('Current URL:', page.url());

    const snippet = await page.locator('body').innerText().catch(() => '');
    console.log('--- page snippet start ---');
    console.log(snippet.slice(0, 1000));
    console.log('--- page snippet end ---');

    await page.waitForTimeout(WAIT_BEFORE_EXIT_MS);

    console.log('✅ Done. Cek log redirect & private_access_tokens di atas.');

  } catch (err) {
    console.error('Script error:', err);
  } finally {
    await browser.close();
  }
})();
