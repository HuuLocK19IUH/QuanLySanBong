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
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.51445 3.55692C4.3896 3.48484 4.21434 3.4556 3.99467 3.51446C3.7751 3.57329 3.6379 3.68625 3.56577 3.8112C3.5004 3.92442 3.40133 4.19801 3.5506 4.75511C3.70382 5.32692 4.00656 5.76263 4.30541 6.01612C4.53616 6.21185 4.68154 6.24055 4.72649 6.24593C4.76272 6.2188 4.87429 6.12124 4.97628 5.83633C5.10836 5.46736 5.15269 4.93863 4.99946 4.36678C4.85016 3.80957 4.62758 3.62224 4.51445 3.55692ZM5.76446 1.39187C6.56988 1.85689 7.13222 2.66706 7.41428 3.71973C7.69242 4.75775 7.64201 5.80732 7.33003 6.67888C7.16133 7.15015 6.8873 7.63542 6.49529 8.01809L6.98179 9.83476C8.45751 9.92385 9.38837 9.72543 10.0614 9.44711C10.7355 9.16832 11.2034 8.80206 11.8117 8.32599C11.9656 8.20547 12.1286 8.07791 12.3062 7.94295C13.1682 7.28782 14.2112 6.61579 15.8342 6.32497C17.4138 6.04193 19.4405 6.13709 22.277 6.78172C22.9502 6.93471 23.3719 7.60446 23.2189 8.27765C23.0659 8.95084 22.3962 9.37255 21.723 9.21955C19.567 8.72957 18.068 8.61668 16.9791 8.69825C17.3737 9.35612 17.8372 10.2209 18.2771 11.2657C19.2203 13.5058 20.0636 16.5953 19.8662 20.2505L19.9997 20.2505C20.6901 20.2503 21.2499 20.8099 21.25 21.5002C21.2501 22.1906 20.6906 22.7503 20.0003 22.7505L18.5003 22.7508C18.1418 22.7509 17.8004 22.5969 17.5631 22.3281C17.3257 22.0593 17.2153 21.7016 17.2597 21.3457C17.6612 18.134 17.1129 15.351 16.3539 13.2172C16.3546 13.9105 16.2292 14.5993 15.9946 15.2818C15.397 17.0205 14.0759 18.7477 12.3074 20.5462C12.5781 20.7755 12.75 21.1179 12.75 21.5005C12.75 22.1908 12.1904 22.7505 11.5 22.7505H9.5C8.98358 22.7505 8.52032 22.4329 8.3341 21.9512C8.14788 21.4695 8.27704 20.9229 8.65916 20.5756C11.4155 18.0698 13.058 16.1342 13.6304 14.4691C13.8995 13.6862 13.9222 12.9857 13.7162 12.2954C13.5697 11.8043 13.2935 11.2726 12.8388 10.6929C12.3294 11.0707 11.7315 11.4618 11.0168 11.7573C9.73068 12.2892 8.12985 12.5099 5.85399 12.2422C5.34556 12.1825 4.92497 11.8187 4.79255 11.3242L4.08044 8.66499C3.54973 8.52956 3.0699 8.24636 2.68826 7.92264C1.98231 7.32385 1.41391 6.44012 1.13579 5.40216C0.853729 4.34949 0.935687 3.36669 1.40066 2.56127C1.85887 1.76757 2.60131 1.29962 3.34762 1.09965C4.09385 0.899697 4.97076 0.933618 5.76446 1.39187ZM9.25009 3.50079C9.25012 2.12009 10.3694 1.00081 11.7501 1.00079C13.1308 1.00076 14.2501 2.12005 14.2501 3.50078C14.2501 4.88147 13.1308 6.00076 11.7501 6.00079C10.3694 6.00082 9.25006 4.88152 9.25009 3.50079Z" fill="#75b06f" />
                            </svg>
                        </div>
                        <h3>Sân Cầu Lông Indoor</h3>
                        <p className="service-desc">Sân gỗ chuyên dụng</p>
                        <button className="service-btn" onClick={() => navigate('/homepage')}>Xem chi tiết</button>
                    </div>
                    {/* Card 2 */}
                    <div className="service-card">
                        <div className="service-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 4.25C15 2.86931 16.1193 1.75003 17.5 1.75C18.8807 1.74997 20 2.86927 20 4.25C20 5.63069 18.8807 6.74997 17.5 6.75C16.1193 6.75003 15 5.63073 15 4.25ZM2.75003 5.5C2.75003 4.80964 3.30967 4.25 4.00003 4.25C5.46666 4.25 8.43258 4.51008 11.0524 5.09227C12.3559 5.38192 13.6579 5.76912 14.6629 6.28753C14.8253 6.37127 14.9867 6.46187 15.1438 6.56021C15.1598 6.56986 15.1757 6.57992 15.1914 6.59036C15.5022 6.78922 15.7941 7.01906 16.0397 7.28672C16.3988 7.67806 16.6956 8.1947 16.7433 8.82281C16.7897 8.96632 16.8933 9.08919 17.1097 9.19264C17.3861 9.32487 17.8009 9.39075 18.2608 9.32506C19.2435 9.18467 19.75 8.62718 19.75 8C19.75 7.30964 20.3097 6.75 21 6.75C21.6904 6.75 22.25 7.30964 22.25 8C22.25 10.3728 20.2566 11.5653 18.6143 11.7999C17.7616 11.9217 16.8327 11.8314 16.031 11.448C15.9428 11.4058 15.8559 11.3598 15.7708 11.31C15.6999 11.4114 15.6266 11.513 15.5515 11.6144C15.3629 11.8691 15.1559 12.132 14.9359 12.3985C15.4158 12.7367 15.826 13.1433 16.108 13.6492C16.5782 14.4928 16.5787 15.4013 16.3272 16.281C16.0861 17.1246 15.5944 18.0184 14.962 18.9669C14.6741 19.3986 14.346 19.8577 13.9808 20.3463C14.4319 20.535 14.7488 20.9805 14.7488 21.5C14.7488 22.1904 14.1891 22.75 13.4988 22.75H11.4999C11.0194 22.75 10.5814 22.4746 10.3732 22.0415C10.1651 21.6084 10.2236 21.0943 10.5238 20.7191C11.5193 19.4748 12.3039 18.447 12.882 17.58C13.4685 16.7003 13.7895 16.0629 13.9235 15.594C14.0472 15.1612 13.9853 14.9759 13.9243 14.8664C13.8505 14.734 13.6708 14.5298 13.2372 14.2773C12.4097 15.1245 11.5441 15.9272 10.8059 16.5295C10.4344 16.8326 10.0735 17.1029 9.7524 17.3044C9.59275 17.4046 9.4197 17.5026 9.24395 17.5794C9.09536 17.6443 8.82292 17.75 8.50003 17.75C7.58725 17.75 6.69261 17.2577 5.92219 16.7234C5.44582 16.393 4.93358 15.9853 4.38827 15.5186L4.11806 16.059C3.80933 16.6765 3.05849 16.9268 2.44101 16.618C1.82354 16.3093 1.57326 15.5585 1.882 14.941L2.882 12.941C3.05741 12.5902 3.38733 12.342 3.77305 12.2708C4.15876 12.1996 4.55555 12.3135 4.84469 12.5786C5.85082 13.5008 6.67379 14.2023 7.34687 14.669C7.86704 15.0298 8.19037 15.1721 8.36337 15.2236C8.38141 15.2129 8.40142 15.2007 8.42344 15.1869C8.62192 15.0623 8.89374 14.8631 9.22538 14.5925C9.78168 14.1386 10.4453 13.5338 11.1129 12.8695C11.0761 12.8297 11.0407 12.7892 11.0066 12.7481C10.7608 12.4517 10.5644 12.096 10.4811 11.6769C10.3974 11.2561 10.4446 10.8556 10.5598 10.4966C10.7714 9.83661 11.2441 9.23179 11.7226 8.69413C11.9088 8.48497 12.1172 8.26339 12.3434 8.02973C11.8012 7.84849 11.1811 7.68185 10.5101 7.53273C8.06748 6.98992 5.2834 6.75 4.00003 6.75C3.30967 6.75 2.75003 6.19036 2.75003 5.5ZM8.24292 15.2885C8.22624 15.2958 8.2277 15.2937 8.24465 15.2878C8.24405 15.2881 8.24347 15.2883 8.24292 15.2885ZM16.75 20C16.7501 18.6193 17.8693 17.5001 19.25 17.5C20.6308 17.5 21.7501 18.6193 21.75 20C21.75 21.3807 20.6307 22.5 19.25 22.5C17.8693 22.5001 16.75 21.3808 16.75 20Z" fill="#75b06f" />
                            </svg>

                        </div>
                        <h3>Sân Bóng Đá Cỏ Nhân Tạo</h3>
                        <p className="service-desc">Cỏ nhân tạo chất lượng cao</p>
                        <button className="service-btn" onClick={() => navigate('/homepage')}>Xem chi tiết</button>
                    </div>
                    {/* Card 3 */}
                    <div className="service-card">
                        <div className="service-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9999 4.25C11 2.86931 12.1192 1.75003 13.4999 1.75C14.8807 1.74997 16 2.86927 15.9999 4.25C15.9999 5.63069 14.8806 6.74997 13.4999 6.75C12.1192 6.75003 10.9999 5.63073 10.9999 4.25ZM20.073 5.32912C19.9467 5.36296 19.6832 5.48636 19.3948 5.98585C19.0988 6.49852 19.0048 7.02068 19.0369 7.41124C19.0617 7.71281 19.1442 7.83591 19.1721 7.87149C19.217 7.87793 19.3648 7.88784 19.6384 7.75849C19.9927 7.59099 20.3979 7.24847 20.6939 6.73575C20.9824 6.23618 20.9574 5.94632 20.9236 5.82014C20.8863 5.68089 20.7831 5.53629 20.5861 5.42258C20.3893 5.30892 20.2124 5.29178 20.073 5.32912ZM19.4259 2.91433C20.3111 2.6771 21.167 2.87119 21.8361 3.25752C22.5052 3.64379 23.1012 4.28785 23.3384 5.17311C23.5791 6.07145 23.4039 7.04195 22.859 7.98575C22.3217 8.91642 21.5439 9.62294 20.707 10.0186C20.2545 10.2325 19.7177 10.3819 19.1699 10.3753L17.5825 13.125C17.3035 13.6082 16.7382 13.848 16.1969 13.7127C14.696 13.3376 12.972 12.4817 11.4866 11.1371C11.0814 11.8185 10.695 12.4536 10.3222 13.0501C10.5306 13.1449 10.7584 13.247 11.0073 13.3577C11.1898 13.4388 11.3673 13.5171 11.5393 13.593C12.3811 13.9645 13.0924 14.2783 13.6184 14.5779C14.2693 14.9486 14.9274 15.4518 15.1945 16.32C15.4319 17.0917 15.2736 17.9179 15.0881 18.6675C14.982 19.0959 14.8289 19.6287 14.6524 20.2432C14.6518 20.2453 14.6513 20.2473 14.6507 20.2494H14.9992C15.6896 20.2494 16.2492 20.8091 16.2492 21.4994C16.2492 22.1898 15.6896 22.7494 14.9992 22.7494H12.9994C12.6097 22.7494 12.2424 22.5678 12.0059 22.2581C11.7694 21.9484 11.6909 21.5462 11.7934 21.1704C11.9756 20.5028 12.1346 19.9511 12.2713 19.4769C12.4315 18.9213 12.561 18.4719 12.6613 18.0668C12.8481 17.3122 12.8186 17.1021 12.8056 17.0571C12.8047 17.0557 12.8031 17.0536 12.8008 17.0507C12.7965 17.0453 12.7891 17.0367 12.7773 17.0248C12.7249 16.9721 12.6136 16.8826 12.3812 16.7503C11.9764 16.5198 11.415 16.2716 10.5735 15.8997C10.393 15.8199 10.1996 15.7345 9.99203 15.6422C9.62229 15.4779 9.27185 15.3211 8.94546 15.169C7.53716 17.2435 6.24535 18.842 4.72428 20.4811C5.04244 20.7077 5.24995 21.0796 5.24995 21.5C5.24995 22.1904 4.69031 22.75 3.99995 22.75H1.99995C1.49437 22.75 1.03858 22.4454 0.845102 21.9784C0.651625 21.5113 0.75857 20.9736 1.11607 20.6161C3.36694 18.3652 4.97542 16.5502 6.79903 13.8796C6.35948 13.4576 6.00529 12.8789 6.06598 12.0914C6.10145 11.6312 6.27763 11.224 6.47007 10.887C6.59434 10.6693 6.74418 10.4491 6.91055 10.2267C5.27271 10.4982 3.62029 10.5373 1.79445 10.233C1.11349 10.1195 0.653465 9.47546 0.766959 8.7945C0.880452 8.11354 1.52449 7.65351 2.20545 7.76701C4.91863 8.2192 7.19455 7.78431 10.105 6.81415C10.6609 6.62886 11.2708 6.85454 11.5722 7.35699C12.6653 9.17922 14.3822 10.3999 15.9209 11.003L17.0049 9.12535C16.7253 8.65429 16.5862 8.11467 16.5453 7.61586C16.4695 6.69327 16.6925 5.66646 17.2298 4.73585C17.7747 3.79206 18.5276 3.15506 19.4259 2.91433Z" fill="#75b06f" />
                            </svg>
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
                        <img src="./images/San-van-dong-Trong-Dong-Stadium.jpg" alt="Toàn Cảnh My Court" />
                        <p>Toàn Cảnh My Court</p>
                    </div>
                    <div className="gallery-item">
                        <img src="./images/Phuong_UMC-0974.jpg" alt="Khu Vực Sự Kiện" />
                        <p>Khu Vực Sự Kiện</p>
                    </div>
                    <div className="gallery-item">
                        <img src="./images/7430152f-d7b7-45e0-ab15-2eb74cac89e4.webp" alt="Khu Vực CLB" />
                        <p>Khu Vực CLB</p>
                    </div>
                    <div className="gallery-item">
                        <img src="./images/Tennis-1-scaled.jpg" alt="Sân Tennis" />
                        <p>Sân Tennis</p>
                    </div>
                    <div className="gallery-item">
                        <img src="./images/san-cau-long-thao-trang-1-1715733584.webp" alt="Sân Cầu Lông" />
                        <p>Sân Cầu Lông</p>
                    </div>
                    <div className="gallery-item">
                        <img src="./images/kich-thuoc-san-bong-da-1-jpeg.webp" alt="Sân Bóng Đá" />
                        <p>Sân Bóng Đá</p>
                    </div>
                    {/* <div className="gallery-item">
                        <img src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=500&auto=format&fit=crop" alt="Sân Bóng Đá Đèn Đêm" />
                        <p>Sân Bóng Đá Đèn Đêm</p>
                    </div>
                    <div className="gallery-item">
                        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop" alt="Cảnh Quan Ngoài Trời" />
                        <p>Cảnh Quan Ngoài Trời</p>
                    </div> */}
                </div>
            </section>
            <div className="hp-footer"><HomePageInfoFooter /></div>
            <div><Footer /></div>
        </div>
    );
};

export default NewLandingpage;
