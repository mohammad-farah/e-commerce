import { useState } from "react";

import NavBar from "../../Layouts/NavBar"
import CategoriesTap from './../../Layouts/CategoriesTap';
import { ProductsConainer } from './../../Layouts/ProductsConainer';



export const LandingPage = () => {

  const [category, setCategory] = useState<string>('');

  // receiving data from CategoriesTap Component
  const handleCategory = (category: string) => {
    setCategory(category);
  }


  return (
    <header>

      {/* NavBar contains the main routes  */}
      <NavBar />

      {/* Tap bar for requesting and show the categoreis  */}
      <CategoriesTap
        categoryRetriever={handleCategory}
      />

     {/* testing component */}
      <br />
      <p style={
        { textAlign: "center"}
      }>{category}</p>
      

      <ProductsConainer/>

    </header>
  )
}
