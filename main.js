const puppeteer = require("puppeteer");
const { sleep, Noti } = require("./notice-utils");

(async () => {
  const notices = [];
  let noticetrs = [];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{
    await page.goto('http://www.ajou.ac.kr/main/ajou/notice.jsp');
    console.log('Got Page');
  } catch (e) {
    throw new Error("Cannot get page");
  }
  
  for (let i = 0; i<10; i++) {
    notices.push(await page.waitFor(`#jwxe_main_content > div > div.list_wrap > table > tbody > tr:nth-child(${i+1}) > td.td.title_comm > a`));
    noticetrs.push(await page.waitFor(`#jwxe_main_content > div > div.list_wrap > table > tbody > tr:nth-child(${i+1})`))
    console.log(`Got ${i}th notice`);
  }

  let titles = [];
  for (notice of notices) {
    titles.push(await page.evaluate( notice => notice.textContent, notice));
  }
  titles = titles.map(title => title.replace(/\r?\t|\n|\r/g, ""));
  titles = titles.map(title => title.trim());
  console.log(titles);
  let childrens = []
  for (tr of noticetrs){
    const child = await tr.$$('td');
    const contents = [];
    for (content of child) {
      const textData = await page.evaluate(async content => content.textContent, content);
      contents.push(textData);
    }
    childrens.push(contents);
  }

  const notiObjects = [];
  let i = 0;
  for (child of childrens) {
    const newNoti = new Noti(child[0], child[1], child[3], child[4]);
    newNoti.title = titles[i];
    i++;
    notiObjects.push(newNoti);
  }
  console.log(notiObjects);

  // Promise.all(childrens).then(async results => {
  //   childrens = results;
  //   childrens.map(async child => {
  //     return await child.map(async c => await page.evaluate(async c => await c.textContent, c));
  //   });
  //   console.log(childrens);
  // });
  // await child.forEach(async c => console.log(await page.evaluate(c => c.textContent, c)));
  await page.screenshot({path: 'test_notice_page.png'});
  await browser.close();
})().catch(console.error);
