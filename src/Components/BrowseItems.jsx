import React, { useState } from "react";
import {
  Box,
  Grid,
  Container,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import ProductCard from "./ProductCard";
import AIChatbot from "./AIChatbot";

const dummyProducts = [
  // Living Room
  {
    id: 1,
    name: "Modern Sectional Sofa",
    image: "/src/assets/images/living-room/sectional-sofa.jpg",
    price: 1299.99,
    category: "Living Room",
  },
  {
    id: 2,
    name: "Leather Recliner",
    image: "/src/assets/images/living-room/leather-recliner.jpg",
    price: 799.99,
    category: "Living Room",
  },
  {
    id: 3,
    name: "Coffee Table Set",
    image: "/src/assets/images/living-room/coffee-table.jpg",
    price: 449.99,
    category: "Living Room",
  },
  // Dining Room
  {
    id: 4,
    name: "6-Piece Dining Set",
    image: "/src/assets/images/dining-room/dining-set.jpg",
    price: 1599.99,
    category: "Dining Room",
  },
  {
    id: 5,
    name: "China Cabinet",
    image: "/src/assets/images/dining-room/china-cabinet.jpg",
    price: 899.99,
    category: "Dining Room",
  },
  {
    id: 6,
    name: "Bar Stools (Set of 2)",
    image: "/src/assets/images/dining-room/bar-stools.jpg",
    price: 299.99,
    category: "Dining Room",
  },
  // Bedroom
  {
    id: 7,
    name: "Queen Platform Bed",
    image: "/src/assets/images/bedroom/platform-bed.jpg",
    price: 899.99,
    category: "Bedroom",
  },
  {
    id: 8,
    name: "6-Drawer Dresser",
    image: "/src/assets/images/bedroom/dresser.jpg",
    price: 699.99,
    category: "Bedroom",
  },
  {
    id: 9,
    name: "Nightstand Set",
    image: "/src/assets/images/bedroom/nightstand.jpg",
    price: 349.99,
    category: "Bedroom",
  },
  // Office
  {
    id: 10,
    name: "Executive Desk",
    image: "/src/assets/images/office/executive-desk.jpg",
    price: 799.99,
    category: "Office",
  },
  {
    id: 11,
    name: "Ergonomic Chair",
    image: "/src/assets/images/office/ergonomic-chair.jpg",
    price: 399.99,
    category: "Office",
  },
  {
    id: 12,
    name: "Bookshelf",
    image: "/src/assets/images/office/bookshelf.jpg",
    price: 299.99,
    category: "Office",
  },
  // Additional Living Room Items
  {
    id: 13,
    name: "TV Stand",
    image: "/src/assets/images/living-room/tv-stand.jpg",
    price: 449.99,
    category: "Living Room",
  },
  {
    id: 14,
    name: "Side Table Set",
    image: "/src/assets/images/living-room/side-table.jpg",
    price: 249.99,
    category: "Living Room",
  },
  // Additional Dining Room Items
  {
    id: 15,
    name: "Buffet Cabinet",
    image: "/src/assets/images/dining-room/buffet.jpg",
    price: 799.99,
    category: "Dining Room",
  },
  {
    id: 16,
    name: "Wine Rack",
    image: "/src/assets/images/dining-room/wine-rack.jpg",
    price: 199.99,
    category: "Dining Room",
  },
  // Additional Bedroom Items
  {
    id: 17,
    name: "Wardrobe",
    image: "/src/assets/images/bedroom/wardrobe.jpg",
    price: 899.99,
    category: "Bedroom",
  },
  {
    id: 18,
    name: "Vanity Set",
    image: "/src/assets/images/bedroom/vanity.jpg",
    price: 499.99,
    category: "Bedroom",
  },
  // Additional Office Items
  {
    id: 19,
    name: "Filing Cabinet",
    image: "/src/assets/images/office/filing-cabinet.jpg",
    price: 249.99,
    category: "Office",
  },
  {
    id: 20,
    name: "Desk Lamp",
    image: "/src/assets/images/office/desk-lamp.jpg",
    price: 79.99,
    category: "Office",
  },
];

const categories = ["All", "Living Room", "Dining Room", "Bedroom", "Office"];

const BrowseItems = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? dummyProducts
      : dummyProducts.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Browse Items
        </Typography>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <AIChatbot />
    </Container>
  );
};

export default BrowseItems;
