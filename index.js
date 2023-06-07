import puppeteer from "puppeteer";
import fs from "fs/promises";
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

//navigateWebPage()


async function getDataFromWebPage() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100
    })

    const page = await browser.newPage();

    await page.goto("https://example.com");

    const result = await page.evaluate(() => {
        const title = document.querySelector("h1").innerText
        const description = document.querySelector("p").innerText
        const more = document.querySelector("a").innerText
        return {
            title,
            description,
            more
        }
    })
    console.log(result)
    await browser.close()

}

//getDataFromWebPage()

async function handleDynamicPage() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100
    })
    const page = await browser.newPage();

    await page.goto("https://quotes.toscrape.com/");


    const result = await page.evaluate(() => {
        const quotes = document.querySelectorAll(".quote");
        const data = [...quotes].map((quote) => {
            const quoteText = quote.querySelector(".text").textContent;
            const author = quote.querySelector(".author").textContent;
            const tags = [...quote.querySelectorAll(".tag")].map((tag) => tag.textContent);
            return {
                quoteText,
                author,
                tags
            };
        });
        return data;
    });

    console.log(result)

    fs.writeFile("quotes.json", JSON.stringify(result, null, 2))

    await browser.close()
}


handleDynamicPage()