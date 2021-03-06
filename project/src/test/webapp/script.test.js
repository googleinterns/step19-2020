const script = require('../../main/webapp/script.js');

/** toggleNavBar - show and hide nav bar. */
describe('Toggle nav bar', () => {
  const nav = document.createElement('nav');
  nav.setAttribute('id', 'nav');
  const main = document.createElement('div');
  main.setAttribute('id', 'main');

  test('Open nav bar desktop', () => {
    nav.setAttribute('style', 'display:none');

    document.body.appendChild(nav);
    document.body.appendChild(main);

    script.toggleNavBar();

    expect(nav.getAttribute('style')).toEqual('display: block;');

    document.body.removeChild(nav);
    document.body.removeChild(main);
  });

  test('Close nav bar desktop', () => {
    nav.setAttribute('style', 'display:block');

    document.body.appendChild(nav);
    document.body.appendChild(main);

    script.toggleNavBar();

    expect(nav.getAttribute('style')).toEqual('display: none;');

    document.body.removeChild(nav);
    document.body.removeChild(main);
  });
});

/** switchTrend - updates trend in carousel and respective
 *  dot based on next/previous buttons. */
describe('Update trend in carousel', () => {
  for (let i = 1; i < 5; i++) {
    const dotElement = document.createElement('div');
    dotElement.className = 'dots';
    dotElement.setAttribute('id', 'dot-' + i.toString());
    document.body.appendChild(dotElement);
  }

  /** Using arrows to change trend. */

  test('Select right on trend 1 hides dot 1 and highlights dot 2', () => {
    script.switchTrend(1, true);
    const dotOne = document.getElementById('dot-1').getAttribute('style');
    const dotTwo = document.getElementById('dot-2').getAttribute('style');
    expect(dotOne).toEqual('background-color: transparent;');
    expect(dotTwo).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select right on trend 2 hides dot 2 and highlights dot 3', () => {
    script.switchTrend(1, true);
    const dotTwo = document.getElementById('dot-2').getAttribute('style');
    const dotThree = document.getElementById('dot-3').getAttribute('style');
    expect(dotTwo).toEqual('background-color: transparent;');
    expect(dotThree).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select right on trend 3 hides dot 3 and highlights dot 4', () => {
    script.switchTrend(1, true);
    const dotThree = document.getElementById('dot-3').getAttribute('style');
    const dotFour = document.getElementById('dot-4').getAttribute('style');
    expect(dotThree).toEqual('background-color: transparent;');
    expect(dotFour).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select right on trend 4 hides dot 4 and highlights dot 1', () => {
    script.switchTrend(1, true);
    const dotFour = document.getElementById('dot-4').getAttribute('style');
    const dotOne = document.getElementById('dot-1').getAttribute('style');
    expect(dotFour).toEqual('background-color: transparent;');
    expect(dotOne).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select left on trend 1 hides dot 1 and highlights dot 4', () => {
    script.switchTrend(-1, true);
    const dotOne = document.getElementById('dot-1').getAttribute('style');
    const dotFour = document.getElementById('dot-4').getAttribute('style');
    expect(dotOne).toEqual('background-color: transparent;');
    expect(dotFour).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select left on trend 4 hides dot 4 and highlights dot 3', () => {
    script.switchTrend(-1, true);
    const dotFour = document.getElementById('dot-4').getAttribute('style');
    const dotThree = document.getElementById('dot-3').getAttribute('style');
    expect(dotFour).toEqual('background-color: transparent;');
    expect(dotThree).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select left on trend 3 hides dot 3 and highlights dot 2', () => {
    script.switchTrend(-1, true);
    const dotThree = document.getElementById('dot-3').getAttribute('style');
    const dotTwo = document.getElementById('dot-2').getAttribute('style');
    expect(dotThree).toEqual('background-color: transparent;');
    expect(dotTwo).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select left on trend 2 hides dot 2 and highlights dot 1', () => {
    script.switchTrend(-1, true);
    const dotTwo = document.getElementById('dot-2').getAttribute('style');
    const dotOne = document.getElementById('dot-1').getAttribute('style');
    expect(dotTwo).toEqual('background-color: transparent;');
    expect(dotOne).toEqual('background-color: rgb(226, 226, 226);');
  });

  /** Using dots to change trend */
  test('Select trend 2 from trend 1 hides dot 1 and highlights dot 2', () => {
    script.switchTrend(2, false);
    const dotOne = document.getElementById('dot-1').getAttribute('style');
    const dotTwo = document.getElementById('dot-2').getAttribute('style');
    expect(dotOne).toEqual('background-color: transparent;');
    expect(dotTwo).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 3 from trend 2 hides dot 2 and highlights dot 3', () => {
    script.switchTrend(3, false);
    const dotTwo = document.getElementById('dot-2').getAttribute('style');
    const dotThree = document.getElementById('dot-3').getAttribute('style');
    expect(dotTwo).toEqual('background-color: transparent;');
    expect(dotThree).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 4 from trend 3 hides dot 3 and highlights dot 4', () => {
    script.switchTrend(4, false);
    const dotThree = document.getElementById('dot-3').getAttribute('style');
    const dotFour = document.getElementById('dot-4').getAttribute('style');
    expect(dotThree).toEqual('background-color: transparent;');
    expect(dotFour).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 1 from trend 4 hides dot 4 and highlights dot 1', () => {
    script.switchTrend(1, false);
    const dotFour = document.getElementById('dot-4').getAttribute('style');
    const dotOne = document.getElementById('dot-1').getAttribute('style');
    expect(dotFour).toEqual('background-color: transparent;');
    expect(dotOne).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 4 from trend 1 hides dot 1 and highlights dot 4', () => {
    script.switchTrend(4, false);
    const dotFour = document.getElementById('dot-4').getAttribute('style');
    const dotOne = document.getElementById('dot-1').getAttribute('style');
    expect(dotOne).toEqual('background-color: transparent;');
    expect(dotFour).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 3 from trend 4 hides dot 4 and highlights dot 3', () => {
    script.switchTrend(3, false);
    const dotFour = document.getElementById('dot-4').getAttribute('style');
    const dotThree = document.getElementById('dot-3').getAttribute('style');
    expect(dotFour).toEqual('background-color: transparent;');
    expect(dotThree).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 2 from trend 3 hides dot 3 and highlights dot 2', () => {
    script.switchTrend(2, false);
    const dotThree = document.getElementById('dot-3').getAttribute('style');
    const dotTwo = document.getElementById('dot-2').getAttribute('style');
    expect(dotThree).toEqual('background-color: transparent;');
    expect(dotTwo).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 1 from dot 2 hides dot 2 and highlights dot 1', () => {
    script.switchTrend(1, false);
    const dotTwo = document.getElementById('dot-2').getAttribute('style');
    const dotOne = document.getElementById('dot-1').getAttribute('style');
    expect(dotTwo).toEqual('background-color: transparent;');
    expect(dotOne).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 3 from dot 1 hides dot 1 and highlights dot 3', () => {
    script.switchTrend(3, false);
    const dotOne = document.getElementById('dot-1').getAttribute('style');
    const dotThree = document.getElementById('dot-3').getAttribute('style');
    expect(dotOne).toEqual('background-color: transparent;');
    expect(dotThree).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 4 from dot 1 hides dot 1 and highlights dot 4', () => {
    script.switchTrend(4, false);
    const dotOne = document.getElementById('dot-1').getAttribute('style');
    const dotFour = document.getElementById('dot-4').getAttribute('style');
    expect(dotOne).toEqual('background-color: transparent;');
    expect(dotFour).toEqual('background-color: rgb(226, 226, 226);');
  });
});

