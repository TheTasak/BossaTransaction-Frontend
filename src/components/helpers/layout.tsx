import {resourceParams} from "./helpers";
import BasicWidget from "../common/Widgets/BasicWidget";
import BasicChartWidget from "../common/Widgets/BasicChartWidget";
import Widget from "../common/Widget";
import React, {ReactElement} from "react";
import {WalletShare} from "./calculate";

export interface layoutWidget {
    id: number;
    name: string;
    column: number;
    row: number;
    width: number;
    height: number;
    backgroundColor?: string;
    properties?: resourceParams;
}

export interface layoutObject {
    widgets: layoutWidget[];
    columns: number;
    rows: number;
}

enum WidgetTypes {
    BasicWidget = "basic",
    BasicChartWidget = "basic_chart"
}

export const loadLayout = (layout: layoutObject, data: WalletShare[]): JSX.Element[] => {
    let map = new Map();
    map.set(WidgetTypes.BasicWidget, BasicWidget);
    map.set(WidgetTypes.BasicChartWidget, BasicChartWidget);


    return layout.widgets.map(widget => {
        let element = map.get(widget.name);
        let properties = {...widget.properties, data};
        let component : ReactElement = React.createElement(element, properties);

        let sizeObject = {
            width: widget.width,
            height: widget.height
        }

        let positionObject = {
            row: widget.row,
            column: widget.column
        }

        let styleObject = {
            backgroundColor: widget.backgroundColor
        }

        return (
            <Widget key={widget.id} position={positionObject} size={sizeObject} style={styleObject}>
                {component}
            </Widget>
        )
    });
}

export const exportLayoutObject = (layout: layoutObject): string => {
    return JSON.stringify(layout);
}

