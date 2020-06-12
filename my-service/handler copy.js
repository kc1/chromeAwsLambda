'use strict';

  const chromium = require('chrome-aws-lambda');
  const os = require('os');
  // let myPath = null;


  // if (os.platform == 'win32') {
  //   myPath = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
  // } else {
  //   mypath = async function getPath() { return await chromium.executablePath; }
  //   // myPath = chromium.executablePath;
  //   console.log(myPath);
  // }


exports.hello = async (event, context, callback) => {
  let result = null;
  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      // ignoreDefaultArgs: ['--disable-extensions'],
      // args: ['--no-sandbox', '--disable-setuid-sandbox'],
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      // executablePath: myPath,
      headless: chromium.headless,
      // headless: false,
      ignoreHTTPSErrors: true,
    });

    let page = await browser.newPage();

    await page.goto(event.url || 'https://google.com');

    result = await page.title();
  } catch (error) {
    return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return callback(null, result);
};
