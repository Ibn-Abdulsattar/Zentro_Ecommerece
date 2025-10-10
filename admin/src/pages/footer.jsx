// Footer.tsx
import React from "react";
import { Box, Typography, Link, Container, Stack, useTheme, Avatar } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { styled, alpha, keyframes } from "@mui/material/styles";


const Footer = () => {
  const theme = useTheme();

  // Gradient animation
  const gradientAnimation = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  `;


const StyledFooter = styled(Box)(({ theme }) => ({
  background: `linear-gradient(-45deg, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.main}, 
    ${theme.palette.primary.dark}, 
    ${theme.palette.secondary.dark})`,
  backgroundSize: "400% 400%",
  animation: `${gradientAnimation} 15s ease infinite`,
  backdropFilter: "blur(20px)",
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
  "& .MuiToolbar-root": {
    backdropFilter: "blur(10px)",
  },
}));

  
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        mt: "auto",
        borderTop: 1,
        borderColor: "divider",
        position: "relative",
        overflow: "hidden",
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`,
        }
      }}
    >
      <StyledFooter>
      <Container maxWidth="xxl" sx={{ py: { xs: 3, md: 1.4 } }}>
        {/* Main Content */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={{ xs: 3, sm: 2 }}
        >
          {/* Left Side - Branding */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Link href="/">
              <Avatar
                src="/Zentro-logo-transparent.png"
                alt="Zentro Logo"
                sx={{
                  width: 200,
                  display: { md: "inline-flex", xs: "none" },
                  cursor: "pointer",
                }}
              />
            </Link>
          </Stack>

          {/* Right Side - Navigation Links */}
          <Stack 
            direction="row" 
            spacing={{ xs: 2, sm: 3 }} 
            flexWrap="wrap"
            useFlexGap
          >
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Use', href: '/terms' },
              { label: 'Support', href: '/support' },
              { label: 'API Docs', href: '/docs' }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                underline="none"
                color="inherit"
                sx={{
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    width: 0,
                    height: '2px',
                    bgcolor: 'secondary.main',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': {
                    color: 'secondary.main',
                    '&::after': {
                      width: '100%',
                    }
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </Stack>

      </Container>
      </StyledFooter>
    </Box>
  );
};

export default Footer;