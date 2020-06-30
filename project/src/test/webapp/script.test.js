const script = require('../../main/webapp/script.js');

test('Toggle nav bar', () => {
  const nav = document.createElement('nav');
  nav.setAttribute('id','nav');
  nav.setAttribute('style','display:none');
  document.body.appendChild(nav);
  const main = document.createElement('div');
  main.setAttribute('id','main');
  document.body.appendChild(main); 
  script.toggleNavBar();
  expect(nav.getAttribute('style')).toEqual('display: block;');
  expect(main.getAttribute('style')).toEqual('display: none;');
});

/** getNextTrendValue - returns next trend value in carousel */

test('Select right on trend 1 returns trend 2', () => {
  const mockElement = document.createElement('div');
  mockElement.className = 'trends';
  mockElement.setAttribute('id','trend-1');
  mockElement.setAttribute('value','1');
  expect(script.getNextTrendValue(mockElement,1)).toBe(2);
});

test('Select right on trend 2 returns trend 3', () => {
  const mockElement = document.createElement('div');
  mockElement.className = 'trends';
  mockElement.setAttribute('id','trend-2');
  mockElement.setAttribute('value','1');
  expect(script.getNextTrendValue(mockElement,2)).toBe(3);
});

test('Select right on trend 3 returns trend 4', () => {
  const mockElement = document.createElement('div');
  mockElement.className = 'trends';
  mockElement.setAttribute('id','trend-3');
  mockElement.setAttribute('value','1');
  expect(script.getNextTrendValue(mockElement,3)).toBe(4);
});

test('Select right on trend 4 returns trend 1', () => {
  const mockElement = document.createElement('div');
  mockElement.className = 'trends';
  mockElement.setAttribute('id','trend-4');
  mockElement.setAttribute('value','1');
  expect(script.getNextTrendValue(mockElement,4)).toBe(1);
});

test('Select left on trend 1 returns trend 4', () => {
  const mockElement = document.createElement('div');
  mockElement.className = 'trends';
  mockElement.setAttribute('id','trend-1');
  mockElement.setAttribute('value','-1');
  expect(script.getNextTrendValue(mockElement,1)).toBe(4);
});

test('Select left on trend 2 returns trend 1', () => {
  const mockElement = document.createElement('div');
  mockElement.className = 'trends';
  mockElement.setAttribute('id','trend-2');
  mockElement.setAttribute('value','-1');
  expect(script.getNextTrendValue(mockElement,2)).toBe(1);
});

test('Select left on trend 3 returns trend 2', () => {
  const mockElement = document.createElement('div');
  mockElement.className = 'trends';
  mockElement.setAttribute('id','trend-3');
  mockElement.setAttribute('value','-1');
  expect(script.getNextTrendValue(mockElement,3)).toBe(2);
});

test('Select left on trend 4 returns trend 3', () => {
  const mockElement = document.createElement('div');
  mockElement.className = 'trends';
  mockElement.setAttribute('id','trend-4');
  mockElement.setAttribute('value','-1');
  expect(script.getNextTrendValue(mockElement,4)).toBe(3);
});