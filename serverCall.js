import puppeteer from 'puppeteer';
import * as fs  from 'fs';

function wait(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
} 
(async () => {
  // Launch the browser and open a new blank page
  const writeStream = fs.createWriteStream('logServerCall.log', { flags: 'w' });
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
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
//  await page.setViewport({ width: 1280, height: 720 });

//    const url = 'https://192.168.1.47:8181'

   const url = 'https://cambdoorbell.duckdns.org'
//  const url = 'chrome://settings/content/camera'
//   const url = 'chrome://settings/content/microphone'  

// Navigate the page to a URL
  console.log('let us get URL')
  await page.goto(url);
  console.log('Now have URL')
  await page.waitForSelector('.call-div');
  page.on('console', msg => {
     console.log('PAGE LOG:', msg.text());
     writeStream.write(msg.text()+'\n');
  });
  const html = await page.content();

  await wait( 1000)
  
  const grant_status = await page.evaluate(async () => {
    return (await navigator.permissions.query({name: 'microphone'})).state;
  });

  console.log('Granted:', grant_status);
  await page.$eval('.call-div', el => el.click());
  console.log('clicking')

  await wait(10000)
//  await page.screenshot({
//     path: '/home/pi/vue3-doorbell-receiver/src/assets/screenshot.jpg'
//  });
//  console.log('taking screenshot');
//  await wait( 300000)
  
  // Print the full title
//  console.log(results);
//  console.log('closing browser')
//  await browser.close();
//  writeStream.end();
})();
