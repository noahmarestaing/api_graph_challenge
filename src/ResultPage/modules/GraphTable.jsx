import React from 'react'
import '../css/GraphTable.css'
import triangle from '../../icons/triangle.svg'
import circle from '../../icons/circle.svg'
import square from '../../icons/square.svg'

export default function GraphTable (props) {

    console.log(props.trendComparison)
    function renderRow(val1, val2, val3, val4, val5, textStyle, icon) {
        return (
            <span id="TableRow">
                    <span id="GraphTableEntryLeft"><span id={textStyle}>{icon}<span id="GraphTableTextPadding">{val1}</span></span></span>
                    <span id="GraphTableEntry"><span id={textStyle}>{val2}</span></span>
                    <span id="GraphTableEntry"><span id={textStyle}>{val3}</span></span>
                    <span id="GraphTableEntry"><span id={textStyle}>{val4}</span></span>
                    <span id="GraphTableEntry"><span id={textStyle}>{val5}</span></span>
            </span>
        )
    }

    return (
        <div id="GraphTable">
            {renderRow("Area", props.trendComparison.start_year + " Jobs", props.trendComparison.end_year + " Jobs", "Change", "%Change", "Text2Bold", <img id="GraphTableIconPlaceholder" src={triangle}/>)}
            {renderRow("Region", props.trendComparison.regional[0], props.trendComparison.regional[props.trendComparison.regional.length - 1],
            (props.trendComparison.regional[props.trendComparison.regional.length - 1] - props.trendComparison.regional[0]),
            ((props.trendComparison.regional[props.trendComparison.regional.length - 1] - props.trendComparison.regional[0]) / props.trendComparison.regional[0] * 100), "Text2", <img id="GraphTableIcon" src={circle}/>)}

            {renderRow("State", props.trendComparison.state[0], props.trendComparison.state[props.trendComparison.state.length - 1],
            (props.trendComparison.state[props.trendComparison.state.length - 1] - props.trendComparison.state[0]),
            ((props.trendComparison.state[props.trendComparison.state.length - 1] - props.trendComparison.state[0]) / props.trendComparison.state[0] * 100), "Text2", <img id="GraphTableIcon" src={square}/>)}
        
            {renderRow("Nation", props.trendComparison.nation[0], props.trendComparison.nation[props.trendComparison.nation.length - 1],
            (props.trendComparison.nation[props.trendComparison.nation.length - 1] - props.trendComparison.nation[0]),
            ((props.trendComparison.nation[props.trendComparison.nation.length - 1] - props.trendComparison.nation[0]) / props.trendComparison.nation[0] * 100), "Text2", <img id="GraphTableIcon" src={triangle}/>)}
        </div>
    )
}