import puppeteer from 'puppeteer';

function wait(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
} 
(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: [
       "--mute-audio",
    ],
    args: [
       "--no-sandbox",
       "--autoplay-policy=no-user-gesture-required",
       "--use-fake-ui-for-media-stream"
    ],
    executablePath: '/usr/bin/chromium'
  });
  const page = await browser.newPage();
  

  const url = 'https://assets.cambdoorbell.duckdns.org/assets/1-WaitMsg-831479.mp3'
  // Navigate the page to a URL
  await page.goto(url);
    await page.locator('video').wait();
//  await page.waitForSelector('.label');
    const duration = await page.$eval('video', (el) => el.duration)
    console.log('duration is '+duration+'s');
    await page.$eval('video', (el) => el.play())
    await wait(duration * 1000)
//  const results = await page.$$eval('.label', rows => {
//     return rows;
//  })
  
  // Print the full title
//  console.log(results);

  await browser.close();
})();
