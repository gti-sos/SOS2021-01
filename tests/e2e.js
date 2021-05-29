const puppeteer = require('puppeteer');
const screenshotPath = './tests/e2e_screenshoots/';

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Especificamos que el navegador no es headless
    slowMo: 1000, // Añadimos un delay de 1 segundo entre cada comando.
  });
  const context = await browser.createIncognitoBrowserContext();
  const page = await browser.newPage();
  await page.setViewport({ width: 3688, height: 1768 });
  //Home
  //https://sos2021-01.herokuapp.com
  await page.goto('http://localhost:10000/', { waitUntil: 'networkidle2' });

  await page.screenshot({ path: screenshotPath + 'HOME_0.png' });

  //Info



  //About



  //Integrations




  //Analytics



  //Natality
  console.log("--Home press interface button to go to natality-stats view--")
  await Promise.all([
    page.waitForNavigation(),
    page.click("body > main > main > div:nth-child(6) > div > div:nth-child(3) > div > div.card-body > a:nth-child(5)"),
  ]);

  await page.screenshot({ path: screenshotPath + 'NAT_0_front_0.png' });

  console.log("Natality press load button.....")

  await page.click("#b_load_toggle");
  await page.screenshot({ path: screenshotPath + 'NAT_1_front_load_0.png' });
  await page.click("#b_load_toggle_ok");
  await page.screenshot({ path: screenshotPath + 'NAT_2_front_load_1.png' });

  console.log(".....Natality load complete")
  await page.screenshot({ path: screenshotPath + 'NAT_3_front_1.png' });

  console.log("--Natality go to next page--");
  await page.click("#pagination_forward");
  await page.screenshot({ path: screenshotPath + 'NAT_4_front_2.png' });

  console.log("--Natality go to previous page--");
  await page.click("#pagination_back");
  await page.screenshot({ path: screenshotPath + 'NAT_5_front_3.png' });


  console.log("--Natality press analytics 1 button => analytics 1 view--");
  
  await Promise.all([
    page.waitForNavigation(),
    await page.click("#nav_nat_analytics"),
    page.waitForSelector('#nav_nat_analytics', { visible: true }),
  ]);

  await page.screenshot({ path: screenshotPath + 'NAT_6_analytics1_0.png' });


  console.log("--Natality press analytics 2 button => analytics 2 view--");
  
  await Promise.all([
    page.waitForNavigation(),
    await page.click("#nav_nat_analytics2"),
    page.waitForSelector('#nav_nat_analytics2', { visible: true }),
  ]);

  await page.screenshot({ path: screenshotPath + 'NAT_7_analytics2_0.png' });

  console.log("--press interface button analytics 2 view => interface view --");
  await Promise.all([
    page.waitForNavigation(),
    page.click("#nav_interface"),
  ]);
  
  await page.screenshot({ path: screenshotPath + 'NAT_8_front_4.png' });


  console.log("Natality insert new stat.....");
  await page.focus('#insert_input_country');
  await page.keyboard.type("moroco");

  await page.focus('#insert_input_date');
  await page.keyboard.type("2019");

  await page.focus('#insert_input_born');
  await page.keyboard.type("1");

  await page.focus('#insert_input_men_born');
  await page.keyboard.type("1");

  await page.focus('#insert_input_women_born');
  await page.keyboard.type("1");

  await page.focus('#insert_input_natality_rate');
  await page.keyboard.type("1");

  await page.focus('#insert_input_fertility_rate');
  await page.keyboard.type("1");

  await page.screenshot({ path: screenshotPath + 'NAT_9_front_insert_0.png' });

  await page.focus('#insert_button');
  await page.click("#insert_button");
  /*await page.evaluate(() => {
    document.querySelector('#insert_button').click();
  });*/
  await page.waitForSelector('#insert_button', { visible: true });
  await page.screenshot({ path: screenshotPath + 'NAT_10_front_insert_1.png' });
  console.log(".....Natality stat inserted");


  console.log("Natality search the new stat.....");
  await page.focus('#query_input_country');
  await page.keyboard.type("moroco");
  await page.focus('#query_input_date');
  await page.keyboard.type("2019");
  await page.screenshot({ path: screenshotPath + 'NAT_11_front_search_0.png' });
  await page.focus('#query_button');
  await page.click("#query_button");
  await page.waitForSelector('#query_button', { visible: true });
  await page.screenshot({ path: screenshotPath + 'NAT_12_front_search_1.png' });
  console.log(".....Natality stat searched");

  console.log("--Natality press moroco edit button => edit stat view--");

  await Promise.all([
    page.waitForNavigation(),
    page.click("#edit_button_moroco_2019"),
    page.waitForSelector('#edit_button_moroco_2019', { visible: true }),
  ]);
  await page.screenshot({ path: screenshotPath + 'NAT_13_edit_natality_stat_0.png' });

  console.log("Natality update moroco 2019 .....");
  await page.focus('#input_update_born');
  await page.$eval("#input_update_born", el => el.value = "");
  await page.keyboard.type("99999");
  await page.screenshot({ path: screenshotPath + 'NAT_14_edit_natality_stat_1.png' });
  await page.focus('#input_update_button');
  await page.click("#input_update_button");
  await page.waitForSelector('#input_update_button', { visible: true }),
    await page.screenshot({ path: screenshotPath + 'NAT_15_edit_natality_stat_2.png' });
  console.log(".....moroco 2019 updated");

  console.log("--edit press back to interface button => natality interface--");
  await Promise.all([
    page.waitForNavigation(),
    page.click("#nav_return"),
  ]);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: screenshotPath + 'NAT_16_front_stat_updated_0.png' });

  console.log("Natality search the updated stat.....");
  await page.focus('#query_input_country');
  await page.keyboard.type("moroco");
  await page.focus('#query_input_date');
  await page.keyboard.type("2019");
  await page.screenshot({ path: screenshotPath + 'NAT_17_front_search_3.png' });
  await page.focus('#query_button');
  await page.click("#query_button");
  await page.waitForSelector('#query_button', { visible: true });
  await page.screenshot({ path: screenshotPath + 'NAT_18_front_search_4.png' });
  console.log(".....Natality stat searched");

  console.log("--Natality press moroco delete button--"); //F


  
  await  page.click("#delete_button_moroco_2019"),
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: screenshotPath + 'NAT_19_front_deleted_natality_stat_0.png' });

  console.log("Natality press delete all button.....")
  await page.click("#b_delete_toggle");
  await page.screenshot({ path: screenshotPath + 'NAT_20_front_delete_0.png' });
  await page.click("#b_delete_toggle_ok");
  await page.screenshot({ path: screenshotPath + 'NAT_21_front_delete_1.png' });

  console.log(".....delete all complete")
  await page.screenshot({ path: screenshotPath + 'NAT_22_front_5.png' });

  console.log("--interface press back to home button => home--");
  await Promise.all([
    page.waitForNavigation(),
    page.click("#nav_home"),
  ]);

  await page.screenshot({ path: screenshotPath + 'HOME_1.png' });

  //Divorce



  //Life




  await page.close();
  await browser.close();
})();
