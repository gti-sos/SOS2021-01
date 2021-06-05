
console.log("--Home press interface button to go to life-stats view--")
  
await page.click("body > main > main > div:nth-child(5) > div > div:nth-child(2) > div > div.card-body > a:nth-child(5) > button");

await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_0.png' });

console.log("Life press load button.....")

await page.click("body > main > main > div:nth-child(3) > main > div > button.btn.btn-outline-primary");

await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_load_0.png' });

console.log("Life stats load complete");

console.log("--Life go to next page--");
await page.click("body > main > main > div:nth-child(3) > main > button:nth-child(7)"); //boton siguiente
await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_1.png' });

console.log("--Life go to previous page--");
await page.click("body > main > main > div:nth-child(3) > main > button:nth-child(6)");
await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_2.png' });



console.log("--Life press analytics type line => analytics 1 view--");

await page.click("body > main > main > div.nav.svelte-1xdzfq5 > ul > li:nth-child(2) > a"); //Analítica (line)
await page.waitForTimeout(5000); 
await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_analytics1_0.png' });

console.log("--Life press interface button 'Datos' to go back--");
await page.click("body > main > main > ul > li:nth-child(2) > a"); //pincha en datos para volver 

console.log("--Life press analytics type bubble => analytics 2 view--");
await page.click("body > main > main > div.nav.svelte-1xdzfq5 > ul > li:nth-child(3) > a"); 
await page.waitForTimeout(5000); 
await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_analytics2_0.png' });


console.log("--Life press interface button 'Datos' to go back--");
await page.click("body > main > main > ul > li:nth-child(2) > a"); 
await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_3.png' });


console.log("Natality insert new stat.....");

await page.focus('#insert_input_country');
await page.keyboard.type("taiwan");

  await page.focus('#insert_input_date');
  await page.keyboard.type("2014");

  await page.focus('#insert_input_quality');
  await page.keyboard.type("1");

  await page.focus('#insert_input_purchasing');
  await page.keyboard.type("1");

  await page.focus('#insert_input_safety');
  await page.keyboard.type("1");
  
  await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_insert_0.png' });

  
  await page.focus('#insert_button');
  await page.click("#insert_button");
  
  await page.waitForSelector('#insert_button', { visible: true });
  await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_insert_1.png' });

  console.log(".....Life stat inserted");

  console.log("Life search the new stat.....");
  await page.focus('#search_input_country');
  await page.keyboard.type("taiwan");
  await page.focus('#search_input_date');
  await page.keyboard.type("2014");
  await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_search_0.png' });
  await page.focus('#search_button');
  await page.click("#search_button");
  await page.waitForSelector('#search_button', { visible: true });
  await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_search_1.png' });
  console.log(".....Life stat searched");

  console.log("--Life press taiwan edit button => edit stat view--");
  await page.click("#edit_button_taiwan_2014");  
  await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_edit_life_stat_0.png' });

  
  console.log("Life update taiwan 2014 .....");
  await page.focus('#update_input_quality');
  await page.$eval("#update_input_quality", el => el.value = "");
  await page.keyboard.type("99999");
  await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_edit_life_stat_1.png' });
  await page.focus('#update_button');
  await page.click("#update_button");
  await page.waitForSelector('#update_button', { visible: true }),
  await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_edit_life_stat_2.png' });
  console.log(".....taiwan 2014 updated");

  
  console.log("--press 'Volver' to go back => life interface--");  
  await page.click("#volver"),
  await page.waitForTimeout(2000);
  await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_stat_updated_0.png' });
  
  console.log("Life search the updated stat....."); 
  await page.focus('#search_input_country');
  await page.keyboard.type("taiwan");
  await page.focus('#search_input_date');
  await page.keyboard.type("2014");
  await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_search_2.png' });
  await page.focus('#search_button');
  await page.click("#search_button");
  await page.waitForSelector('#search_button', { visible: true });
  await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_search_3.png' });
  
  console.log(".....Life stat searched");

  console.log("--Life press taiwan delete button--");
  
  await page.click("#delete_button_taiwan_2014"),
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_deleted_life_stat_0.png' });

  
  console.log("Life press delete all button.....")
  await page.click("body > main > main > div:nth-child(3) > main > div > button.btn.btn-outline-danger");
  await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_delete_0.png' });
  
  console.log(".....delete all complete")
  await page.screenshot({ path: screenshotPath + (counter++) +'_LIFE_front_4.png' });

  
  console.log("--interface press back to home button => home--");
  await page.click("body > main > main > div.nav.svelte-1xdzfq5 > ul > li:nth-child(1) > a"); //pagina principak

  await page.screenshot({ path: screenshotPath + (counter++) +'_HOME_2.png' });
 