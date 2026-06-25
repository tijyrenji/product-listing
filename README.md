# Product Listing Application

A full-stack monorepo containing a React frontend and Node.js backend for browsing products with filtering and cursor-based pagination.

## Project Structure

```text
/
├── frontend/   # React + Vite application
├── backend/    # Node.js + Express API
└── README.md
```

## Features

* Product listing with pagination
* Category-based filtering
* Cursor-based API pagination
* Responsive React UI
* RESTful Node.js API
* PostgreSQL-backed product data
* Efficient data fetching with TanStack Query

## Getting Started

Each application has its own setup instructions:

* See `frontend/README.md` for frontend setup and development.
* See `backend/README.md` for backend setup, environment variables, and database configuration.

## Tech Stack

### Frontend

* React
* Vite
* TanStack Query
* Axios

### Backend

* Node.js
* Express
* Supabase

## Notes

The frontend consumes the backend REST API to display products and supports filtering and cursor-based pagination for scalable data retrieval.
