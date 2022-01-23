import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { getCategories } from "./firebase";

function Search() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
  }, []);

  return (
    categories && (
      <div className="search">
        <div className="searchDescription">Browse all</div>
        <div className="searchGrid">
          {categories.map((category) => (
            <CategoryCard
              categoryId={category.categoryId}
              categoryTitle={category.categoryName}
              categoryCover={category.categoryImageUrl}
            />
          ))}
        </div>
      </div>
    )
  );
}

export default Search;
