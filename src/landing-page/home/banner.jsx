import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Typography, Button } from "@mui/material";

export default function Banner() {
  const banners = [
    {
      image: "/baner.avif",
      title: "Big Summer Sale",
      description: "Up to 50% off on top categories. Limited time only!",
      cta: "Shop Now",
    },
    {
      image: "/banner.webp",
      title: "New Arrivals",
      description: "Discover the latest trends in fashion and lifestyle.",
      cta: "Explore",
    },
    {
      image: "/bruno.jpg",
      title: "Exclusive Deals",
      description: "Get the best prices on your favorite products.",
      cta: "Grab Deals",
    },
    {
      image: "/marvin.jpg",
      title: "Latest Electronics",
      description: "Smartphones, laptops, and gadgets at unbeatable prices.",
      cta: "Shop Electronics",
    },
  ];

  return (
    <Box
        sx={{
    "& .swiper-pagination": {
      backgroundColor: "#3a3737ff", // background for the dots container
      borderRadius: "8px",
      bottom: "10px", // adjust position
      width: "auto", // shrink to fit content
      padding: .5, // horizontal padding inside
      opacity: ".5",
    },
    "& .swiper-pagination-bullet": {
     fontSize: "2rem", // dot color
     backgroundColor: "#fdf9f9ff",
     opacity:1
    },
    "& .swiper-pagination-bullet-active": {
      backgroundColor: "#f96e03ff", // active dot color
     opacity:1
    },
  }}
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true, dynamicBullets: true }} // dots
        modules={[Navigation, Autoplay, Pagination]}
        style={{ height: "60vh", width: "100%" }}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0,0,0,0.4)", // overlay
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  px: { xs: 10, md: 20 },
                  color: "white",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: "1.8rem", md: "3rem" },
                  }}
                >
                  {banner.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ mb: 3, fontSize: { xs: "1rem", md: "1.2rem" } }}
                >
                  {banner.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#F97316",
                    "&:hover": { bgcolor: "#EA580C" },
                    px: 4,
                    py: 1.5,
                    fontWeight: "bold",
                  }}
                >
                  {banner.cta}
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
