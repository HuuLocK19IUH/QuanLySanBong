import mongoose from "mongoose";
import Rating from "../models/Rating.js";
import SportField from "../models/Sportfield.js";

export const getRatingsService = async (sportfieldId) => {
  if (!sportfieldId) {
    return await Rating.find().sort({ date_created: -1 });
  }

  // 1. Tạo một mảng chứa các ID cần tìm kiếm (bỏ sẵn ID mà Frontend gửi lên vào)
  let searchIds = [sportfieldId];

  try {
    // 2. Tìm thông tin sân bóng để moi ra tất cả các loại ID mà nó có
    let sportfield = await SportField.findById(sportfieldId);
    
    if (!sportfield) {
      sportfield = await SportField.findOne({ sportfield_id: sportfieldId });
    }

    // 3. Nếu tìm thấy sân, nhét cả mã _id (dạng dài) và mã sportfield_id (dạng SF...) vào mảng
    if (sportfield) {
      if (sportfield._id) searchIds.push(sportfield._id.toString());
      if (sportfield.sportfield_id) searchIds.push(sportfield.sportfield_id);
    }
  } catch (error) {
    // Bỏ qua lỗi nếu ID Frontend gửi lên không đúng định dạng ObjectId
  }

  // 4. Tìm TẤT CẢ các đánh giá có sportfield_id nằm trong mảng searchIds (khớp mã SF... hoặc ObjectId đều lấy hết)
  const ratings = await Rating.find({ 
    sportfield_id: { $in: searchIds } 
  }).sort({ date_created: -1 });

  return ratings;
};

export const createRatingService = async (ratingData) => {
  const rating_id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  
  // KIỂM TRA QUAN TRỌNG KHI TẠO ĐÁNH GIÁ MỚI:
  // Nếu Frontend đang gửi ObjectId (69eaf...), ta cần lấy mã 'SF...' tương ứng để lưu cho đồng nhất với dữ liệu cũ.
  let sportfield = null;
  try {
    sportfield = await SportField.findById(ratingData.sportfield_id);
  } catch (error) {
     // Bỏ qua lỗi
  }

  if (!sportfield && ratingData.sportfield_id) {
    sportfield = await SportField.findOne({ sportfield_id: ratingData.sportfield_id });
  }

  // Nếu tìm thấy sân và nó có mã SF, hãy dùng mã SF đó để lưu rating
  const finalSportfieldIdForRating = sportfield && sportfield.sportfield_id ? sportfield.sportfield_id : ratingData.sportfield_id;

  const rating = await Rating.create({ 
      ...ratingData, 
      rating_id,
      sportfield_id: finalSportfieldIdForRating // Đảm bảo luôn lưu mã kiểu 'SF003'
  });

  if (sportfield) {
    const totalRating = (sportfield.total_rating || 0) + 1;
    const avgRating = totalRating
      ? ((sportfield.avg_rating || 0) * (sportfield.total_rating || 0) + ratingData.star_rating) / totalRating
      : ratingData.star_rating;

    // Sử dụng updateOne để tránh lỗi Cannot create field 'days'
    await SportField.updateOne(
      { _id: sportfield._id },
      { 
        $set: { 
          total_rating: totalRating, 
          avg_rating: Number(avgRating.toFixed(1)) 
        } 
      }
    );
  }

  return rating;
};