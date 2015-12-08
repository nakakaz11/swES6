### weight base coffee ###
do ->

  # http://bl.ocks.org/mbostock/1667367
  brushed = ->
    x.domain (if brush.empty() then x2.domain() else brush.extent())
    focus.select("path").attr "d", area
    focus.select(".x.axis").call xAxis

  margin =
    top   : 10
    right : 10
    bottom: 100
    left  : 40
  margin2 =
    top   : 430
    right : 10
    bottom: 20
    left  : 40

  width = 960 - margin.left - margin.right
  height = 500 - margin.top - margin.bottom
  height2 = 500 - margin2.top - margin2.bottom

  parseDate = d3.time.format("%Y-%m-%d").parse

  x = d3.time.scale().range([0, width])
  x2 = d3.time.scale().range([0, width])

  y = d3.scale.linear().range([height, 0])
  y2 = d3.scale.linear().range([height2, 0])

  xAxis = d3.svg.axis().scale(x).orient("bottom")
  xAxis2 = d3.svg.axis().scale(x2).orient("bottom")

  # Y軸スケール　あとで調整　〜3000？
  yAxis = d3.svg.axis()
    .scale(y).tickSize(width).orient("right")


  brush = d3.svg.brush().x(x2).on("brush", brushed)

  # https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-area_interpolate
  area = d3.svg.area().interpolate("step-after").x((d) ->
    x d.date
  ).y0(height).y1((d) ->
    y d.price
  )
  area2 = d3.svg.area().interpolate("monotone").x((d) ->
    x2 d.date
  ).y0(height2).y1((d) ->
    y2 d.price
  )
  svg = d3.select("#svg3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

  svg.append("defs")
    .append("clipPath")
    .attr("id", "clipVia")
    .append("rect")
    .attr("width", width)
    .attr "height", height

  focus = svg.append("g")
    .attr("transform", "translate(#{margin.left},#{margin.top})")
  context = svg.append("g")
    .attr("class","swCont")
    .attr("transform", "translate(#{margin2.left},#{margin2.top})")



  # sw read Json
  d3.csv "/_jsFiddle_/swES6/json/weight.csv", (error, data) ->
    data.forEach (d) ->
      d.date = parseDate(d.date)
      d.price = +d.price

    x.domain d3.extent(data.map((d) ->
      d.date
    ))
    y.domain [0, d3.max(data.map((d) ->
      d.price
    ))]

    x2.domain( x.domain() )
    y2.domain( y.domain() )

    focus.append("path")
      .datum(data)
      .attr("clipVia-path", "url(#clipVia)")
      .attr "d", area

    focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call xAxis

    # y軸の罫線
    focus.append("g").attr("class", "y axis").call yAxis
    focus.selectAll("g").filter( (d)-> return d )
        .classed("minor", true)
    focus.selectAll("text")
        .attr("x", 4)
        .attr("dy", 4)


    # tip追加
    tip = svg.append("g")
          .attr("class", "tip")
          .style("display", "none")
    tip.append("circle").attr("r", 4.5)
    tip.append("text")

       .attr("x", -60 - margin.left)
       .attr("dy", ".35em")

    bisectDate = d3.bisector((d)-> return d.date ).left
    formatValue = d3.format(",.2f")
    formatCurrency = (d)-> return "cal." + formatValue(d)
    mousemove = ->
        x0 = x.invert(d3.mouse(this)[0])
        i = bisectDate(data, x0, 1)
        d0 = data[i - 1]
        d1 = data[i]
        d = if x0 - d0.date > d1.date - x0 then d1 else d0
        tip.attr("transform", "translate(#{x(d.date) + margin.left}, #{y(d.price) + margin.top})")
        tip.select("text").text(formatCurrency(d.price))

    svg.append("rect")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .on("mouseover",()->  tip.style("display", null))
          .on("mouseout", ()->  tip.style("display", "none"))
          .on("mousemove", mousemove)


    context.append("path")
      .datum(data).attr "d", area2

    context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call xAxis2

    context.append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("y", -6)
      .attr "height", height2 + 7
