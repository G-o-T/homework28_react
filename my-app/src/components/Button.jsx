const Button = (props) => {
    return (
        <button className="btn" onClick={props.onClickHandler}>{props.children}</button>
    )
}

export default Button;