/** getNextTrendValue - returns next trend value in carousel. */
describe('Returns next trend value in carousel', () => {
  test('Select right on trend 1 returns trend 2', () => {
    expect(script.getNextTrendValue(1, 1)).toBe(2);
  });

  test('Select right on trend 2 returns trend 3', () => {
    expect(script.getNextTrendValue(1, 2)).toBe(3);
  });

  test('Select right on trend 3 returns trend 4', () => {
    expect(script.getNextTrendValue(1, 3)).toBe(4);
  });

  test('Select right on trend 4 returns trend 1', () => {
    expect(script.getNextTrendValue(1, 4)).toBe(1);
  });

  test('Select left on trend 1 returns trend 4', () => {
    expect(script.getNextTrendValue(-1, 1)).toBe(4);
  });

  test('Select left on trend 2 returns trend 1', () => {
    expect(script.getNextTrendValue(-1, 2)).toBe(1);
  });

  test('Select left on trend 3 returns trend 2', () => {
    expect(script.getNextTrendValue(-1, 3)).toBe(2);
  });

  test('Select left on trend 4 returns trend 3', () => {
    expect(script.getNextTrendValue(-1, 4)).toBe(3);
  });
});

/** showPage - shows main page after page load. */
describe('Shows main page after page load', () => {
  const preloader = document.createElement('div');
  const content = document.createElement('content');
  preloader.setAttribute('id', 'preloader');
  content.setAttribute('id', 'content');
  document.body.appendChild(preloader);
  document.body.appendChild(content);

  test('Show main page after page load', () => {
    script.showPage();
    const loader = document.getElementById('preloader').getAttribute('style');
    const content = document.getElementById('content').getAttribute('style');
    expect(loader).toEqual('display: none;');
    expect(content).toEqual('display: block; animation: fade-in 2.5s linear;');
  });
});

