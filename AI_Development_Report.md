# AI Development Report (Step 3)

**Project Name**: Kenvenience Store
**Developer**: Chae0504
**Date**: 2026-05-29
**Deployment URL**: [https://kenveniencestore-git-main-zxf2007z-7169s-projects.vercel.app/](https://kenveniencestore-git-main-zxf2007z-7169s-projects.vercel.app/)

---

### 1. Which AI tools you used
- **Gemini 2.0 Flash (via Gemini CLI)**: Primary assistant for planning, coding, and debugging.

### 2. What tasks you asked AI to help with
- **Product Planning**: Refined the initial project idea and structured the Product Requirements Document (PRD).
- **Core Implementation**: Generated the initial HTML structure, CSS styling (Seven-Eleven theme), and JavaScript logic for the single-page application.
- **Feature Extension**: Implemented advanced features such as real-time search filtering and a "Like" (Upvote) system for item requests.
- **Localization & UX**: Translated the entire interface into Korean and optimized the layout for mobile devices.

### 3. Representative Prompts
1. *"Generate the initial codebase for this project (index.html, style.css, script.js) with a modern UI using Seven-Eleven's corporate colors (Green, Orange, Red)."*
2. *"Implement a 'Split-the-Deal' community board where users can join existing groups or create new ones, with data persisting in localStorage."*
3. *"Translate the entire UI to Korean, add a real-time search bar for the promotion section, and add a 'Like' button to each item request that sorts them by popularity."*

### 4. Modifications & Improvements
- **Design Refinement**: The AI's initial CSS was slightly generic. I manually refined the color codes (#008135, #EE7203, #E41E26) and added modern Google Fonts (Inter) to match a professional service aesthetic.
- **Advanced Sorting Logic**: While the AI provided basic data rendering, I improved the JavaScript to sort the 'Item Request' list dynamically by the number of likes, ensuring the most demanded items are always at the top.
- **Mobile-First UX**: Adjusted the CSS Grid media queries to ensure the 'Split-the-Deal' cards collapse gracefully on small screens, prioritizing readability for dormitory students on smartphones.

### 5. Bugs, Errors, & Limitations
- **LocalStorage Race Condition**: Initially, UI renders happened before data was fully loaded from `localStorage`. I fixed this by encapsulating the logic into a `saveAndRender()` function that ensures atomic updates.
- **Search vs. Filter Conflict**: The search bar initially cleared the category filters. I modified the `renderPromos` function to accept both `filter` and `searchTerm` parameters simultaneously, allowing combined searching (e.g., searching for "Milk" within the "Beverage" category).

---

### Design Decisions & Explanation
The project utilizes a **State-Driven Rendering** approach. Instead of static HTML, the JavaScript maintains an array of objects for promotions, deals, and requests. Whenever a user interacts (likes a request, joins a deal), the underlying data state is updated, saved to `localStorage`, and the DOM is re-rendered. This ensures a seamless and responsive user experience without page reloads, simulating a modern Single Page Application (SPA).
