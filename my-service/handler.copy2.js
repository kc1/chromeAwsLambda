const chromium = require('chrome-aws-lambda');
const index = require('./index');

// exports.hello = async (event, context, callback) => {
// exports.hello = async (event, context, callback) => {
exports.hello = async (event, context) => {
  let result = null;
  let browser = null;


  try {

   browser = await index.getBrowser(chromium);
    //   browser = await chromium.puppeteer.launch({
    //     args: chromium.args,
    //     // ignoreDefaultArgs: ['--disable-extensions'],

    //     defaultViewport: chromium.defaultViewport,
    //     executablePath: await chromium.executablePath,
    //     headless: chromium.headless,
    //     ignoreHTTPSErrors: true,

    // }

    // let page = await browser.newPage();
    // await page.goto(event.url || 'https://google.com');
    // result = await page.title();

  } catch (error) {
    // return callback(error);
    return error;
  } finally {
    if (browser !== null) {

      result = await index.main(browser);
      await browser.close();
    }
    console.log('finished');
  }

  // return callback(null, result);
  // return result;
  return { statusCode: 200, body: JSON.stringify(result) };
  // return { statusCode: 200 };

// exports.hello().catch(e => { console.error(e) });
};