/** getArticles - displays articles on page. */
describe('displays trends on page', () => {
  const article = {
    link: 'link',
    title: 'title',
    source: 'source',
    pubDate: 'date',
  };
  const articles = [article];
  const topicOne = {articles: articles};
  const topicTwo = {articles: articles};
  const topicThree = {articles: articles};
  const topicFour = {articles: articles};
  const content = [topicOne, topicTwo, topicThree, topicFour];
  const articleContainer = document.createElement('div');
  articleContainer.setAttribute('id', 'article-container');
  document.body.appendChild(articleContainer);

  test('adds articles for trend 1', () => {
    script.getArticles(1, content);
    expect(articleContainer.childNodes.length).toBe(1);
    const articleElement = script.createArticleElement(article, false);
    expect(articleContainer.childNodes[0]).toEqual(articleElement);
    articleContainer.innerHTML = '';
  });

  test('adds articles for trend 2', () => {
    script.getArticles(2, content);
    expect(articleContainer.childNodes.length).toBe(1);
    const articleElement = script.createArticleElement(article, false);
    expect(articleContainer.childNodes[0]).toEqual(articleElement);
    articleContainer.innerHTML = '';
  });

  test('adds articles for trend 3', () => {
    script.getArticles(3, content);
    expect(articleContainer.childNodes.length).toBe(1);
    const articleElement = script.createArticleElement(article, false);
    expect(articleContainer.childNodes[0]).toEqual(articleElement);
    articleContainer.innerHTML = '';
  });

  test('adds articles for trend 4', () => {
    script.getArticles(4, content);
    expect(articleContainer.childNodes.length).toBe(1);
    const articleElement = script.createArticleElement(article, false);
    expect(articleContainer.childNodes[0]).toEqual(articleElement);
    articleContainer.innerHTML = '';
  });
});

