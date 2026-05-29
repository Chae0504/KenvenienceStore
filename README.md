# Kenvenience Store - KENTECH Dormitory Seven-Eleven Smart Service

This is a prototype web service developed for **Assignment 4** of the Introduction to AI Programming course (2026 Spring).

## Project Overview
Kenvenience Store is designed to improve the convenience of dormitory residents at KENTECH when using the on-campus Seven-Eleven. It provides a centralized dashboard for store promotions and community features for cost-sharing.

## Main Features
1.  **Promo & Stock Viewer**: A live dashboard displaying current 1+1 and 2+1 events with category filtering, search functionality, and stock status.
2.  **Split-the-Deal Hub**: An interactive community board where students can create or join groups to split the cost and quantity of promotional items.
3.  **Item Pre-Order Request**: A submission system for students to request specific items, featuring a "Like" system to highlight popular demands.

## Technologies Used
-   **HTML5**: Semantic structure.
-   **CSS3**: Modern, responsive layout with Seven-Eleven branding.
-   **Vanilla JavaScript (ES6+)**: Dynamic content rendering, state management, and interaction.
-   **localStorage**: Used to simulate backend data persistence for requests and deal postings.

## How to Run Locally
1.  Clone or download the repository.
2.  Open `index.html` in any modern web browser.

## Vercel Deployment
-   **Deployment URL**: [https://kenveniencestore-git-main-zxf2007z-7169s-projects.vercel.app/](https://kenveniencestore-git-main-zxf2007z-7169s-projects.vercel.app/)

## AI Development Report (Step 3)

### 1. Which AI tools you used
- **Gemini 2.0 Flash (via Gemini CLI)**: Used for architecture planning, initial codebase generation, and feature refinement.

### 2. What tasks you asked AI to help with
- **PRD Refinement**: Translating initial ideas into a structured Product Requirements Document.
- **Codebase Generation**: Creating the initial HTML/CSS/JS structure based on the PRD.
- **Feature Implementation**: Adding the search functionality for promos and the 'Like' system for requests.
- **Localization**: Translating the entire UI into Korean for better UX for KENTECH students.

### 3. Representative Prompts
- "Generate the initial codebase for this project... index.html, style.css, script.js with Seven-Eleven branding."
- "Implement a 'Split-the-Deal' feature where users can click a button to join a group, saving state to localStorage."
- "Translate the UI to Korean and add a stock search functionality and a 'Like' button for item requests."

### 4. Modifications & Improvements
- **UI Customization**: Manually adjusted the Seven-Eleven identity colors (Deep Green, Bright Orange, Dark Red) to ensure a modern and clean look.
- **Data Logic**: Enhanced the `localStorage` logic to sort item requests by the number of "Likes" to highlight popular demands.
- **Responsive Design**: Refined the CSS grid to ensure the layout remains functional and aesthetically pleasing on both mobile and desktop screens.

### 5. Bugs & Limitations Found
- **State Persistence**: Initially, new deals weren't persisting after refresh. Fixed by integrating `localStorage` into the render cycle.
- **Search Filtering**: The search bar initially ignored category filters. Fixed by ensuring both criteria are checked simultaneously in the JavaScript logic.

---
*Created by Chae0504 for Assignment 4, KENTECH 2026.*
