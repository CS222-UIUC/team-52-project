
# Introduction

## What is Grocery Gauge? 
This website is a tool for people to track inflation prices on grocery products, more specifically Kroger products
1. Pulls data from Kroger ____??
2. Website gets this data from the products and uses ____ to predict the price for the upcoming ___ days
3. Website simulates the current total price with an Add To Cart function that allows you to see the total price if you were to buy the products today
4. Website provides notification emails so you can save certain products and get an email when your preferred target price is hit

## Features
- Browse Kroger grocery items with updated prices
- View individual graphs for each product showcasing the change in price over time
- Add/remove products from a simulated grocery cart to calculate the price of a grocery list
- Search function to find specific products
- Request an email alert for when desired products reach a desired price

# Technical Architecture 
[image]

# Developers 
- Jennifer Gonzalez (Frontend): Worked on Website Design and connecting backend API calls to Frontend design
- Isabella Velez (Frontend): Mainly worked on Website Design, also handled the Product and About Us pages.
- Andrew Stephan (Backend):
- Yinglin (Backend): Set up the Django project environment and built functionality to fetch Kroger Products API data and stored it in a MySQL database
# Environment Setup
- python3 -m venv .venv
- source .venv/bin/activate
- Runs the app in the development mode.\
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
# Development 
- pip install --upgrade pip
- pip install -r requirements.txt
## Package Updates 
- pip install pipreqs
- pipreqs . --force
## Package Management 
- pip install --upgrade pip
- pip install -r requirements.txt
- npm install
# Project Instructions 
- python runserver localhost:8000
- npm start
- cd backend/prediction
- python server.py

## Project Structure
- src/
  - components/
  - CartContext.js
  - Footer.js
  - Products.js
  - style.css
- pages/   
  - ~Pred_POC_Product.js
  - About.js
  - Cart.js
  - Cart.module.css
  - Home.js
  - Home.module.css
  - Product.js
  - TopBar.module.css
- App.css
- App.js 
- App.test.js
- globalStyles.test.js
- index.css
- index.js
- reportWebVitals.js
- setupTests.js

## Website Screenshots
![Home Page](https://media.discordapp.net/attachments/1287663401283223555/1371687965562245171/Screenshot_2025-05-12_221002.png?ex=68240b77&is=6822b9f7&hm=4d1870e676750eb29b0f5503e8d99eb864519cd858a1eab06d307a86fb254be9&=&format=webp&quality=lossless&width=1423&height=813)
![Product Page](https://media.discordapp.net/attachments/1287663401283223555/1371687965868294292/Screenshot_2025-05-12_221036.png?ex=68240b77&is=6822b9f7&hm=dc1e112301c63cb79a472c05a2d2935e5e3244c4c4d08e507383298f28600dc1&=&format=webp&quality=lossless&width=1420&height=813)
![Cart Page](https://media.discordapp.net/attachments/1287663401283223555/1371687966296244225/Screenshot_2025-05-12_221112.png?ex=68240b77&is=6822b9f7&hm=385ae3145e7f549c242a231a6fe7a19c2634151ba71ce770e63245f1bf064cef&=&format=webp&quality=lossless&width=1414&height=813)
![About Us Page](https://media.discordapp.net/attachments/1287663401283223555/1371687966619078790/Screenshot_2025-05-12_221139.png?ex=68240b77&is=6822b9f7&hm=15d0ca5fea80d580a75e16aecbc1c06fe4f11f31ce0f7ed2ae9009611c8df168&=&format=webp&quality=lossless&width=1410&height=813)

