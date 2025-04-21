import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedCategory} from '../states/threads/reducer';

function CategoryFilter() {
  const dispatch = useDispatch();
  const {categories, selectedCategory} = useSelector((state) => state.threads);

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <div className="category-filter">
      <h3>Filter berdasarkan kategori:</h3>
      <div className="category-list">
        <button
          className={`category-item ${selectedCategory === '' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('')}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-item ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            #{category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
