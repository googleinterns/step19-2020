const script = require('../../main/webapp/script.js');

/** toggleNavBar - show and hide nav bar. */
describe('Toggle nav bar', () => {
  const nav = document.createElement('nav');
  nav.setAttribute('id','nav');
  const main = document.createElement('div');
  main.setAttribute('id','main');

  test('Open nav bar desktop', () => {
    nav.setAttribute('style','display:none');

    document.body.appendChild(nav);
    document.body.appendChild(main);

    script.toggleNavBar();

    expect(nav.getAttribute('style')).toEqual('display: block;');

    document.body.removeChild(nav);
    document.body.removeChild(main);
  });

  test('Close nav bar desktop', () => {
    nav.setAttribute('style','display:block');

    document.body.appendChild(nav);
    document.body.appendChild(main);

    script.toggleNavBar();

    expect(nav.getAttribute('style')).toEqual('display: none;');

    document.body.removeChild(nav);
    document.body.removeChild(main);
  });
});

/** switchTrend - updates trend in carousel and respective dot based on next/previous buttons. */
describe('Update trend in carousel', () => {
  for(var i = 1; i < 5; i++) {
    const dotElement = document.createElement('div');
    dotElement.className = 'dots';
    dotElement.setAttribute('id','dot-' + i.toString());
    document.body.appendChild(dotElement);
  }

  /** Using arrows to change trend. */

  test('Select right on trend 1 hides dot 1 and highlights dot 2', () => {  
    script.switchTrend(1,true);
    expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);'); 
  });

  test('Select right on trend 2 hides dot 2 and highlights dot 3', () => {
    script.switchTrend(1,true);  
    expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select right on trend 3 hides dot 3 and highlights dot 4', () => {
    script.switchTrend(1,true);  
    expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select right on trend 4 hides dot 4 and highlights dot 1', () => {
    script.switchTrend(1,true);  
    expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select left on trend 1 hides dot 1 and highlights dot 4', () => {
    script.switchTrend(-1,true);  
    expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select left on trend 4 hides dot 4 and highlights dot 3', () => {
    script.switchTrend(-1,true);  
    expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });
  
  test('Select left on trend 3 hides dot 3 and highlights dot 2', () => {
    script.switchTrend(-1,true);  
    expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select left on trend 2 hides dot 2 and highlights dot 1', () => {
    script.switchTrend(-1,true);  
    expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  /** Using dots to change trend */ 

  test('Select trend 2 from trend 1 hides dot 1 and highlights dot 2', () => {  
    script.switchTrend(2,false);
    expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);'); 
  });

  test('Select trend 3 from trend 2 hides dot 2 and highlights dot 3', () => {
    script.switchTrend(3,false);  
    expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 4 from trend 3 hides dot 3 and highlights dot 4', () => {
    script.switchTrend(4,false);  
    expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 1 from trend 4 hides dot 4 and highlights dot 1', () => {
    script.switchTrend(1,false);  
    expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 4 from trend 1 hides dot 1 and highlights dot 4', () => {
    script.switchTrend(4,false);  
    expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 3 from trend 4 hides dot 4 and highlights dot 3', () => {
    script.switchTrend(3,false);  
    expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });
  
  test('Select trend 2 from trend 3 hides dot 3 and highlights dot 2', () => {
    script.switchTrend(2,false);  
    expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 1 from dot 2 hides dot 2 and highlights dot 1', () => {
    script.switchTrend(1,false);  
    expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 3 from dot 1 hides dot 1 and highlights dot 3', () => {
    script.switchTrend(3,false);  
    expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select trend 4 from dot 1 hides dot 1 and highlights dot 4', () => {
    script.switchTrend(4,false);  
    expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });
});

/** getNextTrendValue - returns next trend value in carousel. */
describe('Returns next trend value in carousel', () => {
  test('Select right on trend 1 returns trend 2', () => {
    expect(script.getNextTrendValue(1,1)).toBe(2);
  });

  test('Select right on trend 2 returns trend 3', () => {
    expect(script.getNextTrendValue(1,2)).toBe(3);
  });

  test('Select right on trend 3 returns trend 4', () => {
    expect(script.getNextTrendValue(1,3)).toBe(4);
  });

  test('Select right on trend 4 returns trend 1', () => {
    expect(script.getNextTrendValue(1,4)).toBe(1);
  });

  test('Select left on trend 1 returns trend 4', () => {
    expect(script.getNextTrendValue(-1,1)).toBe(4);
  });

  test('Select left on trend 2 returns trend 1', () => {
    expect(script.getNextTrendValue(-1,2)).toBe(1);
  });

  test('Select left on trend 3 returns trend 2', () => {
    expect(script.getNextTrendValue(-1,3)).toBe(2);
  });

  test('Select left on trend 4 returns trend 3', () => {
    expect(script.getNextTrendValue(-1,4)).toBe(3);
  });
});

/** showPage - shows main page after page load. */
describe('Shows main page after page load', () => {
  const preloader = document.createElement('div');
  const content = document.createElement('content');
  preloader.setAttribute('id','preloader');
  content.setAttribute('id','content');
  document.body.appendChild(preloader);
  document.body.appendChild(content);

  test('Show main page after page load', () => {
    script.showPage();
    expect(document.getElementById('preloader').getAttribute('style')).toEqual('display: none;');
    expect(document.getElementById('content').getAttribute('style')).toEqual('display: block; animation: fade-in 2.5s linear;');
  });  
});

