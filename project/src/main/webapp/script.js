const basePath = '/news';
const numParam = 'num=';
var content = '';

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
function switchTrend(val) {
  var trends = document.getElementsByClassName('trends');
  var dots = document.getElementsByClassName('dots');
  var i = 0;
  var updatedCurrentSlide = false;
  while(i < trends.length && !updatedCurrentSlide) {
    if(trends[i].style.display === 'block') {
      var nextTrend = getNextTrendValue(trends[i],val);
      trends[i].style.display = 'none';
      dots[i].style.backgroundColor = 'transparent';
      document.getElementById('trend-' + nextTrend).style.display = 'block';
      document.getElementById('dot-' + nextTrend).style.backgroundColor='rgb(226, 226, 226)';
      getArticles(nextTrend);
      updatedCurrentSlide = true;
    }
    i+=1;
  }
}

/** Returns next trend value in carousel. */
function getNextTrendValue(trend, val) {
  var nextSlide = -1;
  var currentTrendVal = parseInt(trend.getAttribute('value'));
  // Clicking left on the first slide returns to last slide
  if (currentTrendVal + val === 0) {
    nextSlide = 4;
  // Clicking right on the last slide returns to first slide  
  } else if (currentTrendVal + val === 5) {
    nextSlide = 1;
  } else {
    nextSlide = currentTrendVal + val;
  }
  return nextSlide;
}

/** Updates trend in carousel based on dot controls. */
function updateCurrentSlide(val) {
  var trends = document.getElementsByClassName('trends');
  var dots = document.getElementsByClassName('dots');
  for (var i = 0; i < trends.length; i++) {
    trends[i].style.display = 'none';
    dots[i].style.backgroundColor = 'transparent';
  }
  var newTrend = document.getElementById('trend-' + val);
  newTrend.style.display = 'block';
  document.getElementById('dot-' + val).style.backgroundColor = 'rgb(226, 226, 226)';
  getArticles(val);
} 

/** Shows main page after page load. */
function showPage() {
  document.getElementById('preloader').style.display = 'none';
  var content = document.getElementById('content')
  content.style.cssText = 'display: block; animation: fade-in 2.5s linear';
}

/** Retrieves list of topics and associated articles from the Backend Server in JSON form. */
async function retrieveArticles(numArticles) {
  const requestURL = basePath + '?' + numParam + numArticles;
  const response = await fetch(requestURL);
  content = await response.json();
  getArticles(1);
  console.log(content);
}

/** Displays articles on page. */
function getArticles(val) {
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
  const href = document.createAttribute('href');
  href.value = article.link;
  linkElement.setAttributeNode(href);

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

/** Shows preloader on page load and fetches articles. */
function loadPage() {
  retrieveArticles(5);
  setTimeout(showPage, 4000);
}