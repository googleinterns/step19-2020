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