/** createArticleElement - creates an element that represents an article. */
describe('creates article elements', () => {
  const article = {
    link: 'link',
    title: 'title - source',
    source: 'source',
    pubDate: 'date',
  };

  test('create left-justified article element', () => {
    const articleElement = script.createArticleElement(article, false);

    // checks container element is created correctly with 3 child nodes
    expect(articleElement.nodeName).toEqual('DIV');
    expect(articleElement.getAttribute('class')).toEqual('articles');
    expect(articleElement.childNodes.length).toBe(3);
  });

  test('create right-justified article element', () => {
    const articleElement = script.createArticleElement(article, true);
    const expectedClass = 'articles right-justified';

    // checks container element is created correctly with 3 child nodes
    expect(articleElement.nodeName).toEqual('DIV');
    expect(articleElement.getAttribute('class')).toEqual(expectedClass);
    expect(articleElement.childNodes.length).toBe(3);
  });

  test('check child nodes of left-justified article element', () => {
    const articleElement = script.createArticleElement(article, false);

    const linkElement = articleElement.childNodes[0];
    const authorElement = articleElement.childNodes[1];
    const dateElement = articleElement.childNodes[2];

    // checks link element is created correctly with 1 child node
    expect(linkElement.nodeName).toEqual('A');
    expect(linkElement.getAttribute('href')).toEqual('link');
    expect(linkElement.childNodes.length).toBe(1);

    const titleElement = linkElement.childNodes[0];

    // checks all child nodes are created correctly
    expect(titleElement.nodeName).toEqual('H1');
    expect(authorElement.nodeName).toEqual('H3');
    expect(dateElement.nodeName).toEqual('H3');
    expect(titleElement.innerText).toEqual('title');
    expect(authorElement.innerText).toEqual('author: source');
    expect(dateElement.innerText).toEqual('date: date');
  });

  test('check child nodes of right-justified article element', () => {
    const articleElement = script.createArticleElement(article, true);

    const linkElement = articleElement.childNodes[0];
    const authorElement = articleElement.childNodes[1];
    const dateElement = articleElement.childNodes[2];

    // checks link element is created correctly with 1 child node
    expect(linkElement.nodeName).toEqual('A');
    expect(linkElement.getAttribute('href')).toEqual('link');
    expect(linkElement.childNodes.length).toBe(1);

    const titleElement = linkElement.childNodes[0];

    // checks all child nodes are created correctly
    expect(titleElement.nodeName).toEqual('H1');
    expect(authorElement.nodeName).toEqual('H3');
    expect(dateElement.nodeName).toEqual('H3');
    expect(titleElement.innerText).toEqual('title');
    expect(authorElement.innerText).toEqual('author: source');
    expect(dateElement.innerText).toEqual('date: date');
  });
});

/** getTrends - displays trends on page. */
describe('displays trends on page', () => {
  const topicOne = {name: 'trend 1'};
  const topicTwo = {name: 'trend 2'};
  const topicThree = {name: 'trend 3'};
  const topicFour = {name: 'trend 4'};
  const content = [topicOne, topicTwo, topicThree, topicFour];
  const trendContainer = document.createElement('div');
  trendContainer.setAttribute('id', 'trend-container');
  document.body.appendChild(trendContainer);

  test('adds trend 1', () => {
    script.getTrends(1, content);
    expect(trendContainer.childNodes.length).toBe(1);
    const trendElement = script.createTrendElement('trend', 1);
    expect(trendContainer.childNodes[0]).toEqual(trendElement);
  });

  test('adds trend 2', () => {
    script.getTrends(2, content);
    expect(trendContainer.childNodes.length).toBe(1);
    const trendElement = script.createTrendElement('trend', 2);
    expect(trendContainer.childNodes[0]).toEqual(trendElement);
  });

  test('adds trend 3', () => {
    script.getTrends(3, content);
    expect(trendContainer.childNodes.length).toBe(1);
    const trendElement = script.createTrendElement('trend', 3);
    expect(trendContainer.childNodes[0]).toEqual(trendElement);
  });

  test('adds trend 4', () => {
    script.getTrends(4, content);
    expect(trendContainer.childNodes.length).toBe(1);
    const trendElement = script.createTrendElement('trend', 4);
    expect(trendContainer.childNodes[0]).toEqual(trendElement);
  });
});

