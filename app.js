const express = require('express');
const path = require('path');
const querystring = require('querystring');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For handling JSON data
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); // Using EJS for templating
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index'); // Render the homepage
});


app.route('/results')
    .get((req, res) => {
        const query = req.query.query || '';
        console.log('Received query:', query);
        const encodedQuery = querystring.escape(query);
        const searchEngines = getSearchEngines(encodedQuery);

        // Log the search engines to verify they are populated
        console.log('Search engines:', searchEngines);

        res.render('results', { query: encodedQuery, searchEngines: searchEngines });
    });

function getSearchEngines(encodedQuery) {
    return [
        { name: "Google", url: `https://www.google.com/search?q=${encodedQuery}` },
        { name: "Yandex", url: `https://yandex.com/search/?text=${encodedQuery}` },
        { name: "Brave", url: `https://search.brave.com/search?q=${encodedQuery}` },
        { name: "Spage", url: `https://www.startpage.com/do/search?query=${encodedQuery}` },
        { name: "Bing", url: `https://www.bing.com/search?q=${encodedQuery}` },
        { name: "bt4gprx", url: `https://bt4gprx.com/search?q=${encodedQuery}` },
        { name: "Yahoo", url: `https://search.yahoo.com/search?p=${encodedQuery}` },
        { name: "Ask", url: `https://www.ask.com/web?q=${encodedQuery}` },
        { name: "Baidu", url: `https://www.baidu.com/s?wd=${encodedQuery}` },
        { name: "Searx", url: `https://searx.be/?q=${encodedQuery}` },
        { name: "Exalead", url: `http://www.exalead.com/search/web/?q=${encodedQuery}` },
        { name: "DuckDuckGo", url: `https://duckduckgo.com/?q=${encodedQuery}` },
        { name: "Swisscows", url: `https://swisscows.com/en/web?query=${encodedQuery}` },
        { name: "Naver", url: `https://search.naver.com/search.naver?query=${encodedQuery}` },
        { name: "AOL", url: `https://search.aol.com/search?q=${encodedQuery}` },
        { name: "Yep", url: `https://yep.com/web?q=${encodedQuery}` },
        { name: "Gibiru", url: `https://gibiru.com/results.html?q=${encodedQuery}` },
        { name: "Kagi", url: `https://kagi.com/search?q=${encodedQuery}` },
        { name: "Stract", url: `https://stract.com/search?q=${encodedQuery}` }
    ];
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});