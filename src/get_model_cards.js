async function scrapeData() {
    try {
        const baseUrl = 'https://huggingface.co';  // Base URL of the site

        // Fetching the HTML content from the URL
        const response = await fetch(baseUrl + '/collections/unaidedelf87777/alignmentlab-site-lander-6535d365f551a245bbf5a150');
        const htmlString = await response.text();

        // Parsing the HTML string
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        // Using XPath to select the UL element
        const xpathToUl = '/html/body/div[1]/main/div/div/section/div[2]/div[2]/ul';
        const result = document.evaluate(xpathToUl, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        const ulElement = result.singleNodeValue;

        // Check if UL element was found
        if (!ulElement) {
            console.error('UL element not found!');
            return;
        }

        // Extract information from the UL element
        const itemsData = [];
        const items = ulElement.querySelectorAll('li');

        items.forEach((item) => {
            const data = {};
        
            // Extracting the model name
            const modelName = item.querySelector('header').getAttribute('title');
            data.name = modelName;
        
            // Extracting the model URL
            const modelUrl = item.querySelector('a').getAttribute('href');
            data.url = modelUrl.startsWith('http') ? modelUrl : baseUrl + modelUrl;
        
            // Extracting the information from the data div
            const infoDiv = item.querySelector('article > a > div');
            if (infoDiv) {
                // The text content of the div contains all the information as a string.
                // We'll need to split this string and extract the required parts.
                const infoParts = infoDiv.textContent.split('•').map(part => part.trim());
        
                // Assuming the structure is consistent and the order of information doesn't change:
                data.task = infoParts[0];
        
                // Manually adding a space between "Updated" and the date
                let updatedText = infoParts[1].replace(/\n|\t/g, "").trim(); // Remove new lines and tabs
                updatedText = updatedText.replace("Updated", "Updated "); // Add space after "Updated"
                data.updated = updatedText;
        
                data.downloads = infoParts[2]; // Correcting the order
                data.likes = infoParts[3]; // Assuming the number of likes is the last part
            } else {
                console.error('Information div not found for model:', modelName);
            }
        
            itemsData.push(data);
        });

        // Here you can add more data or manipulate the extracted data as you wish

        console.log(itemsData);
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

// Call the function to start the scraping
scrapeData();