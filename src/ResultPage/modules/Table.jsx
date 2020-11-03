import React, {useState} from 'react'
import '../css/Table.css'

export default function Table (props) {

    //render table row
    function renderRow(val1, val2, val3, val4, textStyle, percentage) {
        if (val1 === undefined) val1 = 0;
        if (val2 === undefined) val2 = 0;
        if (val3 === undefined) val3 = 0;
        if (val4 === undefined) val4 = 0;

        return (
            <span id="TableRow">
                    <span id="TableEntryLeft"><span id="Bar" style={{width: "" + percentage + "%"}}></span><span id={textStyle}>{val1.toLocaleString(undefined, {maximumFractionDigits:2})}</span></span>
                    <span id="TableEntry"><span id={textStyle}>{val2.toLocaleString(undefined, {maximumFractionDigits:2})}</span></span>
                    <span id="TableEntry"><span id={textStyle}>{val3.toLocaleString(undefined, {maximumFractionDigits:2})}</span></span>
                    <span id="TableEntry"><span id={textStyle}>{val4.toLocaleString(undefined, {maximumFractionDigits:2})}</span></span>
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
                    "Text2",
                    (employingIndustries.industries[i].in_occupation_jobs / employingIndustries.jobs * 100)
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
            "Percent of Total Jobs in Industry (" + props.employingIndustries.year + ")", "Text2Bold", 0)}

            {renderIndustryRows(props.employingIndustries)}
        </div>
    )
}