/*jshint esversion: 6 */


// const chromium = require('chrome-aws-lambda');

async function getBrowser(chromium) {

  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true
    })
  }
  catch(err) {
    console.log(err);
  }

  return browser;
}


async function main(browser) {
  const CREDS = require('./.creds');
  // dom element selectors
  const USERNAME_SELECTOR = '#swpm_user_name';
  const PASSWORD_SELECTOR = '#swpm_password';
  const BUTTON_SELECTOR = '#swpm-login-form > div > div.swpm-login-submit > input';

  var page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

  // await page.setViewport({ width: 920, height: 3500 });
  await page.goto('https://sellthelandnow.com/membership-login/');

  await page.click(USERNAME_SELECTOR);

  await page.keyboard.type(CREDS.username);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);

  // await page.waitForNavigation({ waitUntil: 'load' });
  await page.click(BUTTON_SELECTOR);
  await page.waitFor(5000);
  // await page.goto('https://example.org/', { waitUntil: 'networkidle0' });

  const TABLE_ROW_SELECTOR = '.gv-container.gv-container-133 > table > tbody > tr';
  const TABLE_HEAD_SELECTOR = '.gv-container-133 > table > thead > tr'
  // const TABLE_HEAD_SELECTOR = '//th[contains(@id,"gv-field")]/@data-label';
  // #gv-field-1-99\.1
  // await page.screenshot({ path: 'example.png' });

  var head = await page.$$eval(TABLE_HEAD_SELECTOR, rows => {
    return Array.from(rows, row => {
      const columns = row.querySelectorAll('th');
      return Array.from(columns, column => column.innerText);
    });
  });


  var body = await page.$$eval(TABLE_ROW_SELECTOR, rows => {
    return Array.from(rows, row => {
      const columns = row.querySelectorAll('td');
      return Array.from(columns, column => column.innerText);
    });
  });

  // console.log(result[1][2]); // "C2"
  await browser.close();

  console.log(head); // "C2"
  console.log(body); // "C2"


  var obj_arr = [];
  var keys = head[0];
  for (let index = 0; index < body.length; index++) {
    var row = body[index];
    var obj = {};
    for (let i = 0; i < keys.length; i++) {
      var k = keys[i];
      obj[k] = row[i];
      console.log(obj);

    }
    obj_arr.push(obj);

  };

  console.log(obj_arr);
  return obj_arr;

  // })().catch(e => { console.error(e) });
  // })().catch(e => { console.error(e) });
  // }.catch(e => { console.error(e) });
};
// })().catch(e => { console.error(e) });

// main().catch(e => { console.error(e) });



module.exports.main = main;
module.exports.getBrowser = getBrowser;
