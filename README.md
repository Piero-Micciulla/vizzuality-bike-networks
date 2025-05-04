# 🚲 CycleMap – Bike Network Explorer

CycleMap is a responsive, accessible and performant web app for discovering global bike networks using the CityBikes API. Built with Next.js (App Router), Tailwind CSS, TypeScript, and Mapbox GL, it focuses on delivering a seamless experience with attention to UI polish, data clarity, and device responsiveness.

---

## 🛠 Tech Stack

- **Framework**: \[Next.js 14+ App Router]
- **Styling**: Tailwind CSS + CSS Variables
- **Type Safety**: TypeScript throughout
- **Maps**: Mapbox GL JS
- **Animations**: Framer Motion + Tailwind transitions
- **Components**: Custom UI library (with Radix UI)

---

## 🚀 Features

- 🔍 **Search & Filter** networks by name and country
- 🗺️ **Interactive Map** showing stations and bikes/slots
- 📱 **Responsive UI** across all breakpoints
- 📍 **"Near Me"** function to locate closest network
- 📦 **Pagination & Sorting** for large datasets
- 🔄 **Animated transitions** between pages
- 🎨 **Custom popups** with live station info
- 🧠 **Loading states**

---

## 📁 Project Structure Highlights

- `page.tsx` – holding homepage structure
- `network/[id]/page.tsx` – holding network-details structure
- `features/` – encapsulated UI modules grouped by domain: networks/ for homepage functionality and network-detail/ for detail page features. This keeps related components (like search, filters, sorting, and station lists) isolated and scoped.
- `components/layout/` – shared layout primitives like PageContainer for consistent responsive layout structure
- `components/ui/` – headless and styled component primitives
- `components/Map.tsx` – encapsulated Mapbox logic, rendering, popups, and map interactivity
- `components/Pagination.tsx` – reusable pagination component with styling variants
- `lib/` – utility functions, API clients, and pagination variants for dynamic handling
- `hooks/` – responsive breakpoints and media helpers

---

## 🧱 Architectural Decisions

- **App Router (Next.js 14)** was chosen for its co-location and built-in async capabilities
- **Mapbox GL JS** provided better performance and customization over alternatives like Leaflet
- **Global styling** was managed via Tailwind + CSS custom properties for theme tokens
- Used **custom hooks** for screen size, allowing dynamic rendering logic (like popover placement)
- Created **utility functions** to format long labels and company names

---

## 😅 Challenges

- 🔄 **Handling geolocation fallback gracefully** when denied or unavailable
- 🧭 **Calculating the closest network** from geolocation with basic geometry
- ⚖️ **Balancing design fidelity** while preserving performance (e.g. limiting station render scope)
- 🌍 **Normalizing inconsistent data** from CityBikes API (e.g. empty fields, naming conventions)

---

## 🧪 Getting Started

```bash
yarn install
yarn run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore the app.

---

## 📦 Deployment

To deploy, simply push to a GitHub repo connected to [Vercel](https://vercel.com).

---

## 🙌 Credits

Thanks to CityBikes API for the open data, Mapbox for the mapping layer, and the team behind Lucide for the icon system.

---

## 🛠️ Future Improvements

While the current implementation of CycleMap satisfies the main project goals, there are several areas where the application can be enhanced further:

📊 **Performance & UX**

Offline map caching: Enable limited offline access for low-connectivity scenarios.

Skeleton screens: Replace static loaders with dynamic skeletons for a more polished experience.

🔧 **Feature Expansion**

Dark mode toggle: Add support for light/dark themes based on user preference.

Favorites/bookmarks: Let users save and revisit preferred networks.

🔍 **Data & Real-time**

Live updates: Pull real-time station data periodically where supported.

Search by station name: Add support for querying directly at the station level.

✅ **Dev & Testing**

Unit and integration tests: Expand test coverage for UI components and API logic.

Type validations: Introduce stricter schemas with zod or io-ts.

Error boundaries: Better resilience against API or render failures.

These enhancements aim to refine both usability and technical robustness for real-world use cases.

## ✨ Final Thoughts

This project was a joy to build — combining data, interactivity, and clean UX. Particular focus went into microinteractions and real-world usability.

Looking forward to your feedback!
