import { useState, useContext } from "react";
// --- Aapke saare original imports (images aur icons) same rahenge ---
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

import {
  Forest,
  Apartment,
  Waves,
  Favorite,
  Castle,
  AllInclusive,
  LocationOn,
  CalendarMonth,
  Close,
  Wifi,
  LocalParking,
  Pool,
  Coffee,
  Star,
  AccountCircle,
  InfoOutlined,
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
  Dialog,
  DialogContent,
  IconButton,
  AppBar,
  Toolbar,
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

  const getLogoIcon = () => {
    const iconColor = getMoodColor(mood); // Dynamic color
    const iconStyle = {
      mr: 1,
      fontSize: "2rem",
      color: iconColor,
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
        price: "4,500",
        img: nature1,
        loc: "Gulmarg, Kashmir",
        rating: 4.8,
        desc: "A serene escape into the lush green pine forests of Kashmir.",
      },
      {
        id: 2,
        name: "The Mist-Clad Valley Lodge",
        price: "3,200",
        img: nature2,
        loc: "Munnar, Kerala",
        rating: 4.5,
        desc: "Breathtaking views of tea gardens and misty mountains.",
      },
      {
        id: 3,
        name: "Hidden Peak Eco-Retreat",
        price: "5,800",
        img: nature3,
        loc: "Kasol, Himachal",
        rating: 4.7,
        desc: "Riverside eco-friendly cabins for true nature lovers.",
      },
      {
        id: 4,
        name: "Wildflower Canyon Suites",
        price: "4,000",
        img: nature4,
        loc: "Dharamshala, India",
        rating: 4.3,
        desc: "Experience the tranquility of the Himalayas.",
      },
      {
        id: 5,
        name: "The Alpine Shadow Resort",
        price: "6,200",
        img: nature5,
        loc: "Coorg, Karnataka",
        rating: 4.6,
        desc: "A luxurious stay hidden within coffee plantations.",
      },
      {
        id: 6,
        name: "Cedar Creek Riverside Inn",
        price: "2,800",
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
        price: "12,000",
        img: urban1,
        loc: "South Bombay, Mumbai",
        rating: 4.9,
        desc: "Luxury sky-high living in the heart of the business district.",
      },
      {
        id: 8,
        name: "Luminary Plaza & Suites",
        price: "8,500",
        img: urban2,
        loc: "Cyber Hub, Gurgaon",
        rating: 4.2,
        desc: "Modern amenities for the tech-savvy urban traveler.",
      },
      {
        id: 9,
        name: "The Velvet Metropolitan",
        price: "15,000",
        img: urban3,
        loc: "Indiranagar, Bangalore",
        rating: 4.6,
        desc: "Chic boutique hotel surrounded by the best cafes.",
      },
      {
        id: 10,
        name: "Iron & Glass Urban Loft",
        price: "9,000",
        img: urban4,
        loc: "Banjara Hills, Hyderabad",
        rating: 4.1,
        desc: "Industrial design meets city convenience.",
      },
      {
        id: 11,
        name: "Neon Horizon Boutique",
        price: "11,200",
        img: urban5,
        loc: "New Town, Kolkata",
        rating: 4.7,
        desc: "Vibrant stay in the growing tech hub of Kolkata.",
      },
      {
        id: 12,
        name: "The Quartz Central Tower",
        price: "18,500",
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
        price: "18,000",
        img: ocean1,
        loc: "North Goa, India",
        rating: 4.7,
        desc: "Premium beach access and sundowner parties.",
      },
      {
        id: 14,
        name: "The Coral Reef Overwater Villa",
        price: "14,500",
        img: ocean2,
        loc: "Havelock Island, Andaman",
        rating: 4.5,
        desc: "Sleep right above the ocean with private water access.",
      },
      {
        id: 15,
        name: "Saltwater Palms Resort",
        price: "9,000",
        img: ocean3,
        loc: "Varkala, Kerala",
        rating: 4.4,
        desc: "Clifftop resort with an infinity view of the Arabian sea.",
      },
      {
        id: 16,
        name: "Turquoise Tide Haven",
        price: "25,000",
        img: ocean4,
        loc: "Maldives",
        rating: 4.9,
        desc: "The ultimate island paradise for luxury and privacy.",
      },
      {
        id: 17,
        name: "Sand & Serenity Island Spa",
        price: "11,000",
        img: ocean5,
        loc: "Pondicherry, India",
        rating: 4.2,
        desc: "Peaceful vibes and French-inspired coastal living.",
      },
      {
        id: 18,
        name: "The Sapphire Bay Resort",
        price: "16,800",
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
        price: "10,500",
        img: romantic1,
        loc: "Lake Pichola, Udaipur",
        rating: 4.9,
        desc: "Romantic palace stay with candlelit lake-view dinners.",
      },
      {
        id: 20,
        name: "Eternal Bloom Boutique Stay",
        price: "12,800",
        img: romantic2,
        loc: "Nainital, Uttarakhand",
        rating: 4.8,
        desc: "Cozy rooms for the perfect couple's retreat.",
      },
      {
        id: 21,
        name: "Stardust Honeymoon Suites",
        price: "8,200",
        img: romantic3,
        loc: "Dal Lake, Srinagar",
        rating: 4.6,
        desc: "Traditional houseboats for a unique romantic experience.",
      },
      {
        id: 22,
        name: "The Velvet Heart Retreat",
        price: "9,500",
        img: romantic4,
        loc: "Ooty, Tamil Nadu",
        rating: 4.5,
        desc: "Charming stay amidst the Nilgiri hills.",
      },
      {
        id: 23,
        name: "Secret Garden Lover's Inn",
        price: "14,000",
        img: romantic5,
        loc: "Alleppey, Kerala",
        rating: 4.7,
        desc: "Private backwater escapes for couples.",
      },
      {
        id: 24,
        name: "Sunset Serenade Villas",
        price: "11,500",
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
        price: "45,000",
        img: royal1,
        loc: "Jodhpur, Rajasthan",
        rating: 5.0,
        desc: "Experience Rajasthan's royalty in a true heritage palace.",
      },
      {
        id: 26,
        name: "Imperial Heritage Mansion",
        price: "22,000",
        img: royal2,
        loc: "Udaipur, Rajasthan",
        rating: 4.8,
        desc: "Vintage luxury with modern comforts.",
      },
      {
        id: 27,
        name: "Majestic Crown Regency",
        price: "30,000",
        img: royal3,
        loc: "Jaipur, Rajasthan",
        rating: 4.9,
        desc: "Stay in the heart of the Pink City like a King.",
      },
      {
        id: 28,
        name: "The Royal Kohinoor Estate",
        price: "18,000",
        img: royal4,
        loc: "Gwalior, Madhya Pradesh",
        rating: 4.6,
        desc: "Rich history and grand hospitality.",
      },
      {
        id: 29,
        name: "Victoria’s Dynasty Suites",
        price: "28,500",
        img: royal5,
        loc: "Lucknow, Uttar Pradesh",
        rating: 4.7,
        desc: "Nawabi style meets colonial grandeur.",
      },
      {
        id: 30,
        name: "Emerald Throne Heritage Hotel",
        price: "35,000",
        img: royal6,
        loc: "Mysore, Karnataka",
        rating: 4.8,
        desc: "Classic luxury near the iconic Mysore Palace.",
      },
    ],
  };

  const getMoodColor = (currentMood) => {
    switch (currentMood) {
      case "nature":
        return "#2e7d32"; // Green
      case "urban":
        return "#d32f2f"; // Red/Modern
      case "ocean":
        return "#0288d1"; // Light Blue
      case "romantic":
        return "#d81b60"; // Pink/Rose
      case "royal":
        return "#ffa000"; // Gold/Amber
      default:
        return "#1976d2"; // Default Blue
    }
  };

  const displayedHotels =
    mood === "default"
      ? [
          hotelData.nature[0],
          hotelData.urban[0],
          hotelData.ocean[0],
          hotelData.royal[0],
          hotelData.romantic[0],
          hotelData.urban[1],
        ]
      : hotelData[mood] || [];

  return (
    <Box>
      {/* --- INTEGRATED STICKY NAVBAR & MOOD SELECTOR --- */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "black",
          borderBottom: "1px solid #eee",
        }}
      >
        <Container maxWidth="xl">
          {/* Top Row: Brand & Links */}
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: "0 !important",
              minHeight: "64px",
            }}
          >
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
                  transition={{ duration: 0.4, ease: "backOut" }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {getLogoIcon()}
                </motion.div>
              </AnimatePresence>

              {/* STAYFLOW TEXT WITH DYNAMIC COLOR */}
              <Typography
                variant="h5"
                fontWeight="900"
                component={motion.span} // Motion component banaya
                animate={{ color: getMoodColor(mood) }} // Color mood ke hisaab se change hoga
                transition={{ duration: 0.5 }} // Smooth transition
                sx={{
                  ml: 0.5,
                  letterSpacing: "-1px",
                  textTransform: "uppercase", // Professional look ke liye uppercase
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
              <Typography
                fontWeight="600"
                sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
              >
                Explore
              </Typography>
              <Typography
                fontWeight="600"
                sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
              >
                Destinations
              </Typography>
              <Typography
                fontWeight="600"
                sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
              >
                My Bookings
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                size="small"
                variant="text"
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
              >
                Log in
              </Button>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </Stack>
          </Toolbar>

          {/* Bottom Row: Original Mood Selector Icons */}
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
                    color: mood === m.id ? "primary.main" : "text.secondary",
                    borderBottom:
                      mood === m.id ? "2px solid" : "2px solid transparent",
                    transition: "0.3s",
                    opacity: mood === m.id ? 1 : 0.7,
                    "&:hover": { color: "primary.main", opacity: 1 },
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

      {/* --- HERO SECTION --- */}
      <Box
        sx={{
          height: "90vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${
            moodImages[mood] || moodImages.default
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-image 0.8s ease-in-out",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center", color: "white" }}>
          <Typography
            variant="h2"
            fontWeight="900"
            gutterBottom
            sx={{ textShadow: "2px 2px 10px rgba(0,0,0,0.5)" }}
          >
            Find Your Perfect{" "}
            {mood === "default"
              ? "Dream"
              : mood.charAt(0).toUpperCase() + mood.slice(1)}{" "}
            Stay
          </Typography>
          <Typography variant="h5" sx={{ mb: 6, opacity: 0.9 }}>
            Book unique hotels and vibrant spaces around the world.
          </Typography>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "50px",
              p: 1,
              display: "flex",
              alignItems: "center",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
              flexWrap: { xs: "wrap", md: "nowrap" },
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="Where are you going?"
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
            <TextField
              fullWidth
              variant="standard"
              placeholder="Dates"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonth color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ px: 2, borderLeft: { md: "1px solid #ddd" } }}
            />
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: "40px",
                px: 5,
                py: 1.5,
                textTransform: "none",
                minWidth: "150px",
              }}
            >
              Search
            </Button>
          </Box>
        </Container>
      </Box>

      {/* --- HOTEL GRID --- */}
      <Container sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {mood === "default"
            ? "Trending Stays"
            : `Perfect ${
                mood.charAt(0).toUpperCase() + mood.slice(1)
              } Getaways`}
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={5}>
          Handpicked spaces that match your current vibe.
        </Typography>

        <Grid
          container
          spacing={4}
          sx={{ width: "100%", margin: "0 auto", justifyContent: "center" }}
        >
          {displayedHotels.map((hotel, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={hotel.id}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexBasis: {
                  md: "calc(33.33% - 32px)",
                  sm: "calc(50% - 24px)",
                  xs: "100%",
                },
              }}
            >
              <Box
                component={motion.div}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                sx={{ width: "100%", maxWidth: "360px" }}
              >
                <Card
                  sx={{
                    borderRadius: "28px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(0,0,0,0.04)",
                    bgcolor: "background.paper",
                  }}
                >
                  {/* IMAGE SECTION */}
                  <Box
                    sx={{
                      position: "relative",
                      height: "220px",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={hotel.img}
                      alt={hotel.name}
                      sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        transition: "0.6s ease",
                        "&:hover": { transform: "scale(1.08)" },
                      }}
                    />
                    {/* Rating Badge on Image */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 15,
                        right: 15,
                        bgcolor: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(4px)",
                        px: 1.2,
                        py: 0.5,
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Star
                        sx={{ color: "#FFB300", fontSize: "0.9rem", mr: 0.3 }}
                      />
                      <Typography variant="caption" fontWeight="900">
                        {hotel.rating}
                      </Typography>
                    </Box>
                  </Box>

                  {/* CONTENT SECTION */}
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      fontWeight="800"
                      noWrap
                      sx={{ mb: 0.5 }}
                    >
                      {hotel.name}
                    </Typography>

                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={0.5}
                      sx={{ mb: 2, opacity: 0.7 }}
                    >
                      <LocationOn sx={{ fontSize: "1rem" }} />
                      <Typography variant="caption" fontWeight="500">
                        {hotel.loc}
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mt: 2 }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="900"
                          sx={{ color: getMoodColor(mood) }}
                        >
                          ₹
                          {Number(
                            hotel.price.toString().replace(/,/g, "")
                          ).toLocaleString("en-IN")}
                          <Box
                            component="span"
                            sx={{
                              fontSize: "0.75rem",
                              color: "text.secondary",
                              ml: 0.5,
                            }}
                          >
                            /night
                          </Box>
                        </Typography>
                      </Box>

                      {/* BUTTONS UI CHANGE */}
                      <Stack direction="row" spacing={1}>
                        {/* Detailed Button - Clean Icon Style */}
                        <IconButton
                          onClick={() => handleOpen(hotel)}
                          sx={{
                            border: "1px solid #eee",
                            borderRadius: "12px",
                            color: "text.secondary",
                            "&:hover": { bgcolor: "#f5f5f5" },
                          }}
                        >
                          <InfoOutlined fontSize="small" />
                        </IconButton>

                        {/* Main Book Button */}
                        <Button
                          variant="contained"
                          disableElevation
                          sx={{
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: "bold",
                            px: 3,
                            bgcolor: getMoodColor(mood),
                            "&:hover": {
                              bgcolor: getMoodColor(mood),
                              filter: "brightness(0.9)",
                            },
                          }}
                        >
                          Book
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* --- POPUP MODAL --- */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{ borderRadius: "20px" }}
      >
        {selectedHotel && (
          <DialogContent sx={{ p: 0, position: "relative" }}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                bgcolor: "white",
                zIndex: 10,
              }}
            >
              <Close />
            </IconButton>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={selectedHotel.img}
                  sx={{
                    width: "100%",
                    height: "100%",
                    minHeight: "350px",
                    objectFit: "cover",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ p: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {selectedHotel.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  📍 {selectedHotel.loc} | ⭐ {selectedHotel.rating} Rating
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: "#444" }}>
                  {selectedHotel.desc}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  Included Amenities:
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <Wifi color="primary" /> <Pool color="primary" />{" "}
                  <Coffee color="primary" /> <LocalParking color="primary" />
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    ₹ {selectedHotel.price}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ borderRadius: "10px", px: 4 }}
                  >
                    Book Now
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
};

export default Home;
