import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Container,
  Link,
} from "@mui/material";

const categories = [
  { image: "/fashion.jpg", title: "Fashion" },
  { image: "/electronics.jpg", title: "Electronics" },
  { image: "/living.jpg", title: "Home & Living" },
  { image: "/beauty.jpg", title: "Beauty" },
  { image: "/sports.jpg", title: "Sports" },
  { image: "/toys.jpg", title: "Toys & Kids" },
];

export default function Category() {
  return (
    <Box sx={{ py: 10, backgroundColor: "#F9FAFB" }}>
      {/* Section Title */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 800,
          color: "#111827",
          mb: 4,
          textTransform: "uppercase",
          marginBottom: "3rem",
        }}
      >
        <span style={{ borderBottom: "5px solid #F97316" }}>
          Shop by Category
        </span>
      </Typography>

      {/* Categories Grid */}
      <Box sx={{ padding: "2rem" }}>
        <Grid container spacing={4} justifyContent="center">
          {categories.map((cat, i) => (
            <Grid size={{ md: 2, sm: 4, xs: 6 }} key={i}>
              <Link href="/productListing" sx={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    border: "1px solid #E5E7EB",
                    transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0px 12px 30px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardActionArea>
                    {/* Category Image */}
                    <CardMedia
                      component="img"
                      image={cat.image}
                      alt={cat.title}
                      sx={{
                        height: 200,
                        objectFit: "cover",
                        aspectRatio: "1/1",
                        transition: "transform 0.5s ease",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    />

                    {/* Gradient Overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                      }}
                    >
                      <Typography
                        variant="h6"
                        align="center"
                        sx={{
                          // fontWeight: 700,
                          color: "#fff",
                          fontWeight: 700,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          textShadow: "0px 2px 6px rgba(0,0,0,0.5)",
                          "&:hover": { color: "#F97316" }, // brand hover color
                          "&:hover::after": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.2)",
                          },
                        }}
                      >
                        {cat.title}
                      </Typography>
                    </Box>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
