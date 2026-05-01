import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import HomePageTaskbar from '../components/HomePageTaskbar';
import ProductDetailImage from '../components/ProductDetailPage';
import DetailCard from '../components/DetailCard';
import TabMenu from '../components/TabMenu';
import FieldInfoTab from '../components/FieldInfoTab';
import FieldServiceTab from '../components/FieldServiceTab';
import RuleTab from "../components/RuleTab";
import ReviewTab from "../components/ReviewTab";
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import { useUser } from "../hooks/context/UserContext";
import { getSportFieldById, getServices, getRatingsByField, createRating } from '../api/sportfieldApi/sportfieldsApi';

const FieldDetail = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [showFilter, setShowFilter] = useState(false);
  const [sportfield, setSportfield] = useState(null);
  const [services, setServices] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useUser();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.focusReview) {
      setActiveTab('reviews');
    }
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const [fieldData, ratingData] = await Promise.all([
          getSportFieldById(id),
          getRatingsByField(id),
        ]);

        setSportfield(fieldData);
        setServices(fieldData?.services || []);
        setRatings(ratingData || []);
      } catch (err) {
        setError(err?.message || 'Lỗi khi tải dữ liệu chi tiết');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getUserId = () => {
    return user?.user_id || user?._id || user?.id || user?.phone_number || null;
  };

  const getUserName = () => {
    return user?.name || user?.fullName || user?.user_name || user?.phone_number || 'Khách';
  };

  const handleCreateRating = async (ratingValue, comment) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const ratingPayload = {
        user_id: getUserId(),
        sportfield_id: id,
        user_name: getUserName(),
        content: comment,
        star_rating: ratingValue,
      };

      const newRating = await createRating(ratingPayload);
      const ratingObject = newRating.data || newRating;

      setRatings((prev) => [ratingObject, ...prev]);

      setSportfield((prev) => {
        if (!prev) return prev;
        const currentTotal = (prev.rating || 0) * (prev.reviews?.length || 0);
        const newCount = (prev.reviews?.length || 0) + 1;
        const newTotal = currentTotal + ratingValue;
        return {
          ...prev,
          rating: Math.round((newTotal / newCount) * 10) / 10,
          reviews: [...(prev.reviews || []), ratingObject]
        };
      });

      alert('Đánh giá đã được gửi thành công!');
    } catch (err) {
      console.error('Error creating rating:', err);
      alert('Có lỗi xảy ra khi gửi đánh giá');
    }
  };

  const imageUrl = sportfield?.img_url
    ? (sportfield.img_url.startsWith('/') ? sportfield.img_url : `/${sportfield.img_url}`)
    : '/images/badminton.png';

  if (loading) {
    return <div style={{ padding: '32px', textAlign: 'center' }}>Đang tải chi tiết sân...</div>;
  }

  if (error) {
    return <div style={{ padding: '32px', color: '#a62828', textAlign: 'center' }}>{error}</div>;
  }

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <HomePageTaskbar
          className="homepage-taskbar"
          toggleFilter={() => setShowFilter(!showFilter)}
          user={user}
        />

        <ProductDetailImage imageUrl={imageUrl} />

        {showFilter && (
          <div style={{
            position: 'absolute',
            top: '106px',
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 999,
          }}>
            <Filter />
          </div>
        )}
      </div>

      <DetailCard sportfield={sportfield} />

      <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="tab-content">
        {activeTab === 'info' && <FieldInfoTab sportfield={sportfield} />}
        {activeTab === 'service' && <FieldServiceTab pricing={sportfield?.pricing} services={services} />}
        {activeTab === 'rules' && <RuleTab rules={sportfield?.description?.dieukhoan_quydinh} />}
        {activeTab === 'reviews' && (
          <ReviewTab
            reviews={ratings}
            avgRating={sportfield?.avg_rating}
            totalRating={sportfield?.total_rating}
            onSubmitReview={handleCreateRating}
            user={user}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FieldDetail;