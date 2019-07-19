This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It features the [Hacker News API](https://github.com/HackerNews/API) and fetches the newest stories. 

This app features: 
1. Offline capabilities 
2. Loading items as they arrive 
3. Infinite scroll 
4. Link out to the story's article 
5. Uses the Hacker News API 
6. Timestamps 
7. Limited Unit tests 
   
## Running the app 🚀

In the project directory, you can run:

### `npm install`
 
to install dependencies and then 

 ### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## To run the app in offline mode 🕯

This application uses a registered service worker; this worker only functions on a production build. To look at this feature first run: 

### `npm run build`

Then run 

### `serve -s build`

This command will open the production build running an HTTP server locally. This step requires to install `serve` (`npm install serve`) if you do not have it installed already. 

Open up the console once you open the webpage on the provided socket, and you should see the logs of the service worker. 
Once the page is fully cached, an alert will pop out to inform the user that the website is ready. 


## Dependencies 🤝

1. Moment to parse date strings
2. Axios for API calls

Thank you very much for checking out my project! 
🙋🏻‍♀️