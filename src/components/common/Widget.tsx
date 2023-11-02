import {ReactElement, useState} from "react";
import WidgetOptions from "./WidgetOptions";

const Widget = ({id, position, size, style, children}: {id: number, position: {row: number, column: number}, size: {width: number, height: number}, style: any, children: ReactElement}) => {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div
            // ref={drag}
            onPointerEnter={() => setShowOptions(true)}
            onPointerLeave={() => setShowOptions(false)}
            className="widget"
            style=
                {{
                    gridArea: `${position.row} / ${position.column} / ${(position.row+size.height)} / ${(position.column+size.width)}`,
                    ...style
                }}
        >
            <WidgetOptions id={id} className={showOptions ? "show" : ""} />
            {children}
        </div>
    )
}

export default Widget;