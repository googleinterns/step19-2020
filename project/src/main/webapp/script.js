/** Show and hide nav bar. */
function toggleNavBar() {
  const nav = document.getElementById('nav');
  if (nav.style.display === 'none') {
    nav.style.display = 'block';
  } else {
    nav.style.display = 'none';
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