import axios from "axios"
import { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import { Product } from "./ProductBox";


interface Product {
    _id: string,
    name: string,
    price: number,
    description: string,
    category: string,
    image: string
}

interface ProductsBody {
    products: Product[]
}

interface ProductsResponse {
    status: string,
    message: string,
    data: ProductsBody
}

interface ProductComponentProps {
    category: string
}

export const ProductsContainer = ({ category }: ProductComponentProps) => {

    const [responseProducts, setResponseProducts] = useState<ProductsResponse>(
        {
            status: '', message: '', data: {
                products: [{ _id: '', name: '', price: 0, category: '', description : '' ,  image: '' }]
            }
        }
    )

    // requesting the products by category from public api point 
    const getProductsByCategoryName = () => {

        axios.get<ProductsResponse>(`http://127.0.0.1:8000/products/category/${category}`)
            .then(response => setResponseProducts(response.data))
            .catch(error => console.error('Error fetching categories:', error));

    }

    useEffect(() => {
        getProductsByCategoryName()
    })

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

                    {/*  Creating the product items  */}
                    {responseProducts.data.products.map(p =>
                        < Product
                            ProductId={p._id}
                            name={p.name}
                            price={p.price}
                            description={p.description}
                            image={p.image}
                            key={p._id}

                            // 
                        />
                    )}

                </Box>
            </div>
    )
}
