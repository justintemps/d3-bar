/* globals d3 */

const width = 600;
const height = 600;
const margin = {
  top: 20,
  bottom: 20,
  left: 40,
  right: 20
};

const currentCat = 'Sector: agriculture';

d3.csv('data.csv', (err, res) => {
  // First select the svg
  const svg = d3.select('svg');

  // Then let's clean the data...
  // Get rid of source in data if it's empty
  res.forEach(d => {
    if (d.source.length === 0) {
      delete d.source; // eslint-disable-line
    }
  });

  // Get rid of any datasets with missing values
  const data = res.filter(d => {
    let dataMissing = false;
    Object.values(d).forEach(val => {
      if (val.length === 0) {
        dataMissing = true;
      }
    });
    if (d.category === currentCat && dataMissing === false) {
      return true;
    }
    return false;
  });

  const yMax = d3.max(data, d => d.total);

  const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([height - margin.bottom, margin.top]);

  const heightScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([0, height - margin.top - margin.bottom]);

  const yAxis = d3.axisLeft().scale(yScale);

  const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.country))
    .range([margin.left, width - margin.right]);

  const xAxis = d3.axisBottom().scale(xScale);

  svg
    .append('g')
    .attr('transform', `translate(${[0, height - margin.bottom]})`)
    .call(xAxis);
  svg
    .append('g')
    .attr('transform', `translate(${[margin.left, 0]})`)
    .call(yAxis);

  const barWidth = (width - margin.right - margin.left) / data.length;

  const rect = svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', barWidth - 15)
    .attr('height', d => heightScale(d.total))
    .attr('x', d => xScale(d.country))
    .attr('y', d => yScale(d.total))
    .attr('fill', 'blue')
    .attr('stroke', 'white');
});
