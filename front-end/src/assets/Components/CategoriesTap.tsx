import { useState, useEffect, SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { fetchCategories } from '../../Services/fetchCategories';

// Define the props for the CategoriesTap component
interface ComponentProps {
  categoryRetriever: (message: string) => void;
}

export default function CategoriesTap({ categoryRetriever }: ComponentProps) {
  
  // State to keep track of the currently selected tab
  const [value, setValue] = useState(0);

  // State to store the response data, including categories fetched from the API
  const [responseCategories, setResponseCategories] = useState({
    status: '', 
    message: '', 
    data: { categories: [] as string[] } // Array of categories
  });

  // Handle tab changes when a user clicks on a category tab
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const category = event.currentTarget.textContent as string; 
    // Pass the selected category to the parent component
    categoryRetriever(category.toLocaleLowerCase()); 
  };

  // Fetch categories from the API when the component mounts
  useEffect(() => {
    // Get the categories from category services 
    const getCategories = async () => {
        const categories = await fetchCategories(); 
        setResponseCategories(categories); 
        categoryRetriever(categories.data.categories[0]); 
    };
    getCategories(); 
  }, []);

  return (
    <Box sx={{ bgcolor: 'background.paper', my: 5, mt: 9 }}>
      {/* Render the category tabs */}
      <Tabs
        value={value} 
        onChange={handleChange} // Handle tab changes
        variant="scrollable" 
        scrollButtons="auto" 
        aria-label="scrollable auto tabs example" 
      >
        {responseCategories.data.categories.map(categoryName => (
          <Tab
            sx={{ color: 'black' }} 
            label={categoryName} 
            key={categoryName}
          />
        ))}
      </Tabs>
    </Box>
  );
}
