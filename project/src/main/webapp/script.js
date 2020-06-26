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
} 

/** Shows the preloader on page load. */
function showPreloader() {
  setTimeout(showPage, 3000);
}

/** Shows main page after page load. */
function showPage() {
  document.getElementById('preloader').style.display = 'none';
  var content = document.getElementById('content')
  content.style.cssText = 'display: block; animation: fade-in 2.5s linear';
}

/** Retrieves list of topics and associated articles from the Backend Server in JSON form. */
async function retrieveArticles(numArticles) {
  const requestURL = '/news?num=' + numArticles;
  const response = await fetch(requestURL);
  const content = await response.json();
}