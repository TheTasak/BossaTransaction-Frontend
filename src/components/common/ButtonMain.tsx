import "./ButtonMain.scss";
const ButtonMain = ({text, onClick}: {text: string, onClick: any}) => {
    return (
        <div className="button-main" onClick={onClick}>
            {text}
        </div>
    )
}

export default ButtonMain;