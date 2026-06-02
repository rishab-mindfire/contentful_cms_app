# Public Product Website - CMS Platform

## **1. Project Title**

Public Product Website - CMS

---

## **2. Overview**

This project is a high-performance, modular frontend built using the Next.js App Router and Tailwind CSS. It functions as a dynamic rendering engine that decouples content management from your presentation layer by pulling data directly from a Headless CMS API. Instead of hardcoding pages, the application acts as an intelligent receiver that parses structured JSON data from 4 specific endpoints and automatically maps them to flexible, responsive React components on the frontend.

## **3. Folder Structure**

```
PRODUCT_CMS/
├── app/                    # Next.js App Router Node
│   ├── layout.tsx          # Ingests /api/globle for root context layouts
│   ├── page.tsx            # Ingests /api/landing-page for Block layout parsing
│   ├── blog/
│   │   ├── page.tsx        # Ingests /api/articles for dynamic grid archives
│   │   └── [id]/
│   │       └── page.tsx    # Single Article view via localized query params
│   └── pricing/
│   │    └── page.tsx        # Ingests /api/pricings structure matrices
│   └── dasboard/
│       └── page.tsx        # Ingests /api/pricings structure matrices
|       └──  dashboard-client.tsx  # Authenticated page
|       ............
|
├── components/             # Polymorphic components triggered by dynamic templates
│   ├── global/
│       ├── Navbar.tsx
│       └── Footer.tsx
│   ├── landing-block/
│       ├── Hero.tsx
│       ├── Features.tsx
│       └── Testimonials.tsx
|           ..........
|
│   ├── pricing-block/
│       ├── PriceCard.tsx
│       └── FAQSection.tsx
|             ........

├── services/             # Apic integrations
|     ├── api-client.ts
|     ├──blog.service.ts
|     ├──aglobal.service.ts
│
|
```

## **5. Installation & Setup**

```
# 1. Clone & Install
git clone https://github.com/rishab-mindfire/strapi-backend
cd PRODUCT_CMS
```

### frontend env.example

```
# Dabtabse URL
DATABASE_URL="postgresql://myuser:password@localhost:5432/mydatabase?schema=public"

# Auth
BETTER_AUTH_SECRET="##############"
BETTER_AUTH_URL="http://localhost:3000"
GITHUB_CLIENT_ID="##########"
GITHUB_CLIENT_SECRET="#############"
GOOGLE_CLIENT_ID="######.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="#############"

# Strapi backend API
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337


```

## Setup and run app

### 1. installation forntend

```
   cd PRODUCT_CMS
   npm i
   npm run dev
```

## **6. Scripts**

| Command         | Description        |
| --------------- | ------------------ |
| `npm run dev`   | Development server |
| `npm run build` | Production build   |
| `npm run test`  | Run tests          |

| Category     | Technology                         |
| ------------ | ---------------------------------- |
| **Frontend** | Next JS 16 + React 19 + TypeScript |
| **Routing**  | Next Pages Router                  |
| **HTTP**     | Fetch                              |
| **Styling**  | tailwind CSS                       |
| **Testing**  | Vitest + React Testing Library     |

## **7. System Architecture**

```mermaid
flowchart TD

%% 1. ENTRANCE & AUTHENTICATION FLOW
A[User Opens App] --> B{Is Authenticated?}

B -- No --> C[Login Page / Better-Auth]
C --> D[Provider Sign-In: GitHub / Google]
D --> E[Validate Session & Cookies]

E -- Invalid/Fail --> F[Show Errors / Redirect]
E -- Valid/Success --> G[Set Auth State & Tokens]

%% 2. PUBLIC ROUTING & STRAPI DATA INGESTION
B -- Yes --> LP[Landing Page: /]
G --> LP

%% Global Components Ingestion (Always Loaded)
LP & Blog & Pricing & Dash --> GlobalService[aglobal.service.ts]
GlobalService --> |GET /api/globle| StrapiGlobal[Strapi: Global Layout Content]
StrapiGlobal --> |Hydrates| Navbar[Navbar.tsx] & Footer[Footer.tsx]

%% Dynamic Sub-Route Options
LP --> Routes{Choose Route}

%% Route A: Landing Page Block Parsing
Routes --> |Default Route: /| LandingPage[page.tsx]
LandingPage --> LandingService[landing-page.service]
LandingService --> |GET /api/landing-page| StrapiLanding[Strapi: Dynamic Components]
StrapiLanding --> |Polymorphic Render| Hero[Hero.tsx] & Features[Features.tsx] & Testimonials[Testimonials.tsx]

%% Route B: Blog Section
Routes --> |Route: /blog| Blog[blog/page.tsx: Article Archive]
Blog --> BlogService[blog.service.ts]
BlogService --> |GET /api/articles| StrapiArticles[Strapi: Article Records]
StrapiArticles --> |Render List| ArchiveGrid[Dynamic Article Grid]
ArchiveGrid --> |Click Post ID| SingleBlog["blog/[id]/page.tsx: Article View"]

%% Route C: Pricing Details
Routes --> |Route: /pricing| Pricing[pricing/page.tsx]
Pricing --> PricingService[pricing.service]
PricingService --> |GET /api/pricings| StrapiPricing[Strapi: Matrix Data]
StrapiPricing --> |Hydrate Blocks| PriceCard[PriceCard.tsx] & FAQSection[FAQSection.tsx]

%% 3. AUTHENTICATED ACCESS ONLY
Routes --> |Route: /dashboard| Dash{Auth Guard Check}
Dash --> |Unauthenticated| C
Dash --> |Authenticated| DashboardPage[dashboard/page.tsx]
DashboardPage --> DashClient["dashboard-client.tsx: Private Interactive Client Workspace"]
```
