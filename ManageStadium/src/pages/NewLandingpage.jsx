import React, { useEffect } from 'react';
import '../styles/NewLandingpage.css';
import { useNavigate } from 'react-router-dom';

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
                    <div className="promo-badge">
                        <span>🔥</span> GIẢM NGAY 15% khi đặt sân trực tuyến hôm nay!
                    </div>
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
                    <h3 className="about-title">Cơ sở vật chất hiện đại</h3>

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
                            <span>Không vụ ca sự kiện</span>
                        </div>
                        <div className="about-feature-item">
                            <div className="feature-icon">
                                <span style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '1.2rem' }}>Am</span>
                            </div>
                            <span>Ẩm amenities & manition</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES & PRICING */}
            <section className="services-section reveal-right">
                <h2 className="section-title">DỊCH VỤ VÀ BẢNG GIÁ ƯU ĐÃI</h2>
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
                            <p>Không vụ ca sự kiện, nhân chất lượng, club / kiện, cho vui và sự kiện.</p>
                        </div>
                    </div>
                    <div className="why-item">
                        <div className="why-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c5e4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        </div>
                        <div className="why-text">
                            <h4>Amenities & manition</h4>
                            <p>Nhặt niêm ao rim amemliên, các thiền không hoan cản thi đấu</p>
                        </div>
                    </div>
                    <div className="why-item">
                        <div className="why-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c5e4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        </div>
                        <div className="why-text">
                            <h4>Địa điểm</h4>
                            <p>Chỉ: 212/4/45 QL1A, Bình Hưng Hòa B, Bình Tân, Thành phố phố CT.HCM</p>
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

            {/* FOOTER */}
            {/* <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-col">
                        <h4>ĐỊA CHỈ</h4>
                        <p>212/4/45 QL1A, Bình Hưng Hòa B,</p>
                        <p>Bình Tân, TP.HCM</p>
                        <div className="social-icons">
                            <span className="social-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></span>
                            <span className="social-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></span>
                            <span className="social-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg></span>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h4>LIÊN HỆ</h4>
                        <p><span className="contact-icon">📞</span> 0123 335 4416</p>
                        <p><span className="contact-icon">✉️</span> mycourt@gmail.com</p>
                    </div>
                    <div className="footer-col">
                        <h4>WEBSITE</h4>
                        <p>www.mycourt.vn</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <button className="back-home-btn" onClick={() => window.scrollTo(0, 0)}>QUAY LẠI TRANG CHỦ</button>
                </div>
            </footer> */}
            <footer />
        </div>
    );
};

export default NewLandingpage;
