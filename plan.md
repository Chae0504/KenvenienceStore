# Project Plan: Kenvenience Web Service

## 1. Context & Context Goals
I am a KENTECH university student working on "Assignment_4.pdf" for my AI Programming class. I need to build a working prototype of a web service for our new dormitory Seven-Eleven convenience store. 

Since this is a frontend-only project, all backend features (database, authentication) must be simulated using JavaScript and `localStorage`. The final site will be deployed on Vercel.

## 2. Tech Stack
- HTML5
- CSS3 (Modern, Responsive, Clean Grid/Flexbox Layout)
- Vanilla JavaScript (ES6+)

## 3. Core Requirements (from Assignment_4.pdf)
- Must include at least 3 pages or 3 clearly separated sections.
- Must provide a clear navigation structure.
- Must include at least one meaningful interactive feature using JavaScript (e.g., form handling, data filtering, dynamic state management).

## 4. Key Pages & Interactivity Architecture

### Section 1: Promo & Stock Hub (Home / Dashboard)
- Visual grid showing items with labels like `[1+1]` or `[2+1]`.
- Category filtering buttons (All, Drinks, Snacks, Meals).

### Section 2: Split-the-Deal Board (Interactive Core 1)
- A dynamic board displaying active "co-purchasing" groups.
- Example card: "Item: Coca-Cola 2+1 | Status: 2/3 joined | Room: Dorm Main Lobby at 10 PM"
- **Interactivity:** A "Join Deal" button that increments the counter (e.g., from 2/3 to 3/3) and changes status to "Completed". A "Create Deal" button that opens a simple modal/form to add a new post to the board.

### Section 3: Item Pre-Order Request Form (Interactive Core 2)
- An HTML form where users input: Item Name, Category, and Reason.
- **Interactivity:** On submit, prevent default behavior, save the request to an array (or `localStorage`), and display the newly added request dynamically at the bottom of the page in a "Recent Requests" list.

## 5. Design Guidelines
- **Color Palette:** Seven-Eleven corporate colors (Green, Orange, White) optimized for a clean, user-friendly UI.
- **Components:** Card components for products and deal postings, sticky navigation bar, full responsiveness for mobile screens.

---

## First Prompt Task
Please generate the initial codebase for this project. To keep things clean, provide the code structured into three separate files:
1. `index.html` - Containing the structure with a clean navigation system and placeholders for the 3 sections (Promo, Split-Deal, Request Form).
2. `style.css` - Beautiful, modern styling with Seven-Eleven branding accents and responsive layout.
3. `script.js` - JavaScript handling the dynamic 'Split-the-Deal' increments, creating new deals, and handling the Pre-Order form submission using `localStorage`.