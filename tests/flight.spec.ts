import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Flight Optimizer/);
});

test('submits flight form', async ({ page }) => {
  await page.goto('/');
  
  // Fill the form
  await page.fill('#fromCity', 'London');
  await page.fill('#toCities', 'Paris, Berlin');
  
  // Submit the form
  await page.click('button:has-text("Find Best Flight")');
  
  // Wait for result or loading
  await expect(page.locator('button:has-text("Find Best Flight")')).toBeVisible();
});
