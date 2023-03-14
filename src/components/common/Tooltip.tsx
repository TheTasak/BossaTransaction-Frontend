import { BasicTooltip } from '@nivo/tooltip';
import "./Tooltip.scss";

const Tooltip = ({name, value, color}: {name: string | number, value: string | number, color: string}) => {
    return (
        <div className="tooltip">
            <div className="tooltip-square" style={{background: color}}></div>
            {name}: <span className="text-bold">{value} zł</span>
        </div>
    )
}

export default Tooltip;