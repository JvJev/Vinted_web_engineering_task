# Vinted academy task

This is React-based photo gallery app that allows users to view photos and mark favorites ones. Application is dedicated for Vinted. Date of start:2024.08.03d Date of completion:2024.08.11d

Features
- Infinite scroll image loading. Loads 20 images per page. Loaded images are saved and API calls triggers if scrolled further. Saved upon page reload as well.
- Responsive design for Desktop, Tablet, and Phone.
- Images can be saved in favorites page. Saved upon page reload as well. In favorites page image disappears instantly if clicked "remove from favorites". 
- Lazy loading of images.
- Flickr API integration. Optimized API calls in separate file.

Steps to launch:

To run this project on your machine, you must have node.js installed. You may download node.js LTS version here: https://nodejs.org/en

1. Clone the repository to your local machine:
Copy to terminal: git clone xxxxxxxxxxxxxxxxx

2. Change directory
Copy to terminal: cd xxxxxxxxxxxxxxxxxxxxxx

3. Create a file named `apiKey.js` in the `src` directory and add your Flickr API key:
  
  const env = {
     API_KEY: 'your-flickr-api-key-here'
   };

4. Install packages
Copy to terminal: npm install

5. Launch application
Copy to terminal: npm run start

6. Now you can use application in your broser:
http://localhost:3000/
http://localhost:3000/favorite-photos

7.1. To launch test open new terminal and type npm run test
7.2. To launch ESLINT open new terminal and type npm run lint

Technologies:
React
CSS
Flickr API

