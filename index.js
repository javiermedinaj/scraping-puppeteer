import puppeteer from "puppeteer";

async function navigateWebPage() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100
    });
    const page = await browser.newPage();

    await page.goto("https://javier-medina-portfolio.vercel.app/")
    await page.click('a[href = "/proyects"]')
    await page.screenshot({
        path: 'index.png'
    })
    await new Promise(resolve => setTimeout(resolve, 3000))
    await browser.close()
}

navigateWebPage()