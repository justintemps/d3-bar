function normalize(d, i, columns) {
  for ( let j = 0, n = columns.length; j < n; ++j) { // eslint-disable-line
    if (!isNaN(d[columns[j]])) { // eslint-disable-line
      d[columns[j]] = +d[columns[j]]; // eslint-disable-line
    }
  }
  return d;
}

export default normalize;
