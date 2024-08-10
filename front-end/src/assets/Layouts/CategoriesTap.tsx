import { useState, useEffect, SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios'


// Define the data of the body
interface CategoriesResponseBody {
  categories: string[]
}

// Define the response for the category
interface CategoryResponse {
  status: string
  message: string;
  data: CategoriesResponseBody;
}

// Define the props of the components
interface ComponentProps {
  categoryRetriever: (message: string) => void;
}


export default function CategoriesTap({ categoryRetriever }: ComponentProps) {

  const [value, setValue] = useState(0);

  const [responseCategories, setResponseCategories] = useState<CategoryResponse>(
    { status: '', message: '', data: { categories: [] } }
  );

  // handling the clickable value of category
  const handleChange = (event: SyntheticEvent, newValue: number) => {

    setValue(newValue);
    // get the name of the choosen category 
    let category = event.currentTarget.textContent as string;
    // retrieve the choosen category to the parent component as props
    categoryRetriever(category)

  };





  // requesting the categories from public api point 
  const getCategories = () => {

    axios.get<CategoryResponse>('http://127.0.0.1:8000/products/categories')
      .then(response => setResponseCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

  }

  useEffect(() => {
    getCategories();
  }, []);





  return (

    <Box sx={{ bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >


        {/*  integrate the api response with the categoreis Tap Component */}
        {responseCategories.data.categories.map(catgoryName =>
          <Tab
            label={catgoryName}
            key={catgoryName}
          />
        )}

      </Tabs>
    </Box>

  );
}
