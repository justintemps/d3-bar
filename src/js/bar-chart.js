import { select } from 'd3-selection';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { csv as getCSV } from 'd3-request';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import settings from './settings';
import normalize from './normalize';
import filter from './filter';
import setMenu from './menu';

const { csv, category, margin, colors } = settings;
const currentCategory = category[0].short;
const currentTitle = category[0].long;
const svg = select('svg');
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;
const g = svg
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const x0 = scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.2);
const x1 = scaleBand().padding(0.05);
const y = scaleLinear().rangeRound([height, 0]);
const z = scaleOrdinal().range(colors);

function drawChart() {
  getCSV(
    csv,
    normalize,
    // Get data for currently selected category
    // Filter out rows with empty cells
    (err, data) => {
      // Set the pull down menu
      setMenu(
        data
          .map(d => d.category)
          .filter((item, i, ar) => ar.indexOf(item) === i)
      );

      const currentData = filter(data, currentCategory);
      const keys = data.columns.slice(2);

      x0.domain(currentData.map(obj => obj.country));
      x1.domain(keys).rangeRound([0, x0.bandwidth()]);
      y.domain([0, max(currentData, d => max(keys, key => d[key]))]);

      // Bars
      g
        .append('g')
        .attr('class', 'plotarea')
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
        .attr('fill', d => z(d.key))
        .attr('stroke', '#fff');

      // X-Axis
      g
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(axisBottom(x0));

      // Y-Axis
      g
        .append('g')
        .attr('class', 'y-axis')
        .call(axisLeft(y).ticks(null, 's'))
        .append('text')
        .attr('x', 2)
        .attr('y', y(y.ticks().pop()) + 0.5)
        .attr('dy', '0.32em')
        .attr('fill', '#000')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'start');

      // Title
      select('.chart-title').node().innerHTML = currentTitle;

      const legend = g
        .append('g')
        .attr('font-family', 'sans-serif')
        .style('font-size,', 8)
        .attr('text-anchor', 'end')
        .attr(
          'transform',
          `translate(${(-width + margin.left) / 1.55}, ${height + 50})`
        )
        .selectAll('g')
        .data(keys)
        .enter()
        .append('g')
        .attr('transform', (d, i) => {
          if (i + 1 <= 3) {
            return `translate(0, ${i * 30})`;
          } else if (i + 1 >= 3 && i + 1 <= 6) {
            return `translate(150, ${(i - 3) * 30})`;
          }
          return `translate(300, ${(i - 6) * 30})`;
        });

      legend
        .append('rect')
        .attr('x', width - 19)
        .attr('width', 19)
        .attr('height', 19)
        .attr('fill', z);

      legend
        .append('text')
        .attr('x', width - 24)
        .attr('y', 9.5)
        .attr('dy', '0.32em')
        .text(d => settings.keys.filter(obj => obj.short === d)[0].long);

      // Set description
      const description = select('#description');
      description.node().innerHTML = settings.category.filter(
        obj => obj.short === currentCategory
      )[0].description;
    }
  );
}

export default drawChart;
