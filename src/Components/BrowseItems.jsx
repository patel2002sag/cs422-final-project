import React, { useState } from "react";
import {
  Box,
  Grid,
  Container,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Slider,
  Chip,
  Paper,
} from "@mui/material";
import ProductCard from "./ProductCard";
import AIChatbot from "./AIChatbot";
import { useUser } from "../context/UserContext";

const dummyProducts = [
  // Living Room
  {
    id: 1,
    name: "Modern Sectional Sofa",
    image: "/src/assets/images/living-room/sectional-sofa.jpg",
    price: 1299.99,
    category: "Living Room",
    tags: ["modern", "space-saving", "multi-functional"],
  },
  {
    id: 2,
    name: "Leather Recliner",
    image: "/src/assets/images/living-room/leather-recliner.jpg",
    price: 799.99,
    category: "Living Room",
    tags: ["study", "budget"],
  },
  {
    id: 3,
    name: "Coffee Table Set",
    image: "/src/assets/images/living-room/coffee-table.jpg",
    price: 449.99,
    category: "Living Room",
    tags: ["dorm", "budget", "space-saving"],
  },
  // Dining Room
  {
    id: 4,
    name: "6-Piece Dining Set",
    image: "/src/assets/images/dining-room/dining-set.jpg",
    price: 1599.99,
    category: "Dining Room",
    tags: ["apartment", "multi-functional"],
  },
  {
    id: 5,
    name: "China Cabinet",
    image: "/src/assets/images/dining-room/china-cabinet.jpg",
    price: 899.99,
    category: "Dining Room",
    tags: ["apartment", "study"],
  },
  {
    id: 6,
    name: "Bar Stools (Set of 2)",
    image: "/src/assets/images/dining-room/bar-stools.jpg",
    price: 299.99,
    category: "Dining Room",
    tags: ["dorm", "budget", "space-saving"],
  },
  // Bedroom
  {
    id: 7,
    name: "Queen Platform Bed",
    image: "/src/assets/images/bedroom/platform-bed.jpg",
    price: 899.99,
    category: "Bedroom",
    tags: ["dorm", "space-saving"],
  },
  {
    id: 8,
    name: "6-Drawer Dresser",
    image: "/src/assets/images/bedroom/dresser.jpg",
    price: 699.99,
    category: "Bedroom",
    tags: ["apartment", "multi-functional"],
  },
  {
    id: 9,
    name: "Nightstand Set",
    image: "/src/assets/images/bedroom/nightstand.jpg",
    price: 349.99,
    category: "Bedroom",
    tags: ["dorm", "budget", "space-saving"],
  },
  // Office
  {
    id: 10,
    name: "Executive Desk",
    image: "/src/assets/images/office/executive-desk.jpg",
    price: 799.99,
    category: "Office",
    tags: ["study", "apartment"],
  },
  {
    id: 11,
    name: "Ergonomic Chair",
    image: "/src/assets/images/office/ergonomic-chair.jpg",
    price: 399.99,
    category: "Office",
    tags: ["study", "budget"],
  },
  {
    id: 12,
    name: "Bookshelf",
    image: "/src/assets/images/office/bookshelf.jpg",
    price: 299.99,
    category: "Office",
    tags: ["dorm", "budget", "space-saving"],
  },
  // Additional Living Room Items
  {
    id: 13,
    name: "TV Stand",
    image: "/src/assets/images/living-room/tv-stand.jpg",
    price: 449.99,
    category: "Living Room",
    tags: ["dorm", "budget", "space-saving"],
  },
  {
    id: 14,
    name: "Side Table Set",
    image: "/src/assets/images/living-room/side-table.jpg",
    price: 249.99,
    category: "Living Room",
    tags: ["dorm", "budget"],
  },
  // Additional Dining Room Items
  {
    id: 15,
    name: "Buffet Cabinet",
    image: "/src/assets/images/dining-room/buffet.jpg",
    price: 799.99,
    category: "Dining Room",
    tags: ["apartment", "multi-functional"],
  },
  {
    id: 16,
    name: "Wine Rack",
    image: "/src/assets/images/dining-room/wine-rack.jpg",
    price: 199.99,
    category: "Dining Room",
    tags: ["dorm", "budget", "space-saving"],
  },
  // Additional Bedroom Items
  {
    id: 17,
    name: "Wardrobe",
    image: "/src/assets/images/bedroom/wardrobe.jpg",
    price: 899.99,
    category: "Bedroom",
    tags: ["apartment", "multi-functional"],
  },
  {
    id: 18,
    name: "Vanity Set",
    image: "/src/assets/images/bedroom/vanity.jpg",
    price: 499.99,
    category: "Bedroom",
    tags: ["dorm", "budget"],
  },
  // Additional Office Items
  {
    id: 19,
    name: "Filing Cabinet",
    image: "/src/assets/images/office/filing-cabinet.jpg",
    price: 249.99,
    category: "Office",
    tags: ["study", "budget", "space-saving"],
  },
  {
    id: 20,
    name: "Desk Lamp",
    image: "/src/assets/images/office/desk-lamp.jpg",
    price: 79.99,
    category: "Office",
    tags: ["study", "budget", "dorm"],
  },
];