/** createTrendElement - creates an element that represents a trend. */
describe('creates trend elements', () => {
  test('create first trend element', () => {
    const trendElement = script.createTrendElement('trend 1', 1);
    expect(trendElement.nodeName).toEqual('DIV');
    expect(trendElement.className).toEqual('trends');
    expect(trendElement.getAttribute('id')).toEqual('trend-1');
    expect(trendElement.innerText).toEqual('trend 1');
  });

  test('create second trend element', () => {
    const trendElement = script.createTrendElement('trend 2', 2);
    expect(trendElement.nodeName).toEqual('DIV');
    expect(trendElement.className).toEqual('trends');
    expect(trendElement.getAttribute('id')).toEqual('trend-2');
    expect(trendElement.innerText).toEqual('trend 2');
  });

  test('create third trend element', () => {
    const trendElement = script.createTrendElement('trend 3', 3);
    expect(trendElement.nodeName).toEqual('DIV');
    expect(trendElement.className).toEqual('trends');
    expect(trendElement.getAttribute('id')).toEqual('trend-3');
    expect(trendElement.innerText).toEqual('trend 3');
  });

  test('create fourth trend element', () => {
    const trendElement = script.createTrendElement('trend 4', 4);
    expect(trendElement.nodeName).toEqual('DIV');
    expect(trendElement.className).toEqual('trends');
    expect(trendElement.getAttribute('id')).toEqual('trend-4');
    expect(trendElement.innerText).toEqual('trend 4');
  });
});

/** getTrendBubbles - displays trend frequency bubbles on page. */
describe('displays trend frequency bubbles', () => {
  const color = new Map();
  color.set(1.0, 'pink');
  const article = {
    link: 'link',
    title: 'title',
    source: 'source',
    pubDate: 'date',
    sentiment: 1.0,
  };
  const articles = [article];
  const bubbleFirstRow = document.createElement('div');
  const bubbleSecondRow = document.createElement('div');
  bubbleFirstRow.setAttribute('id', 'frequency-row-1');
  bubbleSecondRow.setAttribute('id', 'frequency-row-2');
  document.body.appendChild(bubbleFirstRow);
  document.body.appendChild(bubbleSecondRow);
  const topicOne = {frequency: 5000, name: 'topicOne', articles: articles};
  const topicTwo = {frequency: 5000, name: 'topicTwo', articles: articles};
  const topicThree = {frequency: 5000, name: 'topicThree', articles: articles};
  const topicFour = {frequency: 5000, name: 'topicFour', articles: articles};
  const content = [topicOne, topicTwo, topicThree, topicFour];

  test('displays trend frequency bubbles', () => {
    const bubbleElementOne = script.createTrendBubble('trend-1', 20, 'pink');
    const bubbleElementTwo = script.createTrendBubble('trend-2', 20, 'pink');
    const bubbleElementThree = script.createTrendBubble('trend-3', 20, 'pink');
    const bubbleElementFour = script.createTrendBubble('trend-4', 20, 'pink');
    script.getTrendBubbles(content, color);
    expect(bubbleFirstRow.childNodes.length).toBe(2);
    expect(bubbleSecondRow.childNodes.length).toBe(2);
    expect(bubbleFirstRow.childNodes[0]).toEqual(bubbleElementOne);
    expect(bubbleFirstRow.childNodes[1]).toEqual(bubbleElementTwo);
    expect(bubbleSecondRow.childNodes[0]).toEqual(bubbleElementThree);
    expect(bubbleSecondRow.childNodes[1]).toEqual(bubbleElementFour);
  });
});

/** createTrendBubble - creates an element that
 *  represents a trend and its frequency. */
describe('creates a trend bubble element', () => {
  test('create trend 1', () => {
    const trendBubble = script.createTrendBubble('trendOne', 20, 'pink');
    let expectedStyle = 'width:20vw;height:20vw;font-size:2vw;';
    expectedStyle = expectedStyle.concat('background-color:pink;');
    expect(trendBubble.nodeName).toEqual('DIV');
    expect(trendBubble.className).toEqual('bubbles');
    expect(trendBubble.getAttribute('style')).toEqual(expectedStyle);
    expect(trendBubble.innerText).toEqual('trendOne');
  });
});

