import * as d3 from 'd3';
import update from './update';

export default function setMenu(items) {
  // Set the menu items
  const menu = d3.select('select');
  menu.selectAll('option')
  .data(items)
  .enter().append('option').html(i => i);

  menu.on('change', () => {
    update(menu.node().value);
  })
}
