import "../styles/InputFieldPassword.css"

function InputFieldPassword({ label, type, placeholder, value, onChange }) {
    
    return (
        <div className="input-field-password">
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

export default InputFieldPassword