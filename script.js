document.addEventListener("DOMContentLoaded", () => {
    initAllCharts();
    showChart("charts-daily");
    removeOtherCharts("charts-daily");
    
    const timeframes = document.querySelectorAll(".timeframe");
    timeframes.forEach(timeframe => {
        timeframe.addEventListener("click", () => {
            let currentSelected = document.querySelector("[data-state='selected']")
            currentSelected.dataset.state = "unselected";
            timeframe.dataset.state = "selected";
            showChart(timeframe.dataset.timeframe);
            removeOtherCharts(timeframe.dataset.timeframe);
            addSubText(timeframe.dataset.timeframe); 
            if (timeframe.dataset.timeframe == "charts-daily") {
                document.querySelector(".checkboxes").classList.remove("hidden");
            } else {
                document.querySelector(".checkboxes").classList.add("hidden");
            }
        })
    })

    const blueCheckBox = document.querySelector(".checkbox-blue");
    blueCheckBox.addEventListener("click", () => {
        console.log(blueCheckBox);
        // create blue line for average from past 30 days
    })

    const yellowCheckBox = document.querySelector(".checkbox-yellow");
    yellowCheckBox.addEventListener("click", () => {
        console.log(yellowCheckBox);
        // create yellow line from other houses average
    })
})

function initAllCharts() {
    const timeframes = ["charts-hourly", "charts-daily", "charts-monthly"]
    for (let timeframe of timeframes) {
        createChart(timeframe);
    }
}

function createChart(timeframe) {
    const dateSection = document.querySelector(".date");
    const aggregate = document.querySelector(".aggregate");
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 60, bottom: 70, left: 60};
    var width = 500 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(`.${timeframe}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // var defs = svg.append('defs');
    // var lg = defs.append('linearGradient')
    //     .attr('id', 'gradient')
    //     .attr('x1', 0)
    //     .attr('x2', 0)
    //     .attr('y1', 0)
    //     .attr('y2', 1);
    // lg.append('stop')
    //     .attr('offset', '0%')
    //     .attr('stop-color', '#92cfec');
    // lg.append('stop')
    //     .attr('offset', '100%')
    //     .attr('stop-color', '#4aafe0');
    
    // Parse the Data
    d3.json(`https://raw.githubusercontent.com/Emmelien1508/fabrique-dataviz/main/data/${timeframe.slice(7)}_data.json`, function(data) {
        if (timeframe == "charts-hourly") {
            yAxisHeight = 50;
            data = data.filter(function(d,i){ return i<24 })
        } else if (timeframe == "charts-daily") {
            yAxisHeight = 200;
            data = data.filter(function(d,i){ return i<6 })
        } else {;    
            yAxisHeight = 3500;
            data = data.filter(function(d,i){ return i<6 })
        }

        // X axis
        var x = d3.scaleBand()
            .range([ 0, width])
            .domain(data.map(function(d) { 
                return d.datetime;
                // const date = new Date(d.datetime)
                // if (date instanceof Date && isFinite(date)) {
                //     const weekday = new Intl.DateTimeFormat('nl-NL', {weekday: 'short'}).format(date);
                //     if (timeframe == "charts-daily") {
                //         const day = date.getDate();
                //         return `${weekday} ${day}`;
                //     } else {
                //         // then its hour
                //         const hour = date.getHours();
                //         return `${hour}:00`;
                //     }

                // } else {
                //     return d.datetime
                // }
            }))
            .padding(0.2);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
                .style("text-anchor", "middle");

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, yAxisHeight])
            .range([ height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));
        
        // Bars
        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", function(d) { return x(d.datetime); })
                .attr("y", function(d) { return y(d.verbruik); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(d.verbruik); })
                .attr("fill", "#4aafe0")
        
    })
}

function showChart(timeframe) {
    let chart = document.querySelector(`.${timeframe}`);
    chart.classList.remove("hidden");
    let chartTitle = document.querySelector(`.titles-${timeframe.slice(7)}`);
    chartTitle.classList.remove("hidden");
}   

function removeOtherCharts(timeframe) {
    const otherTimeFrames = document.querySelectorAll(`.charts:not(.${timeframe})`);
    otherTimeFrames.forEach(tf => {
        tf.classList.add("hidden");
    })

    const otherChartTiltes = document.querySelectorAll(`.titles:not(.titles-${timeframe.slice(7)})`);
    otherChartTiltes.forEach(ct => {
        ct.classList.add("hidden");
    })
}

function addSubText(timeframe) {
    let text;
    let subTextSection = document.querySelector(".subtext");
    if (timeframe == "charts-hourly") {
        text = `<p><span class="bold">Minder water is goed!</span> Gisteren heb je 15% minder water gebruikt dan gemiddeld</p>`;
    } else if (timeframe == "charts-daily") {
        text = `<p><span class="highlighted-text">Goed bezig!</span></p><p>Minder dan 35% verbruikt minder dan jij</p>`;
    } else {
        text = `<p><span class="bold">Je bent goed bezig!</span> Deze maand heb je minder water gebruikt dan vorige maanden</p>`;
    }
    subTextSection.innerHTML = text;
}