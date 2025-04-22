import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedCategory} from '../states/threads/reducer';

const FilterWrapper = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const CategoryList = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
`;

const CategoryButton = styled.button`
  background-color: ${({active}) => (active ? '#0077cc' : '#ddd')};
  color: ${({active}) => (active ? 'white' : 'black')};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background-color: #005fa3;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
  }
`;

// Component
function CategoryFilter() {
  const dispatch = useDispatch();
  const {categories, selectedCategory} = useSelector((state) => state.threads);

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <FilterWrapper>
      <Title>Filter berdasarkan kategori:</Title>
      <CategoryList>
        <CategoryButton
          active={selectedCategory === ''}
          onClick={() => handleCategoryChange('')}
        >
          Semua
        </CategoryButton>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            active={selectedCategory === category}
            onClick={() => handleCategoryChange(category)}
          >
            #{category}
          </CategoryButton>
        ))}
      </CategoryList>
    </FilterWrapper>
  );
}

export default CategoryFilter;
