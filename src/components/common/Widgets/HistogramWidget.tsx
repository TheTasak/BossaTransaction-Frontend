import { ResponsiveBar } from "@nivo/bar";
import React from "react";


const HistogramWidget = (props: any) => {
    return (
        <React.Fragment>
            {
                props.data !== undefined && (
                    <div className="chart-div">

                    </div>
                )
            }
        </React.Fragment>
    )
}

export default HistogramWidget;