

const HeaderButton = ({text, onClick}: {text: string, onClick: any}) => {
    return (
        <div onClick={onClick} className="header-button" >{text}</div>
    )
}

export default HeaderButton;