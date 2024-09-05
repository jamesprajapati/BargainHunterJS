import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Compare Amazon and Flipkart pricing for lowest and highest products', () => {
  
  const amazonData = JSON.parse(fs.readFileSync('amazon_productData.json', 'utf-8'));
  const flipkartData = JSON.parse(fs.readFileSync('flipkart_productData.json', 'utf-8'));

  const extractPrice = (priceStr) => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
  };

  
  const amazonPrices = amazonData.map(item => extractPrice(item.price));
  const flipkartPrices = flipkartData.map(item => extractPrice(item.price));


  const amazonLowestPrice = Math.min(...amazonPrices);
  const amazonHighestPrice = Math.max(...amazonPrices);

  const flipkartLowestPrice = Math.min(...flipkartPrices);
  const flipkartHighestPrice = Math.max(...flipkartPrices);

  const findProductsWithPrice = (data, price) => {
    return data.filter(item => Math.abs(extractPrice(item.price) - price) < 0.01);  // Comparing within a tolerance
  };

  const amazonLowestProducts = findProductsWithPrice(amazonData, amazonLowestPrice);
  const amazonHighestProducts = findProductsWithPrice(amazonData, amazonHighestPrice);
  const flipkartLowestProducts = findProductsWithPrice(flipkartData, flipkartLowestPrice);
  const flipkartHighestProducts = findProductsWithPrice(flipkartData, flipkartHighestPrice);

  // Display lowest and highest priced products from both platforms
  console.log('Lowest priced products from Amazon:');
  console.log(amazonLowestProducts);

  console.log('Lowest priced products from Flipkart:');
  console.log(flipkartLowestProducts);

  console.log('Highest priced products from Amazon:');
  console.log(amazonHighestProducts);

  console.log('Highest priced products from Flipkart:');
  console.log(flipkartHighestProducts);

  // Check if both platforms have matching lowest and highest prices
  if (Math.abs(amazonLowestPrice - flipkartLowestPrice) < 0.01) {
    console.log('Matching lowest priced products on both platforms:');
    console.log([...amazonLowestProducts, ...flipkartLowestProducts]);
  } else {
    console.log('No matching lowest priced products between Amazon and Flipkart.');
  }

  if (Math.abs(amazonHighestPrice - flipkartHighestPrice) < 0.01) {
    console.log('Matching highest priced products on both platforms:');
    console.log([...amazonHighestProducts, ...flipkartHighestProducts]);
  } else {
    console.log('No matching highest priced products between Amazon and Flipkart.');
  }

  // Assertions to ensure test success
  expect(amazonLowestProducts.length).toBeGreaterThan(0);
  expect(flipkartLowestProducts.length).toBeGreaterThan(0);
  expect(amazonHighestProducts.length).toBeGreaterThan(0);
  expect(flipkartHighestProducts.length).toBeGreaterThan(0);
});
