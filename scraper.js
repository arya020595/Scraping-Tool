const axios = require("axios");
const { JSDOM } = require("jsdom");
const fs = require("fs");
// const mongoose = require("mongoose");
require("dotenv").config();

// Import MongoDB configuration
// const { connectToDB, Scrape } = require("./db");
// URL of the website to scrape from the environment variables
const url = process.env.URL;

// Function to fetch the HTML content of the page using async/await
async function fetchHTML(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching the page:", error.message);
    return null;
  }
}

// Function to scrape data from the fetched HTML
async function scrapeData(selector) {
  const html = await fetchHTML(url);
  if (!html) {
    console.error("Failed to fetch HTML");
    return;
  }

  // Parse the HTML content using JSDOM
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Query specific elements
  const elements = document.querySelector(selector);
  if (!elements) {
    console.error("Selector not found");
    return;
  }

  const links = elements.querySelectorAll("a");

  // Array to store scraped data
  const scrapedData = [];

  // Process each link
  links.forEach((link) => {
    const textContent = link.textContent.trim(); // Trim leading and trailing whitespace
    const href = link.href;
    if (textContent && href) {
      console.log(`Text: ${textContent}, URL: ${href}`);
      scrapedData.push({ text: textContent, url: href });
    }
  });

  // Additional scraping logic: Extract images
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    const src = img.src;
    const alt = img.alt || "No alt text";

    if (src) {
      console.log(`Image: ${src}, Alt text: ${alt}`);
      scrapedData.push({ image: src, alt: alt });
    }
  });

  // Save scraped data to a JSON file
  fs.writeFileSync(
    "scrapedData.json",
    JSON.stringify(scrapedData, null, 2),
    "utf-8"
  );
  console.log("Scraped data saved to scrapedData.json");
}

// Invoke the scraping function with a specific selector from the environment variables
const specificSelector = process.env.SPECIFIC_SELECTOR;
scrapeData(specificSelector);
