import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  Card,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, useInView } from "framer-motion";
import {
  Apartment,
  People,
  Public,
  EmojiEvents,
  Security,
  LocalFlorist,
  RocketLaunch,
  Diversity3,
  ArrowForward,
  LinkedIn,
  Twitter,
  Instagram,
  ExpandMore,
} from "@mui/icons-material";

// 1. Optimized Counter (Bina Lag ke chalega)
const AnimatedCounter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [end, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [hoveredCard, setHoveredCard] = useState(null);

  const themeColor = "#1a202c";
  const accentColor = "#4facfe";

  // Data Arrays (Aapka original data)
  const stats = [
    {
      icon: <Apartment />,
      count: 500,
      label: "Luxury Hotels",
      suffix: "+",
      delay: 0.1,
    },
    {
      icon: <People />,
      count: 10000,
      label: "Happy Guests",
      suffix: "+",
      delay: 0.2,
    },
    {
      icon: <Public />,
      count: 50,
      label: "Destinations",
      suffix: "+",
      delay: 0.3,
    },
    {
      icon: <EmojiEvents />,
      count: 12,
      label: "Travel Awards",
      suffix: "",
      delay: 0.4,
    },
  ];

  const teamMembers = [
    {
      name: "James Wilson",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      bio: "Operations specialist scaling hospitality businesses",
    },
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      bio: "Former hotel executive with 15+ years experience",
    },
    {
      name: "Maria Garcia",
      role: "Experience Curator",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      bio: "Travel journalist turned experience designer",
    },
    // {
    //   name: "David Kim",
    //   role: "Tech Lead",
    //   image:
    //     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    //   bio: "Ex-Google engineer building travel tech",
    // },
  ];

  const timeline = [
    {
      year: "2024",
      title: "The Beginning",
      description: "StayFlow founded with 3 hotels in Bali",
      icon: "🚀",
    },
    {
      year: "2025",
      title: "First Milestone",
      description: "Expanded to 50+ destinations",
      icon: "🌏",
    },
    {
      year: "Present",
      title: "Global Presence",
      description: "Operating in 50+ countries",
      icon: "🏆",
    },
  ];

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box sx={{ bgcolor: "#f8fafc", overflowX: "hidden" }}>
      {/* 2. Enhanced Hero Section (Particles pointer-events fix) */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "80vh", md: "100vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{
            background: [
              "linear-gradient(135deg, #1a202c 0%, #4facfe 100%)",
              "linear-gradient(135deg, #4facfe 0%, #1a202c 100%)",
              "linear-gradient(135deg, #1a202c 0%, #4facfe 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ position: "absolute", inset: 0 }}
        />

        {/* Improved Particles (No-click interference) */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                width: Math.random() * 80 + 20,
                height: Math.random() * 80 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -100, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
              }}
            />
          ))}
        </Box>

        <Container
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "white",
            px: 3,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              fontWeight="900"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "5rem" },
                mb: 3,
                lineHeight: 1.2,
                background: "linear-gradient(90deg, #fff 0%, #4facfe 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Where Every Stay Tells A Story
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: "700px",
                mx: "auto",
                mb: 5,
                fontWeight: 300,
                fontSize: { xs: "1rem", md: "1.25rem" },
                opacity: 0.9,
              }}
            >
              Redefining hospitality through innovation and community.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: "white",
                color: themeColor,
                px: { xs: 4, md: 6 },
                py: 2,
                borderRadius: "50px",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              Begin Your Journey
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* 3. Stats Section (Responsive Spacing) */}
      <Container
        maxWidth="lg"
        sx={{
          mt: { xs: -5, md: -10 },
          position: "relative",
          zIndex: 3,
          px: { xs: 2, sm: 3 },
        }}
      >
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {stats.map((stat, idx) => (
            <Grid item xs={6} md={3} key={idx}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2, md: 4 },
                  textAlign: "center",
                  borderRadius: "20px",
                  borderTop: `5px solid ${accentColor}`,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-10px)" },
                }}
              >
                <Box
                  sx={{
                    color: accentColor,
                    fontSize: { xs: "2rem", md: "3rem" },
                    mb: 1,
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography
                  variant="h4"
                  fontWeight="900"
                  sx={{ fontSize: { xs: "1.5rem", md: "2.5rem" } }}
                >
                  <AnimatedCounter end={stat.count} />
                  {stat.suffix}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* 4. Timeline (Better Mobile View) */}
        <Box sx={{ py: { xs: 8, md: 15 } }}>
          <Typography
            variant="h2"
            textAlign="center"
            fontWeight="900"
            sx={{ mb: 8, fontSize: { xs: "2rem", md: "3.5rem" } }}
          >
            Our <span style={{ color: accentColor }}>Journey</span>
          </Typography>

          <Box sx={{ position: "relative" }}>
            {/* Vertical Line */}
            <Box
              sx={{
                position: "absolute",
                left: { xs: "20px", md: "50%" },
                transform: { xs: "none", md: "translateX(-50%)" },
                width: "4px",
                height: "100%",
                background: `linear-gradient(180deg, ${accentColor}, ${themeColor})`,
              }}
            />

            {timeline.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  mb: 6,
                  justifyContent: {
                    xs: "flex-start",
                    md: index % 2 === 0 ? "flex-start" : "flex-end",
                  },
                  pl: { xs: "50px", md: 0 },
                  position: "relative",
                }}
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeInUp}
                  style={{ width: isTablet ? "100%" : "45%" }}
                >
                  <Paper
                    sx={{
                      p: 4,
                      borderRadius: "20px",
                      position: "relative",
                      border: `1px solid ${accentColor}30`,
                    }}
                  >
                    <Typography
                      variant="h4"
                      color={accentColor}
                      fontWeight="bold"
                    >
                      {item.year}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {item.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Box>
            ))}
          </Box>
        </Box>

        {/* 5. Team Section (Responsive Grid - Fixed Width & Height) */}
        <Box sx={{ py: { xs: 8, md: 15 } }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              fontWeight="900"
              textAlign="center"
              gutterBottom
              sx={{ fontSize: { xs: "2.2rem", md: "3.5rem" } }}
            >
              The <span style={{ color: accentColor }}>Visionaries</span> Behind
              the Vision
            </Typography>
            <Typography
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 8, maxWidth: "600px", mx: "auto", px: 2 }}
            >
              Meet the passionate team crafting extraordinary experiences
            </Typography>
          </motion.div>

          <Grid
            container
            spacing={4}
            alignItems="stretch"
            sx={{ width: "100%", m: 0 }}
          >
            {teamMembers.map((member, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flex: "1 1 0px", // Ye sabhi cards ko barabar base width dega
                  minWidth: 280,
                  flexDirection: "column",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    display: "flex",
                    flex: 1, // This forces the motion div to take full height/width
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%", // Force same width
                      flex: 1, // Force same height
                      p: 4,
                      borderRadius: "24px",
                      textAlign: "center",
                      backgroundColor: "#fff",
                      border: "1px solid rgba(0,0,0,0.05)",
                      transition: "all 0.4s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: `0 20px 40px ${accentColor}25`,
                      },
                    }}
                  >
                    <Box sx={{ width: "100%", flexShrink: 0 }}>
                      <Avatar
                        src={member.image}
                        sx={{
                          width: 100,
                          height: 100,
                          mb: 2,
                          mx: "auto",
                          border: `3px solid ${accentColor}`,
                        }}
                      />
                      <Typography variant="h6" fontWeight="bold">
                        {member.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: accentColor, mb: 2 }}
                      >
                        {member.role}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        minHeight: "100px", // Ek fixed space reserve kar lo bio ke liye
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          width: "100%",
                          display: "-webkit-box",
                          WebkitLineClamp: 3, // 3 lines ke baad text "..." ho jayega
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          height: "4.8em", // Fixed height taaki cards upar niche na ho
                        }}
                      >
                        {member.bio}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        mt: "auto",
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <IconButton size="small">
                        <LinkedIn />
                      </IconButton>
                      <IconButton size="small">
                        <Twitter />
                      </IconButton>
                      <IconButton size="small">
                        <Instagram />
                      </IconButton>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Box sx={{ py: 6, textAlign: "center", borderTop: "1px solid #eee" }}>
        <Typography variant="body2" color="text.secondary">
          © 2026 StayFlow. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
