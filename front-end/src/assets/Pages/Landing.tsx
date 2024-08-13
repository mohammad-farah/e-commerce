import { useState } from "react";

import CategoriesTap from '../Components/CategoriesTap';
import { ProductsContainer } from '../Components/ProductsContainer';



export const Landing = () => {

  const [category, setCategory] = useState<string>('');

  // receiving data from CategoriesTap Component
  const handleCategory = (category: string) => {
    setCategory(category);
  }


  return (
    <header>

      
      <br /><br /><br />
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
