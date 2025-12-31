import { useState, useContext } from "react";
import {
  Add,
  ArrowForward,
  ArrowRightAlt,
  Explore,
  Facebook,
  Instagram,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import nature1 from "../../assets/hotel-image/nature-1.jpg";
import nature2 from "../../assets/hotel-image/nature-2.jpg";
import nature3 from "../../assets/hotel-image/nature-3.jpg";
import nature4 from "../../assets/hotel-image/nature-4.jpg";
import nature5 from "../../assets/hotel-image/nature-5.jpg";
import nature6 from "../../assets/hotel-image/nature-6.jpg";
import urban1 from "../../assets/hotel-image/urban-1.jpg";
import urban2 from "../../assets/hotel-image/urban-2.jpg";
import urban3 from "../../assets/hotel-image/urban-3.jpg";
import urban4 from "../../assets/hotel-image/urban-4.jpg";
import urban5 from "../../assets/hotel-image/urban-5.jpg";
import urban6 from "../../assets/hotel-image/urban-6.jpg";
import ocean1 from "../../assets/hotel-image/ocean-1.jpg";
import ocean2 from "../../assets/hotel-image/ocean-2.jpg";
import ocean3 from "../../assets/hotel-image/ocean-3.jpg";
import ocean4 from "../../assets/hotel-image/ocean-4.jpg";
import ocean5 from "../../assets/hotel-image/ocean-5.jpg";
import ocean6 from "../../assets/hotel-image/ocean-6.jpg";
import romantic1 from "../../assets/hotel-image/romantic-1.webp";
import romantic2 from "../../assets/hotel-image/romantic-2.webp";
import romantic3 from "../../assets/hotel-image/romantic-3.webp";
import romantic4 from "../../assets/hotel-image/romantic-4.webp";
import romantic5 from "../../assets/hotel-image/romantic-5.webp";
import romantic6 from "../../assets/hotel-image/romantic-6.webp";
import royal1 from "../../assets/hotel-image/royal-1.jpg";
import royal2 from "../../assets/hotel-image/royal-2.jpg";
import royal3 from "../../assets/hotel-image/royal-3.jpg";
import royal4 from "../../assets/hotel-image/royal-4.jpg";
import royal5 from "../../assets/hotel-image/royal-5.jpg";
import royal6 from "../../assets/hotel-image/royal-6.jpg";
import destination1 from "../../assets/destination/destination-1.avif";
import destination2 from "../../assets/destination/destination-2.avif";
import destination3 from "../../assets/destination/destination-3.avif";
import destination4 from "../../assets/destination/destination-4.avif";
import destination5 from "../../assets/destination/destination-5.avif";
import destination6 from "../../assets/destination/destination-6.avif";

import {
  Forest,
  Apartment,
  Waves,
  Favorite,
  Castle,
  AllInclusive,
  LocationOn,
  Close,
  Star,
  AccountCircle,
  SearchOff,
} from "@mui/icons-material";

import natureHero from "../../assets/nature-hero.avif";
import royalHero from "../../assets/royal-hero.avif";
import urbanHero from "../../assets/urban-hero.avif";
import oceanHero from "../../assets/ocean-hero.avif";
import romanticHero from "../../assets/romantic-hero.avif";
import defaultHero from "../../assets/defafult-hero.avif";

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Divider,
  Box,
  Typography,
  Button,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  AppBar,
  Toolbar,
  Modal,
  Fade,
} from "@mui/material";

import { MoodContext } from "../../context/MoodContext.jsx";
import { AnimatePresence, motion } from "framer-motion";

const moods = [
  { id: "default", label: "All Stays", icon: <AllInclusive /> },
  { id: "nature", label: "Nature", icon: <Forest /> },
  { id: "urban", label: "Urban", icon: <Apartment /> },
  { id: "ocean", label: "Ocean", icon: <Waves /> },
  { id: "romantic", label: "Romantic", icon: <Favorite /> },
  { id: "royal", label: "Royal", icon: <Castle /> },
];

