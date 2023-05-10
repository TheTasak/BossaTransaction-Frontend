import {ReactElement} from "react";

const Widget = ({position, size, style, children}: {position: {row: number, column: number}, size: {width: number, height: number}, style: any, children: ReactElement}) => {
    return (
        <div
            className="widget"
            style=
                {{
                    gridArea: `${position.row} / ${position.column} / ${(position.row+size.width)} / ${(position.column+size.height)}`,
                    ...style
                }}
        >
            {children}
        </div>
    )
}

export default Widget;