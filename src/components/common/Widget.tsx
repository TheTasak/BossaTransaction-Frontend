import {ReactElement} from "react";

const Widget = ({size, children}: {size: {width: number, height: number}, children: ReactElement}) => {
    return (
        <div className="widget">
            {children}
        </div>
    )
}

export default Widget;