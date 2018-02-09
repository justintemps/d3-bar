import {select} from 'd3-selection';
import settings from './settings';

// Update chart title
export function updateTitle(currentCategory) {
  select('.chart-title').node().innerHTML = settings.category.filter(
    obj => obj.short === currentCategory
  )[0].long;
}

export function updateDescription(currentCategory) {
  // Update the chart description
  const description = select('#description');
  description.node().innerHTML = settings.category.filter(
    obj => obj.short === currentCategory
  )[0].description;
}
