// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import styles from "./TopBar.module.css";

// export function TopBar() {
//     const [searchQuery, setSearchQuery] = useState(""); // State for storing the search input value
//     // const [activeTab, setActiveTab] = useState("Home"); // State for keeping track of the active tab
//     const [psearchQuery, psetSearchQuery] = useState("");
//      const location = useLocation(); //izzie added
//      const path = location.pathname; //izzie added
//      const isOnProductPage = location.pathname === "/browse"; 
 
//      const getActiveTab = () => {
//      if (path === "/") return "Home";
//      if (path === "/browse") return "Products";
//      if (path === "/cart") return "Cart";
//      if (path === "/about") return "About Us";
//      return "";
//      }; // izzie added
 
//      <input
//          type="text"
//          value={isOnProductPage ? psearchQuery : searchQuery}
//          onChange={(e) => {
//              isOnProductPage ? psetSearchQuery(e.target.value) : setSearchQuery(e.target.value);
//          }}
//      />
 
//      // Handle search input change
//      const handleSearchChange = (e) => {
//          setSearchQuery(e.target.value); // Update search query when input changes
//      };
   
//      // Handle search submission
//      const handleSearchSubmit = (e) => {
//          e.preventDefault(); // Prevent the default form submission behavior (page reload)
//          console.log("Searching for:", searchQuery); // Log the search query (you can replace this with actual search logic)
//      };
   
//      // Handle tab click (to set active tab)
//      // const handleTabClick = (tabName) => {
//      //     setActiveTab(tabName); // Update activeTab state when a tab is clicked
//      // };
   
//      return (
//          <header className={styles.topBar}>
//          {/* Left section (logo + title) */}
//          <div className={styles.leftSection}>  
//          <img 
//              src="/images/Untitled_Artwork.webp" 
//              alt="GroceryGauge Logo" 
//              className={styles.logo}
//              />
//              <h1 className={styles.title}>GroceryGauge</h1>
//          </div>
 
//          {/* Right section (navigation + search) */}
//          <div className={styles.rightSection}>
//              <nav className={styles.navigation}>
//                  <Link
//                      to="/"
//                      className={`${styles.tab} ${getActiveTab() === "Home" ? styles.activeTab : ""}`} //changed to function call so that it works with footer
 
//                      //onClick={() => handleTabClick("Home")}
//                  >
//                      Home
//                  </Link>
//                  {/* Link for Products */}
//                  <Link
//                      to="/browse"
//                      className={`${styles.tab} ${getActiveTab() === "Products" ? styles.activeTab : ""}`}
//                      //onClick={() => handleTabClick("Products")}
//                  >
//                      Products
                     
//                  </Link>
//                  {/* Link for Cart */}
//                  <Link
//                      to="/cart"
//                      className={`${styles.tab} ${getActiveTab() === "Cart" ? styles.activeTab : ""}`}
//                      //onClick={() => handleTabClick("Cart")}
//                  >
//                      Cart
//                  </Link>
//                  {/* Link for About Us */}
//                  <Link
//                      to="/about"
//                      className={`${styles.tab} ${getActiveTab() === "About Us" ? styles.activeTab : ""}`}
//                      //onClick={() => handleTabClick("About Us")}
//                  >
//                      About Us
//                  </Link>
//              </nav>
 
//                  {/* Search form */}
//                  <form className={styles.textfield} onSubmit={handleSearchSubmit}>
//                      <input
//                          type="text"
//                          className={styles.searchInput}
//                          placeholder="Search in site"
//                          value={searchQuery} // Display the current search query in the input field
//                          onChange={handleSearchChange} // Handle the change in the search input
//                          aria-label="Search"
//                      />
//                      <button
//                          type="submit"
//                          className={styles.searchButton}
//                          aria-label="Submit search"
//                      >
//                          <img
//                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b997d6d4ad3e310387c87f295e6d3c20f6e1de479763c581120c0eeeea50893?placeholderIfAbsent=true&apiKey=ec5f69a7fdc64a33839a43dcf4df9d9a"
//                              alt="Search icon"
//                              className={styles.img}
//                          />
//                      </button>
//                  </form>
//              </div>
//          </header>
//      );
//  }