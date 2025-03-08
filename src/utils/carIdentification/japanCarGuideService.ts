
import { CarInfo } from '../../types/car';

// Function to scrape car information from Japan Car Guide website
export const fetchCarInfoFromJCG = async (query: string): Promise<CarInfo | null> => {
  try {
    console.log(`Attempting to fetch car info for "${query}" from JapanCarGuide...`);
    
    // First, we need to search for the car on the website
    const searchUrl = `https://japancarguide.com/search?q=${encodeURIComponent(query)}`;
    console.log(`Search URL: ${searchUrl}`);
    
    const response = await fetch(searchUrl);
    const html = await response.text();
    
    // Simple regex-based extraction of the first search result
    // Note: In a production environment, using proper HTML parsing would be better
    const carLinkRegex = /<a\s+href="(https:\/\/japancarguide\.com\/car-information\/.*?)"/i;
    const match = html.match(carLinkRegex);
    
    if (!match || !match[1]) {
      console.log('No car results found on JapanCarGuide');
      return null;
    }
    
    // Get the detail page URL
    const carDetailUrl = match[1];
    console.log(`Found car detail page: ${carDetailUrl}`);
    
    // Fetch the car detail page
    const detailResponse = await fetch(carDetailUrl);
    const detailHtml = await detailResponse.text();
    
    // Extract car information using regex patterns
    // This is a simplified approach - a proper HTML parser would be more robust
    
    // Extract car name
    const carNameRegex = /<h1[^>]*>(.*?)<\/h1>/i;
    const carNameMatch = detailHtml.match(carNameRegex);
    const fullName = carNameMatch && carNameMatch[1] ? carNameMatch[1].trim() : '';
    
    // Extract manufacturer and model name
    const nameParts = fullName.split(' ');
    const manufacturer = nameParts[0] || 'Unknown';
    const name = nameParts.slice(1).join(' ') || 'Unknown Model';
    
    // Extract description
    const descRegex = /<meta\s+name="description"\s+content="([^"]+)"/i;
    const descMatch = detailHtml.match(descRegex);
    const description = descMatch && descMatch[1] ? descMatch[1] : '';
    
    // Extract other specs
    const powerRegex = /Engine Power(?:[^>]*>){1,5}([\d.]+\s*(?:HP|PS|kW))/i;
    const powerMatch = detailHtml.match(powerRegex);
    const power = powerMatch && powerMatch[1] ? powerMatch[1] : 'Unknown';
    
    const yearRegex = /Year(?:[^>]*>){1,5}(\d{4}(?:\s*-\s*\d{4}|\s*-\s*Present|\s*-\s*current)?)/i;
    const yearMatch = detailHtml.match(yearRegex);
    const yearRange = yearMatch && yearMatch[1] ? yearMatch[1] : 'Unknown';
    
    const engineRegex = /Engine(?:[^>]*>){1,5}([\d.]+L\s*[^<]+)/i;
    const engineMatch = detailHtml.match(engineRegex);
    const engineInfo = engineMatch && engineMatch[1] ? engineMatch[1] : 'Unknown';
    
    // Generate a unique ID
    const id = `${manufacturer.toLowerCase()}-${name.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Create the CarInfo object
    const carInfo: CarInfo = {
      id,
      name,
      manufacturer,
      yearRange,
      engineInfo,
      power,
      topSpeed: 'Information not available',
      acceleration: 'Information not available',
      description,
      imageUrl: '', // Empty string since we're not using images
      dealers: [
        {
          name: 'Japan Car Guide',
          location: 'Online',
          contact: 'Via website',
          website: carDetailUrl
        }
      ]
    };
    
    console.log('Successfully fetched car info from JapanCarGuide:', carInfo);
    return carInfo;
  } catch (error) {
    console.error('Error fetching from JapanCarGuide:', error);
    return null;
  }
};
