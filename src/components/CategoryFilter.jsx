import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedCategory} from '../states/threads/reducer';

const FilterWrapper = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  padding: 1rem 1rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
  margin-top: 1rem;
  border: 1px solid rgba(255,255,255,0.03);
  display:flex;flex-direction:column;gap:0.75rem
`;

const Title = styled.h3`font-size:1.1rem;margin:0;color:var(--text);font-weight:700`;

const CategoryList = styled.div`display:flex;gap:0.6rem;overflow-x:auto;align-items:center`;

const CategoryButton = styled.button`
  background: ${({active}) => (active ? 'linear-gradient(90deg,var(--accent),var(--accent-2))' : 'transparent')};
  color: ${({active}) => (active ? '#02223a' : 'var(--text)')};
  border: ${({active}) => (active ? 'none' : '1px solid rgba(255,255,255,0.04)')};
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.12s ease, background 0.12s ease;
  flex-shrink:0;font-weight:600

  &:hover{transform:translateY(-2px);background:rgba(255,255,255,0.02)}

  @media (max-width:768px){padding:0.4rem 0.65rem}
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
