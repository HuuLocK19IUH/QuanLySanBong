import "../styles/InputFieldPassword.css"
function InputFieldPassword({ label, type, placeholder }) {
    return (
        <div className="input-field-password">
            <label>{label}</label>

            <input
                type={type}
                placeholder={placeholder}
            />
        </div>
    )
}

export default InputFieldPassword