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

// Get the data
d3.csv('data.csv', (err, res) => {
  // Turn strings into numbers if they're numbers
  res.forEach(d => {
    /* eslint-disable */
    for (let val in d) {
      if (d[val].length !== 0 && !isNaN(d[val])) {
        /* eslint-disable */
        d[val] = +d[val];
      }
    }

    // Get rid of source column if it's empty
    if (d.source.length === 0) {
      delete d.source; // eslint-disable-line
    }
  });

  // Filter according to current category, don't use missing data
  const data = res.filter(d => {
    let dataMissing = false;
    Object.values(d).forEach(val => {
      if (val.length === 0) {
        dataMissing = true;
      }
    });
    if (d.category === currentCategory && dataMissing === false) {
      return true;
    }
    return false;
  });

  // Create a list of keys with number values
  const keys = data => {
    let obj = data[0];
    for (key in obj) {
      if (!isNaN(obj[key])) {
        
      }
    }
  }()

/*
  x0.domain(data.map(d => d.country));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(data, d => d3.max(keys, key => d[key]))]);

  g
    .append('g')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', d => `translate(${x0(d.country)},0)`)
    .selectAll('rect');
  //  .data(d => keys.map(key => ({key: key, value: })))


  g
    .append('g')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', d => `translate(${x0(d.country)},0)`)
    .selectAll('rect')
    .data(d => keys.map(key => {
      console.log({ key: key, value: d[key] });
      return ({ key: key, value: d[key] });
    }))
    .enter()
    .append('rect')
    .attr('x', d => x1(d.key))
    .attr('y', d => y(d.value))
    .attr('width', x1.bandwidth())
    .attr('height', d => height - y(d.value))
    .attr('fill', d => z(d.key));
*/
});
