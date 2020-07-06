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
    const trendElement = document.createElement('div');
    trendElement.className = 'trends';
    trendElement.setAttribute('id','trend-' + i.toString());
    trendElement.setAttribute('value',i.toString());
    if (i === 1) trendElement.setAttribute('style', 'display: block;');
    const dotElement = document.createElement('div');
    dotElement.className = 'dots';
    dotElement.setAttribute('id','dot-' + i.toString());
    document.body.appendChild(trendElement);
    document.body.appendChild(dotElement);
  }
  test('Select right from trend 1 displays trend 2 and highlights dot 2', () => {  
    script.switchTrend(1);
    content.get.mockResolvedValue(1);
    expect(document.getElementById('trend-1').getAttribute('style')).toEqual('display: none;');
    expect(document.getElementById('trend-2').getAttribute('style')).toEqual('display: block;');
    expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);'); 
  });

  test('Select right from trend 2 displays trend 3 and highlights dot 3', () => {
    script.switchTrend(1);  
    expect(document.getElementById('trend-2').getAttribute('style')).toEqual('display: none;');
    expect(document.getElementById('trend-3').getAttribute('style')).toEqual('display: block;');
    expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select right from trend 3 displays trend 4 and highlights dot 4', () => {
    script.switchTrend(1);  
    expect(document.getElementById('trend-3').getAttribute('style')).toEqual('display: none;');
    expect(document.getElementById('trend-4').getAttribute('style')).toEqual('display: block;');
    expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select right from trend 4 displays trend 1 and highlights dot 1', () => {
    script.switchTrend(1);  
    expect(document.getElementById('trend-4').getAttribute('style')).toEqual('display: none;');
    expect(document.getElementById('trend-1').getAttribute('style')).toEqual('display: block;');
    expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select left from trend 1 displays trend 4 and highlights dot 4', () => {
    script.switchTrend(-1);  
    expect(document.getElementById('trend-1').getAttribute('style')).toEqual('display: none;');
    expect(document.getElementById('trend-4').getAttribute('style')).toEqual('display: block;');
    expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select left from trend 4 displays trend 3 and highlights dot 3', () => {
    script.switchTrend(-1);  
    expect(document.getElementById('trend-4').getAttribute('style')).toEqual('display: none;');
    expect(document.getElementById('trend-3').getAttribute('style')).toEqual('display: block;');
    expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });
  
  test('Select left from trend 3 displays trend 2 and highlights dot 2', () => {
    script.switchTrend(-1);  
    expect(document.getElementById('trend-3').getAttribute('style')).toEqual('display: none;');
    expect(document.getElementById('trend-2').getAttribute('style')).toEqual('display: block;');
    expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });

  test('Select left from trend 2 displays trend 1 and highlights dot 1', () => {
    script.switchTrend(-1);  
    expect(document.getElementById('trend-2').getAttribute('style')).toEqual('display: none;');
    expect(document.getElementById('trend-1').getAttribute('style')).toEqual('display: block;');
    expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: transparent;');
    expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
  });
});

// /** getNextTrendValue - returns next trend value in carousel. */
// describe('Returns next trend value in carousel', () => {
//   const mockElement = document.createElement('div');
//   mockElement.className = 'trends';

//   test('Select right on trend 1 returns trend 2', () => {
//     mockElement.setAttribute('id','trend-1');
//     mockElement.setAttribute('value','1');
//     expect(script.getNextTrendValue(mockElement,1)).toBe(2);
//   });

//   test('Select right on trend 2 returns trend 3', () => {
//     mockElement.setAttribute('id','trend-2');
//     mockElement.setAttribute('value','2');
//     expect(script.getNextTrendValue(mockElement,1)).toBe(3);
//   });

//   test('Select right on trend 3 returns trend 4', () => {
//     mockElement.setAttribute('id','trend-3');
//     mockElement.setAttribute('value','3');
//     expect(script.getNextTrendValue(mockElement,1)).toBe(4);
//   });

//   test('Select right on trend 4 returns trend 1', () => {
//     mockElement.setAttribute('id','trend-4');
//     mockElement.setAttribute('value','4');
//     expect(script.getNextTrendValue(mockElement,1)).toBe(1);
//   });

//   test('Select left on trend 1 returns trend 4', () => {
//     mockElement.setAttribute('id','trend-1');
//     mockElement.setAttribute('value','1');
//     expect(script.getNextTrendValue(mockElement,-1)).toBe(4);
//   });

//   test('Select left on trend 2 returns trend 1', () => {
//     mockElement.setAttribute('id','trend-2');
//     mockElement.setAttribute('value','2');
//     expect(script.getNextTrendValue(mockElement,-1)).toBe(1);
//   });

