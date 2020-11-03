import React, {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import Circle from '../../icons/circle.svg'
import Square from '../../icons/square.svg'
import Triangle from '../../icons/triangle.svg'

export const Graph = (props) => {
    const d3Container = useRef(null)

    //years for the graph
    let startYear = props.trendComparison.start_year;
    let endYear = props.trendComparison.end_year

    //initialize arrays of data points
    let regionalData = []
    let stateData = []
    let nationData = []

    let maxAmount = -100;
    let minAmount = 100

    //generates graph (xy) points from regional data
    for (let i = 0; i < props.trendComparison.regional.length; i++) {
        let percentChange = (props.trendComparison.regional[i] - props.trendComparison.regional[0]) / props.trendComparison.regional[0] * 100;
        
        if (percentChange > maxAmount) maxAmount = percentChange
        if (percentChange < minAmount) minAmount = percentChange

        regionalData.push({
            x: startYear + i,
            y: percentChange
        })
    }

    //generates graph (xy) points from state data
    for (let i = 0; i < props.trendComparison.state.length; i++) {
        let percentChange = (props.trendComparison.state[i] - props.trendComparison.state[0]) / props.trendComparison.state[0] * 100;
        
        if (percentChange > maxAmount) maxAmount = percentChange
        if (percentChange < minAmount) minAmount = percentChange

        stateData.push({
            x: startYear + i,
            y: percentChange
        })
    }

    //generates graph (xy) points from nation data
    for (let i = 0; i < props.trendComparison.nation.length; i++) {
        let percentChange = (props.trendComparison.nation[i] - props.trendComparison.nation[0]) / props.trendComparison.nation[0] * 100;
        
        if (percentChange > maxAmount) maxAmount = percentChange
        if (percentChange < minAmount) minAmount = percentChange

        nationData.push({
            x: startYear + i,
            y: percentChange
        })
    }

    //dimensions of d3 graph svg
    let w = 1200
    let h = 500

    //useEffect updates graph when data changes
    useEffect(() => {

        //initialize graph svg
        const svg = d3.select(d3Container.current), 
            width = w,
            height = h;

        //bounds for the graph
        let minDate = startYear
        let maxDate = endYear

        let graph = svg.append('g')

        //initialize x scale for d3 graph
        let xscale = d3.scaleLinear()
            .domain([minDate, maxDate])
            .range([0, width - 100]);

        //initialize y scale for d3 graph
        let yscale = d3.scaleLinear()
            .domain([minAmount - 1, maxAmount + 1])
            .range([height, 0]);

        let x_axis = d3.axisBottom(xscale)
            .ticks(props.trendComparison.end_year - props.trendComparison.start_year + 2)
            .tickSize(-500 + 20)
            .tickFormat(d3.format("d"));

        let y_axis = d3.axisLeft(yscale)
            .ticks(((maxAmount + 1) - (minAmount - 1)))
            .tickSize(0);

        //generate x axis
        let gX = graph.append('g')
            .call(x_axis)
            .attr("transform", "translate(50, 480)")
            .attr("color", "gray");

        gX.select(".domain")
            .attr("stroke","#E04836")
            .attr("stroke-width","6")
            .attr("opacity","0");

        gX.selectAll(".tick line")
            .attr("opacity",".3");

        //generate y axis
        let gY = graph.append('g')
            .call(y_axis)
            .attr("transform", "translate(50, -20)")
            .attr("color", "gray");

        //y axis label
        graph.append("text")             
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Percent Change");      

        //function to generate line paths
        var line = d3.line()
            .x(function(d, i) {
                return xscale(d.x);
            })
            .y(function(d, i) {
                return yscale(d.y);
            })

        //nation data line
        graph.append("path")
            .datum(nationData)
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .style("stroke", "rgb(142, 212, 233)")
            .style("stroke-width", "1")
            .attr("transform", "translate(50, -20)");

        //nation triangle markers
        graph.selectAll("marker")
            .data(nationData)
            .enter().append("svg:image") // Uses the enter().append() method
            .attr("xlink:href", Triangle)
            .attr("x", function(d) { return xscale(d.x) })
            .attr("y", function(d) { return yscale(d.y) })
            .attr("transform", "translate(46, -26)")
            .attr("width", "9")
            .attr("height", "9");

        //state data line
        graph.append("path")
            .datum(stateData)
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .style("stroke", "rgb(27, 61, 153)")
            .style("stroke-width", "1")
            .attr("transform", "translate(50, -20)");

        //state square markers
        graph.selectAll("marker")
            .data(stateData)
            .enter().append("svg:image") // Uses the enter().append() method
            .attr("xlink:href", Square)
            .attr("x", function(d) { return xscale(d.x) })
            .attr("y", function(d) { return yscale(d.y) })
            .attr("transform", "translate(48, -23)")
            .attr("width", "7")
            .attr("height", "7");

        //regional data line
        graph.append("path")
            .datum(regionalData)
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .style("stroke", "rgb(7, 23, 65)")
            .style("stroke-width", "1")
            .attr("transform", "translate(50, -20)");

        //regional circle markers
        graph.selectAll("marker")
            .data(regionalData)
            .enter().append("svg:image") // Uses the enter().append() method
            .attr("xlink:href", Circle)
            .attr("x", function(d) { return xscale(d.x) })
            .attr("y", function(d) { return yscale(d.y) })
            .attr("transform", "translate(48, -23)")
            .attr("width", "7")
            .attr("height", "7");

        //remove old svg items when new items are generated
        return () => {
            svg.selectAll('*').remove();
        }

    }, [props.trendComparison])

    return (
        <div id="Graph">
            
            <svg
                className = "d3-component"
                width = {w}
                height = {h}
                ref = {d3Container}
            />
        </div>
    )
}

export default Graph