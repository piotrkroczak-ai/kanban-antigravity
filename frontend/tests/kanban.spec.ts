import { test, expect } from '@playwright/test';

test.describe('Kanban Board', () => {
  test('should load the board with initial data', async ({ page }) => {
    await page.goto('/');

    // Check project title
    await expect(page.locator('text=Frontend Overhaul Q3').first()).toBeVisible();

    // Check columns
    await expect(page.locator('text=To Do').first()).toBeVisible();
    await expect(page.locator('text=In Progress').first()).toBeVisible();
    await expect(page.locator('text=Review').first()).toBeVisible();

    // Check cards
    await expect(page.locator('text=Setup CI/CD pipeline').first()).toBeVisible();

    // Check footer
    await expect(page.locator('text=Built with Gemini 3.1 Pro (High)').first()).toBeVisible();
  });

  test('should edit a card title', async ({ page }) => {
    await page.goto('/');

    // Click on a card title
    await page.locator('text=Setup CI/CD pipeline').first().click();

    // The inline edit should turn into an input
    const input = page.locator('input').first();
    await expect(input).toBeVisible();

    // Clear and type new text
    await input.fill('New Test Title');
    await input.press('Enter');

    // Check if updated
    await expect(page.locator('text=New Test Title').first()).toBeVisible();
  });
});
