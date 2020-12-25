import React from "react";
import dummyImage from "../../../static/images/t-shirt.png";
import ReviewCard from "./ReviewCard";

const generateDummyReview = (amount) => {
  let arr = [];
  let photos = [];
  for (let index = 0; index < 6; index++) photos.push(dummyImage);
  for (let index = 0; index < amount; index++) {
    arr.push({
      avatar: dummyImage,
      name: `Hien Tran ${index}`,
      rating: Math.floor(Math.random() * (amount + 1)), //0-5
      createdDate: new Date("12-02-2020"),
      photos: photos,
      content: `
        Hài lòng..!!!
        Clother giao hàng nhanh, mail thông báo hàng đến là giao đúng trong ngày. 
        Dánh giá cao về cách quản lý vận chuyển hàng hoá của shop. 
        Hàng mới nhận chưa sử dụng nên chưa đánh giá về chất lương 
        nhưng về mẫu mã thì đúng như thông tin.. cầm chắc tay, màu sắc đẹp, 
        inox 304, không có sét rỉ ở chỗ nào.. trong lòng bình sạch.`,
    });
  }
  return arr;
};

export default function ReviewComponent() {
  const dummyReview = generateDummyReview(1);
  console.log(dummyReview);
  return (
    <div>
      <h1>Reviews</h1>
      {dummyReview.map((item, index) => {
        return <ReviewCard review={item} />;
      })}
    </div>
  );
}
