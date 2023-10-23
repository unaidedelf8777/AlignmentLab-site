import fs from 'fs';
import path from 'path';

export default {
  plugins: [
    {
      name: 'html-inject-header',
      transformIndexHtml(html) {
        const headerPath = path.resolve(__dirname, './src/header/header.html');
        const headerContent = fs.readFileSync(headerPath, 'utf-8');
        return html.replace('<body>', `<body>${headerContent}`);
      }
    },
    {
      name: 'html-inject-footer',
      transformIndexHtml(html) {
        const footerPath = path.resolve(__dirname, './src/footer/footer.html');
        const footerContent = fs.readFileSync(footerPath, 'utf-8');
        return html.replace('</body>', `${footerContent}</body>`);
      }
    }
  ]
}
