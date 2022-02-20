$(function(){
    // var swiper = new Swiper('.swiper-container', {
    //     slidesPerView: 2,
    //     spaceBetween: 30,
    //     pagination: {
    //         el: '.swiper-pagination',
    //         clickable: true
    //     }
    // });

    for (elem in aaa) {
        $('#wrap').append(`
            <a href="#" class="hb">
                <!--div class="c">
                <img src="http://localhost:8000/${aaa[elem]['name']}" alt=""/>
                </div-->
            </a>
            <div class="fullBg ${aaa[elem]['name'].replaceAll('-', '_').replaceAll('.', '')}">
                <img id="${aaa[elem]['name'].replaceAll('-', '_').replaceAll('.', '')}" src="http://localhost:8000/${aaa[elem]['name']}" alt=""></img>
            </div>
        `)
    }

    var docWidth = $('body').width(),
        docHeight = $('body').height(),
        $wrap = $('#wrap'),
        $images = $('#wrap .hb'),
        slidesWidth = $wrap.width();
    
    // $(window).on('resize', function(){
    //     docWidth = $('body').width();
    //     slidesWidth = $wrap.width();
    // })
    
    $(document).mousemove(function(e) {
        // var mouseX = e.pageX,
        //     offset = mouseX / docWidth * slidesWidth - mouseX / 2;
        
        // $images.css({
        // '-webkit-transform': 'translate3d(' + -offset + 'px,0,0)',
        //         'transform': 'translate3d(' + -offset + 'px,0,0)'
        // });
    });
        

    var data = aaa;
    // for (elem in aaa) {
    //     let a = aaa[elem];
    //     let colors = []
    //     for (i in a['colors']) {
    //         colors.push({
    //             'f': parseFloat(a['colors'][i]['f']),
    //             'hex': a['colors'][i]['hex'][0]['hex']
    //         })
    //     }
            
    //     data.push({
    //         'name': a['name'],
    //         'colors': colors
    //     });
    // }
    data.sort(function(x, y){
        return d3.descending(x.name, y.name);
    });     
    // Group by year
    data = d3.nest()
        .key(function(d) { return 1; })
        .entries(data);
    
    // Add years
    var years = d3.select("#vis").selectAll("div")
        .data(data)
        .enter()
        .append("div")
        .attr("class", "year")
        .each(function(d) {
            d3.select(this).append("div").attr("class", "issues");
        });
    
    // Add issues
    var issues = years.selectAll(".issues").each(function(issue, i) {
        d3.select(this).selectAll("issue")
            .data(issue.values.sort(function(x, y){
                return d3.ascending(x.name, y.name);
            }))
            .enter()
            .append("div")
            .attr("class", "issue")
            .attr("data-date", function(d) { return d.name; });
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

    $("#vis").on("mouseleave", ".issue", function(event){

        $('.fullBg').css('opacity', 0);
        $('#vis2').css('z-index', 5);

    });
    
    // Add tooltips
    $("#vis").on("mouseenter", ".issue", function(event){
        $('#vis2').css('z-index', 4);
        $('.fullBg').css('opacity', 0);




        // if ($(this).data("date") == '2019-07-21_23-21-21_UTC.jpg') {
        //     $('#vis2').css('z-index', 0);

        // } else if ($(this).data("date") == '2019-11-30_19-54-48_UTC.jpg') {
        //     $('#vis2').css('z-index', 0);

        // } else if ($(this).data("date") == '2020-09-06_07-51-18_UTC.jpg') {
        //     $('#vis2').css('z-index', 0);

        // } else if ($(this).data("date") == '2020-09-12_06-25-11_UTC.jpg') {
        //     $('#vis2').css('z-index', 0);

        // } else if ($(this).data("date") == '2020-09-06_18-37-55_UTC.jpg') {
        //     $('#vis2').css('z-index', 0);

        // } else {
        //     $('#vis2').css('z-index', 0);
        // }

        var elem = $(`.${$(this).data("date").replaceAll('-', '_').replaceAll('.', '')}.fullBg`);
        var img = document.getElementById(`${$(this).data("date").replaceAll('-', '_').replaceAll('.', '')}`);
        var offsetW = img.offsetWidth;
        var offsetH = img.offsetHeight;

        // 'top': screen.availHeight - (screen.availHeight * 0.15) - (offsetH),
        elem.css({
            'opacity':1,
            'transform':'scale(1.02)',
            // 'position':'absolute',
            // 'top': (offsetH / 2) - (docHeight * 0.15),
            // 'left':offsetW / 2,
            'z-index': 4
        });
        $(this).qtip({
            content: {
            button: true,
            text: "<img height='250px' style='border-radius: 10px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 255, 255, 0.3);' src='http://localhost:8000/" + $(this).data("date") + "' />",
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
    
    // $("#switch li").on("click", function(){
    //     $("#switch li").removeClass("current");
    //     $(this).addClass("current");
    //     $("#vis-wrapper").removeClass();
    //     $("#vis-wrapper").addClass($(this).data("view"));
    // });
});