/** getArticles - displays articles on page. */
describe('displays trends on page', () => {
  const article = { link: 'link', title: 'title', source: 'source', pubDate: 'date' };
  const articles = [article];
  const topicOne = { articles: articles };
  const topicTwo = { articles: articles };
  const topicThree = { articles: articles };
  const topicFour = { articles: articles };
  const content = [topicOne,topicTwo,topicThree,topicFour];
  const articleContainer = document.createElement('div');
  articleContainer.setAttribute('id','article-container');
  document.body.appendChild(articleContainer);
  
  test('adds articles for trend 1', () => {
    script.getArticles(1,content);
    expect(articleContainer.childNodes.length).toBe(1);
    const articleElement = script.createArticleElement(article.link,article.title,article.source,article.pubDate);
    expect(articleContainer.childNodes[0]).toEqual(articleElement);
  });  

  test('adds articles for trend 2', () => {
    script.getArticles(2,content);
    expect(articleContainer.childNodes.length).toBe(1);
    const articleElement = script.createArticleElement(article.link,article.title,article.source,article.pubDate);
    expect(articleContainer.childNodes[0]).toEqual(articleElement);
  });  

  test('adds articles for trend 3', () => {
    script.getArticles(3,content);
    expect(articleContainer.childNodes.length).toBe(1);
    const articleElement = script.createArticleElement(article.link,article.title,article.source,article.pubDate);
    expect(articleContainer.childNodes[0]).toEqual(articleElement);
  });  

  test('adds articles for trend 4', () => {
    script.getArticles(4,content);
    expect(articleContainer.childNodes.length).toBe(1);
    const articleElement = script.createArticleElement(article.link,article.title,article.source,article.pubDate);
    expect(articleContainer.childNodes[0]).toEqual(articleElement);
  });  
});

/** createArticleElement - creates an element that represents an article. */
describe('creates article elements', () => {
  test('create left-justified article element', () => {
    const articleElement = script.createArticleElement('link','title - source','source','date',false);

    // checks container element is created correctly with 3 child nodes
    expect(articleElement.nodeName).toEqual('DIV');
    expect(articleElement.getAttribute('class')).toEqual('articles');
    expect(articleElement.childNodes.length).toBe(3);
  });

  test('create right-justified article element', () => {
    const articleElement = script.createArticleElement('link','title - source','source','date',true);

    // checks container element is created correctly with 3 child nodes
    expect(articleElement.nodeName).toEqual('DIV');
    expect(articleElement.getAttribute('class')).toEqual('articles right-justified');
    expect(articleElement.childNodes.length).toBe(3);
  });

  test('check child nodes of left-justified article element', () => {
    const articleElement = script.createArticleElement('link','title - source','source','date',false);

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
    const articleElement = script.createArticleElement('link','title - source','source','date',true);
    
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
  const topicOne = { name: 'trend 1' };
  const topicTwo = { name: 'trend 2' };
  const topicThree = { name: 'trend 3' };
  const topicFour = { name: 'trend 4' };
  const content = [topicOne,topicTwo,topicThree,topicFour];
  const trendContainer = document.createElement('div');
  trendContainer.setAttribute('id','trend-container');
  document.body.appendChild(trendContainer);

  test('adds trend 1', () => {
    script.getTrends(1, content);
    expect(trendContainer.childNodes.length).toBe(1);
    const trendElement = script.createTrendElement('trend',1);
    expect(trendContainer.childNodes[0]).toEqual(trendElement);
  });

  test('adds trend 2', () => {
    script.getTrends(2, content);
    expect(trendContainer.childNodes.length).toBe(1);
    const trendElement = script.createTrendElement('trend',2);
    expect(trendContainer.childNodes[0]).toEqual(trendElement);
  });

  test('adds trend 3', () => {
    script.getTrends(3, content);
    expect(trendContainer.childNodes.length).toBe(1);
    const trendElement = script.createTrendElement('trend',3);
    expect(trendContainer.childNodes[0]).toEqual(trendElement);
  });

  test('adds trend 4', () => {
    script.getTrends(4, content);
    expect(trendContainer.childNodes.length).toBe(1);
    const trendElement = script.createTrendElement('trend',4);
    expect(trendContainer.childNodes[0]).toEqual(trendElement);
  });
});

/** createTrendElement - creates an element that represents a trend. */
describe('creates trend elements', () => {
  test('create first trend element', () => {
    const trendElement = script.createTrendElement('trend 1',1);
    expect(trendElement.nodeName).toEqual('DIV');
    expect(trendElement.className).toEqual('trends');
    expect(trendElement.getAttribute('id')).toEqual('trend-1');
    expect(trendElement.innerText).toEqual('trend 1');
  });
  
  test('create second trend element', () => {
    const trendElement = script.createTrendElement('trend 2',2);
    expect(trendElement.nodeName).toEqual('DIV');
    expect(trendElement.className).toEqual('trends');
    expect(trendElement.getAttribute('id')).toEqual('trend-2');
    expect(trendElement.innerText).toEqual('trend 2');
  });

  test('create third trend element', () => {
    const trendElement = script.createTrendElement('trend 3',3);
    expect(trendElement.nodeName).toEqual('DIV');
    expect(trendElement.className).toEqual('trends');
    expect(trendElement.getAttribute('id')).toEqual('trend-3');
    expect(trendElement.innerText).toEqual('trend 3');
  });

  test('create fourth trend element', () => {
    const trendElement = script.createTrendElement('trend 4',4);
    expect(trendElement.nodeName).toEqual('DIV');
    expect(trendElement.className).toEqual('trends');
    expect(trendElement.getAttribute('id')).toEqual('trend-4');
    expect(trendElement.innerText).toEqual('trend 4');
  });
});

