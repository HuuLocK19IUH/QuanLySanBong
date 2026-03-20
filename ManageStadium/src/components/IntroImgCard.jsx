import { useState } from "react";
import "../styles/introimg.css";

function IntroImgCard({ nameimg, img }) {
    const [showZoom, setShowZoom] = useState(false);

    return (
        <>
            <div className="introimg-container">
                <p className="hinhanhsantitle">HÌNH ẢNH SẴN</p>
                <p className="intro-title-card">{nameimg}</p>

                <img 
                    src={img} 
                    alt="" 
                    onClick={() => setShowZoom(true)} 
                    style={{ cursor: "pointer" }}
                />
            </div>

            {/* FULLSCREEN ZOOM */}
            {showZoom && (
                <div 
                    className="zoom-overlay"
                    onClick={() => setShowZoom(false)}
                >
                    <img src={img} alt="" className="zoom-img" />
                </div>
            )}
        </>
    );
}

export default IntroImgCard;