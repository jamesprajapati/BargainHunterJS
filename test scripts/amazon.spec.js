import { test, expect } from '@playwright/test';
import { amazonIN } from '../utils/enviorment';

test("amazon tests",async({page})=>{
    await page.goto(amazonIN);
});