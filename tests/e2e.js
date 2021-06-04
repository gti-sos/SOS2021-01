const puppeteer = require('puppeteer');
const screenshotPath = './tests/e2e_screenshoots/';
var counter=0;
(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Especificamos que el navegador no es headless
    slowMo: 1000, // Añadimos un delay de 1 segundo entre cada comando.
  });
  const context = await browser.createIncognitoBrowserContext();
  const page = await browser.newPage();
  await page.setViewport({ width: 3688, height: 1768 });
  

  await page.goto('https://sos2021-01.herokuapp.com', { waitUntil: 'networkidle2' });

  console.log("--Home page--");
  await page.screenshot({ path: screenshotPath + (counter++) +'_HOME.png' });

  //Info
  console.log("--Info page--");
  await page.click("#nav_info");
  await page.screenshot({ path: screenshotPath + (counter++) +'_INFO.png' });

  //About
  console.log("--About page--");
  await page.click("body > main > main > ul > li:nth-child(5)");
  await page.screenshot({ path: screenshotPath + (counter++) +'_ABOUT_US.png' });



  //Analytics
  
  //cargamos los datos de cada API primero 

  await page.click("#nav_home"),

  console.log("Loading data.....");
  await page.click("body > main > main > div:nth-child(5) > div > div:nth-child(3) > div > div.card-body > a:nth-child(5) > button"),
  await page.click("#b_load_toggle");
  await page.click("#b_load_toggle_ok");
  await page.click("#nav_home"),


  await page.click("body > main > main > div:nth-child(5) > div > div:nth-child(1) > div > div.card-body > a:nth-child(5) > button");
  await page.click("body > main > main > ul > li:nth-child(2) > a");
  await page.click("body > main > main > ul > li:nth-child(2) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");
  await page.click("body > main > main > ul > li:nth-child(1) > a"),

  await page.click(" body > main > main > div:nth-child(5) > div > div:nth-child(2) > div > div.card-body > a:nth-child(5) > button");
  await page.click("body > main > main > div:nth-child(3) > main > div > button.btn.btn-outline-primary");
  await page.click("body > main > main > div.nav.svelte-1xdzfq5 > ul > li:nth-child(1) > a");
  
  //una vez cargados los datos capturamos
  console.log(".....data loaded");

  console.log("--Analytics page--");
  await page.click("body > main > main > ul > li:nth-child(3)");
  await page.screenshot({ path: screenshotPath + (counter++) +'_ANALYTICS_VIEW.png' });
  

  //Integrations
  console.log("--Integrations page--");
  await page.click("body > main > main > ul > li:nth-child(4)");
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_VIEW.png' });

  //Natality
  await page.click("body > main > main > div:nth-child(3) > div > div.card-body > a:nth-child(3) > button");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_NAT_RESTCOUNTRIES.png' });

  await page.click("#nav_coinCap");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_NAT_COINCAP.png' });

  await page.click("#nav_vatRates");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_NAT_VATRATES.png' });

  await page.click("#nav_sanityStats");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_NAT_SANITY-STATS.png' });

  await page.click("#nav_platformsStats");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_NAT_PLATFORMS-STATS.png' });

  await page.click("#nav_povertyRisks");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_NAT_POVERTY-RISKS.png' });

  await page.click("#nav_illiteracy");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_NAT_ILLITERACY.png' });

  await page.click("#nav_chidrenHIV");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_NAT_CHIDLREN-HIV.png' });

  await page.click("#nav_childrenEmployment");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_NAT_CHIDLREN-EMPLOYMENT.png' });

  await page.click("#nav_unemployment");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_NAT_UNEMPLOYMENT.png' });

  await page.click("#nav_integrations");

  //Divorce
  await page.click("body > main > main > div:nth-child(5) > div > div.card-body > a:nth-child(3) > button");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_DIV_BREAKING-BAD.png' });
  await page.click("body > main > main > ul > li:nth-child(2) > a");

  await page.click("body > main > main > div:nth-child(5) > div > div.card-body > a:nth-child(4) > button");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_DIV_RICK.png' });
  await page.click("body > main > main > ul > li:nth-child(2) > a");

  await page.click("body > main > main > div:nth-child(5) > div > div.card-body > a:nth-child(5) > button");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_DIV_AIR-POLLUTION.png' });
  await page.click("body > main > main > ul > li:nth-child(2) > a");

  await page.click("body > main > main > div:nth-child(5) > div > div.card-body > a:nth-child(6) > button");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_DIV_FOOD.png' });
  await page.click("body > main > main > ul > li:nth-child(2) > a");

  await page.click("body > main > main > div:nth-child(5) > div > div.card-body > a:nth-child(7) > button");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_DIV_OBESITY.png' });
  await page.click("body > main > main > ul > li:nth-child(2) > a");

  await page.click("body > main > main > div:nth-child(5) > div > div.card-body > a:nth-child(8) > button");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_DIV_STAR-WARS.png' });
  await page.click("body > main > main > ul > li:nth-child(2) > a");

  await page.click("body > main > main > div:nth-child(5) > div > div.card-body > a:nth-child(9) > button");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_DIV_RENTING.png' });
  await page.click("body > main > main > ul > li:nth-child(2) > a");

  //Life
  await page.click("body > main > main > div:nth-child(4) > div > div.card-body > a:nth-child(3) > button");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_LIFE_COVID.png' });
  await page.click("body > main > main > ul > li:nth-child(2) > a");

  await page.click("body > main > main > div:nth-child(4) > div > div.card-body > a:nth-child(4) > button");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_LIFE_RENEWABLE.png' });
  await page.click("body > main > main > ul > li:nth-child(2) > a");
  
  await page.click("body > main > main > div:nth-child(4) > div > div.card-body > a:nth-child(5) > button");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_LIFE_CHILDREN.png' });
  await page.click("body > main > main > ul > li:nth-child(2) > a");

  await page.click("body > main > main > div:nth-child(4) > div > div.card-body > a:nth-child(6) > button");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_LIFE_.png' });
  await page.click("body > main > main > ul > li:nth-child(2) > a");

  await page.click("body > main > main > div:nth-child(4) > div > div.card-body > a:nth-child(7) > button");
  await page.waitForTimeout(10000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_INTEGRATIONS_LIFE_EDUCATION.png' });
  await page.click("body > main > main > ul > li:nth-child(2) > a");

  await page.click("#nav_home");

  //volvemos a vaciar las APIS
  console.log("erasing data.....");
  await page.click("body > main > main > ul > li:nth-child(1)"),
  await page.click("body > main > main > div:nth-child(5) > div > div:nth-child(3) > div > div.card-body > a:nth-child(5) > button"),
  await page.click("#b_delete_toggle");
  await page.click("#b_delete_toggle_ok");

  await page.click("#nav_home"),
  await page.click("body > main > main > div:nth-child(5) > div > div:nth-child(1) > div > div.card-body > a:nth-child(5) > button");
  await page.click("body > main > main > ul > li:nth-child(3) > a"); //BORRAR TODOS LOS DATOS 
  await page.click("body > main > main > ul > li:nth-child(3) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-danger");

  await page.click("body > main > main > ul > li:nth-child(1) > a"),
  await page.click("body > main > main > div:nth-child(5) > div > div:nth-child(2) > div > div.card-body > a:nth-child(5) > button"),
  await page.click("body > main > main > div:nth-child(3) > main > div > button.btn.btn-outline-danger"),
  await page.click("body > main > main > div.nav.svelte-1xdzfq5 > ul > li:nth-child(1) > a"),
  console.log(".....data erased");


  //Natality
  console.log("--Home press interface button to go to natality-stats view--")
  
  await page.click("body > main > main > div:nth-child(5) > div > div:nth-child(3) > div > div.card-body > a:nth-child(5) > button"),
  

  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_0.png' });

  console.log("Natality press load button.....")

  await page.click("#b_load_toggle");
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_1_front_load_0.png' });
  await page.click("#b_load_toggle_ok");
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_load_1.png' });

  console.log(".....Natality load complete")
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_1.png' });

  console.log("--Natality go to next page--");
  await page.click("#pagination_forward");
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_2.png' });

  console.log("--Natality go to previous page--");
  await page.click("#pagination_back");
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_3.png' });


  console.log("--Natality press analytics 1 button => analytics 1 view--");


  await page.click("#nav_nat_analytics"),
  await page.waitForSelector('#nav_nat_analytics', { visible: true }),


  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_analytics1_0.png' });


  console.log("--Natality press analytics 2 button => analytics 2 view--");


  
  await page.click("#nav_nat_analytics2"),
  await page.waitForSelector('#nav_nat_analytics2', { visible: true }),


  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_analytics2_0.png' });

  console.log("--press interface button analytics 2 view => interface view --");

  
  await page.click("#nav_interface"),


  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_4.png' });


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

  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_insert_0.png' });

  await page.focus('#insert_button');
  await page.click("#insert_button");
  
  await page.waitForSelector('#insert_button', { visible: true });
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_insert_1.png' });
  console.log(".....Natality stat inserted");


  console.log("Natality search the new stat.....");
  await page.focus('#query_input_country');
  await page.keyboard.type("moroco");
  await page.focus('#query_input_date');
  await page.keyboard.type("2019");
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_search_0.png' });
  await page.focus('#query_button');
  await page.click("#query_button");
  await page.waitForSelector('#query_button', { visible: true });
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_search_1.png' });
  console.log(".....Natality stat searched");

  console.log("--Natality press moroco edit button => edit stat view--");


  
  await page.click("#edit_button_moroco_2019"),
  

  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_edit_natality_stat_0.png' });

  console.log("Natality update moroco 2019 .....");
  await page.focus('#input_update_born');
  await page.$eval("#input_update_born", el => el.value = "");
  await page.keyboard.type("99999");
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_edit_natality_stat_1.png' });
  await page.focus('#input_update_button');
  await page.click("#input_update_button");
  await page.waitForSelector('#input_update_button', { visible: true }),
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_edit_natality_stat_2.png' });
  console.log(".....moroco 2019 updated");

  console.log("--edit press back to interface button => natality interface--");
  
  
  await page.click("#nav_return"),

  await page.waitForTimeout(2000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_stat_updated_0.png' });

  console.log("Natality search the updated stat.....");
  await page.focus('#query_input_country');
  await page.keyboard.type("moroco");
  await page.focus('#query_input_date');
  await page.keyboard.type("2019");
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_search_3.png' });
  await page.focus('#query_button');
  await page.click("#query_button");
  await page.waitForSelector('#query_button', { visible: true });
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_search_4.png' });
  console.log(".....Natality stat searched");

  console.log("--Natality press moroco delete button--");

  await page.click("#delete_button_moroco_2019"),
  await page.waitForTimeout(1000);

  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_deleted_natality_stat_0.png' });

  console.log("Natality press delete all button.....")
  await page.click("#b_delete_toggle");
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_delete_0.png' });
  await page.click("#b_delete_toggle_ok");
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_delete_1.png' });

  console.log(".....delete all complete")
  await page.screenshot({ path: screenshotPath + (counter++) +'_NAT_front_5.png' });

  console.log("--interface press back to home button => home--");
  
  await page.click("#nav_home"),

  await page.screenshot({ path: screenshotPath + (counter++) +'_HOME_1.png' });

  //Divorce
  console.log("Home press divorce interface button");
  
  
  await page.click("body > main > main > div:nth-child(5) > div > div:nth-child(1) > div > div.card-body > a:nth-child(5) > button");

  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_front_0.png' });

  console.log("divorce press load button.....")

  await page.click("body > main > main > ul > li:nth-child(2) > a");
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_front_load_0.png' });

  await page.click("body > main > main > ul > li:nth-child(2) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_front_load_1.png' });

  console.log(".....Divorce stats load complete")
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_data_load_1.png' });


  console.log("Divorce go to next page.....");
  await page.click("#pagination_forward");
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_next_page_2.png' });

  console.log("Divorce go to previous page.....");
  await page.click("#pagination_back");
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_back_page_3.png' });


  console.log("divorce line analityc")
    //como se queda pillado entro y salgo varias veces 
    await page.click("#nav_div_analytics"),
    await  page.click("body > main > main > ul > li:nth-child(2) > a"),
    await page.click("#nav_div_analytics"),
    await  page.click("body > main > main > ul > li:nth-child(2) > a"),
    await page.click("#nav_div_analytics"), 

  await page.waitForTimeout(2000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_line_analytic.png' });

  console.log("come back to the interface");

  await  page.click("body > main > main > ul > li:nth-child(2) > a"),


  console.log("divorce lollipop analityc");
  //como se queda pillado entro y salgo varias veces 
  await page.click("#nav_div_analytics2"),
  await  page.click("body > main > main > ul > li:nth-child(2) > a"),
  await page.click("#nav_div_analytics2"),
  await  page.click("body > main > main > ul > li:nth-child(2) > a"),
  await page.click("#nav_div_analytics2"),
  
  await page.waitForTimeout(2000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_lollipop_analytic.png' });

  console.log("come back to the interface");

  await  page.click("body > main > main > ul > li:nth-child(2) > a"),

  console.log("divorce donut analityc")
    //como se queda pillado entro y salgo varias veces 
    await page.click("#nav_div_analytics3"),
    await  page.click("body > main > main > ul > li:nth-child(2) > a"),
    await page.click("#nav_div_analytics"),
    await  page.click("body > main > main > ul > li:nth-child(2) > a"),
    await page.click("#nav_div_analytics"), 

  await page.waitForTimeout(2000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_donut_analytic.png' });

  console.log("come back to the interface");

  await  page.click("body > main > main > ul > li:nth-child(2) > a"),
 

  console.log("Divorce insert new stat.....");
  await page.focus('#insert_input_country');
  await page.keyboard.type("Rusia");

  await page.focus('#insert_input_date');
  await page.keyboard.type("2013");

  await page.focus('#insert_input_marriage_rate');
  await page.keyboard.type("1");

  await page.focus('#insert_input_divorce_rate');
  await page.keyboard.type("1");

  await page.focus('#insert_input_ratio_actual');
  await page.keyboard.type("1");

  await page.focus('#insert_input_ratio_percent');
  await page.keyboard.type("1");

  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_front_insert_0.png' });

  await page.focus('#insert_button');
  await page.click("#insert_button");
  /*await page.evaluate(() => {
    document.querySelector('#insert_button').click();
  });*/
  await page.waitForSelector('#insert_button', { visible: true });
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_front_insert_1.png' });
  console.log(".....Divorce stat inserted");



  console.log("Divorce search the new stat.....");
  /* await page.focus('#insert_input_country');
  await page.keyboard.type("Rusia");
  await page.focus('#insert_input_date');
  await page.keyboard.type("2013"); */
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_front_search_0.png' });
  await page.focus('#search_button');
  await page.click("#search_button");
  await page.waitForSelector('#search_button', { visible: true });
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_front_search_1.png' });

  console.log(".....Divorce stat searched");

  console.log("Divorce press edit button in new stat row");

  await Promise.all([
    page.waitForNavigation(),
    page.click("body > main > main > table > tbody > tr:nth-child(2) > td:nth-child(7) > a > button"),
    page.waitForSelector('body > main > main > table > tbody > tr:nth-child(2) > td:nth-child(7) > a > button', { visible: true }),
    //await page.waitForSelector('#insert_button', { visible: true });
  ]);
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_edit_divorce_stat_0.png' });

  console.log("Divorce update Rusia 2013 .....");
  await page.focus('#insert_input_update_marriage_rate');
  await page.$eval('#insert_input_update_marriage_rate', data => data.value = "");
  await page.keyboard.type("666");
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_edit_divorce_stat_1.png' });
  await page.focus('#input_update_button');
  await page.click("#input_update_button");
  await page.waitForSelector('#input_update_button', { visible: true });
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_edit_divorce_stat_2.png' });
  console.log("Rusia 2013 stat updated")




  await Promise.all([
    page.waitForNavigation(),
    page.click("body > main > main > ul > li > a"),
  ]);
  await page.waitForTimeout(2000);
  await page.focus('#insert_input_country');
  await page.keyboard.type("Rusia");
  await page.focus('#insert_input_date');
  await page.keyboard.type("2013");
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_edit_divorce_stat_2.png' });
  await page.focus('#search_button');
  await page.click("#search_button");
  await page.waitForSelector('#search_button', { visible: true });
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_front_stat_updated_0.png' });

  console.log("Divorce Rusia 2013 press delete button")

  await page.click("body > main > main > table > tbody > tr:nth-child(2) > td:nth-child(8) > button"),
    await page.waitForTimeout(1000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_front_deleted_divorce_stat_0.png' })


  console.log("Delete all divorce stats button")

  await page.click("body > main > main > ul > li:nth-child(3) > a"); //BORRAR TODOS LOS DATOS 
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_front_delete_0.png' });
  await page.click("body > main > main > ul > li:nth-child(3) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-danger");
  await page.screenshot({ path: screenshotPath + (counter++) +'_DIV_front_delete_1.png' });

  console.log("Divorce delete all complete")
  await page.click("body > main > main > ul > li:nth-child(1) > a"),



  //Life




  await page.close();
  await browser.close();
})();
