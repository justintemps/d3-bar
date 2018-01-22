import * as d3 from 'd3';
import normalize from './normalize';
import settings from './settings';
import filter from './filter';

const { csv, category, margin, colors } = settings;
const svg = d3.select('svg');
const button = document.getElementById('update-chart');
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;

function updateBars(currentCategory) {
  d3.csv(csv, normalize, (err, data) => {
    const currentData = filter(data, currentCategory);
    const keys = data.columns.slice(2);
    const x0 = d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);
    const x1 = d3.scaleBand().padding(0.05);
    const y = d3.scaleLinear().rangeRound([height, 0]);
    const z = d3.scaleOrdinal().range(colors);

    x0.domain(currentData.map(obj => obj.country));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(currentData, d => d3.max(keys, key => d[key]))]);

    // Update countries
    let countries = svg.selectAll('.countries').data(currentData, d => {
      console.log(d.country);
      return d.country;
    });

    // Exit
    countries.exit().remove();

    // Enter
    const enter = countries
      .enter()
      .append('g')
      .attr('class', '.country')
      .attr('transform', d => `translate(${x0(d.country)},0)`);

    // Merge
    countries = enter.merge(countries); // estlint-disable-line

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
      .attr('y', d => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', d => z(d.key));
  });
}

button.addEventListener('click', () => {
  updateBars(category.agriculture);
});
