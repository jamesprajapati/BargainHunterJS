import { test} from '@playwright/test';
export default async function Step(name, stepFunction, page) {
    await test.step(name, async () => {
        try {
            // Execute the step
            await stepFunction();
        } catch (error) {
            // Capture and attach screenshot on failure
            await page.screenshot({ path: `test-results/screenshots/${name.replace(/[^a-zA-Z0-9]/g, '_')}.png`, fullPage: true });
            test.info().attach('screenshot', {
                path: `test-results/screenshots/${name.replace(/[^a-zA-Z0-9]/g, '_')}.png`,
                contentType: 'image/png',
            });
            throw error; // Re-throw the error so it gets reported properly
        }
        // Capture and attach screenshot after each step
        const screenshotPath = `test-results/screenshots/${name.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
        await page.screenshot({ path: screenshotPath});
        test.info().attach('screenshot', {
            path: screenshotPath,
            contentType: 'image/png',
        });
    });
}
