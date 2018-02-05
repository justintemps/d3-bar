import { select } from 'd3-selection';
import update from './update';

export default function setMenu(items) {
  const menu = select('select');
  menu
    .selectAll('option')
    .data(items)
    .enter()
    .append('option')
    .html(i => i);
  menu.on('change', () => {
    update(menu.node().value);
  });
}
