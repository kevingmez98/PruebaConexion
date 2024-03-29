function InputGroup({ icon, type, name, placeholder }) {
    return (
        <div className="input-group form-group">
            <div className="input-group-prepend">
                <span className="input-group-text"><i className={icon}></i></span>
            </div>

            <input type={type} name={name} className="form-control" placeholder={placeholder} />
        </div>
    )
}

export default InputGroup;