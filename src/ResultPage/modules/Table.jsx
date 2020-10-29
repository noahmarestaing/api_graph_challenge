import React, {useState} from 'react'
import '../css/Table.css'

export default function Table (props) {

    const [industryRows, setIndustryRows] = useState([])

    console.log(props.trendComparison)
    function renderRow(val1, val2, val3, val4, textStyle) {
        return (
            <span id="TableRow">
                    <span id="TableEntryLeft"><span id={textStyle}>{val1}</span></span>
                    <span id="TableEntry"><span id={textStyle}>{val2}</span></span>
                    <span id="TableEntry"><span id={textStyle}>{val3}</span></span>
                    <span id="TableEntry"><span id={textStyle}>{val4}</span></span>
            </span>
        )
    }

    function renderIndustryRows(employingIndustries) {
        let totalJobs = 0;
        for (let i = 0; i < employingIndustries.industries.length; i++) {
            totalJobs = totalJobs + employingIndustries.industries[i].jobs
        }
        let rows = []
        for (let i = 0; i < employingIndustries.industries.length; i++) {
            rows.push(
                <div>
                {renderRow(
                    employingIndustries.industries[i].title, 
                    employingIndustries.industries[i].in_occupation_jobs,
                    (employingIndustries.industries[i].in_occupation_jobs / employingIndustries.jobs * 100).toFixed(1) + "%",
                    (employingIndustries.industries[i].in_occupation_jobs / employingIndustries.industries[i].jobs * 100).toFixed(1) + "%",
                    "Text2"
                )}
                </div>
            )
        }
        return (rows)
    }

    return (
        <div id="Table">
            {renderRow("Industry", "Occupation Jobs in Industry (" + props.employingIndustries.year + ")", 
            "Percent of Occupation in Industry (" + props.employingIndustries.year + ")", 
            "Percent of Total Jobs in Industry (" + props.employingIndustries.year + ")", "Text2Bold")}

            {renderIndustryRows(props.employingIndustries)}
        </div>
    )
}