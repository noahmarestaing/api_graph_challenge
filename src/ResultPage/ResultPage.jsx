import React, {useState, useEffect} from 'react'
import { useResultPageContext } from '../contexts/ResultPageContext'
import './css/ResultPage.css'
import './css/Variables.css'
import { Graph } from './modules/Graph'
import GraphTable from './modules/GraphTable'
import Summary from './modules/Summary'
import Table from './modules/Table'

export default function ResultPage (props) {

    const resultPageContext = useResultPageContext()

    //gets json data once on page load
    useEffect(() => {
        resultPageContext.getResultData()
    }, [])

    return (
        <div id="ResultPageContent">
            <div id="ResultPageTitle">Occupation Overview</div>
            <div id="ResultPageSubTitle">
                {resultPageContext.resultData.occupation.title} in {resultPageContext.resultData.region.title}
            </div>

            <div id="ResultPageSectionTitle">Occupation Summary for {resultPageContext.resultData.occupation.title}</div>
            <Summary
                summary={resultPageContext.resultData.summary}
            />
            
            <div id="ResultPageSectionTitle">Regional Trends</div>
            <Graph
                trendComparison={resultPageContext.resultData.trend_comparison}
            />
            <GraphTable
                trendComparison={resultPageContext.resultData.trend_comparison}
            />

            <div id="ResultPageSectionTitle">Industries Employing {resultPageContext.resultData.occupation.title}</div>
            <Table
                employingIndustries={resultPageContext.resultData.employing_industries}
            />

        </div>
    )
}