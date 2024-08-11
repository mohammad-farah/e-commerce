import Box from '@mui/material/Box';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';

interface ProductProps {
  ProductId: string,
  name: string,
  price: number
}

export function Product({ ProductId, name, price }: ProductProps) {


  const AddProductTotheCart = ( id : string ) => {
    console.log(id);
  }


  return (

    <Box sx={{
      m: () => `${10 / 6}%`,
      width: '30%',
      fontFamily: 'Arial'
    }}
    >

      <img src='https://placehold.co/600x400' width='100%' />

      {/* product details  */}
      <Box sx={{ mx: 1, textTransform: 'lowercase', py: 1, fontFamily: 'Arial' }}>{name}</Box>

      {/* Product Data */}
      <Box sx={{ mx: 1 ,  display: 'flex', justifyContent: 'space-between' }}>

        {/* Show the price of the product */}
        <Box sx={{ textTransform: 'uppercase', py: 1, color: '#66bb6a', fontWeight: 'bold' }}>{price} $</Box>

        {/* Add to cart functionality */}
        <Box >
          <ShoppingCartSharpIcon 
          sx={{ fontSize: '1.5rem' }} 
          color='primary'
          onClick={ ()=> AddProductTotheCart(ProductId) } 
          />
        </Box>

      </Box>
    </Box>
  );
}
