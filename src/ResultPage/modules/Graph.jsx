import React, {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'

export const Graph = (props) => {
    const d3Container = useRef(null)

    let startYear = props.trendComparison.start_year;
    let endYear = props.trendComparison.end_year

    let regionalData = []
    let stateData = []
    let nationData = []

    let maxAmount = -100;
    let minAmount = 100

    for (let i = 0; i < props.trendComparison.regional.length; i++) {
        let percentChange = (props.trendComparison.regional[i] - props.trendComparison.regional[0]) / props.trendComparison.regional[0] * 100;
        
        if (percentChange > maxAmount) maxAmount = percentChange
        if (percentChange < minAmount) minAmount = percentChange

        regionalData.push({
            x: startYear + i,
            y: percentChange
        })
    }

    for (let i = 0; i < props.trendComparison.state.length; i++) {
        let percentChange = (props.trendComparison.state[i] - props.trendComparison.state[0]) / props.trendComparison.state[0] * 100;
        
        if (percentChange > maxAmount) maxAmount = percentChange
        if (percentChange < minAmount) minAmount = percentChange

        stateData.push({
            x: startYear + i,
            y: percentChange
        })
    }

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

        let xscale = d3.scaleLinear()
            .domain([minDate - 1, maxDate + 1])
            .range([0, width]);

        let yscale = d3.scaleLinear()
            .domain([minAmount - 10, maxAmount + 10])
            .range([height, 0]);

        let x_axis = d3.axisBottom(xscale)
            .ticks(props.trendComparison.end_year - props.trendComparison.start_year + 2)
            .tickSize(-500 + 20)
            .tickFormat(d3.format("d"));

        let y_axis = d3.axisLeft(yscale)
            .ticks(((maxAmount + 5) - (minAmount - 5)))
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

        //generate x axis
        let gY = graph.append('g')
            .call(y_axis)
            .attr("transform", "translate(50, -20)")
            .attr("color", "gray");

        //function to generate line paths
        var line = d3.line()
            .x(function(d, i) {
                return xscale(d.x);
            })
            .y(function(d, i) {
                return yscale(d.y);
            })
            // .curve(d3.curveCatmullRom.alpha(.5));

        //regional data line
        graph.append("path")
            .datum(regionalData)
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .style("stroke", "rgb(7, 23, 65)")
            .style("stroke-width", "1")
            .attr("transform", "translate(50, -20)");

        //state data line
        graph.append("path")
            .datum(stateData)
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .style("stroke", "rgb(27, 61, 153)")
            .style("stroke-width", "1")
            .attr("transform", "translate(50, -20)");

        //nation data line
        graph.append("path")
            .datum(nationData)
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .style("stroke", "rgb(142, 212, 233)")
            .style("stroke-width", "1")
            .attr("transform", "translate(50, -20)");

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