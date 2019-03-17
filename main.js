import axios from 'axios';
import cheerio from 'cheerio';

const getHTML = async function(url) {
    let HTML = await axios.get(url);

    return HTML.data;
}

const parseHTML = async function(html) {
    const $ = cheerio.load(html);
    return $('.js-yearly-contributions').find('h2').html();
    
}



getHTML('https://github.com/WalkerFrederick').then(res => {
    parseHTML(res).then(result => {console.log(result)});
})

