import React, { useEffect } from 'react';
import '../styles/NewLandingpage.css';
import { useNavigate } from 'react-router-dom';

import HomePageInfoFooter from '../components/HomePageInfoFooter';
import Footer from '../components/Footer';
const NewLandingpage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.15 }); // 15% of the element needs to be visible to trigger

        const elements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div className="landing-page">
            {/* HERO SECTION */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1>MY COURT – TRUNG TÂM THỂ THAO CHUYÊN NGHIỆP</h1>
                    <p className="hero-subtitle">Chốt lịch liền tay, đá banh mê say!</p>
                    <button className="book-now-btn" onClick={() => navigate('/homepage')}>ĐẶT LỊCH NGAY</button>
                </div>
            </section>

            {/* ABOUT US SECTION */}
            <section className="about-section reveal-left">
                <div className="about-image-container">
                    <img
                        src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1470&auto=format&fit=crop"
                        alt="My Court Outdoors"
                        className="about-image"
                    />
                </div>
                <div className="about-text-container">
                    <h4 className="section-subtitle">VỀ CHÚNG TÔI - MY COURT</h4>
                    <div className="hello-badge">My Court Xin Chào</div>
                    <h3 className="about-title"> Tiện ích của chúng tôi</h3>

                    <div className="about-features">
                        <div className="about-feature-item">
                            <div className="feature-icon">
                                {/* SVG Icon Placeholder */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            </div>
                            <span>Cơ sở vật chất hiện đại</span>
                        </div>
                        <div className="about-feature-item">
                            <div className="feature-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </div>
                            <span>Hỗ trợ đặt lịch trực tuyến</span>
                        </div>
                        <div className="about-feature-item">
                            <div className="feature-icon">
                                <svg width="28" height="28" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1" y="1" width="26" height="18" rx="2" stroke="#333f38ff" stroke-width="2" stroke-linecap="round" />
                                    <path d="M14 1V19" stroke="#333f38ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M1 7H4C4.55228 7 5 7.44772 5 8V12C5 12.5523 4.55228 13 4 13H1V7Z" fill="#333f38ff" />
                                    <path d="M27 7H24C23.4477 7 23 7.44772 23 8V12C23 12.5523 23.4477 13 24 13H27V7Z" fill="#333f38ff" />
                                    <circle cx="14" cy="10" r="3" fill="#333f38ff" />
                                </svg>
                            </div>
                            <span>Tích hợp nhiều loại sân</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES & PRICING */}
            <section className="services-section reveal-right">
                <h2 className="section-title">DỊCH VỤ VÀ SÂN BÃI TẠI MY COURT</h2>
                <div className="services-grid">
                    {/* Card 1 */}
                    <div className="service-card">
                        <div className="service-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c5e4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.8 4A6.3 6.3 0 0 0 14 6L5.3 14.7a3.5 3.5 0 1 0 5 5L19 11a6.3 6.3 0 0 0 -2-7Z"></path><line x1="5.3" y1="14.7" x2="9.3" y2="18.7"></line><line x1="14" y1="6" x2="18.8" y2="10.8"></line><line x1="2" y1="22" x2="7" y2="17"></line></svg>
                        </div>
                        <h3>Sân Cầu Lông Indoor</h3>
                        <p className="service-desc">Sân gỗ chuyên dụng</p>
                        <button className="service-btn" onClick={() => navigate('/homepage')}>Xem chi tiết</button>
                    </div>
                    {/* Card 2 */}
                    <div className="service-card">
                        <div className="service-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c5e4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 12l3.5 2 1.5 -4.5 -3.5 -2.5 -3.5 2.5 1.5 4.5z"></path><path d="M12 12v10"></path><path d="M12 12L3.5 7"></path><path d="M12 12l8.5 -5"></path></svg>
                        </div>
                        <h3>Sân Bóng Đá Cỏ Nhân Tạo</h3>
                        <p className="service-desc">Cỏ nhân tạo chất lượng cao</p>
                        <button className="service-btn" onClick={() => navigate('/homepage')}>Xem chi tiết</button>
                    </div>
                    {/* Card 3 */}
                    <div className="service-card">
                        <div className="service-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c5e4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.2 11.8a5 5 0 0 1 -7.1 -7.1 5 5 0 0 1 7.1 7.1Z"></path><line x1="12.2" y1="11.8" x2="20" y2="19.6"></line><circle cx="6" cy="6" r="1"></circle></svg>
                        </div>
                        <h3>Sân Tennis Indoor</h3>
                        <p className="service-desc">Đạt chuẩn thi đấu</p>
                        <button className="service-btn" onClick={() => navigate('/homepage')}>Xem chi tiết</button>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="why-choose-section reveal-left">
                <h2 className="section-title">TẠI SAO NÊN CHỌN MY COURT?</h2>
                <div className="why-choose-grid">
                    <div className="why-item">
                        <div className="why-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c5e4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        </div>
                        <div className="why-text">
                            <h4>Cơ sở vật chất hiện đại</h4>
                            <p>Cơ sở vật chất hiện đại, sân gỗ cỏ nhân tạo các sân cầu lông</p>
                        </div>
                    </div>
                    <div className="why-item">
                        <div className="why-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c5e4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        </div>
                        <div className="why-text">
                            <h4>Không gian đa năng cho chứa sự kiện</h4>
                            <p>Phục vụ cho những sự kiện đấu giải lớn nhỏ</p>
                        </div>
                    </div>
                    <div className="why-item">
                        <div className="why-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c5e4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
                        </div>
                        <div className="why-text">
                            <h4>Tiện ích & Dịch vụ</h4>
                            <p>Bãi đỗ xe rộng rãi, căn tin phục vụ giải khát và wifi tốc độ cao miễn phí.</p>
                        </div>
                    </div>
                    <div className="why-item">
                        <div className="why-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c5e4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        </div>
                        <div className="why-text">
                            <h4>Vị trí thuận lợi</h4>
                            <p>Tọa lạc tại số 212/4/45 QL1A, phường Bình Hưng Hòa B, quận Bình Tân, TP.HCM.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* REAL IMAGES */}
            <section className="gallery-section reveal-right">
                <h2 className="section-title">HÌNH ẢNH THỰC TẾ</h2>
                <div className="gallery-grid">
                    <div className="gallery-item">
                        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop" alt="Toàn Cảnh My Court" />
                        <p>Toàn Cảnh My Court</p>
                    </div>
                    <div className="gallery-item">
                        <img src="https://images.unsplash.com/photo-1522778524245-8c03fa9e539d?q=80&w=500&auto=format&fit=crop" alt="Khu Vực Sự Kiện" />
                        <p>Khu Vực Sự Kiện</p>
                    </div>
                    <div className="gallery-item">
                        <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=500&auto=format&fit=crop" alt="Khu Vực CLB" />
                        <p>Khu Vực CLB</p>
                    </div>
                    <div className="gallery-item">
                        <img src="https://images.unsplash.com/photo-1622279457486-62dcc4a631d6?q=80&w=500&auto=format&fit=crop" alt="Sân Tennis" />
                        <p>Sân Tennis</p>
                    </div>
                    <div className="gallery-item">
                        <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34f8?q=80&w=500&auto=format&fit=crop" alt="Sân Cầu Lông" />
                        <p>Sân Cầu Lông</p>
                    </div>
                    <div className="gallery-item">
                        <img src="https://images.unsplash.com/photo-1518605368461-1e1e38ce156d?q=80&w=500&auto=format&fit=crop" alt="Sân Bóng Đá" />
                        <p>Sân Bóng Đá</p>
                    </div>
                    <div className="gallery-item">
                        <img src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=500&auto=format&fit=crop" alt="Sân Bóng Đá Đèn Đêm" />
                        <p>Sân Bóng Đá Đèn Đêm</p>
                    </div>
                    <div className="gallery-item">
                        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop" alt="Cảnh Quan Ngoài Trời" />
                        <p>Cảnh Quan Ngoài Trời</p>
                    </div>
                </div>
            </section>
            <div className="hp-footer"><HomePageInfoFooter /></div>
            <div><Footer /></div>
        </div>
    );
};

export default NewLandingpage;
