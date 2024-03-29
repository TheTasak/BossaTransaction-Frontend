import React, {createContext, ReactElement, useContext, useMemo, useState} from "react";
import {checkLayoutCollisions, layoutObject} from "../helpers/layout";

export type LayoutContextType = {
    layoutObject: layoutObject | undefined;
    setLayoutObject: React.Dispatch<any>;
    removeWidget: (id: number) => void;
    moveWidget: (id: number, direction: string) => void;
    resizeWidget: (id: number, direction: string) => void;
};

export const LayoutContext = createContext<LayoutContextType | null>(null);

const LayoutProvider = ({ children }: { children: ReactElement }) => {
    const [layoutObject, setLayoutObject] = useState<layoutObject | undefined>({
        widgets: [
            {
                id: 1,
                name: 'basic',
                column: 1,
                row: 1,
                width: 1,
                height: 1,
                backgroundColor: "black",
                properties: {
                    test: 'test'
                }
            },
            {
                id: 2,
                name: 'basic_chart',
                column: 2,
                row: 1,
                width: 1,
                height: 1,
                backgroundColor: "white",
                properties: {
                    test: 'test'
                }
            },
            {
                id: 3,
                name: 'histogram',
                column: 3,
                row: 1,
                width: 1,
                height: 1,
                backgroundColor: "black",
                properties: {
                    test: 'test'
                }
            }
        ],
        columns: 3,
        rows: 4,
    });

    const removeWidget = (id: number) => {
        let widgets = layoutObject?.widgets.filter(widget => widget.id !== id);
        setLayoutObject((obj) => {
            if (obj && widgets) {
                return {columns: obj.columns, rows: obj.rows, widgets: widgets};
            }
        });
    }

    const resizeWidget = (id: number, direction: string) => {
        let currentWidget = layoutObject?.widgets.filter(widget => widget.id === id)[0];
        let otherWidgets = layoutObject?.widgets.filter(widget => widget.id !== id);

        if (!currentWidget || !layoutObject) {
            return;
        }
        let copyWidget = {...currentWidget};

        switch (direction) {
            case "down":
                copyWidget.height += 1;
                break;
            case "up":
                copyWidget.height -= 1;
                break;
            case "right":
                copyWidget.width += 1;
                break;
            case "left":
                copyWidget.width -= 1;
                break;
        }

        if (checkLayoutCollisions(layoutObject, copyWidget)) {
            return;
        }

        let widgets = [copyWidget];
        if (otherWidgets) {
            widgets.push(...otherWidgets);
        }
        setLayoutObject((obj) => {
            if (obj) {
                return {columns: obj.columns, rows: obj.rows, widgets: widgets};
            }
        })
    }

    const moveWidget = (id: number, direction: string) => {
        let currentWidget = layoutObject?.widgets.filter(widget => widget.id === id)[0];
        let otherWidgets = layoutObject?.widgets.filter(widget => widget.id !== id);

        if (!currentWidget || !layoutObject) {
            return;
        }
        let copyWidget = {...currentWidget};

        switch (direction) {
            case "down":
                copyWidget.row += 1;
                break;
            case "up":
                copyWidget.row -= 1;
                break;
            case "right":
                copyWidget.column += 1;
                break;
            case "left":
                copyWidget.column -= 1;
                break;
        }
        if (checkLayoutCollisions(layoutObject, copyWidget)) {
            return;
        }

        let widgets = [copyWidget];
        if (otherWidgets) {
            widgets.push(...otherWidgets);
        }
        setLayoutObject((obj) => {
            if (obj) {
                return {columns: obj.columns, rows: obj.rows, widgets: widgets};
            }
        })
    }

    const value = useMemo(
        () => ({
            layoutObject,
            setLayoutObject,
            removeWidget,
            moveWidget,
            resizeWidget
        }),
        [layoutObject]
    );

    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    )
}

export default LayoutProvider;