# iyf-s11-week-12-street-vendor-hub-Mkmoise
## Author
- **Name:** Moisé Nyarugabo 
- **Date:** August 21, 2026

## Project Description
Street Vendor Hub is a full-stack community platform that connects local street vendors with customers. Vendors can create listings for their stalls, and users can browse, search, and view vendor details, alongside advertisement listings and a review system. The app includes full user authentication so vendors can manage their own listings securely.

## Technologies Used
- React + Vite
- React Router
- Node.js / Express 
- MongoDB with Mongoose
- JWT authentication (jsonwebtoken, bcryptjs)
- CORS
- CSS (custom stylesheets per feature)

## Features
- User registration & login with JWT-based authentication
- Protected routes for authenticated actions
- Browse all vendors (Vendors page)
- View a single vendor's details (Vendor Details page)
- Add a new vendor listing
- Edit an existing vendor listing
- Advertisement creation and editing
- Vendor and advertisement cards for listing views
- Review card component for vendor reviews
- Responsive navigation bar and footer
- About / Contact / Home informational pages

## Team
- Team Lead: @Mkmoise(https://github.com/Mkmoise) — project setup, Dashboard, Advertisement feature, routing
- Auth: [@kennedymurimi100](https://github.com/kennedymurimi100) — authentication system (backend + frontend)
- Vendors: [@rhonexkilibwa001](https://github.com/rhonexkilibwa001) — vendor listings feature
- Reviewer: [@kuriarobert41-debug](https://github.com/kuriarobert41-debug) — PR reviews/merges

## OUR Contributions
We us the syntax group we have developed a web site that help the vendors in expanding their business**:
- Backend: `user.js` (model), `authController.js`, `authMiddleware.js`, `auth.Routes.js` — register/login/JWT endpoints
- Frontend: `AuthContext.jsx`, `ProtectedRoute.jsx`, `Login.jsx`, `Register.jsx`, `AuthNav.jsx`
- Styling: `auth.css` (isolated auth UI styles)
- Wired auth environment variables and fixed backend env-loading bugs
- Opened and merged PR #4/#6 (`feature/authentication`) into `main`

### Prerequisites
- Node.js 
- MongoDB Atlas account 

### Backend
```bash
cd backend
npm install
cp .env.example .env   # add MONGODB_URI, JWT_SECRET, 
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open the Vite dev server URL shown in your terminal (typically `http://localhost:5173`).

## API Endpoints

### Auth
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user
- `GET /api/auth/me` — Get current user (protected)

### Vendors
- `GET /api/vendors` — Get all vendors
- `POST /api/vendors` — Create a vendor

## Lessons Learned
- How to structure a full-stack MERN app across a team, with each member owning a feature slice (auth, vendors, advertisements)
- Working with the React Router + protected route pattern to gate authenticated pages
- Coordinating a shared Express backend with multiple route modules mounted under `/api`

## Challenges Faced
- Resolving merge conflicts in `App.jsx` where multiple teammates added routes/components in parallel
- Making sure `.env` files and `node_modules` were excluded from git tracking after they were accidentally committed early on
- Keeping styling isolated per feature (vendors vs. auth vs. advertisements) to avoid CSS collisions
- HOSTING BACKEND && FRONTEND AND CONNECTING THEM TOGETHER 


 # Contributors

## Team Members

| Name | GitHub | Role | Contributions |
|------|--------|------|---------------|
| Team Lead USERNAME| @Mkmoise](https://github.com/Mkmoise) | Team Lead | Project setup, Dashboard, Advertisement feature (create/edit), App routing, README/CONTRIBUTORS docs |
| **kennedymurimi100** | @kennedymurimi100 (https://github.com/kennedymurimi100) | Developer | Authentication system (backend model/controller/routes, AuthContext, ProtectedRoute, Login/Register pages, AuthNav) |
|Rhonex | [@rhonexkilibwa001](https://github.com/rhonexkilibwa001) | Developer | Vendor listings feature (backend model/controller/routes, Vendors/VendorDetails/AddVendor/EditVendor pages, VendorForm/VendorCard components, Navbar, Footer, Home/About/Contact pages) |
|Margaret| [@kuriarobert41-debug](https://github.com/kuriarobert41-debug) | Reviewer | Reviewed and merged pull requests|

## Contribution Breakdown

### Team Lead (Mkmoise)
- Set up the initial React + Vite frontend and Express backend
- Built the Dashboard page and Advertisement feature (create/edit)
- Merged feature branches into `main` and resolved routing conflicts in `App.jsx`
- Maintained project README and CONTRIBUTORS docs

### kennedymurimi100
- Built the authentication system: user model, controller, middleware, and routes on the backend
- Implemented `AuthContext`, `ProtectedRoute`, `Login.jsx`, `Register.jsx`, and `AuthNav.jsx` on the frontend
- Wired auth environment variables and fixed backend env-loading bugs

### rhonexkilibwa001
- Built the vendor listings feature end-to-end: `vendor.js` model, `vendorController.js`, `vendor.Routes.js`
- Created `Vendors.jsx`, `VendorDetails.jsx`, `AddVendor.jsx`, `EditVendor.jsx` pages
- Built `VendorForm.jsx` and `VendorCard.jsx` components, plus shared `Navbar.jsx` and `Footer.jsx`
- Built `Home.jsx`, `About.jsx`, and `Contact.jsx` informational pages
- Opened and merged PR #1 (`feature-Vendors-Features`) into `main`
- 
### kuriarobert41-debug
- Reviewed and merged pull requests into `main` (advertisement feature PRs)

---
*Note: names in brackets are placeholders — swap in real full names before submitting. GitHub handles above are pulled directly from this repo's commit history.*



## Live Demo
https://streetvendor-frontend-liart.vercel.app


