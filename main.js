const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.ajou.ac.kr/main/ajou/notice.jsp?mode=view&article_no=199089');
  await page.screenshot({path: 'test_notice_page.png'});
  await browser.close();
})();