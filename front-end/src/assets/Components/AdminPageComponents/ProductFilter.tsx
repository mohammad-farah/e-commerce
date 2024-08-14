import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';

interface ProductFilterProps {
    categories: string[];
    setSelectedCategories: (selectedCategory: string) => void ;
    defaultCategory: string
}

export const ProductFilter = ({ categories, defaultCategory ,setSelectedCategories }: ProductFilterProps) => {


    return (
        <div>
            <Box sx={{ minWidth: 300 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={defaultCategory}
                        label="Category"
                        onChange={ (event) => setSelectedCategories(event.target.value as string)}
                    >

                    {categories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}


                    </Select>
                </FormControl>
            </Box>

        </div>
    )
}
