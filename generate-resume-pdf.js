#!/usr/bin/env node

/**
 * Instructions to generate resume.pdf:
 * 
 * 1. Open the resume HTML file in your browser:
 *    file:///Users/macbook/Desktop/projects/prabin-portfolio/public/resume-content.html
 * 
 * 2. Press Cmd+P (or Ctrl+P on Windows/Linux) to open the print dialog
 * 
 * 3. Select "Save as PDF" as the destination
 * 
 * 4. Save the file as "resume.pdf" in the public folder:
 *    /Users/macbook/Desktop/projects/prabin-portfolio/public/resume.pdf
 * 
 * 5. The download link in the portfolio will automatically work!
 * 
 * Alternatively, you can use this command if you have wkhtmltopdf installed:
 * wkhtmltopdf public/resume-content.html public/resume.pdf
 */

console.log(`
╔════════════════════════════════════════════════════════════╗
║                  Resume PDF Generation                     ║
╚════════════════════════════════════════════════════════════╝

To generate your resume PDF:

1. Open in browser:
   file:///Users/macbook/Desktop/projects/prabin-portfolio/public/resume-content.html

2. Press Cmd+P (Print)

3. Save as PDF to:
   public/resume.pdf

Your resume is ready to view and will be downloadable from your portfolio!
`);
