import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';

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
       "--allowAutoCapture",
       "--use-fake-ui-for-media-stream"
    ],
    executablePath: '/usr/bin/chromium'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

//  const url = 'https://192.168.1.47:8181'

   const url = 'https://intercom.cambdoorbell.duckdns.org'
//  const url = 'chrome://settings/content/camera'
//   const url = 'chrome://settings/content/microphone'  

// Navigate the page to a URL
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.waitForSelector('#call');
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  const html = await page.content();
  await fs.writeFile('saved.html', html);
  console.log(`The HTML has been saved`);

  await wait( 1000)
  
  const grant_status = await page.evaluate(async () => {
    return (await navigator.permissions.query({name: 'microphone'})).state;
  });


  console.log('Granted:', grant_status);
  await page.$eval('#call', el => el.click());

  await wait(10000)
  await page.screenshot({
     path: '/home/pi/vue3-doorbell-receiver/src/assets/screenshot.jpg'
  });
  console.log('taking screenshot');
  await wait( 30000)
//  const results = await page.$$eval('.label', rows => {
//     return rows;
//  })
  
  // Print the full title
//  console.log(results);
  console.log('closing browser')
  await browser.close();
})();
