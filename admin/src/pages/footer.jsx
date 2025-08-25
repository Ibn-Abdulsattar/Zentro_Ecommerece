import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm py-3 px-6 border-t flex items-center justify-between">
      {/* Left Side */}
      <span>
        © {new Date().getFullYear()} Zentro Admin Panel. All rights reserved.
      </span>

      {/* Right Side */}
      <div className="flex gap-4">
        <a href="/privacy" className="hover:text-blue-500">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:text-blue-500">
          Terms of Use
        </a>
      </div>
    </footer>
  );
};

export default Footer;
