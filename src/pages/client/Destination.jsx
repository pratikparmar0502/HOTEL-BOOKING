import React, { useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Fade,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  LocationOn,
  Star,
  Search,
  Map as MapIcon,
  Favorite,
  FavoriteBorder,
  Bed,
  Bathtub,
  People,
  Wifi,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { MoodContext } from "../../context/MoodContext";
import { toast } from "react-toastify";

// Import local images
import explore_nature_1 from "../../assets/explore/nature-1.webp";
import explore_nature_2 from "../../assets/explore/nature-2.webp";
import explore_nature_3 from "../../assets/explore/nature-3.webp";
import explore_urban_1 from "../../assets/explore/urban-1.webp";
import explore_urban_2 from "../../assets/explore/urban-2.webp";
import explore_urban_3 from "../../assets/explore/urban-3.webp";
import explore_ocean_1 from "../../assets/explore/ocean-1.webp";
import explore_ocean_2 from "../../assets/explore/ocean-2.webp";
import explore_ocean_3 from "../../assets/explore/ocean-3.webp";
import explore_romantic_1 from "../../assets/explore/romantic-1.webp";
import explore_romantic_2 from "../../assets/explore/romantic-2.webp";
import explore_romantic_3 from "../../assets/explore/romantic-3.webp";
import explore_royal_1 from "../../assets/explore/royal-1.webp";
import explore_royal_2 from "../../assets/explore/royal-2.webp";
import explore_royal_3 from "../../assets/explore/royal-3.webp";
import explore_hero_default from "../../assets/explore/default-hero.webp";
import explore_hero_nature from "../../assets/explore/nature-hero.webp";
import explore_hero_urban from "../../assets/explore/urban-hero.webp";
import explore_hero_ocean from "../../assets/explore/ocean-hero.webp";
import explore_hero_romantic from "../../assets/explore/romantic-hero.webp";
import explore_hero_royal from "../../assets/explore/royal-hero.webp";

const MOOD_COLORS = {
  nature: "#10b981",
  urban: "#ef4444",
  ocean: "#0ea5e9",
  romantic: "#ec4899",
  royal: "#f59e0b",
  default: "#6366f1",
};

const getMoodColor = (mood) => MOOD_COLORS[mood] || MOOD_COLORS.default;

const properties = [
  // Nature Mood
  {
    id: 1,
    title: "Evergreen Forest Cabin",
    mood: "nature",
    price: 120,
    location: "Norwegian Fjords",
    img: explore_nature_1,
    rating: 4.8,
    reviews: 124,
    description: "Secluded cabin with panoramic forest views",
    amenities: ["WiFi", "Fireplace", "Hiking Trails", "Hot Tub"],
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
  },
  {
    id: 2,
    title: "Mountain Zen Retreat",
    mood: "nature",
    price: 160,
    location: "Swiss Alps",
    img: explore_nature_2,
    rating: 4.7,
    reviews: 89,
    description: "Peaceful retreat with alpine scenery",
    amenities: ["Yoga Deck", "Sauna", "Organic Garden", "Mountain View"],
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
  },
  {
    id: 3,
    title: "Eco Jungle Treehouse",
    mood: "nature",
    price: 210,
    location: "Costa Rica",
    img: explore_nature_3,
    rating: 4.9,
    reviews: 156,
    description: "Sustainable treehouse in rainforest canopy",
    amenities: ["Solar Power", "Rainforest View", "Zip Line", "Wildlife"],
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
  },
  // Urban Mood
  {
    id: 4,
    title: "Neon Penthouse",
    mood: "urban",
    price: 260,
    location: "Tokyo, Japan",
    img: explore_urban_1,
    rating: 4.9,
    reviews: 203,
    description: "Luxury penthouse with city skyline",
    amenities: ["Infinity Pool", "Sky Bar", "Concierge", "Smart Home"],
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
  },
  {
    id: 5,
    title: "Skyline Loft",
    mood: "urban",
    price: 320,
    location: "New York City",
    img: explore_urban_2,
    rating: 4.8,
    reviews: 178,
    description: "Industrial loft with Manhattan views",
    amenities: ["Rooftop", "Workspace", "Gym", "24/7 Security"],
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
  },
  {
    id: 6,
    title: "Berlin Studio",
    mood: "urban",
    price: 190,
    location: "Berlin, Germany",
    img: explore_urban_3,
    rating: 4.6,
    reviews: 134,
    description: "Modern studio in creative district",
    amenities: ["Art Gallery", "Bike Rental", "Coffee Shop", "Co-working"],
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
  },
  // Ocean Mood
  {
    id: 7,
    title: "Coral Blue Villa",
    mood: "ocean",
    price: 300,
    location: "Maldives",
    img: explore_ocean_1,
    rating: 5.0,
    reviews: 267,
    description: "Overwater villa with marine life views",
    amenities: ["Private Beach", "Snorkeling", "Spa", "Sunset Deck"],
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
  },
  {
    id: 8,
    title: "Santorini Cliff House",
    mood: "ocean",
    price: 380,
    location: "Santorini, Greece",
    img: explore_ocean_2,
    rating: 4.9,
    reviews: 189,
    description: "Whitewashed villa with caldera views",
    amenities: ["Infinity Pool", "Wine Cellar", "Private Chef", "Spa"],
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
  },
  {
    id: 9,
    title: "Deep Sea Resort",
    mood: "ocean",
    price: 450,
    location: "Bali, Indonesia",
    img: explore_ocean_3,
    rating: 4.7,
    reviews: 156,
    description: "Luxury resort with underwater rooms",
    amenities: ["Underwater Room", "Diving", "Marine Spa", "Beachfront"],
    bedrooms: 4,
    bathrooms: 4,
    guests: 8,
  },
  // Romantic Mood
  {
    id: 10,
    title: "Sunset Rose Suite",
    mood: "romantic",
    price: 180,
    location: "Paris, France",
    img: explore_romantic_1,
    rating: 4.7,
    reviews: 234,
    description: "Romantic suite with Eiffel Tower view",
    amenities: ["Balcony", "Champagne", "Couples Spa", "Butler"],
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
  },
  {
    id: 11,
    title: "Tuscan Vineyard",
    mood: "romantic",
    price: 220,
    location: "Tuscany, Italy",
    img: explore_romantic_2,
    rating: 4.8,
    reviews: 167,
    description: "Vineyard estate with rolling hills",
    amenities: ["Wine Tasting", "Olive Grove", "Pool", "Fireplace"],
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
  },
  {
    id: 12,
    title: "Moonlight Cabin",
    mood: "romantic",
    price: 150,
    location: "Reykjavik, Iceland",
    img: explore_romantic_3,
    rating: 4.9,
    reviews: 189,
    description: "Cozy cabin with Northern Lights view",
    amenities: ["Hot Tub", "Aurora Viewing", "Fireplace", "Sauna"],
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
  },
  // Royal Mood
  {
    id: 13,
    title: "Golden Palace Suite",
    mood: "royal",
    price: 500,
    location: "Rajasthan, India",
    img: explore_royal_1,
    rating: 4.9,
    reviews: 145,
    description: "Heritage palace with royal treatment",
    amenities: ["Private Pool", "Elephant Ride", "Spa", "Royal Dining"],
    bedrooms: 4,
    bathrooms: 4,
    guests: 8,
  },
  {
    id: 14,
    title: "Imperial Manor",
    mood: "royal",
    price: 750,
    location: "London, UK",
    img: explore_royal_2,
    rating: 4.8,
    reviews: 98,
    description: "Historic manor with modern luxury",
    amenities: ["Ballroom", "Art Collection", "Butler", "Gardens"],
    bedrooms: 5,
    bathrooms: 6,
    guests: 10,
  },
  {
    id: 15,
    title: "Sultan's Oasis",
    mood: "royal",
    price: 900,
    location: "Marrakech, Morocco",
    img: explore_royal_3,
    rating: 5.0,
    reviews: 123,
    description: "Luxury riad with desert oasis",
    amenities: ["Private Oasis", "Hammam", "Hookah Lounge", "Courtyard"],
    bedrooms: 6,
    bathrooms: 7,
    guests: 12,
  },
];

const Destination = () => {
  const history = useHistory();
  const { mood, setMood } = useContext(MoodContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleBookNow = (property) => {
    const existingBookings = JSON.parse(
      localStorage.getItem("my_bookings") || "[]"
    );
    const isAlreadyBooked = existingBookings.some((b) => b.id === property.id);

    if (!isAlreadyBooked) {
      const newBooking = {
        ...property,
        bookingDate: new Date().toLocaleDateString(),
        status: "Confirmed",
      };
      localStorage.setItem(
        "my_bookings",
        JSON.stringify([...existingBookings, newBooking])
      );
      toast.success(`Booking confirmed for ${property.title}!`);

      // FIX: history.push use karein
      setTimeout(() => history.push("/bookings"), 1000);
    } else {
      toast.info("Already booked! Taking you to your bookings.");
      // FIX: history.push use karein
      history.push("/bookings");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const MOOD_IMAGES = {
    default: explore_hero_default,
    nature: explore_hero_nature,
    urban: explore_hero_urban,
    ocean: explore_hero_ocean,
    romantic: explore_hero_romantic,
    royal: explore_hero_royal,
  };

  // 1. EK HI BAAR Favorites State (LocalStorage ke saath)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("my_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. LocalStorage mein save karne ke liye useEffect
  useEffect(() => {
    localStorage.setItem("my_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesMood = mood === "default" || property.mood === mood;
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesMood && matchesSearch;
    });
  }, [mood, searchTerm]);

  // 3. EK HI BAAR Optimized Toggle Function
  const toggleFavorite = (id) => {
    toast.dismiss(); // Purane toasts ko turant hatane ke liye

    setFavorites((prev) => {
      const isFav = prev.includes(id);
      if (isFav) {
        toast.info("Removed from favorites", {
          toastId: `remove-${id}`, // Double toast preventer
          position: "bottom-right",
        });
        return prev.filter((favId) => favId !== id);
      } else {
        toast.success("Added to favorites!", {
          toastId: `add-${id}`, // Double toast preventer
          position: "bottom-right",
        });
        return [...prev, id];
      }
    });
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          color: "white",
          minHeight: { xs: "60vh", md: "75vh" },
          display: "flex",
          pt: { xs: 15, md: 20 },
          pb: { xs: 10, md: 15 },
          overflow: "hidden",
          // Dynamic Background Image
          backgroundImage: `url(${MOOD_IMAGES[mood] || MOOD_IMAGES.default})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.8s ease-in-out",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // Gradient Overlay taaki text clear dikhe
            background:
              "linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.4))",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="overline"
              sx={{
                letterSpacing: 4,
                fontWeight: 700,
                color: getMoodColor(mood),
                mb: 2,
                display: "block",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {mood === "default"
                ? "EXPLORE WORLDWIDE"
                : `YOUR ${mood.toUpperCase()} JOURNEY`}
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                mb: 3,
                fontSize: { xs: "2.8rem", md: "4.5rem" },
                lineHeight: 1.1,
                textShadow: "0 4px 20px rgba(0,0,0,0.4)",
                background: `linear-gradient(45deg, #ffffff, ${getMoodColor(
                  mood
                )})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {mood === "default"
                ? "Find Your Perfect Escape"
                : `Luxury ${mood} Stays`}
            </Typography>

            <Box sx={{ maxWidth: "700px", mx: "auto", mt: 5 }}>
              <TextField
                fullWidth
                placeholder={`Search in ${
                  mood === "default" ? "all vibes" : mood
                }...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(15px)",
                    borderRadius: "50px",
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    "&.Mui-focused": {
                      borderColor: getMoodColor(mood),
                      boxShadow: `0 0 25px ${getMoodColor(mood)}40`,
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search
                        sx={{ color: getMoodColor(mood), fontSize: "1.8rem" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="lg">
          {/* Results Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 6, flexWrap: "wrap", gap: 2 }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 900, color: "#0f172a", mb: 0.5 }}
              >
                {filteredProperties.length} Stays Found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Matching your{" "}
                <span
                  style={{
                    color: getMoodColor(mood),
                    fontWeight: 700,
                    textTransform: "capitalize",
                  }}
                >
                  {mood === "default" ? "all vibes" : mood}
                </span>{" "}
                mood
              </Typography>
            </Box>
            <Button
              startIcon={<MapIcon />}
              variant="outlined"
              sx={{
                borderRadius: "12px",
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: 700,
                borderColor: getMoodColor(mood),
                color: getMoodColor(mood),
                "&:hover": {
                  bgcolor: `${getMoodColor(mood)}10`,
                  borderColor: getMoodColor(mood),
                },
              }}
            >
              View on Map
            </Button>
          </Stack>

          {/* Properties Grid */}
          <Grid container spacing={4}>
            {filteredProperties.map((property, index) => (
              <Fade in key={property.id} timeout={400 + index * 100}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: "1px solid #e2e8f0",
                      bgcolor: "white",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-12px)",
                        boxShadow: `0 30px 60px ${getMoodColor(
                          property.mood
                        )}20`,
                        borderColor: getMoodColor(property.mood),
                      },
                    }}
                  >
                    {/* IMAGE SECTION - EXACT 340x240 */}
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: 250,
                        bgcolor: "#f1f5f9",
                        overflow: "hidden",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={property.img}
                        alt={property.title}
                        sx={{
                          width: 350,
                          height: 250,
                          objectFit: "cover",
                          mx: "auto",
                          display: "block",
                          transition: "transform 0.6s ease",
                          "&:hover": {
                            transform: "scale(1.08)",
                          },
                        }}
                      />

                      {/* Top Badges */}
                      <Box sx={{ position: "absolute", top: 16, left: 16 }}>
                        <Chip
                          label={property.mood}
                          size="small"
                          sx={{
                            bgcolor: "rgba(255, 255, 255, 0.95)",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            fontSize: "0.7rem",
                            letterSpacing: "0.5px",
                            border: `2px solid ${getMoodColor(property.mood)}`,
                          }}
                        />
                      </Box>

                      {/* Favorite Button */}
                      <IconButton
                        onClick={() => toggleFavorite(property.id)}
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          bgcolor: "rgba(255, 255, 255, 0.95)",
                          backdropFilter: "blur(4px)",
                          width: 40,
                          height: 40,
                          "&:hover": {
                            bgcolor: "#fff",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        {favorites.includes(property.id) ? (
                          <Favorite sx={{ color: "#ef4444", fontSize: 20 }} />
                        ) : (
                          <FavoriteBorder sx={{ fontSize: 20 }} />
                        )}
                      </IconButton>

                      {/* Rating Badge */}
                      <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
                        <Chip
                          icon={<Star sx={{ fontSize: "1rem" }} />}
                          label={property.rating}
                          size="small"
                          sx={{
                            bgcolor: "rgba(0, 0, 0, 0.7)",
                            color: "white",
                            fontWeight: 700,
                            backdropFilter: "blur(4px)",
                            "& .MuiChip-icon": {
                              color: "#fbbf24",
                            },
                          }}
                        />
                      </Box>

                      {/* Price Tag */}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 16,
                          right: 16,
                          bgcolor: getMoodColor(property.mood),
                          color: "white",
                          px: 2.5,
                          py: 1,
                          borderRadius: "12px",
                          fontWeight: 900,
                          fontSize: "1.2rem",
                          boxShadow: `0 8px 20px ${getMoodColor(
                            property.mood
                          )}40`,
                        }}
                      >
                        ${property.price}
                        <Typography
                          component="span"
                          variant="caption"
                          sx={{ ml: 0.5, opacity: 0.9, fontSize: "0.8rem" }}
                        >
                          /night
                        </Typography>
                      </Box>
                    </Box>

                    {/* Content Section */}
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      {/* Title and Location */}
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            fontSize: "1.2rem",
                            mb: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {property.title}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <LocationOn
                            sx={{
                              fontSize: "1rem",
                              color: getMoodColor(property.mood),
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary", fontWeight: 500 }}
                          >
                            {property.location}
                          </Typography>
                        </Stack>
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          fontSize: "0.9rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          lineHeight: 1.6,
                        }}
                      >
                        {property.description}
                      </Typography>

                      {/* Property Details */}
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <Bed sx={{ fontSize: "1rem", color: "#64748b" }} />
                          <Typography variant="caption" fontWeight={600}>
                            {property.bedrooms} Beds
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <Bathtub
                            sx={{ fontSize: "1rem", color: "#64748b" }}
                          />
                          <Typography variant="caption" fontWeight={600}>
                            {property.bathrooms} Baths
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <People sx={{ fontSize: "1rem", color: "#64748b" }} />
                          <Typography variant="caption" fontWeight={600}>
                            {property.guests} Guests
                          </Typography>
                        </Stack>
                        <Wifi sx={{ fontSize: "1rem", color: "#64748b" }} />
                      </Stack>

                      {/* Reviews */}
                      <Typography variant="caption" color="text.secondary">
                        ⭐ {property.rating} • {property.reviews} reviews
                      </Typography>
                    </CardContent>

                    {/* Action Button */}
                    <CardActions sx={{ p: 3, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleBookNow(property)}
                        sx={{
                          borderRadius: "12px",
                          py: 1.5,
                          fontWeight: 800,
                          textTransform: "none",
                          fontSize: "1rem",
                          bgcolor: getMoodColor(property.mood),
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: getMoodColor(property.mood),
                            transform: "translateY(-2px)",
                            boxShadow: `0 10px 25px ${getMoodColor(
                              property.mood
                            )}40`,
                          },
                        }}
                      >
                        Book Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Fade>
            ))}
          </Grid>

          {/* Empty State */}
          {filteredProperties.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                py: 10,
                bgcolor: "white",
                borderRadius: "20px",
                border: "2px dashed #e2e8f0",
              }}
            >
              <Search
                sx={{
                  fontSize: "4rem",
                  color: getMoodColor(mood),
                  opacity: 0.5,
                  mb: 3,
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                No properties found
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, maxWidth: "500px", mx: "auto" }}
              >
                Try adjusting your search or filters to find the perfect stay
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  setSearchTerm("");
                  setMood("default");
                }}
                sx={{
                  borderRadius: "12px",
                  px: 4,
                  py: 1.5,
                  borderColor: getMoodColor(mood),
                  color: getMoodColor(mood),
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: `${getMoodColor(mood)}10`,
                    borderColor: getMoodColor(mood),
                  },
                }}
              >
                Clear All Filters
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      {/* Back to Top Button */}
      {showBackToTop && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            bgcolor: getMoodColor(mood),
            color: "white",
            width: 56,
            height: 56,
            boxShadow: `0 8px 25px ${getMoodColor(mood)}40`,
            "&:hover": {
              bgcolor: getMoodColor(mood),
              transform: "translateY(-4px)",
            },
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
      )}
    </>
  );
};

export default Destination;
