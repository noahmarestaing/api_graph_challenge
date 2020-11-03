import React from 'react'
import '../css/Summary.css'

export default function Summary (props) {

    //generate green text if the percentage increases and red if it decreases
    let jobsComparisonPercent = (props.summary.jobs.regional / props.summary.jobs.national_avg * 100).toLocaleString(undefined, {maximumFractionDigits:2})
    let jobsComparison = <div>{jobsComparisonPercent.toLocaleString(undefined, {maximumFractionDigits:2})}% <span id="GreenText">above</span> national average</div>
    if (jobsComparisonPercent < 0) jobsComparison = <div>{(-jobsComparisonPercent).toLocaleString(undefined, {maximumFractionDigits:2})}% <span id="RedText">below</span> national average</div>
    
    let jobsGrowthRegional = <span id="GreenText">+{props.summary.jobs_growth.regional}%</span>
    if (props.summary.jobs_growth.regional < 0) jobsGrowthRegional = <span id="RedText">-{-props.summary.jobs_growth.regional}</span>
    
    let jobsGrowthNational =  <div>Nation <span id="GreenText">+{props.summary.jobs_growth.national_avg}%</span></div>
    if (props.summary.jobs_growth.national_avg < 0) <div>Nation <span id="RedText">-{props.summary.jobs_growth.national_avg}%</span></div>

    return (
        <div id="Summary">

            <span id="SummaryBoxLeft">
                <div id="Text1">{props.summary.jobs.regional.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
                <div id="Text2Bold">Jobs ({props.summary.jobs.year})</div>
                <div id="Text2">{jobsComparison}</div>
            </span>

            <span id="SummaryBoxCenter">
                <div id="Text1">{jobsGrowthRegional}</div>
                <div id="Text2Bold">%Change ({props.summary.jobs_growth.start_year}-{props.summary.jobs_growth.end_year}) </div>
                <div id="Text2">{jobsGrowthNational}</div>
            </span>

            <span id="SummaryBoxRight">
                <div id="Text1">${props.summary.earnings.regional.toLocaleString(undefined, {maximumFractionDigits:2})}/hr</div>
                <div id="Text2Bold">Median Hourly Earnings</div>
                <div id="Text2">Nation: ${props.summary.earnings.national_avg.toLocaleString(undefined, {maximumFractionDigits:2, minimumFractionDigits: 2})}/hr</div>
            </span>

        </div>
    )
}