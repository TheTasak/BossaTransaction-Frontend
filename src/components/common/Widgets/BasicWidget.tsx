
const BasicWidget = (props: any) => {
    return (
        <div>
            {
                props.data !== undefined && (
                    <div className="widget-simple">
                        {props.data.map((share: any) => <div key={share.name}>{share.name + " " + share.shares}</div>)}
                    </div>
                )
            }
        </div>
    )
}

export default BasicWidget;