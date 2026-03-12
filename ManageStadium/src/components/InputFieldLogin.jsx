import "../styles/InputFieldLogin.css"

function InputFieldLogin({ label, type, placeholder }) {
    return (
        <div className="input-field-login">
            <label>{label}</label>

            <input
                type={type}
                placeholder={placeholder}
            />
        </div>
    )
}

export default InputFieldLogin