/** addStyleProperty - adds a property to an element's style. */
describe('add style property', () => {
  test('add width', () => {
    const noStyle = '';
    const withStyle = script.addStyleProperty(noStyle, 'width', '50vw');
    expect(withStyle).toEqual('width:50vw;');
  });

  test('add height', () => {
    const noStyle = '';
    const withStyle = script.addStyleProperty(noStyle, 'height', '50vw');
    expect(withStyle).toEqual('height:50vw;');
  });

  test('add font-size', () => {
    const noStyle = '';
    const withStyle = script.addStyleProperty(noStyle, 'font-size', '12px');
    expect(withStyle).toEqual('font-size:12px;');
  });

  test('add width', () => {
    const noStyle = '';
    const property = 'background-color';
    const withStyle = script.addStyleProperty(noStyle, property, 'pink');
    expect(withStyle).toEqual('background-color:pink;');
  });
});

/** getTrendBubbleSize - returns a map with trends
 *  and their respective bubble size. */
describe('returns a map with trend and bubble size', () => {
  const topicOne = {frequency: 5000, name: 'topicOne'};
  const topicTwo = {frequency: 5000, name: 'topicTwo'};
  const topicThree = {frequency: 5000, name: 'topicThree'};
  const topicFour = {frequency: 5000, name: 'topicFour'};
  const content = [topicOne, topicTwo, topicThree, topicFour];
  const expectedSize = new Map();
  expectedSize.set('topicOne', 20);
  expectedSize.set('topicTwo', 20);
  expectedSize.set('topicThree', 20);
  expectedSize.set('topicFour', 20);

  test('same size large', () => {
    const size = script.getTrendBubbleSize(content);
    expect(size).toEqual(expectedSize);
  });

  test('same size small', () => {
    topicOne.frequency = 1;
    topicTwo.frequency = 1;
    topicThree.frequency = 1;
    topicFour.frequency = 1;
    const size = script.getTrendBubbleSize(content);
    expect(size).toEqual(expectedSize);
  });

  test('one small, three large', () => {
    topicOne.frequency = 1;
    topicTwo.frequency = 5000;
    topicThree.frequency = 5000;
    topicFour.frequency = 5000;
    const size = script.getTrendBubbleSize(content);
    expectedSize.set('topicOne', 6);
    expectedSize.set('topicTwo', 23);
    expectedSize.set('topicThree', 23);
    expectedSize.set('topicFour', 23);

    expect(size).toEqual(expectedSize);
  });

  test('two small, two large', () => {
    topicOne.frequency = 1;
    topicTwo.frequency = 1;
    topicThree.frequency = 5000;
    topicFour.frequency = 5000;
    const size = script.getTrendBubbleSize(content);
    expectedSize.set('topicOne', 6);
    expectedSize.set('topicTwo', 6);
    expectedSize.set('topicThree', 23);
    expectedSize.set('topicFour', 23);

    expect(size).toEqual(expectedSize);
  });

  test('three small, one large', () => {
    topicOne.frequency = 1;
    topicTwo.frequency = 1;
    topicThree.frequency = 1;
    topicFour.frequency = 50000;
    const size = script.getTrendBubbleSize(content);
    expectedSize.set('topicOne', 6);
    expectedSize.set('topicTwo', 6);
    expectedSize.set('topicThree', 6);
    expectedSize.set('topicFour', 23);

    expect(size).toEqual(expectedSize);
  });

  test('all different sizes', () => {
    topicOne.frequency = 20000;
    topicTwo.frequency = 30000;
    topicThree.frequency = 40000;
    topicFour.frequency = 50000;
    const size = script.getTrendBubbleSize(content);
    expectedSize.set('topicOne', 6);
    expectedSize.set('topicTwo', 12);
    expectedSize.set('topicThree', 17);
    expectedSize.set('topicFour', 23);

    expect(size).toEqual(expectedSize);
  });
});