const Home = () => {
  const { mood, setMood } = useContext(MoodContext);
  const [open, setOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistedIds, setWishlistedIds] = useState([]);

  const handleOpen = (hotel) => {
    setSelectedHotel(hotel);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const moodImages = {
    nature: natureHero,
    urban: urbanHero,
    ocean: oceanHero,
    romantic: romanticHero,
    royal: royalHero,
    default: defaultHero,
  };

  const getMoodColor = (currentMood) => {
    switch (currentMood) {
      case "nature":
        return "#2e7d32";
      case "urban":
        return "#d32f2f";
      case "ocean":
        return "#0288d1";
      case "romantic":
        return "#d81b60";
      case "royal":
        return "#ffa000";
      default:
        return "#1976d2";
    }
  };

  const getLogoIcon = () => {
    const iconStyle = {
      mr: 1,
      fontSize: "2rem",
      color: getMoodColor(mood),
      transition: "0.5s all",
    };
    switch (mood) {
      case "nature":
        return <Forest sx={iconStyle} />;
      case "urban":
        return <Apartment sx={iconStyle} />;
      case "ocean":
        return <Waves sx={iconStyle} />;
      case "romantic":
        return <Favorite sx={iconStyle} />;
      case "royal":
        return <Castle sx={iconStyle} />;
      default:
        return <AllInclusive sx={iconStyle} />;
    }
  };

  const hotelData = {
    nature: [
      {
        id: 1,
        name: "Whispering Pines Sanctuary",
        price: "55",
        img: nature1,
        loc: "Gulmarg, Kashmir",
        rating: 4.8,
        desc: "A serene escape into the lush green pine forests of Kashmir.",
      },
      {
        id: 2,
        name: "The Mist-Clad Valley Lodge",
        price: "39",
        img: nature2,
        loc: "Munnar, Kerala",
        rating: 4.5,
        desc: "Breathtaking views of tea gardens and misty mountains.",
      },
      {
        id: 3,
        name: "Hidden Peak Eco-Retreat",
        price: "70",
        img: nature3,
        loc: "Kasol, Himachal",
        rating: 4.7,
        desc: "Riverside eco-friendly cabins for true nature lovers.",
      },
      {
        id: 4,
        name: "Wildflower Canyon Suites",
        price: "48",
        img: nature4,
        loc: "Dharamshala, India",
        rating: 4.3,
        desc: "Experience the tranquility of the Himalayas.",
      },
      {
        id: 5,
        name: "The Alpine Shadow Resort",
        price: "75",
        img: nature5,
        loc: "Coorg, Karnataka",
        rating: 4.6,
        desc: "A luxurious stay hidden within coffee plantations.",
      },
      {
        id: 6,
        name: "Cedar Creek Riverside Inn",
        price: "35",
        img: nature6,
        loc: "Rishikesh, Uttarakhand",
        rating: 4.4,
        desc: "Peaceful stay right on the banks of the holy Ganges.",
      },
    ],
    urban: [
      {
        id: 7,
        name: "The Onyx Skyscraper Hotel",
        price: "145",
        img: urban1,
        loc: "South Bombay, Mumbai",
        rating: 4.9,
        desc: "Luxury sky-high living in the heart of the business district.",
      },
      {
        id: 8,
        name: "Luminary Plaza & Suites",
        price: "105",
        img: urban2,
        loc: "Cyber Hub, Gurgaon",
        rating: 4.2,
        desc: "Modern amenities for the tech-savvy urban traveler.",
      },
      {
        id: 9,
        name: "The Velvet Metropolitan",
        price: "180",
        img: urban3,
        loc: "Indiranagar, Bangalore",
        rating: 4.6,
        desc: "Chic boutique hotel surrounded by the best cafes.",
      },
      {
        id: 10,
        name: "Iron & Glass Urban Loft",
        price: "110",
        img: urban4,
        loc: "Banjara Hills, Hyderabad",
        rating: 4.1,
        desc: "Industrial design meets city convenience.",
      },
      {
        id: 11,
        name: "Neon Horizon Boutique",
        price: "135",
        img: urban5,
        loc: "New Town, Kolkata",
        rating: 4.7,
        desc: "Vibrant stay in the growing tech hub of Kolkata.",
      },
      {
        id: 12,
        name: "The Quartz Central Tower",
        price: "220",
        img: urban6,
        loc: "Downtown, Dubai",
        rating: 4.8,
        desc: "World-class luxury with views of the Dubai skyline.",
      },
    ],
    ocean: [
      {
        id: 13,
        name: "Azure Horizon Beach Club",
        price: "215",
        img: ocean1,
        loc: "North Goa, India",
        rating: 4.7,
        desc: "Premium beach access and sundowner parties.",
      },
      {
        id: 14,
        name: "The Coral Reef Overwater Villa",
        price: "175",
        img: ocean2,
        loc: "Havelock Island, Andaman",
        rating: 4.5,
        desc: "Sleep right above the ocean with private water access.",
      },
      {
        id: 15,
        name: "Saltwater Palms Resort",
        price: "110",
        img: ocean3,
        loc: "Varkala, Kerala",
        rating: 4.4,
        desc: "Clifftop resort with an infinity view of the Arabian sea.",
      },
      {
        id: 16,
        name: "Turquoise Tide Haven",
        price: "300",
        img: ocean4,
        loc: "Maldives",
        rating: 4.9,
        desc: "The ultimate island paradise for luxury and privacy.",
      },
      {
        id: 17,
        name: "Sand & Serenity Island Spa",
        price: "130",
        img: ocean5,
        loc: "Pondicherry, India",
        rating: 4.2,
        desc: "Peaceful vibes and French-inspired coastal living.",
      },
      {
        id: 18,
        name: "The Sapphire Bay Resort",
        price: "200",
        img: ocean6,
        loc: "Gokarna, Karnataka",
        rating: 4.6,
        desc: "Untouched beaches and total tranquility.",
      },
    ],
    romantic: [
      {
        id: 19,
        name: "The Moonlit Rose Manor",
        price: "125",
        img: romantic1,
        loc: "Lake Pichola, Udaipur",
        rating: 4.9,
        desc: "Romantic palace stay with candlelit lake-view dinners.",
      },
      {
        id: 20,
        name: "Eternal Bloom Boutique Stay",
        price: "155",
        img: romantic2,
        loc: "Nainital, Uttarakhand",
        rating: 4.8,
        desc: "Cozy rooms for the perfect couple's retreat.",
      },
      {
        id: 21,
        name: "Stardust Honeymoon Suites",
        price: "99",
        img: romantic3,
        loc: "Dal Lake, Srinagar",
        rating: 4.6,
        desc: "Traditional houseboats for a unique romantic experience.",
      },
      {
        id: 22,
        name: "The Velvet Heart Retreat",
        price: "115",
        img: romantic4,
        loc: "Ooty, Tamil Nadu",
        rating: 4.5,
        desc: "Charming stay amidst the Nilgiri hills.",
      },
      {
        id: 23,
        name: "Secret Garden Lover's Inn",
        price: "170",
        img: romantic5,
        loc: "Alleppey, Kerala",
        rating: 4.7,
        desc: "Private backwater escapes for couples.",
      },
      {
        id: 24,
        name: "Sunset Serenade Villas",
        price: "140",
        img: romantic6,
        loc: "Shimla, Himachal",
        rating: 4.4,
        desc: "Mountain views and fireplace nights.",
      },
    ],
    royal: [
      {
        id: 25,
        name: "The Golden Scepter Palace",
        price: "540",
        img: royal1,
        loc: "Jodhpur, Rajasthan",
        rating: 5.0,
        desc: "Experience Rajasthan's royalty in a true heritage palace.",
      },
      {
        id: 26,
        name: "Imperial Heritage Mansion",
        price: "265",
        img: royal2,
        loc: "Udaipur, Rajasthan",
        rating: 4.8,
        desc: "Vintage luxury with modern comforts.",
      },
      {
        id: 27,
        name: "Majestic Crown Regency",
        price: "360",
        img: royal3,
        loc: "Jaipur, Rajasthan",
        rating: 4.9,
        desc: "Stay in the heart of the Pink City like a King.",
      },
      {
        id: 28,
        name: "The Royal Kohinoor Estate",
        price: "215",
        img: royal4,
        loc: "Gwalior, Madhya Pradesh",
        rating: 4.6,
        desc: "Rich history and grand hospitality.",
      },
      {
        id: 29,
        name: "Victoria's Dynasty Suites",
        price: "340",
        img: royal5,
        loc: "Lucknow, Uttar Pradesh",
        rating: 4.7,
        desc: "Nawabi style meets colonial grandeur.",
      },
      {
        id: 30,
        name: "Emerald Throne Heritage Hotel",
        price: "420",
        img: royal6,
        loc: "Mysore, Karnataka",
        rating: 4.8,
        desc: "Classic luxury near the iconic Mysore Palace.",
      },
    ],
  };

  const dest = [
    {
      name: "Goa Beaches",
      image: destination1,
      stays: "240+",
      color: "#0288d1",
      description: "Sun beaches & vibrant nightlife",
    },
    {
      name: "Himalayas",
      image: destination2,
      stays: "180+",
      color: "#2e7d32",
      description: "Majestic peaks & serene valleys",
    },
    {
      name: "Rajasthan",
      image: destination3,
      stays: "150+",
      color: "#ffa000",
      description: "Royal heritage & desert camps",
    },
    {
      name: "Kerala",
      image: destination4,
      stays: "190+",
      color: "#4caf50",
      description: "Backwaters & lush greenery",
    },
    {
      name: "Mumbai",
      image: destination5,
      stays: "320+",
      color: "#d32f2f",
      description: "The city that never sleeps",
    },
    {
      name: "Andaman",
      image: destination6,
      stays: "85+",
      color: "#0288d1",
      description: "Pristine beaches & coral reefs",
    },
  ];

  // Logic for displaying hotels
  let hotelsToSearch = [];
  const trendingHotels = [
    hotelData.nature[0],
    hotelData.urban[0],
    hotelData.ocean[0],
    hotelData.romantic[0],
    hotelData.royal[0],
    hotelData.urban[1],
  ];

  if (mood === "default") {
    if (searchQuery.trim().length > 0) {
      hotelsToSearch = Object.values(hotelData).flat();
    } else {
      hotelsToSearch = trendingHotels;
    }
  } else {
    hotelsToSearch = hotelData[mood] || [];
  }

  const displayedHotels = hotelsToSearch.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.loc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          bgcolor: "white",
          color: "black",
          borderBottom: "1px solid #eee",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", px: "0 !important" }}>
            <Box
              onClick={() => setMood("default")}
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mood}
                  initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {getLogoIcon()}
                </motion.div>
              </AnimatePresence>
              <Typography
                variant="h5"
                fontWeight="900"
                component={motion.span}
                animate={{ color: getMoodColor(mood) }}
                sx={{
                  ml: 0.5,
                  letterSpacing: "-1px",
                  textTransform: "uppercase",
                }}
              >
                Stayflow
              </Typography>
            </Box>
            <Stack
              direction="row"
              spacing={4}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {["Explore", "Destinations", "My Bookings"].map((item) => (
                <Typography
                  key={item}
                  fontWeight="600"
                  sx={{
                    cursor: "pointer",
                    transition: "color 0.3s",
                    "&:hover": { color: getMoodColor(mood) },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                size="small"
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
              >
                Log in
              </Button>
              <IconButton>
                <AccountCircle />
              </IconButton>
            </Stack>
          </Toolbar>

          {/* Mood Tabs */}
          <Box sx={{ py: 1, borderTop: "1px solid #f9f9f9" }}>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              sx={{
                overflowX: "auto",
                pb: 1,
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {moods.map((m) => (
                <Box
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    minWidth: "80px",
                    color:
                      mood === m.id ? getMoodColor(mood) : "text.secondary",
                    borderBottom:
                      mood === m.id
                        ? `2px solid ${getMoodColor(mood)}`
                        : "2px solid transparent",
                    transition: "0.3s",
                    opacity: mood === m.id ? 1 : 0.7,
                    "&:hover": { opacity: 1 },
                  }}
                >
                  {m.icon}
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    sx={{ mt: 0.5 }}
                  >
                    {m.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: "60vh", md: "80vh" },
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${
            moodImages[mood] || moodImages.default
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          transition: "0.8s ease",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center", color: "white" }}>
          <Typography
            variant="h1"
            fontWeight="900"
            sx={{
              fontSize: { xs: "2.6rem", md: "4rem" },
              textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
              mb: 2,
            }}
          >
            Find Your Perfect{" "}
            {mood === "default"
              ? "Dream"
              : mood.charAt(0).toUpperCase() + mood.slice(1)}{" "}
            Stay
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontWeight: 400,
              opacity: 0.9,
              textShadow: "1px 1px 8px rgba(0,0,0,0.4)",
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.4,
            }}
          >
            {mood === "default" &&
              "From hidden gems to iconic landmarks, discover stays that match your vibe."}
            {mood === "nature" &&
              "Escape the noise and breathe in the fresh mountain air."}
            {mood === "urban" &&
              "Stay in the heart of the action, where the city never sleeps."}
            {mood === "ocean" &&
              "Wake up to the sound of waves and the touch of golden sand."}
            {mood === "romantic" &&
              "Create unforgettable memories in the most enchanting settings."}
            {mood === "royal" &&
              "Experience grand hospitality and live like royalty in heritage palaces."}
          </Typography>

          {/* Search Box */}
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: "50px",
              p: 1,
              display: "flex",
              alignItems: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              flexWrap: { xs: "wrap", md: "nowrap" },
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="Where are you going?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn color="primary" sx={{ ml: 2 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ px: 2 }}
            />
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: getMoodColor(mood),
                borderRadius: "40px",
                px: 5,
                py: 1.5,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": {
                  bgcolor: getMoodColor(mood),
                  filter: "brightness(0.9)",
                },
              }}
            >
              Search
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container sx={{ py: 10 }}>
        {/* Section Title */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            fontWeight="900"
            sx={{
              mb: 2,
              color: "#1a1a1a",
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            {mood === "default" && searchQuery.length === 0
              ? "Trending Stays"
              : mood === "default" && searchQuery.length > 0
              ? `Search Results for "${searchQuery}"`
              : `Perfect ${
                  mood.charAt(0).toUpperCase() + mood.slice(1)
                } Getaways`}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
              fontSize: "1.1rem",
              mb: 3,
            }}
          >
            {mood === "default"
              ? "Explore our top-rated collections and find the most loved destinations by travelers worldwide."
              : `Handpicked selection of the finest ${mood} properties, ensuring a stay that matches your lifestyle and desires.`}
          </Typography>

          <Box
            sx={{
              width: "60px",
              height: "4px",
              bgcolor: getMoodColor(mood),
              mx: "auto",
              borderRadius: "2px",
            }}
          />
        </Box>

        {/* No Results Message */}
        {displayedHotels.length === 0 && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              textAlign: "center",
              py: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SearchOff sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" color="text.secondary">
              No stays found matching "{searchQuery}"
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Try checking your spelling or explore other categories.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setSearchQuery("")}
              sx={{
                borderRadius: "20px",
                color: getMoodColor(mood),
                borderColor: getMoodColor(mood),
                "&:hover": {
                  borderColor: getMoodColor(mood),
                  bgcolor: "rgba(0,0,0,0.04)",
                },
              }}
            >
              Clear Search
            </Button>
          </Box>
        )}

        {/* Hotel Cards Grid */}
        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          {displayedHotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <Box
                component={motion.div}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(0,0,0,0.04)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ position: "relative", height: "220px" }}>
                    <CardMedia
                      component="img"
                      image={hotel.img}
                      sx={{ height: "100%", objectFit: "cover" }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 15,
                        right: 15,
                        bgcolor: "rgba(255,255,255,0.9)",
                        px: 1.2,
                        py: 0.4,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Star
                        sx={{
                          color: "#FFB300",
                          fontSize: "0.85rem",
                          mr: 0.3,
                        }}
                      />
                      <Typography variant="caption" fontWeight="800">
                        {hotel.rating}
                      </Typography>
                    </Box>
                  </Box>

                  <CardContent
                    sx={{
                      p: 2.5,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Hotel Name */}
                    <Typography variant="h6" fontWeight="800" noWrap>
                      {hotel.name}
                    </Typography>

                    {/* Location */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={0.5}
                      sx={{ color: "text.secondary", mb: 2, mt: 1 }}
                    >
                      <LocationOn sx={{ fontSize: "0.9rem" }} />
                      <Typography variant="caption" fontWeight="600">
                        {hotel.loc}
                      </Typography>
                    </Stack>

                    {/* Price and Wishlist */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                        mt: "auto",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "baseline" }}>
                        <Typography
                          variant="h5"
                          fontWeight="900"
                          sx={{ color: getMoodColor(mood) }}
                        >
                          ${hotel.price}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            ml: 0.5,
                            fontWeight: 700,
                            color: "text.secondary",
                          }}
                        >
                          / night
                        </Typography>
                      </Box>

                      {/* Wishlist Button */}
                      <Box
                        component="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (wishlistedIds.includes(hotel.id)) {
                            setWishlistedIds(
                              wishlistedIds.filter((id) => id !== hotel.id)
                            );
                          } else {
                            setWishlistedIds([...wishlistedIds, hotel.id]);
                          }
                        }}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.8,
                          cursor: "pointer",
                          bgcolor: "transparent",
                          outline: "none",
                          py: 0.5,
                          px: 1.5,
                          borderRadius: "20px",
                          border: `1px solid ${getMoodColor(mood)}`,
                          transition: "0.3s",
                          "&:hover": { bgcolor: `${getMoodColor(mood)}10` },
                        }}
                      >
                        {wishlistedIds.includes(hotel.id) ? (
                          <Favorite
                            sx={{ fontSize: "1rem", color: getMoodColor(mood) }}
                          />
                        ) : (
                          <Add
                            sx={{
                              fontSize: "1.1rem",
                              color: getMoodColor(mood),
                            }}
                          />
                        )}

                        <Typography
                          variant="caption"
                          sx={{ fontWeight: "bold", color: getMoodColor(mood) }}
                        >
                          {wishlistedIds.includes(hotel.id)
                            ? "Saved"
                            : "Wishlist"}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2, opacity: 0.6 }} />

                    {/* Buttons */}
                    <Stack direction="row" spacing={2}>
                      <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpen(hotel)}
                        sx={{
                          textTransform: "none",
                          fontWeight: 700,
                          borderRadius: "12px",
                          borderColor: "#ddd",
                          color: "#555",
                          "&:hover": {
                            borderColor: getMoodColor(mood),
                            color: getMoodColor(mood),
                          },
                        }}
                      >
                        Details
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        disableElevation
                        sx={{
                          bgcolor: getMoodColor(mood),
                          borderRadius: "12px",
                          textTransform: "none",
                          fontWeight: "bold",
                          "&:hover": {
                            bgcolor: getMoodColor(mood),
                            filter: "brightness(0.9)",
                          },
                        }}
                      >
                        Book Now
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Hotel Details Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              bgcolor: "background.paper",
              width: "100%",
              maxWidth: 600,
              borderRadius: "24px",
              boxShadow: 24,
              overflow: "hidden",
              outline: "none",
            }}
          >
            {selectedHotel ? (
              <>
                <Box
                  sx={{ position: "relative", height: 280, bgcolor: "#eee" }}
                >
                  <img
                    src={
                      selectedHotel.image ||
                      selectedHotel.img ||
                      "https://via.placeholder.com/600x400"
                    }
                    alt={selectedHotel.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      top: 15,
                      right: 15,
                      bgcolor: "rgba(255,255,255,0.9)",
                      "&:hover": { bgcolor: "white" },
                    }}
                  >
                    <Close />
                  </IconButton>
                </Box>

                <Box sx={{ p: 4 }}>
                  <Typography variant="h4" fontWeight="900" sx={{ mb: 1 }}>
                    {selectedHotel.name}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 3, color: "text.secondary" }}
                  >
                    <LocationOn
                      sx={{ color: getMoodColor(mood), fontSize: "1.2rem" }}
                    />
                    <Typography variant="subtitle1" fontWeight="600">
                      {selectedHotel.loc}
                    </Typography>
                  </Stack>

                  <Divider sx={{ mb: 3 }} />

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.7 }}
                  >
                    {selectedHotel.desc}
                  </Typography>

                  {/* Price & Book */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                      p: 2.5,
                      borderRadius: "20px",
                      bgcolor: `${getMoodColor(mood)}08`,
                      border: `1px solid ${getMoodColor(mood)}20`,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight="900"
                        sx={{ color: getMoodColor(mood) }}
                      >
                        ${selectedHotel.price}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontWeight="bold"
                        color="text.secondary"
                      >
                        PER NIGHT
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: getMoodColor(mood),
                        px: 5,
                        py: 1.5,
                        borderRadius: "15px",
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: getMoodColor(mood),
                          filter: "brightness(0.9)",
                        },
                      }}
                    >
                      Book Now
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              <Box sx={{ p: 5, textAlign: "center" }}>Loading details...</Box>
            )}
          </Box>
        </Fade>
      </Modal>

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        {/* Header */}
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography
            variant="h2"
            fontWeight="900"
            sx={{
              mb: 2,
              background: `linear-gradient(45deg, #1a1a1a, ${getMoodColor(
                mood
              )})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            ✨ Top Destinations
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: "600px",
              mx: "auto",
              fontWeight: 400,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
            }}
          >
            Discover the most loved getaways, handpicked for unforgettable
            experiences
          </Typography>

          {/* Decorative line */}
          <Box
            sx={{
              width: "100px",
              height: "4px",
              background: `linear-gradient(90deg, ${getMoodColor(
                mood
              )}, ${getMoodColor(mood)}80, transparent)`,
              borderRadius: "2px",
              mx: "auto",
              mt: 4,
            }}
          />
        </Box>
        {/* Destinations Grid */}
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          sx={{ justifyContent: "center" }}
        >
          {dest.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                component={motion.div}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                sx={{
                  position: "relative",
                  width: { xs: "280px", sm: "350px" },
                  height: { xs: "280px", sm: "320px", md: "340px" },
                  borderRadius: "28px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  background: "#fff",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    boxShadow: `0 24px 60px ${item.color}30`,
                    borderColor: `${item.color}30`,
                    "& .destination-img": {
                      transform: "scale(1.08)",
                      filter: "brightness(1.1) saturate(1.2)",
                    },
                    "& .explore-btn": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  },
                }}
              >
                {/* Image Container with Perfect Aspect Ratio */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {/* Background Image with Fallback */}
                  <Box
                    className="destination-img"
                    component="img"
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop`;
                    }}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      transition:
                        "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease",
                      display: "block",
                    }}
                  />

                  {/* Gradient Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(to top, 
                  rgba(0,0,0,0.9) 0%, 
                  rgba(0,0,0,0.5) 40%, 
                  rgba(0,0,0,0.1) 80%)`,
                    }}
                  />

                  {/* Badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      bgcolor: item.color,
                      color: "#fff",
                      px: 2.5,
                      py: 1,
                      borderRadius: "50px",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      boxShadow: `0 6px 20px ${item.color}50`,
                      zIndex: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Star sx={{ fontSize: "0.9rem" }} />
                    {item.stays} Stays
                  </Box>

                  {/* Content */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: { xs: 3, md: 4 },
                      zIndex: 2,
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontWeight="900"
                      sx={{
                        color: "#fff",
                        mb: 1.5,
                        fontSize: { xs: "1.75rem", md: "2rem" },
                        textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255,255,255,0.9)",
                        mb: 3,
                        fontSize: { xs: "1rem", md: "1.1rem" },
                        textShadow: "0 1px 6px rgba(0,0,0,0.4)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </Typography>

                    {/* Explore Button (Hidden by default) */}
                    <Button
                      className="explore-btn"
                      variant="contained"
                      sx={{
                        bgcolor: item.color,
                        color: "#fff",
                        px: 3,
                        py: 1.2,
                        borderRadius: "50px",
                        fontWeight: "bold",
                        textTransform: "none",
                        fontSize: "0.95rem",
                        opacity: 0,
                        transform: "translateY(0)",
                        transition: "all 0.3s ease 0.1s",
                        boxShadow: `0 8px 25px ${item.color}50`,
                        "&:hover": {
                          bgcolor: item.color,
                          filter: "brightness(1.1)",
                          boxShadow: `0 12px 35px ${item.color}70`,
                        },
                      }}
                      endIcon={<ArrowForward sx={{ fontSize: "1rem" }} />}
                    >
                      Explore Stays
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        {/* View All Button */}
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: getMoodColor(mood),
              color: getMoodColor(mood),
              px: 5,
              py: 1.8,
              borderRadius: "50px",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1.1rem",
              borderWidth: "2px",
              "&:hover": {
                borderColor: getMoodColor(mood),
                backgroundColor: `${getMoodColor(mood)}10`,
                transform: "translateY(-3px)",
                boxShadow: `0 12px 30px ${getMoodColor(mood)}20`,
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            endIcon={<ArrowForward sx={{ fontSize: "1.2rem" }} />}
          >
            View All Destinations
          </Button>
        </Box>
      </Container>

      {/* Why Choose Us Section */}
      {/* <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            fontWeight="900"
            sx={{
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              background: `linear-gradient(45deg, ${getMoodColor(
                mood
              )}, #1a1a1a)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ❓ Why Choose StayFlow?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: "700px",
              mx: "auto",
              fontWeight: 400,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              lineHeight: 1.6,
            }}
          >
            We're not just another booking platform. Here's what makes us
            different.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              icon: "🏆",
              title: "Best Price Guarantee",
              description:
                "Find a lower price elsewhere? We'll match it and give you 110% back!",
              color: "#FFB300",
            },
            {
              icon: "💯",
              title: "100% Verified Stays",
              description:
                "Every property personally verified for quality, safety, and amenities.",
              color: "#4CAF50",
            },
            {
              icon: "🔒",
              title: "Secure & Safe Bookings",
              description:
                "Bank-level encryption protects your personal and payment information.",
              color: "#2196F3",
            },
            {
              icon: "⭐",
              title: "4.8+ Traveler Rating",
              description:
                "Rated excellent by 10,000+ travelers for exceptional service.",
              color: "#FF9800",
            },
            {
              icon: "🎯",
              title: "Perfect Mood Matching",
              description:
                "AI-powered mood matching finds your ideal stay based on preferences.",
              color: getMoodColor(mood),
            },
            {
              icon: "🛡️",
              title: "24/7 Customer Support",
              description:
                "Round-the-clock assistance for any queries or emergencies.",
              color: "#9C27B0",
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                component={motion.div}
                whileHover={{ scale: 1.05, y: -5 }}
                sx={{
                  p: 4,
                  borderRadius: "24px",
                  background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: `0 20px 50px ${feature.color}20`,
                    borderColor: `${feature.color}30`,
                  },
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "4rem",
                    mb: 2,
                    lineHeight: 1,
                  }}
                >
                  {feature.icon}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{ mb: 2, color: "#1a1a1a" }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", lineHeight: 1.6 }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container> */}

      {/* --- DYNAMIC MOOD FOOTER --- */}
      <Box
        component="footer"
        sx={{
          bgcolor: "#0a0a0a",
          background: "linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
          color: "#fff",
          pt: { xs: 10, md: 16 },
          pb: { xs: 8, md: 10 },
          position: "relative",
          overflow: "hidden",
          mt: 15,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${getMoodColor(
              mood
            )}30, transparent)`,
          },
        }}
      >
        {/* Animated Background Elements - Mood based colors */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
        radial-gradient(circle at 15% 20%, ${getMoodColor(
          mood
        )}05 0%, transparent 40%),
        radial-gradient(circle at 85% 80%, ${getMoodColor(
          mood
        )}03 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, transparent 0%, #0a0a0a 70%)
      `,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Floating Elements - Mood color */}
        {[1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: i * 100,
              height: i * 100,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${getMoodColor(
                mood
              )}02 0%, transparent 70%)`,
              top: `${20 * i}%`,
              left: `${10 * i}%`,
              filter: "blur(40px)",
              opacity: 0.1,
              zIndex: 0,
              animation: `float ${6 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1}s`,
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
                "50%": { transform: "translateY(-20px) translateX(20px)" },
              },
            }}
          />
        ))}

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid
            container
            spacing={{ xs: 6, md: 8 }}
            justifyContent="space-between"
          >
            {/* Brand Section */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 5 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {getLogoIcon()}
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "900",
                      fontFamily: "'Playfair Display', serif",
                      letterSpacing: "-1px",
                      background: `linear-gradient(45deg, #fff, ${getMoodColor(
                        mood
                      )})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    StayFlow
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#888",
                    mb: 4,
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                    maxWidth: "380px",
                  }}
                >
                  We don't just book stays, we craft experiences. Each property
                  is handpicked to match your mood, ensuring memories that last
                  a lifetime.
                </Typography>

                {/* Newsletter Subscription */}
                <Box sx={{ mb: 5 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#aaa", mb: 2, fontWeight: "500" }}
                  >
                    Join our exclusive travel community
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                      placeholder="Your email address"
                      size="small"
                      variant="outlined"
                      sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "rgba(255,255,255,0.05)",
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "10px",
                          fontSize: "0.9rem",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: `${getMoodColor(mood)}50`,
                          },
                          "&.Mui-focused": {
                            borderColor: getMoodColor(mood),
                            boxShadow: `0 0 0 2px ${getMoodColor(mood)}20`,
                          },
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "#666",
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: getMoodColor(mood),
                        color: "#fff",
                        px: 3,
                        borderRadius: "10px",
                        fontWeight: "bold",
                        textTransform: "none",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: getMoodColor(mood),
                          filter: "brightness(1.2)",
                          transform: "translateY(-2px)",
                          boxShadow: `0 8px 25px ${getMoodColor(mood)}50`,
                        },
                      }}
                    >
                      Join
                    </Button>
                  </Box>
                </Box>

                {/* Social Links - Mood color on hover */}
                <Stack direction="row" spacing={2}>
                  {[
                    { icon: <Twitter />, name: "Twitter" },
                    { icon: <Instagram />, name: "Instagram" },
                    { icon: <Facebook />, name: "Facebook" },
                    { icon: <YouTube />, name: "YouTube" },
                  ].map((social, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        "&:hover .social-tooltip": {
                          opacity: 1,
                          transform: "translateY(0)",
                        },
                      }}
                    >
                      <IconButton
                        sx={{
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#888",
                          transition: "all 0.4s ease",
                          bgcolor: "rgba(255,255,255,0.03)",
                          "&:hover": {
                            bgcolor: getMoodColor(mood),
                            borderColor: getMoodColor(mood),
                            transform: "translateY(-4px) scale(1.1)",
                            color: "#fff",
                            boxShadow: `0 8px 20px ${getMoodColor(mood)}40`,
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                      <Box
                        className="social-tooltip"
                        sx={{
                          position: "absolute",
                          bottom: "100%",
                          left: "50%",
                          transform: "translateX(-50%) translateY(10px)",
                          bgcolor: "#111",
                          color: "#fff",
                          px: 2,
                          py: 1,
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          whiteSpace: "nowrap",
                          opacity: 0,
                          transition: "all 0.3s ease",
                          mb: 1,
                          border: `1px solid ${getMoodColor(mood)}30`,
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            border: "4px solid transparent",
                            borderTopColor: "#111",
                          },
                        }}
                      >
                        Follow on {social.name}
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Grid>

            {/* Quick Links Grids - Hover with mood color */}
            {[
              {
                title: "MOODS",
                items: [
                  "Nature Retreats",
                  "Urban Escapes",
                  "Ocean Views",
                  "Romantic Stays",
                  "Royal Heritage",
                ],
              },
              {
                title: "SERVICES",
                items: [
                  "Concierge",
                  "Airport Transfers",
                  "Private Chef",
                  "Spa & Wellness",
                  "Event Planning",
                ],
              },
              {
                title: "COMPANY",
                items: [
                  "About Us",
                  "Careers",
                  "Press",
                  "Sustainability",
                  "Investors",
                ],
              },
            ].map((section, idx) => (
              <Grid item xs={6} md={2.5} key={section.title}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 4,
                    fontWeight: "700",
                    color: "#fff",
                    textTransform: "uppercase",
                    fontSize: "0.8rem",
                    letterSpacing: "1px",
                    position: "relative",
                    pb: 2,
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "40px",
                      height: "2px",
                      background: `linear-gradient(90deg, ${getMoodColor(
                        mood
                      )}, transparent)`,
                      transition: "all 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "60px",
                      background: `linear-gradient(90deg, ${getMoodColor(
                        mood
                      )}, ${getMoodColor(mood)}80)`,
                    },
                  }}
                >
                  {section.title}
                </Typography>
                <Stack spacing={2.5}>
                  {section.items.map((item) => (
                    <Box
                      key={item}
                      sx={{
                        position: "relative",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateX(8px)",
                          "& .link-text": {
                            color: getMoodColor(mood),
                          },
                          "& .link-arrow": {
                            opacity: 1,
                            transform: "translateX(0)",
                            color: getMoodColor(mood),
                          },
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        className="link-text"
                        sx={{
                          color: "#888",
                          fontWeight: "400",
                          fontSize: "0.9rem",
                          display: "flex",
                          alignItems: "center",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Box
                          className="link-arrow"
                          sx={{
                            opacity: 0,
                            transform: "translateX(-5px)",
                            transition: "all 0.3s ease",
                            mr: 1,
                          }}
                        >
                          →
                        </Box>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>

          {/* Awards & Recognition - Mood color hover */}
          {/* <Box
            sx={{
              mt: 10,
              pt: 5,
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "#666", mb: 3, letterSpacing: "2px" }}
            >
              AWARD-WINNING SERVICE
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 4,
                mb: 6,
              }}
            >
              {[
                { label: "Best Luxury Platform 2024", icon: "🏆" },
                { label: "Travelers' Choice", icon: "⭐" },
                { label: "5-Star Service", icon: "✨" },
                { label: "Sustainable Travel", icon: "🌿" },
              ].map((award) => (
                <Box
                  key={award.label}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    p: 2,
                    borderRadius: "12px",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      bgcolor: `${getMoodColor(mood)}10`,
                      border: `1px solid ${getMoodColor(mood)}20`,
                      "& .award-icon": {
                        transform: "scale(1.2)",
                        filter: `drop-shadow(0 0 8px ${getMoodColor(mood)}40)`,
                      },
                      "& .award-label": {
                        color: getMoodColor(mood),
                      },
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    className="award-icon"
                    sx={{ transition: "all 0.3s ease" }}
                  >
                    {award.icon}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="award-label"
                    sx={{
                      color: "#888",
                      maxWidth: "120px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {award.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box> */}

          {/* Bottom Bar - Mood color hover */}
          <Box
            sx={{
              pt: 4,
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              © 2026 StayFlow. All rights reserved.
              <Box
                component="span"
                sx={{
                  color: getMoodColor(mood),
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    filter: "brightness(1.3)",
                    textShadow: `0 0 10px ${getMoodColor(mood)}40`,
                  },
                }}
              >
                Crafted with ❤️
              </Box>
              for travelers worldwide.
            </Typography>

            <Stack direction="row" spacing={3} alignItems="center">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <Box key={item} sx={{ position: "relative" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#888",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        position: "relative",
                        "&:hover": {
                          color: getMoodColor(mood),
                          transform: "translateY(-2px)",
                          "&::after": {
                            width: "100%",
                          },
                        },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -2,
                          left: 0,
                          width: "0%",
                          height: "1px",
                          background: getMoodColor(mood),
                          transition: "width 0.3s ease",
                        },
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                )
              )}
            </Stack>
          </Box>

          {/* Back to Top Button - Mood color */}
          {/* <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              transform: "translateY(-50%)",
              mr: { xs: 2, md: 0 },
            }}
          >
            <IconButton
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{
                bgcolor: getMoodColor(mood),
                color: "#fff",
                border: "3px solid #0a0a0a",
                width: "48px",
                height: "48px",
                transition: "all 0.4s ease",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  bgcolor: "#fff",
                  color: getMoodColor(mood),
                  transform: "translateY(-5px)",
                  boxShadow: `0 10px 30px ${getMoodColor(mood)}60`,
                  "&::before": {
                    transform: "translateX(100%)",
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transform: "translateX(-100%)",
                  transition: "transform 0.6s ease",
                },
              }}
            >
              ↑
            </IconButton>
          </Box> */}
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
