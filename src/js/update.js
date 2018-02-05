import { select } from 'd3-selection';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { csv as getCSV } from 'd3-request';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import normalize from './normalize';
import settings from './settings';
import filter from './filter';

const { csv, margin, colors } = settings;
const svg = select('svg');
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;

function update(currentCategory) {
  getCSV(csv, normalize, (err, data) => {
    const currentData = filter(data, currentCategory);
    const keys = data.columns.slice(2);
    const x0 = scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.2);
    const x1 = scaleBand().padding(0.05);
    const y = scaleLinear().rangeRound([height, 0]);
    const z = scaleOrdinal().range(colors);
    // const t = d3.transition().duration(1000);

    x0.domain(currentData.map(obj => obj.country));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, max(currentData, d => max(keys, key => d[key]))]);

    const plotarea = select('.plotarea');

    let countries = plotarea.selectAll('g').data(currentData, d => d.country);

    countries.exit().remove();

    const enter = countries
      .enter()
      .append('g')
      .attr('class', '.country');

    countries = enter
      .merge(countries)
      .attr('transform', d => `translate(${x0(d.country)},0)`); // estlint-disable-line */

    // Update bars
    let bars = countries
      .selectAll('rect')
      .data(d => keys.map(key => ({ key, value: d[key] })));

    bars.exit().remove();

    const enterBars = bars
      .enter()
      .append('rect')
      .attr('width', x1.bandwidth());

    bars = enterBars
      .merge(bars)
      .attr('x', d => x1(d.key))
      // .transition(t)
      .attr('y', d => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', d => z(d.key))
      .attr('stroke', '#fff');

    // Update X-Axis
    svg.select('.x-axis').call(axisBottom(x0));

    // Update Y-Axis
    svg.select('.y-axis').call(axisLeft(y).ticks(null, 's'));

    // Update chart title
    select('.chart-title').node().innerHTML = settings.category.filter(
      obj => obj.short === currentCategory
    )[0].long;

    const description = select('#description');
    description.node().innerHTML = settings.category.filter(
      obj => obj.short === currentCategory
    )[0].description;
  });
}

export default update;
