import React from "react";

const BasicWidget = (props: any) => {
    return (
        <React.Fragment>
            {
                props.data !== undefined && (
                    <div className="widget-simple">
                        {props.data.map((share: any) => <div key={share.name}>{share.name + " " + share.shares}</div>)}
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default BasicWidget;