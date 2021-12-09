/*
 * Creates tooltip with provided id that
 * floats on top of visualization.
 * Most styling is expected to come from CSS
 * so check out bubble_chart.css for more details.
 */
function floatingTooltip(tooltipId) {
  // Local variable to hold tooltip div for
  // manipulation in other functions.
    if (tooltipId == "gates_tooltip") {
        var tt = d3.select('#chartsank')
            .append('div')
            .attr('class', 'tooltip')
            .attr('id', tooltipId)
            .style('pointer-events', 'none')
            .html("<div class='side-color' style='background: linear-gradient(rgb(242, 140, 119), rgb(235, 73, 39));'></div><div class='row'><div class='col'><p>Occupation Before Migration</p><span class='label-before text-color-before text-label' style='color: rgb(242, 140, 119);'>Agriculture</span></div><div class='col'><p>Origin Country</p><span class='label-origin text-label'>Honduras</span></div></div><div class='line-divide mt-2 mb-2'></div><div class='row'><div class='col'><p>Occupation After Migration</p><span class='label-after text-color-after text-label' style='color: rgb(235, 73, 39);'>Agriculture</span></div><div class='col'><p>Destination Country</p><span class='label-dest text-label'>United States</span></div></div></div>");
        
        // if () {

        // }
    }
    else {
        var tt = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .attr('id', tooltipId)
            .style('pointer-events', 'none');

            // Initially it is hidden.
            hideTooltip();
    }
  // Set a width if it is provided.
//   if (width) {
//     tt.style('width', width);
//   }

  

  /*
   * Display tooltip with provided content.
   *
   * content is expected to be HTML string.
   *
   * event is d3.event for positioning.
   */
//   function showTooltip(content, event) {
  function showTooltip(event) {
    tt.style('opacity', 1.0)
    //   .html(content);

    updatePosition(event);
  }

  /*
   * Hide the tooltip div.
   */
  function hideTooltip() {
    tt.style('opacity', 0.0);
  }

  /*
   * Figure out where to place the tooltip
   * based on d3 mouse event.
   */
  function updatePosition(event) {
    var xOffset = 20;
    var yOffset = 10;

    var ttw = tt.style('width');
    var tth = tt.style('height');

    var wscrY = window.scrollY;
    var wscrX = window.scrollX;

    var curX = (document.all) ? event.clientX + wscrX : event.pageX;
    var curY = (document.all) ? event.clientY + wscrY : event.pageY;
    var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > window.innerWidth) ?
                 curX - ttw - xOffset * 2 : curX + xOffset;

    if (ttleft < wscrX + xOffset) {
      ttleft = wscrX + xOffset;
    }

    var tttop = ((curY - wscrY + yOffset * 2 + tth) > window.innerHeight) ?
                curY - tth - yOffset * 2 : curY + yOffset;

    if (tttop < wscrY + yOffset) {
      tttop = curY + yOffset;
    }

    if (winWidth > 768) {
        tt
            .style('top', tttop + 'px')
            .style('left', ttleft + 'px');
    }
    else {
        tt
            .style('top', '0px')
            .style('left', '0px');
    }
    
  }

  return {
    showTooltip: showTooltip,
    hideTooltip: hideTooltip,
    updatePosition: updatePosition
  };
}
