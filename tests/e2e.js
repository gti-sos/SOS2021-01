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

  await page.screenshot({ path: screenshotPath + 'Home_0.png' });

  //Info



  //About



  //Integrations




  //Analytics



  //Natality
  console.log("Home press interface button")
  const [response] = await Promise.all([
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
  
    console.log("Natality go to next page.....");
    await page.click("#pagination_forward");
    await page.screenshot({ path: screenshotPath + 'NAT_4_front_2.png' });
  
    console.log("Natality go to previous page.....");
    await page.click("#pagination_back");
    await page.screenshot({ path: screenshotPath + 'NAT_5_front_3.png' });
  
  //No funciona
  page.on('pageerror', (err) => {
    console.error(err);
  });

    console.log("Natality insert new stat.....");
    await page.$eval('#insert_input_country', el => el.value ="moroco");
    await page.$eval('#insert_input_date', el => el.value = "2019");
    await page.$eval('#insert_input_born',el => el.value = "1");
    await page.$eval('#insert_input_men_born', el => el.value = "1");
    await page.$eval('#insert_input_women_born', el => el.value ="1");
    await page.$eval('#insert_input_natality_rate', el => el.value = "1");
    await page.$eval('#insert_input_fertility_rate',el => el.value =  "1");
    await page.screenshot({ path: screenshotPath + 'NAT_6_front_insert_0.png' });
    await page.waitForTimeout(2000);
    await page.click("#insert_button");
    await page.waitForTimeout(2000);
    await page.screenshot({ path: screenshotPath + 'NAT_7_front_insert_1.png' });
    console.log(".....Natality stat inserted");
  


    console.log("Natality search the new stat.....");
    await page.$eval('#query_input_country', data => data.value='moroco')
    await page.$eval('#query_input_date', data => data.value='2019')
    await page.screenshot({ path: screenshotPath + 'NAT_8_front_search_0.png' });
    await page.waitForTimeout(1000);
    await page.click("#query_button");
    
    await page.waitForTimeout(5000);
  
    await page.screenshot({ path: screenshotPath + 'NAT_9_front_search_1.png' });
    console.log(".....Natality stat searched");
  
  console.log("Natality press edit button in new stat row");

  const [response1] = await Promise.all([
    page.waitForNavigation(),
    page.click("#edit_button_moroco_2019"),
  ]);
  await page.screenshot({ path: screenshotPath + 'NAT_10_edit_natality_stat_0.png' });

  console.log("Natality update moroco 2019 .....");

  await page.$eval('#input_update_born', data => data.value = 99999)
  await page.screenshot({ path: screenshotPath + 'NAT_11_edit_natality_stat_1.png' });
  await page.click("#input_update_button");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: screenshotPath + 'NAT_11_edit_natality_stat_2.png' });
  const [response2] = await Promise.all([
    page.waitForNavigation(),
    page.click("#nav_return"),
  ]);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: screenshotPath + 'NAT_12_front_stat_updated_0.png' });

  console.log("Natality press delete all button")
 
   await page.click("#b_delete_toggle");
   await page.screenshot({ path: screenshotPath + 'NAT_front_delete_0.png' });
   await page.click("#b_delete_toggle_ok");
   await page.screenshot({ path: screenshotPath + 'NAT_front_delete_1.png' });
 
   console.log("Natality delete all complete")
   await page.screenshot({ path: screenshotPath + 'NAT_front_5.png' });
 
   await page.click("#nav_home");

  //Divorce
  console.log("Home press divorce interface button")
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click(document.querySelector("body > main > main > div:nth-child(6) > div > div:nth-child(1) > div > div.card-body > a:nth-child(5) > button")),
  ]);
 
    await page.screenshot({ path: screenshotPath + 'DIV_0_front_0.png' });
  
    console.log("divorce press load button.....")
  
    await page.click("body > main > main > ul > li:nth-child(2) > a");
    await page.screenshot({ path: screenshotPath + 'DIV_1_front_load_0.png' });

    await page.click("body > main > main > ul > li:nth-child(2) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");
    await page.screenshot({ path: screenshotPath + 'DIV_front_load_1.png' });
  
    console.log(".....Divorce stats load complete")
    await page.screenshot({ path: screenshotPath + 'DIV_3_front_1.png' });
  
    console.log("Divorce go to next page.....");
    await page.click("#pagination_forward");
    await page.screenshot({ path: screenshotPath + 'DIV_4_front_2.png' });
  
    console.log("Divorce go to previous page.....");
    await page.click("#pagination_back");
    await page.screenshot({ path: screenshotPath + 'DIV_5_front_3.png' });
  
  //No funciona
  page.on('pageerror', (err) => {
    console.error(err);
  });

    console.log("Divorce insert new stat.....");
    await page.$eval('#insert_input_country', el => el.value ="Rusia");
    await page.$eval('#insert_input_date', el => el.value = "2013");
    await page.$eval('#insert_input_marriage_rate',el => el.value = "1");
    await page.$eval('#insert_input_divorce_rate', el => el.value = "1");
    await page.$eval('#insert_input_ratio_actual', el => el.value ="1");
    await page.$eval('insert_input_ratio_percent', el => el.value = "1");
    await page.screenshot({ path: screenshotPath + 'DIV_6_front_insert_0.png' });
    await page.waitForTimeout(2000);
    await page.click("#insert_button");
    await page.waitForTimeout(2000);
    await page.screenshot({ path: screenshotPath + 'NAT_7_front_insert_1.png' });
    console.log(".....divorce stat inserted");
  


    console.log("Divorce search the new stat.....");
    await page.$eval('#insert_input_country', data => data.value='Rusia')
    await page.$eval('#insert_input_date', data => data.value='2013')
    await page.screenshot({ path: screenshotPath + 'DIV_8_front_search_0.png' });
    await page.waitForTimeout(1000);
    await page.click("#search_button");
    
    await page.waitForTimeout(5000);
  
    await page.screenshot({ path: screenshotPath + 'DIV_9_front_search_1.png' });
    console.log(".....Divorce stat searched");
  
  console.log("Divorce press edit button in new stat row");

  const [response1] = await Promise.all([
    page.waitForNavigation(),
    page.click("#body > main > main > table > tbody > tr:nth-child(2) > td:nth-child(7) > a > button"),
  ]);
  await page.screenshot({ path: screenshotPath + 'DIV_10_edit_divorce_stat_0.png' });

  console.log("Divorce update Rusia 2013 .....");

  await page.$eval('#insert_input_update_marriage_rate', data => data.value = 666)
  await page.screenshot({ path: screenshotPath + 'DIV_11_edit_divorce_stat_1.png' });
  await page.click("#input_update_button");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: screenshotPath + 'DIV_11_edit_divorce_stat_2.png' });
  



  
  const [response2] = await Promise.all([
    page.waitForNavigation(),
    page.click("body > main > main > ul > li > a"),
  ]);
  await page.waitForTimeout(2000);
  await page.$eval('#insert_input_country', data => data.value='Rusia')
  await page.$eval('#insert_input_date', data => data.value='2013')
  await page.screenshot({ path: screenshotPath + 'DIV_12_edit_divorce_stat_2.png' });
  await page.click("#search_button");
  await page.screenshot({ path: screenshotPath + 'DIV_13_front_stat_updated_0.png' });

  console.log("Divorce press delete all button")
 
   await page.click("body > main > main > ul > li:nth-child(3) > a"); //BORRAR TODOS LOS DATOS 
   await page.screenshot({ path: screenshotPath + 'DIV_front_delete_0.png' });
   await page.click("body > main > main > ul > li:nth-child(3) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-danger");
   await page.screenshot({ path: screenshotPath + 'DIV_front_delete_1.png' });
 
   console.log("Natality delete all complete")
 


  //Life




  await page.close();
  await browser.close();
})();
