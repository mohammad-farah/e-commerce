import axios from "axios";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Product } from "./ProductBox";

// Define the structure of a Product object
interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

// Define the structure of the response body containing products
interface ProductsBody {
    products: Product[];
}

// Define the structure of the API response
interface ProductsResponse {
    status: string;
    message: string;
    data: ProductsBody;
}

// Define the props for the ProductsContainer component
interface ProductComponentProps {
    category: string;
}

// Component to display a container of products filtered by category
export const ProductsContainer = ({ category }: ProductComponentProps) => {

    // State to store the products response from the API
    const [responseProducts, setResponseProducts] = useState<ProductsResponse>({
        status: '',
        message: '',
        data: {
            products: [{
                _id: '',
                name: '',
                price: 0,
                category: '',
                description: '',
                image: ''
            }]
        }
    });

    // Function to fetch products by category from the API
    const getProductsByCategoryName = () => {
        axios.get<ProductsResponse>(`http://127.0.0.1:8000/products/category/${category}`)
            .then(response => setResponseProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    };

    // UseEffect to call the API whenever the category changes
    useEffect(() => {
        getProductsByCategoryName();
    }, [category]);

    return (
        <div style={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    mx: 3,
                    my: 5,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}
            >
                {/* Map through the products and render a Product component for each */}
                {responseProducts.data.products.map(p =>
                    <Product
                        productId={p._id}
                        name={p.name}
                        price={p.price}
                        description={p.description}
                        image={p.image}
                        key={p._id}
                    />
                )}
            </Box>
        </div>
    );
};
