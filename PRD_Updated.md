# Product Requirements Document (PRD): Kenvenience Store

**Product Name**: Kenvenience Store (KENTECH Dormitory Seven-Eleven Smart Service)
**Version**: 1.1.0 (Updated)

## 1. Product Overview
Kenvenience Store is a dedicated web service designed for KENTECH students living in the dormitory to enhance their convenience when using the on-campus Seven-Eleven. The service addresses pain points such as information asymmetry regarding stock and the financial burden of bulk promotional deals.

## 2. Target Users & Pain Points
- **Target Users**: KENTECH undergraduate/graduate dormitory residents.
- **Pain Points**:
    - **Information Asymmetry**: Students don't know if items are in stock before walking down.
    - **Financial Burden**: 1+1 or 2+1 deals are hard for single students to manage alone.
    - **Stock Limitations**: Specific items students want might not be stocked.

## 3. Project Goals
- Provide a centralized dashboard for store promotions.
- Establish a crowd-sourced request channel for ordering specific products.
- Foster a cooperative student community for "Split-the-Deal" purchases.

## 4. Core User Scenario
**Scenario**: Minsoo, a sophomore, wants a 2+1 ice cream deal but only wants one. He uses the "Split-the-Deal" hub to find two other students, meets them at the store, and they share the cost.

## 5. Feature List & Priorities
- **F-01: Stock & Promo Viewer** (Must-have): Real-time view of 1+1/2+1 deals.
- **F-02: Item Pre-Order Request** (Must-have): Form to request new stock.
- **F-03: Split-the-Deal Hub** (Should-have): Community board to find deal partners.
- **F-04: Live Status Filtering** (Nice-to-have): Search and category filters.

## 6. Page Structure
- **Home (Dashboard)**: Quick view of top deals and active splits.
- **Promo Page**: Filterable list of all store promotions.
- **Order Request**: Form and "Like" system for item requests.
- **Split-Board**: Dedicated interactive board for co-purchasing.

## 7. Technical Requirements
- **Frontend**: HTML5, CSS3, Vanilla JavaScript.
- **State**: `localStorage` for data persistence.
- **Deployment**: Vercel.

## 8. Design Requirements & Wireframe
- **Theme**: Seven-Eleven Identity Colors (Green: #008135, Orange: #EE7203, Red: #E41E26).
- **Wireframe Sketch**:
```text
+------------------------------------------+
| [Logo] Kenvenience     [Promo] [Split] [Req] |
+------------------------------------------+
|        KENTECH SMART CONVENIENCE         |
|   [ Search Items... ] [ Category Filter ] |
+------------------------------------------+
| +--------------+      +----------------+ |
| |   Item Card  |      |   Split Card   | |
| | [1+1] Coke   |      | [2/3] Joined   | |
| +--------------+      +----------------+ |
+------------------------------------------+
```
*(Note: For the final PDF, please insert a screenshot of the actual implemented site here to satisfy the visual requirement.)*

## 9. Milestones (Updated Timeline)
1. **Phase 1: PRD Writing & UI/UX Wireframing** (~2026-06-01)
2. **Phase 2: HTML Boilerplate & CSS Styling** (~2026-06-05)
3. **Phase 3: JavaScript Core Logic Implementation** (~2026-06-10)
4. **Phase 4: Vercel Deployment & Final Documentation** (~2026-06-14)
