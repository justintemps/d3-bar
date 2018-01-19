/* globals d3 isNaN */

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

d3.csv(
  'data.csv',

  // Normalize the data
  (d, i, columns) => {
    for (let j = 0, n = columns.length; j < n; ++j)
      if (!isNaN(d[columns[j]])) {
        d[columns[j]] = +d[columns[j]];
      }
    return d;
  },

  // Get data for currently selected category
  // Filter out rows with empty cells
  (err, data) => {
    const currentData = data.filter(
      obj =>
        obj.category === currentCategory &&
        Object.values(obj).every(o => {
          if (!isNaN(o) && o === 0) {
            return false;
          }
          return true;
        })
    );

    const keys = data.columns.slice(2);

    x0.domain(currentData.map(obj => obj.country));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(currentData, d => d3.max(keys, key => d[key]))]);

    // Bars
    g
      .append('g')
      .selectAll('g')
      .data(currentData)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${x0(d.country)},0)`)
      .selectAll('rect')
      .data(d => keys.map(key => ({ key, value: d[key] })))
      .enter()
      .append('rect')
      .attr('x', d => x1(d.key))
      .attr('y', d => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', d => z(d.key));

    // X-Axis
    g
      .append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x0));

    // Y-Axis
    g
      .append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(null, 's'))
      .append('text')
      .attr('x', 2)
      .attr('y', y(y.ticks().pop()) + 0.5)
      .attr('dy', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text(currentCategory);
  }
);
