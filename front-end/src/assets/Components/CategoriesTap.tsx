import { useState, useEffect, SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { fetchCategories } from '../../Services/fetchCategories';

// Define the props of the components
interface ComponentProps {
  categoryRetriever: (message: string) => void;
}

export default function CategoriesTap({ categoryRetriever }: ComponentProps) {
  const [value, setValue] = useState(0);

  const [responseCategories, setResponseCategories] = useState({
    status: '',
    message: '',
    data: { categories: [] as string[] }
  });

  // Handling the clickable value of category
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const category = event.currentTarget.textContent as string;
    categoryRetriever(category.toLocaleLowerCase());
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCategories();
        setResponseCategories(categories);
      } catch (error) {
        // Handle the error appropriately here
      }
    };

    getCategories();
  }, []);

  return (
    <Box sx={{ bgcolor: 'background.paper', my: 2 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {responseCategories.data.categories.map(categoryName => (
          <Tab
            label={categoryName}
            key={categoryName}
          />
        ))}
      </Tabs>
    </Box>
  );
}
