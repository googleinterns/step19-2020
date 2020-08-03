/* eslint-disable no-unused-vars */
const basePath = "/news";
const numParam = "num=";
const langParam = "lang=";
const longParam = "long=";
const latParam = "lat=";

const trend = {
  content: "",
  currentTrendVal: 1,
  color: "",
};

/** Show and hide nav bar. */
function toggleNavBar() {
  const nav = document.getElementById("nav");
  const main = document.getElementById("main");
  if (nav.style.display === "none" || nav.style.display === "") {
    nav.style.display = "block";
    if (screen.width < 1024) {
      main.style.display = "none";
    }
  } else {
    nav.style.display = "none";
    if (screen.width < 1024) {
      main.style.display = "block";
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
  const oldDot = document.getElementById("dot-" + trend.currentTrendVal);
  const newDot = document.getElementById("dot-" + nextTrend);
  oldDot.style.backgroundColor = "transparent";
  newDot.style.backgroundColor = "rgb(226, 226, 226)";
  trend.currentTrendVal = nextTrend;
  if (trend.content.length === 0) {
    return "";
  } else {
    getArticles(trend.currentTrendVal, trend.content, "video-container");
    getArticles(trend.currentTrendVal, trend.content, "article-container");
    getTrends(trend.currentTrendVal, trend.content);
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
  document.getElementById("preloader").style.display = "none";
  const content = document.getElementById("content");
  content.style.cssText = "display: block; animation: fade-in 2.5s linear";
}

/**
 * Retrieves list of topics and associated articles
 * from the Backend Server in JSON form.
 * @param {number} numArticles The number of articles to retrieve.
 * @param {object} language The Language of the articles being retrieved.
 * @param {object} trend Holds the trends and articles retrieved.
 */
async function retrieveArticles(numArticles, language, trend, lat, long) {
  const location = longParam + long + "&" + latParam + lat;
  const requestURL =
    basePath +
    "?" +
    numParam +
    numArticles +
    "&" +
    langParam +
    language +
    "&" +
    location;
  const response = await fetch(requestURL);
  trend.content = await response.json();
  getArticles(trend.currentTrendVal, trend.content, "video-container");
  getArticles(trend.currentTrendVal, trend.content, "article-container");
  getTrends(trend.currentTrendVal, trend.content);
  getTrendBubbles(trend.content, trend.color);
}

/**
 * Creates an element that represents an video.
 * @param {object} video Contains the video information.
 * @return {HTMLDivElement} The video element.
 */
function createVideoElement(video) {
  const videoElement = document.createElement("div");
  videoElement.className = "video";

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", video.video);

  const titleElement = document.createElement("h1");
  titleElement.className = "headers no-link";
  titleElement.innerText = video.title;

  const descriptionElement = document.createElement("h3");
  descriptionElement.className = "description";
  descriptionElement.innerText = video.description;

  const imageElement = document.createElement("img");
  imageElement.setAttribute("src", video.image);
  imageElement.className = "thumbnail";

  const speechElement = document.createElement("button");
  speechElement.className = "text-to-speech tts-video";
  const textToSpeech = 'textToSpeech("' + video.title + '")';
  speechElement.innerText = "tts";
  speechElement.setAttribute("onclick", textToSpeech);

  linkElement.appendChild(imageElement);
  videoElement.appendChild(titleElement);
  videoElement.appendChild(descriptionElement);
  videoElement.appendChild(linkElement);
  videoElement.appendChild(speechElement);

  return videoElement;
}

/**
 * Displays articles on page.
 * @param {number} val The value corresponding to the current trend.
 * @param {Array} content Array of Topic objects.
 * @param {string} container The name of the id used to add elements to.
 */
function getArticles(val, content, container) {
  const trend = content[val - 1];
  const video = container === "video-container" ? true : false;
  const articles = video ? trend.videos : trend.articles;
  const articleContainer = document.getElementById(container);
  articleContainer.innerHTML = "";
  let right = false;
  articles.forEach((article) => {
    const child = video
      ? createVideoElement(article)
      : createArticleElement(article, right);
    articleContainer.appendChild(child);
    right = !right ? true : false;
  });
}

/**
 * Creates an element that represents an article.
 * @param {object} article Contains the article information.
 * @param {boolean} right Determines whether the article is right-justified.
 * @return {HTMLDivElement} The article element.
 */
function createArticleElement(article, right) {
  const articleElement = document.createElement("div");
  articleElement.className = !right ? "articles" : "articles right-justified";

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", article.link);

  const titleElement = document.createElement("h1");
  titleElement.className = "headers";
  // Removes source from title
  const newEnd = article.title.length - article.source.length - 3;
  const articleTitle = article.title.substring(0, newEnd);
  titleElement.innerText = articleTitle;
  const authorElement = document.createElement("h3");
  authorElement.className = "subHeaders";
  authorElement.innerText = "author: " + article.source;

  const dateElement = document.createElement("h3");
  dateElement.className = "subHeaders";
  dateElement.innerText = "date: " + article.pubDate;

  const speechElement = document.createElement("button");
  speechElement.className = "text-to-speech";
  const textToSpeech = 'textToSpeech("' + article.title + '")';
  speechElement.innerText = "tts";
  speechElement.setAttribute("onclick", textToSpeech);

  linkElement.appendChild(titleElement);
  articleElement.appendChild(linkElement);
  articleElement.appendChild(authorElement);
  articleElement.appendChild(dateElement);
  articleElement.appendChild(speechElement);

  return articleElement;
}

/**
 * Displays trends on page.
 * @param {number} val The value corresponding to the current trend.
 * @param {Array} content Array of Topic objects.
 */
function getTrends(val, content) {
  const trendContainer = document.getElementById("trend-container");
  trendContainer.innerHTML = "";
  const trend = content[val - 1];
  trendContainer.appendChild(createTrendElement(trend.name, val));
}

/**
 * Creates an element that represents a trend.
 * @param {string} trend The trend name.
 * @param {number} val The trend's numerical id value.
 * @return {HTMLDivElement} The trend element.
 * */
function createTrendElement(trend, val) {
  const trendElement = document.createElement("div");
  trendElement.className = "trends";
  trendElement.setAttribute("id", "trend-" + val);
  trendElement.innerText = trend;
  return trendElement;
}

/**
 * Displays trend frequency bubbles on page.
 * @param {Array} content Array of Topic objects.
 * @param {Map} colors Map of sentiments and their color assignments.
 */
function getTrendBubbles(content, colors) {
  const bubbleFirstRow = document.getElementById("frequency-row-1");
  const bubbleSecondRow = document.getElementById("frequency-row-2");
  const bubbleSizes = getTrendBubbleSize(content);
  const sentimentScore = getTrendBubbleScore(content);
  const length = bubbleSizes.size / 2;
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
  const bubbleElement = document.createElement("div");
  bubbleElement.className = "bubbles";
  let style = "";
  style = addStyleProperty(style, "width", size + "vw");
  style = addStyleProperty(style, "height", size + "vw");
  style = addStyleProperty(style, "font-size", size / 10 + "vw");
  style = addStyleProperty(style, "background-color", color);
  bubbleElement.setAttribute("style", style);
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
  return style.concat(property, ":", value, ";");
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
    proportions[i] = content[i].frequency / max;
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
  let maxSize = 23;
  let minSize = 6;
  let size = 20;

  // Adjusts bubble size based on screen width
  if (screen.width < 1024) {
    maxSize = 48;
    minSize = 23;
    size = 35;
  } else if (screen.width < 480) {
    maxSize = 43;
    minSize = 15;
    size = 40;
  }

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
  const sentimentValueCount = 21;
  const chromaColor = chroma.scale(["#C4DDFE", "#FED8F7"]);
  const gradient = chromaColor.colors(sentimentValueCount);
  const colors = new Map();
  let j = 1;
  for (let i = 0; i < gradient.length; i++) {
    colors.set(parseFloat(j.toFixed(1)), gradient[i]);
    j -= 0.1;
  }
  return colors;
}

/**
 * Updates the language on the UI.
 * @param {string} language The language to change to.
 */
function changeLanguage(language) {
  const translation = getTranslation(language);
  const title = document.getElementById("title");
  title.innerText = translation.title;
  title.setAttribute("style", translation.titleStyle);
  document.getElementById("home").innerText = translation.home;
  document.getElementById("trends").innerText = translation.trends;
  document.getElementById("topics").innerText = translation.topics;
  document.getElementById("sentiment-key-title").innerText =
    translation.sentiment;
  document.getElementById("neg").innerText = translation.negative;
  document.getElementById("pos").innerText = translation.positive;
  const sentiment = document.getElementById("sentiment-container");
  sentiment.setAttribute("style", translation.textSize);
}

/**
 * Returns an object with the translated messages and new styles.
 * @param {string} language The language the messages are to be translated into.
 * @return {object} The translated messages and corresponding styles.
 */
function getTranslation(language) {
  let title = "trending topics.";
  let home = "home";
  let trends = "trends";
  let topics = "topics";
  let titleStyle = "";
  let sentiment = "sentiment key";
  let negative = "neg";
  let positive = "pos";
  let textSize = "";
  textSize = addStyleProperty(textSize, "font-size", "2.5vh");

  if (language === "cn") {
    title = "热门话题.";
    home = "主页";
    trends = "趋势";
    topics = "主题";
    sentiment = "情感分数";
    negative = "负";
    positive = "正";
    textSize = addStyleProperty(textSize, "font-size", "4vh");
    if (screen.width >= 1024) {
      titleStyle = addStyleProperty(titleStyle, "font-size", "7vw");
      titleStyle = addStyleProperty(titleStyle, "padding-left", "13vw");
    } else {
      titleStyle = addStyleProperty(titleStyle, "padding-left", "8vw");
    }
  } else if (language === "es") {
    title = "tendencia de los temas.";
    home = "inicio";
    trends = "tendencias";
    topics = "temas";
    sentiment = "puntuación de sentimiento";
    textSize = addStyleProperty(textSize, "font-size", "2.5vh");
    if (screen.width >= 1024) {
      titleStyle = addStyleProperty(titleStyle, "font-size", "5vw");
    }
    titleStyle = addStyleProperty(
      titleStyle,
      "transforms",
      "translate(-23%, -70%)"
    );
  }
  const translation = {
    language: language,
    title: title,
    home: home,
    trends: trends,
    topics: topics,
    titleStyle: titleStyle,
    sentiment: sentiment,
    negative: negative,
    positive: positive,
    textSize: textSize,
  };
  return translation;
}

/** Displays preloader. */
function animatePreloader() {
  const tl = anime.timeline({
    easing: "easeOutExpo",
    duration: 2600,
  });

  tl.add({
    targets: ".square",
    translateX: 200,
    borderRadius: ["0%", "50%"],
    backgroundColor: "#000000",
    easing: "easeInOutQuad",
  });

  tl.add({
    targets: ".square",
    translateY: 200,
    borderRadius: ["50%", "0"],
    backgroundColor: "#4c4c4c",
    easing: "easeInOutQuad",
  });

  tl.add({
    targets: ".square",
    translateX: 0,
    borderRadius: ["0", "50%"],
    borderColor: "rgb(0, 0, 0)",
    backgroundColor: "#b2b2b2",
    easing: "easeInOutQuad",
  });

  tl.add({
    targets: ".square",
    translateY: 0,
    borderRadius: ["50%", "0"],
    backgroundColor: "#ffffff",
    easing: "easeInOutQuad",
  });
}

/** Reads passed in text out loud to the user under the stipulation that they have interacted with the page (pressed a button/ entered a menu).
 * @param {string} text The text that should be read out loud.
 */
function textToSpeech(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.voiceURI = "native";
  msg.volume = 1;
  window.speechSynthesis.speak(msg);
}

/** Prompts user to allow access to location. */
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getArticlesFromLocation);
  } else {
    retrieveArticles(5, "en-us", trend, null, null);
  }
}

/** Gets articles from user location. */
function getArticlesFromLocation(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  retrieveArticles(5, "en-us", trend, lat, long);
}

/** Shows preloader on page load and fetches articles. */
function loadPage() {
  getUserLocation();
  animatePreloader();
  setTimeout(showPage, 10400);
  trend.color = getColorGradient();
}

module.exports = {
  toggleNavBar: toggleNavBar,
  switchTrend: switchTrend,
  getNextTrendValue: getNextTrendValue,
  showPage: showPage,
  getArticles: getArticles,
  createArticleElement: createArticleElement,
  getTrends: getTrends,
  createTrendElement: createTrendElement,
  getSize: getSize,
  getTrendBubbleSize: getTrendBubbleSize,
  addStyleProperty: addStyleProperty,
  createTrendBubble: createTrendBubble,
  getTrendBubbles: getTrendBubbles,
  getTrendBubbleScore: getTrendBubbleScore,
  getAverageSentiment: getAverageSentiment,
};
