import * as d3 from 'd3';
import settings from './settings';
import normalize from './normalize';
import filter from './filter';

const { csv, category, margin, colors } = settings;
const currentCategory = category.lowSkill;
const svg = d3.select('svg');
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;
const g = svg
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);
const x0 = d3
  .scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.1);
const x1 = d3.scaleBand().padding(0.05);
const y = d3.scaleLinear().rangeRound([height, 0]);
const z = d3.scaleOrdinal().range(colors);

function drawChart() {
  d3.csv(
    csv,
    normalize,
    // Get data for currently selected category
    // Filter out rows with empty cells
    (err, data) => {
      const currentData = filter(data, currentCategory);
      const keys = data.columns.slice(2);

      x0.domain(currentData.map(obj => obj.country));
      x1.domain(keys).rangeRound([0, x0.bandwidth()]);
      y.domain([0, d3.max(currentData, d => d3.max(keys, key => d[key]))]);

      // Bars
      g
        .append('g')
        .attr('class', 'bars')
        .selectAll('g')
        .data(currentData)
        .enter()
        .append('g')
        .attr('class', 'country')
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
      /*
      const legend = g.append('g')
        .attr('font-family', 'sans-serif')
        .style('font-size,', 8)
        .attr('text-anchor', 'end')
        .selectAll('g')
          .data(keys.slice().reverse())
          .enter().append('g')
          .attr('transform', (d,i) => `translate(0, ${i*20})` );

      legend.append('rect')
        .attr('x', width - 19)
        .attr('width', 19)
        .attr('height', 19)
        .attr('fill', z);

      legend.append('text')
        .attr('x', width - 24)
        .attr('y', 9.5)
        .attr('dy', '0.32em')
        .text(d => d);
*/
    }
  );
}

export default drawChart;
