import {ResponsiveTreeMap} from '@nivo/treemap';
import Tooltip from "../Tooltip";

const BasicChartWidget = (props: any) => {
    return (
        <div>
            {
                props.data !== undefined && (
                    <div className="chart-div">
                        <ResponsiveTreeMap
                            data={
                                {
                                    name: "root",
                                    children: props.data
                                }
                            }
                            theme={
                                {
                                    fontSize: 20
                                }
                            }
                            tooltip={(e) => <Tooltip name={e.node.label} value={e.node.formattedValue} color={e.node.color}/>}
                            identity="name"
                            leavesOnly={true}
                            value="totalPrice"
                            valueFormat=">-.02s"
                            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                            label="id"
                            labelSkipSize={12}
                            parentLabelPosition="left"
                        />
                    </div>
                )
            }
        </div>
    )
}

export default BasicChartWidget;