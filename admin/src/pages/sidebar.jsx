import React, { useState } from "react";
import {
  HomeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon className="h-5 w-5" />, path: "/admin/dashboard" },

    {
      name: "Products",
      icon: <ShoppingBagIcon className="h-5 w-5" />,
      submenu: [
        { name: "All Products", path: "/admin/products" },
        { name: "Add Product", path: "/admin/products/add" },
        { name: "Categories", path: "/admin/categories" },
        { name: "Inventory", path: "/admin/inventory" },
      ],
    },

    { name: "Orders", icon: <ClipboardDocumentListIcon className="h-5 w-5" />, path: "/admin/orders" },

    { name: "Customers", icon: <UserGroupIcon className="h-5 w-5" />, path: "/admin/customers" },

    { name: "Reports", icon: <ChartBarIcon className="h-5 w-5" />, path: "/admin/reports" },

    { name: "Settings", icon: <Cog6ToothIcon className="h-5 w-5" />, path: "/admin/settings" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gray-900 text-gray-100 min-h-screen transition-all duration-300 flex flex-col`}
    >
      {/* Brand / Logo */}
      <div className="flex items-center justify-between p-4">
        <span className={`${!isOpen && "hidden"} text-xl font-bold`}>
          Zentro Admin
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white"
        >
          {isOpen ? "⏪" : "⏩"}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item, index) => (
          <div key={index}>
            {/* If item has submenu */}
            {item.submenu ? (
              <>
                <button
                  onClick={() =>
                    setOpenSubmenu(openSubmenu === item.name ? null : item.name)
                  }
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className={`${!isOpen && "hidden"} text-sm`}>
                      {item.name}
                    </span>
                  </div>
                  {isOpen && (
                    <ChevronDownIcon
                      className={`h-4 w-4 transform transition-transform ${
                        openSubmenu === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Submenu items */}
                {openSubmenu === item.name && isOpen && (
                  <div className="ml-10 mt-1 space-y-1">
                    {item.submenu.map((sub, i) => (
                      <a
                        key={i}
                        href={sub.path}
                        className="block px-2 py-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <a
                href={item.path}
                className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {item.icon}
                <span className={`${!isOpen && "hidden"} text-sm`}>
                  {item.name}
                </span>
              </a>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 text-xs text-gray-400 border-t border-gray-700">
        {isOpen ? "© 2025 Zentro" : "©25"}
      </div>
    </div>
  );
};

export default Sidebar;
