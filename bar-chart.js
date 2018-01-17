/* globals d3 isNaN */

// grouped bar chart: https://bl.ocks.org/mbostock/3887051

const currentCategory = 'Sector: agriculture';

const svg = d3.select('svg');
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;
const g = svg
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Scale for the long x-Axis
const x0 = d3
  .scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.1);

// Scale for the groups of bars
const x1 = d3.scaleBand().padding(0.05);

// Scale for the y-axis
const y = d3.scaleLinear().rangeRound([height, 0]);

// Scale for the groups of bars
const z = d3
  .scaleOrdinal()
  .range([
    '#98abc5',
    '#8a89a6',
    '#7b6888',
    '#6b486b',
    '#a05d56',
    '#d0743c',
    '#ff8c00'
  ]);

function normalize(i, d, columns) {
  // Get data for current category while filtering out rows with missing values
  const data = d.filter(
    obj =>
      obj.category === currentCategory &&
      Object.values(obj).every(o => o.length > 0)
  );
  data.forEach(o => {
    /* eslint-disable */
    for (let key in o) {
      if (!isNaN(o[key])) {
        o[key] = +o[key];
        /* eslint-disable */
      }
    }
  });
  return data;
}

d3.csv('data.csv', (i, d, columns) => {
  const data = d.filter(
    obj =>
      obj.category === currentCategory &&
      Object.values(obj).every(o => o.length > 0)
  );
  data.forEach(o => {
    /* eslint-disable */
    for (let key in o) {
      if (!isNaN(o[key])) {
        o[key] = +o[key];
        /* eslint-disable */
      }
    }
  });
  return data;
}), function(error, data) {
  console.log(data);
};
