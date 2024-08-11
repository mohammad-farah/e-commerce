import { useState } from "react";

import CategoriesTap from '../../Layouts/CategoriesTap';
import { ProductsContainer } from '../../Layouts/ProductsContainer';



export const Landing = () => {

  const [category, setCategory] = useState<string>('');

  // receiving data from CategoriesTap Component
  const handleCategory = (category: string) => {
    setCategory(category);
  }


  return (
    <header>

      

      {/* Tap bar for requesting and show the categoreis  */}
      <CategoriesTap
        categoryRetriever={handleCategory}
      />

      <ProductsContainer
        category={category}
      />

    </header>
  )
}
