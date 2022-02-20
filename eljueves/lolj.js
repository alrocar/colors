$(function(){
    // Sort by date
    var data = aaa;
    data.sort(function(x, y){
        return d3.descending(x.date, y.date);
    });
    
    // Group by year
    data = d3.nest()
        .key(function(d) { return moment(d.date).format("YYYY"); })
        .entries(data);
    
    // Add years
    var years = d3.select("#vis").selectAll("div")
        .data(data)
        .enter()
        .append("div")
        .attr("class", "year")
        .each(function(d) {
            d3.select(this).append("h2").append("span").text(d.key);
            d3.select(this).append("div").attr("class", "issues");
        });
    
    // Add issues
    var issues = years.selectAll(".issues").each(function(issue, i) {
        d3.select(this).selectAll("issue")
            .data(issue.values.sort(function(x, y){
                return d3.ascending(x.date, y.date);
            }))
            .enter()
            .append("div")
            .attr("class", "issue")
            .attr("data-date", function(d) { return d.date; })
            .attr("data-url", function(d) { return d.url; })
            .attr("data-name", function(d) { return d.name; });
    });
    
    // Add colors
    issues.selectAll(".issue").each(function(issue, i) {
        d3.select(this).selectAll("color")
            .data(issue.colors.sort(function(x, y){
                return d3.ascending(d3.hsl(x.hex).h, d3.hsl(y.hex).h);
            }))
            .enter()
            .append("div")
            .attr("class", "color")
            .style("background-color", function(d) { return d.hex; })
            .style("height", function(d) { return (d.f * 100) + "%"; });
    });
    
    // Add tooltips
    $("#vis").on("mouseenter", ".issue", function(event){
        $(this).qtip({
            content: {
               button: true,
               text: "<img height='300' src=" + $(this).data("url") + " /><br />",
               text: "<img height='300' src=" + $(this).data("url") + " /> <strong>" + moment($(this).data("date")).format("MMM D, YYYY") + "</strong><br /><strong>" + $(this).data("name") + "</strong>",
               title: ""
            },
            hide: {
                delay: 500,
                fixed: true
            },
            overwrite: false,
            position: {
                at: "bottom center",
                my: "top center",
                viewport: $(window)
            },
            show: {
                event: event.type,
                ready: true
            },
            style: { def: false }
        });
    });
    
    $("#switch li").on("click", function(){
        $("#switch li").removeClass("current");
        $(this).addClass("current");
        $("#vis-wrapper").removeClass();
        $("#vis-wrapper").addClass($(this).data("view"));
    });
});