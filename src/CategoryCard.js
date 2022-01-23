import React from "react";
import { usePalette } from "react-palette";

function CategoryCard({ categoryId, categoryTitle, categoryCover }) {
  const { data, loading, error } = usePalette(categoryCover);
  return (
    <div
      className="categoryCard"
      style={{ backgroundColor: `${data.vibrant}` }}
    >
      <h3 className="categoryTitle">{categoryTitle}</h3>
      <div className="categoryCover">
        <img src={categoryCover} alt="" />
      </div>
    </div>
  );
}

export default CategoryCard;
