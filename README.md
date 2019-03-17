# scraping-tutorial

## checkout the tutorial on my blog https://walkerfrederick.com/web-scraping-with-javascript/
Ever wanted to get data from a website but found that it lacked a public API? Well Web Scraping has got you covered, literally any data that is rendered on a web page can be scraped for your own personal use. Lucky for you most of the heavy lifting has been done for you with some really helpful node packages.

One really small caveat, it's important that the page you are trying to scrape is server side rendered. Otherwise the setup will be a little more complicated as you might need to preform some user emulation to get the data you want.

For this tutorial I'm going to show you how to grab the number of contributions from a GitHub profile. The methods shown will pretty much work anywhere and you should try and find your own source of data.

To Get Started.
Go ahead and create a new project directory. feel free to name it whatever you like.

First you will want to run...

# initialize our npm project
$ npm init

# install our dependencies
$ npm install axios cheerio
$ npm install esm --save-dev
axios and cheerio are two great node packages that will help us get and parse our HTML. We will be referring to their documentation throughout the tutorial so go ahead and open them in another tab.

Link to axios on GitHub
Link to cheerio on GitHub
esm is a great package for loading JavaScript modules. We need to use the --save-dev flag since it's a dev dependency.

Link to esm on GitHub
After that we will create our main.js file

# creating out main.js file
$ touch main.js
Step 1 - Getting the HTML.
Inside our main.js file we need to import axios and define a function called getHTML().

import axios from 'axios';

const getHTML = async function(url) {

}
our getHTML function needs to have the async keyword since we have no idea when we will get the response from the URL.

Next, we will use axios to get the HTML from a URL, which we are passing in as an argument.

import axios from 'axios';

const getHTML = async function(url) {

	let HTML = axios.get(url);
	return HTML;

}
Go ahead and return the HTML.

Alright, now to test if its working we need to add a script to our package.json file. Open up package.json and add the following per esm documentation. You can replace the default 'test' script with 'dev'.

add...

    "dev": "node -r esm main.js"
Your package.json should look something like this.

{
  "name": "scrapingtutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "node -r esm main.js" <<<<<<<<<<<< add this
  },
  "author": "walker",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.18.0",
    "cheerio": "^1.0.0-rc.2"
  },
  "devDependencies": {
    "esm": "^3.2.18"
  }
}
Go back to the main.js file and call the getHTML function, now since we are using async and await we're going to want to call .then() after our getHTML().

Something like this...

getHTML('https://github.com/WalkerFrederick').then((res) => {
    console.log(res);
})
Inside .then() we will console.log() the response.

Finally to test if all this is working we can test if everything is working using that script we added to package.json.

$ npm run dev
You should see a bunch of jumbled up html, That's good. Now all that's left is parsing the HTML to get the data we're after.

Step 2 - Parsing the HTML.
Okay, so now we need to find where the data is located in our html, For this simple tutorial we will be looking for the number of GitHub contributions on my profile. To do this we just need to inspect element on GitHub and see what kind of selectors are on that element.


Now that we found what element our data is in we need to write a function to parse our HTML and pull out that specific element.

first import cheerio into main.js

import axios from 'axios';
import cheerio from 'cheerio';
Our parseHTML function is going to look a little something like this...

const parseHTML = async function(html) {
    const $ = cheerio.load(html);
    return $('.js-yearly-contributions').find('h2').html();
}
Here we are initializing a variable called '$' and assigning it to cheerio.load(), where we pass in the HTML we're getting from getHTML().

Then we return the HTML element that contains our data. In my case I couldn't simply use the classes on the desired element and had to do a-little DOM traversal. Luckily that is pretty simple since cheerio is based on jQuery. If you want to see the full list of supported selectors check out cheerio on GitHub.

Finally we are pretty much done, all we need to do is log it to the console.

getHTML('https://github.com/WalkerFrederick').then(res => {
    parseHTML(res).then(result => {console.log(result)});
})
Since all our functions are promised based we need to first call getHTML() and then inside the callback we call parseHTML() and pass the result into it as a parameter. After that we log to the final result of parseHTML into a console.log().

Phew, got all that? I hope so. If not please feel free to email me with any questions at walker@urdev.xyz.

Additional Resources -
Wes Bos has a great video going over the exact same thing.
Another great post from FreeCodeCame.org
