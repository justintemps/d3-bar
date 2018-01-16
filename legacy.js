
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
    .attr('width', barWidth)
    .attr('height', d => heightScale(d.total))
    .attr('x', d => xScale(d.country))
    .attr('y', d => yScale(d.total))
    .attr('fill', 'blue')
    .attr('stroke', 'white');
});
