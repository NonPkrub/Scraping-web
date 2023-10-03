// scrape.js

// const fs = require("fs");
import puppeteer from "puppeteer";
import { createObjectCsvWriter } from "csv-writer";

export async function scrapeData(config) {
  // const proxyUrl = "https://free-proxy-list.net/";
  const browser = await puppeteer.launch({
    headless: true,
    // args: [`--proxy-server=${proxyUrl}`],
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  await page.goto(config.url, {
    waitUntil: "domcontentloaded",
  });

  // Scroll down the page
  await page.waitForTimeout(5000);
  let previousHeight = 0;
  let currentHeight = await page.evaluate("document.body.scrollHeight");

  while (previousHeight < currentHeight) {
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
    await page.waitForTimeout(2000); // Wait for the content to load
    previousHeight = currentHeight;
    currentHeight = await page.evaluate("document.body.scrollHeight");
  }

  // Scrape each element in the "data" array
  const scrapedData = {};
  const selectors = config.data.map(({ selector }) => selector);
  for (let i = 1; i <= config.dataset; i++) {
    if ("nth-child(i)") {
      const indexedSelectors = selectors.map((selector) =>
        selector.replace("(i)", `(${i})`)
      );

      const elements = await Promise.all(
        indexedSelectors.map((selector) => page.$(selector))
      );

      const result = await Promise.all(
        elements.map((element) => {
          return element.evaluate((node) => node.innerText);
        })
      );

      for (let j = 0; j < selectors.length; j++) {
        const selector = selectors[j];
        const indexedSelector = selector.replace("(i)", `(${i})`);

        try {
          const data = result[j];
          scrapedData[indexedSelector] = data.replace(/\n/g, ",");
        } catch (error) {
          console.error(`Failed to scrape ${indexedSelector}: ${error}`);
        }
      }
    } else {
      const indexedSelectors = selectors.map((selector) =>
        selector.replace("(i)", `${i}`)
      );

      const elements = await Promise.all(
        indexedSelectors.map((selector) => page.$(selector))
      );

      const result = await Promise.all(
        elements.map((element) => {
          return element.evaluate((node) => node.innerText);
        })
      );

      for (let j = 0; j < selectors.length; j++) {
        const selector = selectors[j];
        const indexedSelector = selector.replace("(i)", `${i}`);

        try {
          const data = result[j];
          scrapedData[indexedSelector] = data.replace(/\n/g, ",");
        } catch (error) {
          console.error(`Failed to scrape ${indexedSelector}: ${error}`);
        }
      }
    }
  }

  await browser.close();
  //Format scraped-data
  const values = Object.values(scrapedData);
  const formattedData = values.map((string) => {
    return string.split(/\s/g).filter(Boolean).join("");
  });
  const result1 = formattedData.map((row) => row.replace(/,,/g, ","));
  const formattedResult = result1.map((selector, index) => {
    return { [index]: selector };
  });

  console.log(formattedResult);

  // Generate the output based on the format specified in the config file
  if (config.format === "json") {
    const jsonData = JSON.stringify(formattedResult);
    // fs.appendFile(
    //   `./scraped-data-json/${config.filename}.json`,
    //   jsonData,
    //   (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log(`Scraped data saved to file ${config.filename}.json`);
    //   }
    // );
    // Create a Blob from the JSON data
    const blob = new Blob([jsonData], { type: "application/json" });

    // Create a Blob URL for the Blob
    const blobUrl = URL.createObjectURL(blob);

    // Create a hidden <a> element with the download attribute
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = blobUrl;
    a.download = `${config.filename}.json`;

    // Append the <a> element to the document
    document.body.appendChild(a);

    // Simulate a click event to trigger the download
    a.click();

    // Remove the <a> element and revoke the Blob URL
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } else if (config.format === "csv") {
    const data = result1.map((data) => ({ data }));
    const header = Object.keys(data[0])[0]
      .split(",")
      .map((value, index) => `Header${index + 1}`)
      .join(",");
    let csv = `${header}\n`; // Header

    data.forEach((entry, index) => {
      const values = Object.values(entry)[0].split(",");
      csv += `${index},${values.join(",")}\n`;
    });

    // Write the CSV data to a file (You can adapt this part based on your environment)
    // For browser-based environment, you can use Blob and URL.createObjectURL to create and download a file
    // For Node.js environment, you can use the built-in 'fs' module to write the data to a file

    // console.log(csv); // You can replace this with actual file writing code in your environment
    // fs.writeFileSync(`./scraped-data-csv/${config.filename}.csv`, csv); // Write CSV content to a file named 'csvwrite.csv'
    // console.log("CSV file written successfully.");
    // Create a Blob from the CSV data
    const blob = new Blob([csv], { type: "text/csv" });

    // Create a Blob URL for the Blob
    const blobUrl = URL.createObjectURL(blob);

    // Create a hidden <a> element with the download attribute
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = blobUrl;
    a.download = `${config.filename}.csv`;

    // Append the <a> element to the document
    document.body.appendChild(a);

    // Simulate a click event to trigger the download
    a.click();

    // Remove the <a> element and revoke the Blob URL
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  }
}

// module.exports = {
//   scrapeData,
// };
