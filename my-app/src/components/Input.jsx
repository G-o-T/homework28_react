const Input = ({label, value, onChangeHandler}) => {
    
    return (
        <div className="input">
            <label className="label">{label}</label>
            <textarea className="input input-textarea" type="text" value={value} onChange={onChangeHandler} cols="30" rows="10"></textarea>
        </div>
    )

}

export default Input;