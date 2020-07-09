const basePath = '/news';
const numParam = 'num=';
var trend = {
  content: '',
  currentTrendVal: 1
};

module.exports = {
  toggleNavBar: toggleNavBar,
  switchTrend: switchTrend,
  getNextTrendValue: getNextTrendValue
};

/** Show and hide nav bar. */
function toggleNavBar() {
  const nav = document.getElementById('nav');
  const main = document.getElementById('main');
  if (nav.style.display === 'none') {
    nav.style.display = 'block';
    if (screen.width < 1024) {
      main.style.display = 'none';
    }
  } else {
    nav.style.display = 'none';
    if (screen.width < 1024) {
      main.style.display = 'block';
    }
  }
}

/** Updates trend in carousel and respective dot based on next/previous buttons. */
function switchTrend(val, arrow, trends) {
  if (trends === undefined) trends = trend;  
  const nextTrend = arrow ? getNextTrendValue(val, trends.currentTrendVal) : val;
  const oldDot = document.getElementById('dot-' + trend.currentTrendVal);
  const newDot = document.getElementById('dot-' + nextTrend);
  oldDot.style.backgroundColor = 'transparent';
  newDot.style.backgroundColor = 'rgb(226, 226, 226)';
  trend.currentTrendVal = nextTrend;
  if (trend.content.length === 0) {
    return '';
  } else {
    getTrends(trend.currentTrendVal,trend.content);
    getArticles(trend.currentTrendVal,trend.content);
  }
}

/** Returns next trend value in carousel. */
function getNextTrendValue(direction, trendVal) {
  var nextSlide = direction + trendVal;
  // Clicking left on the first slide returns to last slide
  if (nextSlide === 0) {
    nextSlide = 4;
  // Clicking right on the last slide returns to first slide  
  } else if (nextSlide === 5) {
    nextSlide = 1;
  } 

  return nextSlide;
}

/** Shows main page after page load. */
function showPage() {
  document.getElementById('preloader').style.display = 'none';
  var content = document.getElementById('content')
  content.style.cssText = 'display: block; animation: fade-in 2.5s linear';
}

/** Retrieves list of topics and associated articles from the Backend Server in JSON form. */
async function retrieveArticles(numArticles, trend) {
  const requestURL = basePath + '?' + numParam + numArticles;
  const response = await fetch(requestURL);
  trend.content = await response.json();
  getArticles(trend.currentTrendVal, trend.content);
  getTrends(trend.currentTrendVal, trend.content);
}

/** Displays articles on page. */
function getArticles(val, content) {
  const trend = content[val-1];
  const articles = trend.articles;
  const articleContainer = document.getElementById('article-container');
  articleContainer.innerText = '';
  var right = false;
  articles.forEach((article) => {
    articleContainer.appendChild(createArticleElement(article,right));
    right = (!right) ? true : false;
  })
}

/** Creates an element that represents an article. */
function createArticleElement(article,right) {
  const articleElement = document.createElement('div');
  articleElement.className = (!right) ? 'articles' : 'articles right-justified';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href',article.link);

  const titleElement = document.createElement('h1');
  // Removes source from title
  const title = article.title.substring(0,article.title.length - article.source.length - 3);
  titleElement.innerText = title;

  const authorElement = document.createElement('h3');
  authorElement.innerText = 'author: ' + article.source;

  const dateElement = document.createElement('h3');
  dateElement.innerText = 'date: ' + article.pubDate;

  linkElement.appendChild(titleElement);
  articleElement.appendChild(linkElement);
  articleElement.appendChild(authorElement);
  articleElement.appendChild(dateElement);
  
  return articleElement;
}

/** Displays trends on page. */
function getTrends(val, content) {
  const trendContainer = document.getElementById('trend-container');
  trendContainer.innerText = '';  
  var trend = content[val-1];    
  trendContainer.appendChild(createTrendElement(trend.name, val)); 
}

/** Creates an element that represents a trend. */
function createTrendElement(trend, val) {
  const trendElement = document.createElement('div');
  trendElement.className = 'trends';
  trendElement.setAttribute('id','trend-' + val);
  trendElement.innerText = trend;
  return trendElement;
}

/** Shows preloader on page load and fetches articles. */
function loadPage() {  
  retrieveArticles(5, trend);
  setTimeout(showPage, 4000);
}