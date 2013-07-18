$(function () {
    /*
    $('#graph').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Network-Shortcode Round Trip Time'
        },
        xAxis: {
            categories: [7, 8, 9, 10, 11, 12]
        },
        yAxis: {
            title: {
                text: 'Round Trip Time'
            },
            min: 0
        },
        series: [{
            name: 'MTN8500',
            data: [1, 0, 4, 3.5, 2, 5]
        }, {
            name: 'MTN6767',
            data: [5, 7, 3, 2.5, 4, 9]
        }],
    });
    var chart = $('#graph').highcharts();
    chart.xAxis[0].update({categories:['A', 'B', 'C', 'D', 'E', 'F', 'G']});
    */
    var options = {
            chart: {
                renderTo: 'graph',
                defaultSeriesType: 'column'
            },
            title: {
                text: 'Network-Shortcode Round Trip Time'
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                title: {
                    text: 'Round Trip Time (seconds)'
                }
            },
            series: []
    };
    $('#network').change(function(){
        $.get('data', {'network':$(this).val()}, function(data) {
            options.series = [];
            options.categories = [];
            // Split the lines
            var lines = data.split('\n');

            // Iterate over the lines and add categories or series
            $.each(lines, function(lineNo, line) {
                var items = line.split(',');

                // header line containes categories
                if (lineNo == 0) {
                    $.each(items, function(itemNo, item) {
                        if (itemNo > 0) options.xAxis.categories.push(item);
                    });
                }

                // the rest of the lines contain data with their name in the first position
                else {
                    var series = {
                        data: []
                    };
                    $.each(items, function(itemNo, item) {
                        if (itemNo == 0) {
                            series.name = item;
                        } else {
                            series.data.push(parseFloat(item));
                        }
                    });

                    options.series.push(series);

                }

            });

            // Create the chart
            var chart = new Highcharts.Chart(options);
        });
    });
});