//   test('Select left on trend 3 returns trend 2', () => {
//     mockElement.setAttribute('id','trend-3');
//     mockElement.setAttribute('value','3');
//     expect(script.getNextTrendValue(mockElement,-1)).toBe(2);
//   });

//   test('Select left on trend 4 returns trend 3', () => {
//     mockElement.setAttribute('id','trend-4');
//     mockElement.setAttribute('value','4');
//     expect(script.getNextTrendValue(mockElement,-1)).toBe(3);
//   });
// });

// /** updateCurrentSlide. */
// describe('Updates trend in carousel based on dot controls', () => {
//   for(var i = 1; i < 5; i++) {
//     const trendElement = document.createElement('div');
//     trendElement.className = 'trends';
//     trendElement.setAttribute('id','trend-' + i.toString());
//     trendElement.setAttribute('value',i.toString());
//     if (i === 1) trendElement.setAttribute('style','display: block');
//     const dotElement = document.createElement('div');
//     dotElement.className = 'dots';
//     dotElement.setAttribute('id','dot-' + i.toString());
//     document.body.appendChild(trendElement);
//     document.body.appendChild(dotElement);
//   }

//   test('Select dot 2 from dot 1 displays trend 2 and hides trend 1', () => {  
//     script.updateCurrentSlide(1); 
//     expect(document.getElementById('trend-1').getAttribute('style')).toEqual('display: none;');
//     expect(document.getElementById('trend-2').getAttribute('style')).toEqual('display: block;');
//     expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: transparent;');
//     expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);'); 
//   });

//   test('Select dot 3 from dot 2 displays trend 3 and hides trend 2', () => {
//     script.updateCurrentSlide(2);   
//     expect(document.getElementById('trend-2').getAttribute('style')).toEqual('display: none;');
//     expect(document.getElementById('trend-3').getAttribute('style')).toEqual('display: block;');
//     expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: transparent;');
//     expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
//   });

//   test('Select dot 4 from dot 3 displays trend 4 and hides trend 3', () => {
//     script.updateCurrentSlide(3);   
//     expect(document.getElementById('trend-3').getAttribute('style')).toEqual('display: none;');
//     expect(document.getElementById('trend-4').getAttribute('style')).toEqual('display: block;');
//     expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: transparent;');
//     expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
//   });

//   test('Select dot 1 from dot 4 displays trend 1 and hides trend 4', () => {
//     script.updateCurrentSlide(4);   
//     expect(document.getElementById('trend-4').getAttribute('style')).toEqual('display: none;');
//     expect(document.getElementById('trend-1').getAttribute('style')).toEqual('display: block;');
//     expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: transparent;');
//     expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
//   });

//   test('Select dot 4 from dot 1 displays trend 4 and hides trend 1', () => {
//     script.updateCurrentSlide(1);   
//     expect(document.getElementById('trend-1').getAttribute('style')).toEqual('display: none;');
//     expect(document.getElementById('trend-4').getAttribute('style')).toEqual('display: block;');
//     expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: transparent;');
//     expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
//   });

//   test('Select dot 3 from dot 4 displays trend 3 and hides trend 4', () => {
//     script.updateCurrentSlide(4);  
//     expect(document.getElementById('trend-4').getAttribute('style')).toEqual('display: none;');
//     expect(document.getElementById('trend-3').getAttribute('style')).toEqual('display: block;');
//     expect(document.getElementById('dot-4').getAttribute('style')).toEqual('background-color: transparent;');
//     expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
//   });
  
//   test('Select dot 2 from dot 3 displays trend 2 and hides trend 3', () => {
//     script.switchTrend(3);  
//     expect(document.getElementById('trend-3').getAttribute('style')).toEqual('display: none;');
//     expect(document.getElementById('trend-2').getAttribute('style')).toEqual('display: block;');
//     expect(document.getElementById('dot-3').getAttribute('style')).toEqual('background-color: transparent;');
//     expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
//   });

//   test('Select dot 1 from dot 2 displays trend 1 and hides trend 2', () => {
//     script.switchTrend(2);  
//     expect(document.getElementById('trend-2').getAttribute('style')).toEqual('display: none;');
//     expect(document.getElementById('trend-1').getAttribute('style')).toEqual('display: block;');
//     expect(document.getElementById('dot-2').getAttribute('style')).toEqual('background-color: transparent;');
//     expect(document.getElementById('dot-1').getAttribute('style')).toEqual('background-color: rgb(226, 226, 226);');
//   });
// });