import { select } from 'd3-selection';
import * as transition from 'd3-transition';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { csv as getCSV } from 'd3-request';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import settings from './settings';
import normalize from './normalize';
import filter from './filter';

const d3 = Object.assign(
  {},
  {
    select,
    scaleBand,
    scaleLinear,
    scaleOrdinal,
    getCSV,
    axisBottom,
    axisLeft,
    max
  },
  transition
);

const { csv, margin, colors } = settings;
const svg = d3.select('svg');
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;

function update(currentCategory) {
  d3.getCSV(csv, normalize, (err, data) => {
    const currentData = filter(data, currentCategory);
    const keys = data.columns.slice(2);
    const x0 = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.2);
    const x1 = d3.scaleBand().padding(0.05);
    const y = d3.scaleLinear().rangeRound([height, 0]);
    const z = d3.scaleOrdinal().range(colors);
    // const t = d3.transition().duration(1000);

    x0.domain(currentData.map(obj => obj.country));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(currentData, d => d3.max(keys, key => d[key]))]);

    const plotarea = d3.select('.plotarea');

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
    svg.select('.x-axis').call(d3.axisBottom(x0));

    // Update Y-Axis
    svg.select('.y-axis').call(d3.axisLeft(y).ticks(null, 's'));

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
