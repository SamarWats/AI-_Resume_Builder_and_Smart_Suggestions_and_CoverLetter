import puppeteer from "puppeteer";

export const generatePDFBuffer = async (htmlContent)=>{
    const browser= await puppeteer.launch({
        headless: "new", // Launches the browser in headless mode, required for puppeteer v20+
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });


    // Create a new page
    const page = await browser.newPage();

    // Set the content of the page
    await page.setContent(htmlContent, {waitUntil: "networkidle0"});

    // Generate the PDF buffer, and return it
    const pdfBuffer = await page.pdf({format:"A4", printBackground: true});
    await browser.close();
    return pdfBuffer;
}