import "./Widget.scss"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faExpand, faEllipsis, faUpDownLeftRight} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {LayoutContext, LayoutContextType} from "../Dashboard/LayoutProvider";

const WidgetOption = ({onClick, icon}: {onClick: (...args: any[]) => void, icon: JSX.Element}) => {
    return (
        <div className="widget--option" onClick={onClick}>
            {icon}
        </div>
    )
}

const WidgetOptions = ({id, className}: {id: number, className: string}) => {

    const {layoutObject, removeWidget, moveWidget, resizeWidget} = React.useContext(LayoutContext) as LayoutContextType;
    const onRemoveWidget = () => {
        removeWidget(id);
    }
    const onResizeWidget = () => {
        resizeWidget(id, "right");
    }
    const onMoveWidget = (direction: string) => {
        moveWidget(id, "down");
    }

    return (
        <div className={"widget--options " + className}>
            <div className="widget--options-group">
                <WidgetOption
                    onClick={onResizeWidget}
                    icon={<FontAwesomeIcon icon={faExpand} />}
                />
                <WidgetOption
                    onClick={onMoveWidget}
                    icon={<FontAwesomeIcon icon={faUpDownLeftRight} />}
                />
            </div>
            <div className="widget--options-group">
                <WidgetOption
                    onClick={onMoveWidget}
                    icon={<FontAwesomeIcon icon={faEllipsis} />}
                />
                <WidgetOption
                    onClick={onRemoveWidget}
                    icon={<FontAwesomeIcon icon={faXmark} />}
                />
            </div>
        </div>
    )
}

export default WidgetOptions;