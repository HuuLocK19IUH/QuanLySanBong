import "../styles/InputImgFile.css";
import { useRef, useState, useEffect } from "react";

function InputImgFile({ onChange, initialAvatarUrl }) {
    const fileRef = useRef(null);

    const [preview, setPreview] = useState(initialAvatarUrl || null);

    useEffect(() => {
        setPreview(initialAvatarUrl || null);
    }, [initialAvatarUrl]);

    const handleClick = () => {
        fileRef.current.click();
    };

    const handleChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            onChange?.(file, url);
        }
    };

    return (
        <div className="upload-box">
            <div className="upload-area" onClick={handleClick}>
                <div className="upload-content">
                    {preview ? (
                        <img src={preview} className="preview-img" />
                    ) : (
                        <div className="image-placeholder"></div>
                    )}
                    <p>Chạm để tải ảnh lên</p>
                </div>
            </div>

            <input
                type="file"
                ref={fileRef}
                onChange={handleChange}
                accept="image/*"
                hidden
            />
        </div>
    );
}

export default InputImgFile;