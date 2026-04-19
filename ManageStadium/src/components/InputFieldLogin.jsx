import "../styles/InputFieldLogin.css"

function InputFieldLogin({ label, type, placeholder, value, onChange }) {
    return (
        <div className="input-field-login">
            <label>{label}</label>

            <input
                type={type}
                placeholder={placeholder}
                value={value || ""}
                onChange={onChange}
            />
        </div>
    )
}

export default InputFieldLogin