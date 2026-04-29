import { getRatingsService, createRatingService } from "../services/RatingService.js";

export const getRatings = async (req, res) => {
  try {
    const sportfieldId = req.query.sportfield_id;
    const ratings = await getRatingsService(sportfieldId);
    return res.status(200).json(ratings);
  } catch (error) {
    console.error("Error getRatings:", error);
    return res.status(500).json({ message: "Lỗi khi lấy đánh giá" });
  }
};

export const createRating = async (req, res) => {
  try {
    const { user_id, sportfield_id, user_name, content, star_rating } = req.body;
    if (!user_id || !sportfield_id || !user_name || !star_rating) {
      return res.status(400).json({ message: "Thiếu thông tin đánh giá" });
    }

    const rating = await createRatingService({ user_id, sportfield_id, user_name, content, star_rating });
    return res.status(201).json(rating);
  } catch (error) {
    console.error("Error createRating:", error);
    return res.status(500).json({ message: "Lỗi khi tạo đánh giá" });
  }
};