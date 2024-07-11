const dotenv = require("dotenv");
const { scrapeData } = require("./scraperService");
const { saveToJSON } = require("./fileService");
// const { saveToMongoDB } = require("./dataService");

dotenv.config();

// Main execution function
async function main() {
  try {
    const websiteURL = process.env.WEBSITE_URL;
    const specificSelector = process.env.SPECIFIC_SELECTOR;
    const jsonFileName = process.env.JSON_FILE_NAME;

    // Scrape data using environment variables
    const scrapedData = await scrapeData(websiteURL, specificSelector);
    if (!scrapedData || scrapedData.length === 0) {
      console.error("No data scraped or error occurred during scraping");
      return;
    }

    // Save scraped data to a JSON file
    saveToJSON(scrapedData, jsonFileName);

    // Save data to MongoDB
    // await saveToMongoDB(scrapedData);
  } catch (err) {
    console.error("Main function error:", err);
  }
}

// Execute main function
main();
