import React from "react";

export default function ReviewCard(props) {
  const { review } = props;
  const { avatar, name, rating, content, photos, createdDate} = review;
  return (
    <div>
      <div>
        <img src= {avatar} alt="avatar" />
        <p>{name}</p>
      </div>
      <p>{content}</p>
    </div>
  )
}