const BrowseItems = () => {
  const { userProfile } = useUser();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Student-specific filters
  const studentFilters = [
    { label: "Dorm Essentials", value: "dorm" },
    { label: "Space Saving", value: "space-saving" },
    { label: "Study Focus", value: "study" },
    { label: "Budget Friendly", value: "budget" },
    { label: "Multi-functional", value: "multi-functional" },
    { label: "Apartment", value: "apartment" },
  ];

  // Get recommended products based on student profile
  const getRecommendedProducts = () => {
    let recommendations = [...dummyProducts];

    // Only apply filters if user is logged in and has a profile
    if (userProfile?.major) {
      switch (userProfile.major.toLowerCase()) {
        case "computer science":
        case "software engineering":
          recommendations = recommendations.filter(
            (product) =>
              product.name.toLowerCase().includes("desk") ||
              product.name.toLowerCase().includes("chair")
          );
          break;
        case "architecture":
        case "design":
          recommendations = recommendations.filter(
            (product) =>
              product.name.toLowerCase().includes("desk") ||
              product.name.toLowerCase().includes("table")
          );
          break;
        // Add more major-specific filters
      }
    }

    // Filter by academic year if user is logged in
    if (userProfile?.academicYear) {
      switch (userProfile.academicYear.toLowerCase()) {
        case "freshman":
          recommendations = recommendations.filter(
            (product) =>
              product.name.toLowerCase().includes("dorm") || product.price < 500
          );
          break;
        case "senior":
        case "graduate":
          recommendations = recommendations.filter(
            (product) =>
              product.name.toLowerCase().includes("apartment") ||
              product.price > 500
          );
          break;
        // Add more year-specific filters
      }
    }

    return recommendations;
  };

  const handleFilterToggle = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredProducts = dummyProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.every((filter) => product.tags.includes(filter));
    return matchesCategory && matchesPrice && matchesFilters;
  });

  const recommendedProducts = getRecommendedProducts();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Student Profile Summary - Only show if user is logged in */}
      {userProfile && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Personalized Recommendations
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Based on your profile: {userProfile.major} student,{" "}
            {userProfile.academicYear}
          </Typography>
        </Paper>
      )}

      {/* Filters */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="All">All Categories</MenuItem>
              <MenuItem value="Living Room">Living Room</MenuItem>
              <MenuItem value="Dining Room">Dining Room</MenuItem>
              <MenuItem value="Bedroom">Bedroom</MenuItem>
              <MenuItem value="Office">Office</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={2000}
            step={100}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography gutterBottom>Filters</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {studentFilters.map((filter) => (
              <Chip
                key={filter.value}
                label={filter.label}
                onClick={() => handleFilterToggle(filter.value)}
                color={
                  selectedFilters.includes(filter.value) ? "primary" : "default"
                }
              />
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* All Products */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          All Products
        </Typography>
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recommended Products - Only show if user is logged in */}
      {userProfile && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Recommended for You
          </Typography>
          <Grid container spacing={3}>
            {recommendedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <AIChatbot />
    </Container>
  );
};

export default BrowseItems;
