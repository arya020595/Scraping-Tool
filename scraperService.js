// scraperService.js

const axios = require("axios");
const { JSDOM } = require("jsdom");

// Function to fetch the HTML content of the page using async/await
const fetchHTML = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching the page:", error.message);
    return null;
  }
};

// Function to scrape data from the fetched HTML
const scrapeData = async (url, selector) => {
  const html = await fetchHTML(url);
  if (!html) {
    console.error("Failed to fetch HTML");
    return null;
  }

  // Parse the HTML content using JSDOM
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Query specific elements using the provided selector
  const elements = document.querySelectorAll(selector);
  if (!elements.length) {
    console.error("No elements found with the provided selector:", selector);
    return [];
  }

  // Array to store scraped data
  const scrapedData = [];

  // Process each element
  elements.forEach((element) => {
    const title = element
      .querySelector(process.env.TITLE_SELECTOR)
      ?.textContent.trim();
    const description = element
      .querySelector(process.env.DESCRIPTION_SELECTOR)
      ?.textContent.trim();
    const imgElement = element.querySelector(process.env.IMG_SELECTOR);
    const image = imgElement
      ? imgElement.getAttribute("data-src") || imgElement.getAttribute("src")
      : null;
    const link = element.querySelector(process.env.LINK_SELECTOR)?.href;

    if (title && link) {
      scrapedData.push({
        title,
        description,
        image,
        link,
      });
    }
  });

  return scrapedData;
};

module.exports = {
  scrapeData,
};
