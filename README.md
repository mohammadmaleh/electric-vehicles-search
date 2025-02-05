# Electric Vehicles Search Application

A modern web application for searching and exploring electric vehicles, built with Next.js and modern web technologies.

## Tech Stack

### Core Dependencies

- **Next.js 15** (React 19) - App Router & Server Components
- **Redux Toolkit** - State management
- **Tailwind CSS 3.4** - Styling with PostCSS
- **React Hook Form + Yup** - Form management & validation
- **Swiper 11** - Touch slider component
- **Heroicons** - SVG icons

### Testing

- **Cypress 14** - Component & End-to-end testing

### Tooling

- **TypeScript 5**
- **ESLint** + **Prettier**
- **pnpm** package manager

## Getting Started

### Prerequisites

- Node.js v18+
- pnpm (`npm install -g pnpm`)
- Docker & Docker Compose (optional)

### Installation

```bash
pnpm install
```

### Running the Application

you can use docker compose to run the application

```bash
docker-compose build
docker-compose up
```

I'm not a docker expert , if docker didn't run, please run it locally.

### To run Locally

#### Dev Server

```bash
pnpm dev
```

#### Component Tests

```bash
pnpm test:component
```

#### E2E Tests

```bash
pnpm test:e2e
```

## Design Decisions

- Users can search for cars by name, model, and location.
- Users can filter cars by price range and year range.
- Users can sort cars by price and year.
- Users can view detailed information about each car.
- The backend API is built using Next.js API routes, providing endpoints for fetching the vehicle list and vehicle details by ID.
- The frontend uses RTK Query to efficiently fetch and cache API responses.
- Data is fetched via URLs with query parameters, allowing users to share search results with others.
- The application includes reusable components such as range filters, select dropdowns, search input, car cards, pagination, carousel, header, and loading indicators, designed to be agnostic and reusable across different applications.
- The project is strictly typed to improve development efficiency and minimize bugs.
- Component and E2E testing are implemented for key components, with API smoke tests to ensure reliability.
- Static variables are used for consistency and maintainability.
- Performance optimizations include lazy loading for heavy components and images, as well as useMemo and useCallback for optimizing expensive computations.
- Security is reinforced with input sanitization to prevent SQL injection and XSS attacks.
- The application features a modern, responsive design that is mobile-friendly.

## Thank you for Reviewing.
