const chromium = require('chrome-aws-lambda');
const index = require('./index');
let result = null;
let browser = null;

exports.hello = async (event, context) => {
  try {
    browser = await index.getBrowser(chromium);
  } catch (error) {
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
exports.detail = async (event, context) => {
  try {
    browser = await index.getBrowser(chromium);
  } catch (error) {
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