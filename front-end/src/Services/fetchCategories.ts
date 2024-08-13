import axios from 'axios';

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

// Function to fetch categories
export const fetchCategories = async (): Promise<CategoryResponse> => {
  try {
    const response = await axios.get<CategoryResponse>('http://127.0.0.1:8000/products/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}