/** getSize - calculates and returns the bubble size. */
describe('calculates bubble size', () => {
  test('same size', () => {
    const size = script.getSize(50000, 50000, 50000);
    expect(size).toBe(20);
  });

  test('min', () => {
    const size = script.getSize(1, 50000, 1);
    expect(size).toBe(6);
  });

  test('max', () => {
    const size = script.getSize(50000, 50000, 1);
    expect(size).toBe(23);
  });

  test('median', () => {
    const size = script.getSize(30000, 50000, 10000);
    expect(size).toBe(15);
  });
});

/** getTrendBubbleScore - returns a map of the trends
 * and their respective sentiment scores. */
describe('returns a map of trends and sentiment scores', () => {
  const article = {
    link: 'link',
    title: 'title',
    source: 'source',
    pubDate: 'date',
    sentiment: 1.0,
  };
  const articles = [article];
  const topicOne = {frequency: 5000, name: 'topicOne', articles: articles};
  const topicTwo = {frequency: 5000, name: 'topicTwo', articles: articles};
  const topicThree = {frequency: 5000, name: 'topicThree', articles: articles};
  const topicFour = {frequency: 5000, name: 'topicFour', articles: articles};
  const content = [topicOne, topicTwo, topicThree, topicFour];

  test('add trends and sentiment value to map', () => {
    const score = script.getTrendBubbleScore(content);
    const expectedScore = new Map();
    expectedScore.set('topicOne', 1.0);
    expectedScore.set('topicTwo', 1.0);
    expectedScore.set('topicThree', 1.0);
    expectedScore.set('topicFour', 1.0);
    expect(score).toEqual(expectedScore);
  });
});

/** getAverageSentiment - returns the average of
 * the sentiment scores of all the articles. */
describe('returns average sentiment score of a given trend', () => {
  test('all positive scores', () => {
    const article = {
      name: 'article',
      sentiment: .7,
    };
    const articles = [article, article, article];
    const avg = script.getAverageSentiment(articles);
    expect(avg).toBe(0.7);
  });

  test('all negative scores', () => {
    const articleOne = {
      name: 'article',
      sentiment: -.7,
    };
    const articleTwo = {
      name: 'article',
      sentiment: -.7,
    };
    const articleThree = {
      name: 'article',
      sentiment: -.7,
    };
    const articles = [articleOne, articleTwo, articleThree];
    const avg = script.getAverageSentiment(articles);
    expect(avg).toBe(-0.7);
  });

  test('different positive scores', () => {
    const articleOne = {
      name: 'article',
      sentiment: .7,
    };
    const articleTwo = {
      name: 'article',
      sentiment: .5,
    };
    const articleThree = {
      name: 'article',
      sentiment: .9,
    };
    const articles = [articleOne, articleTwo, articleThree];
    const avg = script.getAverageSentiment(articles);
    expect(avg).toBe(0.7);
  });

  test('different negative scores', () => {
    const articleOne = {
      name: 'article',
      sentiment: -.7,
    };
    const articleTwo = {
      name: 'article',
      sentiment: -.5,
    };
    const articleThree = {
      name: 'article',
      sentiment: -.9,
    };
    const articles = [articleOne, articleTwo, articleThree];
    const avg = script.getAverageSentiment(articles);
    expect(avg).toBe(-0.7);
  });

  test('mixed positive and negative scores', () => {
    const articleOne = {
      name: 'article',
      sentiment: -.7,
    };
    const articleTwo = {
      name: 'article',
      sentiment: .7,
    };
    const articleThree = {
      name: 'article',
      sentiment: -.9,
    };
    const articles = [articleOne, articleTwo, articleThree];
    const avg = script.getAverageSentiment(articles);
    expect(avg).toBe(-.3);
  });
});
