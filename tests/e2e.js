const puppeteer = require('puppeteer');
const screenshotPath = './tests/e2e_screenshoots/';

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Especificamos que el navegador no es headless
    slowMo: 1000 // Añadimos un delay de 1 segundo entre cada comando.
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080});
  //Home
  await page.goto('https://sos2021-01.herokuapp.com');

  await page.screenshot({ path: screenshotPath + 'Home_0.png' });

  //Info



  //About



  //Integrations




  //Analytics



  //Natality
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click("body > main > main > div:nth-child(6) > div > div:nth-child(3) > div > div.card-body > a:nth-child(5)"),
  ]);

  await page.screenshot({ path: screenshotPath + 'NAT_front_0.png' });



  //Divorce



  //Life




  await page.close();
  await browser.close();
})();
