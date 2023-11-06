import {resourceParams} from "./helpers";
import BasicWidget from "../common/Widgets/BasicWidget";
import BasicChartWidget from "../common/Widgets/BasicChartWidget";
import HistogramWidget from "../common/Widgets/HistogramWidget";
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

export const ItemTypes = {
    WIDGET: 'widget'
}

enum WidgetTypes {
    BasicWidget = "basic",
    BasicChartWidget = "basic_chart",
    HistogramWidget = "histogram"
}

export const loadLayout = (layout: layoutObject, data: WalletShare[]): JSX.Element[] => {
    let map = new Map();
    map.set(WidgetTypes.BasicWidget, BasicWidget);
    map.set(WidgetTypes.BasicChartWidget, BasicChartWidget);
    map.set(WidgetTypes.HistogramWidget, HistogramWidget);


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
            <Widget id={widget.id} key={widget.id} position={positionObject} size={sizeObject} style={styleObject}>
                {component}
            </Widget>
        )
    });
}

export const exportLayoutObject = (layout: layoutObject): string => {
    return JSON.stringify(layout);
}
// TODO optional argument to exclude given widget from state
const calculateLayoutState = (layout: layoutObject): number[][] => {
    let array = Array<number>(layout.rows).fill(0).map(x => Array<number>(layout.columns).fill(0));
    layout.widgets.forEach((widget) => {
        for (let x = widget.column; x < widget.column+widget.width; x++) {
            for (let y = widget.row; y < widget.row+widget.height; y++) {
                array[y-1][x-1] = 1;
            }
        }
    })
    return array;
}

export const checkLayoutCollisions = (layout: layoutObject, newPosition: any): boolean => {
    if (!layout) {
        return true;
    }

    const layoutState = calculateLayoutState(layout);
    console.log(layoutState);
    console.log(newPosition)

    for (let x = newPosition.column; x < newPosition.column+newPosition.width; x++) {
        for (let y = newPosition.row; y < newPosition.row+newPosition.height; y++) {
            if (layoutState[y-1][x-1] === 1) {
                console.log("error on ", y-1, x-1)
                return true;
            }
        }
    }

    return false;
}
