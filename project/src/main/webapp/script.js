function switchTrend(val) {
  var trends = document.getElementsByClassName('trends');
  var i = 0;
  var updatedCurrentSlide = false;
  while(i < trends.length && !updatedCurrentSlide) {
    if(trends[i].style.display === 'block') {
      var nextTrend = getNextTrend(trends[i],val);
      trends[i].style.display = 'none';
      nextTrend.style.display = 'block';
      updatedCurrentSlide = true;
    }
    i+=1;
  }
}

function getNextTrend(trend, val) {
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
  return document.getElementById('trend-' + nextSlide);
}
