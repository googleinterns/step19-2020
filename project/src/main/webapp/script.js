/* eslint-disable no-unused-vars */
const basePath = '/news';
const numParam = 'num=';
const trend = {
  content: '',
  currentTrendVal: 1,
  color: '',
};

/** Show and hide nav bar. */
function toggleNavBar() {
  const nav = document.getElementById('nav');
  const main = document.getElementById('main');
  if (nav.style.display === 'none' || nav.style.display === '') {
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

/**
 * Updates trend in carousel and respective dot based on next/previous buttons.
 * @param {number} val The direction of carousel if arrow is true or
 *                     the value of the next slide if arrow is false.
 * @param {boolean} arrow Indicates whether the user used the arrow or
 *                        the dots to switch slides.
 * @param {object} trends Holds the articles, trends, and colors.
 * @return {string} Empty string if trend object is not filled.
 */
function switchTrend(val, arrow, trends) {
  if (trends === undefined) trends = trend;
  let nextTrend = -1;
  if (arrow) {
    nextTrend = getNextTrendValue(val, trends.currentTrendVal);
  } else {
    nextTrend = val;
  }
  const oldDot = document.getElementById('dot-' + trend.currentTrendVal);
  const newDot = document.getElementById('dot-' + nextTrend);
  oldDot.style.backgroundColor = 'transparent';
  newDot.style.backgroundColor = 'rgb(226, 226, 226)';
  trend.currentTrendVal = nextTrend;
  if (trend.content.length === 0) {
    return '';
  } else {
    getTrends(trend.currentTrendVal, trend.content);
    getArticles(trend.currentTrendVal, trend.content);
  }
}

/**
 * Returns next trend value in carousel.
 * @param {number} direction Indicates the direction of the carousel.
 * @param {number} trendVal The value corresponding to the current trend.
 * @return {number} The value corresponding to the next trend.
 */
function getNextTrendValue(direction, trendVal) {
  let nextSlide = direction + trendVal;
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
  const content = document.getElementById('content');
  content.style.cssText = 'display: block; animation: fade-in 2.5s linear';
}

/**
 * Retrieves list of topics and associated articles
 * from the Backend Server in JSON form.
 * @param {number} numArticles The number of articles to retrieve.
 * @param {object} trend Holds the trends and articles retrieved.
 */
async function retrieveArticles(numArticles, trend) {
  const requestURL = basePath + '?' + numParam + numArticles;
  const response = await fetch(requestURL);
  trend.content = await response.json();
  getArticles(trend.currentTrendVal, trend.content);
  getTrends(trend.currentTrendVal, trend.content);
  getTrendBubbles(trend.content, trend.color);
}

/**
 * Displays articles on page.
 * @param {number} val The value corresponding to the current trend.
 * @param {Array} content Array of Topic objects.
 */
function getArticles(val, content) {
  const trend = content[val-1];
  const articles = trend.articles;
  const articleContainer = document.getElementById('article-container');
  articleContainer.innerHTML = '';
  let right = false;
  articles.forEach((article) => {
    const child = createArticleElement(article, right);
    articleContainer.appendChild(child);
    right = (!right) ? true : false;
  });
}

/**
 * Creates an element that represents an article.
 * @param {object} article Contains the article information.
 * @param {boolean} right Determines whether the article is right-justified.
 * @return {HTMLDivElement} The article element.
 */
function createArticleElement(article, right) {
  const articleElement = document.createElement('div');
  articleElement.className = (!right) ? 'articles' : 'articles right-justified';

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", article.link);

  const titleElement = document.createElement('h1');
  titleElement.className = 'headers';
  // Removes source from title
  const newEnd = article.title.length - article.source.length - 3;
  const articleTitle = article.title.substring(0, newEnd);
  titleElement.innerText = articleTitle;
  const authorElement = document.createElement('h3');
  authorElement.className = 'subHeaders';
  authorElement.innerText = 'author: ' + article.source;

  const dateElement = document.createElement('h3');
  dateElement.className = 'subHeaders';
  dateElement.innerText = 'date: ' + article.pubDate;
  linkElement.appendChild(titleElement);
  articleElement.appendChild(linkElement);
  articleElement.appendChild(authorElement);
  articleElement.appendChild(dateElement);

  return articleElement;
}

/**
 * Displays trends on page.
 * @param {number} val The value corresponding to the current trend.
 * @param {Array} content Array of Topic objects.
 */
function getTrends(val, content) {
  const trendContainer = document.getElementById('trend-container');
  trendContainer.innerHTML = '';
  const trend = content[val-1];
  trendContainer.appendChild(createTrendElement(trend.name, val));
}

/**
 * Creates an element that represents a trend.
 * @param {string} trend The trend name.
 * @param {number} val The trend's numerical id value.
 * @return {HTMLDivElement} The trend element.
 * */
function createTrendElement(trend, val) {
  const trendElement = document.createElement('div');
  trendElement.className = 'trends';
  trendElement.setAttribute('id', 'trend-' + val);
  trendElement.innerText = trend;
  return trendElement;
}

/**
 * Displays trend frequency bubbles on page.
 * @param {Array} content Array of Topic objects.
 * @param {Map} colors Map of sentiments and their color assignments.
 */
function getTrendBubbles(content, colors) {
  const bubbleFirstRow = document.getElementById('frequency-row-1');
  const bubbleSecondRow = document.getElementById('frequency-row-2');
  const bubbleSizes = getTrendBubbleSize(content);
  const sentimentScore = getTrendBubbleScore(content);
  const length = (bubbleSizes.size)/2;
  let i = 0;
  for (const [key, value] of bubbleSizes.entries()) {
    const color = colors.get(sentimentScore.get(key));
    const child = createTrendBubble(key, value, color);
    if (i < length) {
      bubbleFirstRow.appendChild(child);
    } else {
      bubbleSecondRow.appendChild(child);
    }
    i += 1;
  }
}

/**
 * Creates an element that represents a trend and its frequency.
 * @param {string} trend The name of the trend.
 * @param {number} size The size of the bubble.
 * @param {string} color The color of the bubble.
 * @return {HTMLDivElement} The trend bubble element.
 */
function createTrendBubble(trend, size, color) {
  const bubbleElement = document.createElement('div');
  bubbleElement.className = 'bubbles';
  let style = '';
  style = addStyleProperty(style, 'width', size + 'vw');
  style = addStyleProperty(style, 'height', size + 'vw');
  style = addStyleProperty(style, 'font-size', size/10 +'vw');
  style = addStyleProperty(style, 'background-color', color);
  bubbleElement.setAttribute('style', style);
  bubbleElement.innerText = trend;

  return bubbleElement;
}

/**
 * Add style property.
 * @param {string} style A string used to append the style properties to.
 * @param {string} property The property to be added to the style.
 * @param {string} value The value of the property.
 * @return {string} The style string with added properties.
 */
function addStyleProperty(style, property, value) {
  return style.concat(property, ':', value, ';');
}

/**
 * Returns a map with trends and their respective bubble size.
 * @param {Array} content Array of topic objects.
 * @return {Map} A map of trends and their calculated bubble sizes.
 */
function getTrendBubbleSize(content) {
  const max = content[content.length - 1].frequency;
  const min = content[0].frequency;
  const proportions = [];
  for (let i = 0; i < content.length; i++) {
    proportions[i] = content[i].frequency/max;
  }
  const size = new Map();
  content.forEach((trend) => {
    size.set(trend.name, getSize(trend.frequency, max, min));
  });
  return size;
}

/**
 * Calculates and returns the bubble size.
 * @param {number} frequency The amount of searches for a given trend.
 * @param {number} max The highest amount of searches for all trends.
 * @param {number} min The lowest amount of searches for all trends.
 * @return {number} The calculated size of the bubble.
 */
function getSize(frequency, max, min) {
  const maxSize = 23;
  const minSize = 6;
  let size = 20;
  if (max != min) {
    size = ((maxSize - minSize) * (frequency - min)) / (max - min) + minSize;
  }
  return parseInt(size.toFixed(0));
}

/**
 * Returns a map of the trends and their respective sentiment scores.
 * @param {Array} trends Array of topic objects.
 * @return {Map} A map of trends and their averaged sentiment score.
 */
function getTrendBubbleScore(trends) {
  const score = new Map();
  trends.forEach((trend) => {
    score.set(trend.name, getAverageSentiment(trend.articles));
  });
  return score;
}

/**
 * Returns the average of the sentiment scores of all the articles.
 * @param {Array} articles Array of all the articles for a trend.
 * @return {number} The average of the sentiment of all of the articles.
 */
function getAverageSentiment(articles) {
  const score = [];
  articles.forEach((article) => score.push(article.sentiment));
  const avg = score.reduce((sum, value) => sum + value, 0) / articles.length;
  return parseFloat(avg.toFixed(1));
}

/**
 * Assigns and returns a color based on the sentiment value.
 * @return {string} the color of the sentiment.
 */
function getColorGradient() {
  const sentimentValueCount = 20;
  const chromaColor = chroma.scale(['#FED8F7', '#C4DDFE']);
  const gradient = chromaColor.colors(sentimentValueCount);
  const colors = new Map();
  let j = 1;
  for (let i = 0; i <= gradient.length; i++) {
    colors.set(j.toFixed(1), gradient[i]);
    j -= .1;
  }
  return colors;
}

/** Shows preloader on page load and fetches articles. */
function loadPage() {
  retrieveArticles(5, trend);
  setTimeout(showPage, 4000);
  trend.color = getColorGradient();
}
