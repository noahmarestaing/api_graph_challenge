import React, {useState, useContext} from 'react'

export const ResultPageContext = React.createContext(null)

export function useResultPageContext() {
    return useContext(ResultPageContext)
}

function ResultPageProvider(props) {

    //dummy job data for before the page loads
    const [resultData, setResultData] = useState({
        occupation: {
            onet: "default",
            title: "default"
        },
        region: {
            id: "default",
            title: "default",
            type: "default"
        },
        summary: {
            earnings: {
                regional: 0,
                national_avg: 0,
            },
            jobs: {
                year: 0,
                regional: 0,
                national_avg: 0,
            },
            jobs_growth: {
                start_year: 0,
                end_year: 0,
                regional: 0,
            }
        },
        trend_comparison: {
            end_year: 0,
            nation: [],
            regional: [],
            start_year: 0,
            state: []
        },
        employing_industries: {
            industries: [],
            jobs: 0,
            year: 0,
        }  
    })

    //get job data from the mocky.io url
    function getResultData() {
        console.log("getting result data")
        fetch("https://run.mocky.io/v3/a2cc3707-8691-4188-8413-6183a7bb3d32", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json"
            })
        }).then(r => {
            return r.json()
        }).then(r => {
            console.log(r)
            setResultData(r)
            console.log("got result data")
        })
    }

    return (
        <ResultPageContext.Provider value={{
            resultData,
            getResultData,
        }}>
        {props.children}
        </ResultPageContext.Provider>
    )
}

export default ResultPageProvider