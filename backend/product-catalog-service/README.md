# Product Catalog Service

A scalable Node.js + Supabase backend service for browsing a large product catalog (200,000+ products) with cursor-based pagination, category filtering, and bulk data import capabilities.

## Problem Statement

Build an API capable of browsing a large product catalog while ensuring:

- Fast pagination
- Category-based filtering
- No duplicate product visibility
- No missing records during concurrent inserts/updates
- Efficient handling of large datasets (200K+ products)

## Tech Stack

- Node.js
- Express.js
- Supabase (PostgreSQL)
- ES Modules
- Faker.js
- CSV Import/Export

---

## Architecture

```text
Client
   │
   ▼
Express Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
Supabase
```

### Layer Responsibilities

| Layer        | Responsibility                 |
| ------------ | ------------------------------ |
| Routes       | API endpoint definitions       |
| Controllers  | HTTP request/response handling |
| Services     | Business logic                 |
| Repositories | Database access                |
| Supabase     | Data persistence               |

---

## Project Structure

```text
product-catalog-service/

├── database/
│   ├── 001_create_products_table.sql
│   └── 002_create_indexes.sql
│
├── sample-data/
│   └── products.csv
│
├── src/
│
│   ├── config/
│   │   └── supabase.js
│
│   ├── controllers/
│   │   └── product.controller.js
│
│   ├── services/
│   │   └── product.service.js
│
│   ├── repositories/
│   │   └── product.repository.js
│
│   ├── routes/
│   │   └── product.routes.js
│
│   ├── scripts/
│   │   ├── generate-csv.js
│   │   └── import-csv.js
│
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## Database Schema

### Products Table

```sql
create table products (
    id uuid primary key default gen_random_uuid(),

    product_code text unique not null,

    name text not null,

    category text not null,

    price numeric(10,2) not null,

    created_at timestamptz not null,

    updated_at timestamptz not null
);
```

---

## Indexing Strategy

```sql
create index idx_products_category
on products(category);

create index idx_products_created_id
on products(created_at desc, id desc);

create index idx_products_updated_at
on products(updated_at desc);
```

### Why These Indexes?

- Category filtering
- Cursor pagination
- Efficient update tracking

---

## Pagination Strategy

### Cursor-Based Pagination

Used instead of offset pagination.

### Why Not Offset Pagination?

Problems with offset pagination:

- Duplicate records can appear
- Records may be skipped during inserts/updates
- Slower for large datasets

### Cursor Pagination Benefits

- Stable ordering
- Consistent browsing experience
- Scales to large datasets
- Avoids duplicate visibility
- Avoids missing records

Ordering:

```sql
order by created_at desc, id desc
```

Cursor:

```json
{
  "created_at": "2026-06-23T10:00:00Z",
  "id": "uuid"
}
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=3000

SUPABASE_URL=https://your-project.supabase.co

SUPABASE_ANON_KEY=your-anon-key

SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## Installation

Install dependencies:

```bash
npm install
```

---

## Database Setup

Run SQL scripts in Supabase SQL Editor.

### Step 1

```sql
database/001_create_products_table.sql
```

### Step 2

```sql
database/002_create_indexes.sql
```

---

## Generate Sample Data

Generate 200,000 fake products.

```bash
npm run seed:csv
```

Output:

```text
sample-data/products.csv
```

Fields:

- product_code
- name
- category
- price
- created_at
- updated_at

---

## Import Data

Import CSV into Supabase.

```bash
npm run seed:import
```

Features:

- Stream-based processing
- Batch imports
- Memory efficient
- Upsert support
- Duplicate prevention

---

## Running Locally

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server:

```text
http://localhost:3000
```

---

## API Endpoints

### Health Check

```http
GET /health
```

Response:

```json
{
  "success": true,
  "status": "UP"
}
```

---

### Browse Products

```http
GET /api/products
```

Query Parameters:

| Parameter       | Description        |
| --------------- | ------------------ |
| category        | Filter by category |
| limit           | Records per page   |
| cursorCreatedAt | Pagination cursor  |
| cursorId        | Pagination cursor  |

Example:

```http
GET /api/products?category=Electronics&limit=20
```

Response:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "limit": 20,
    "nextCursor": {
      "created_at": "2026-06-23T10:00:00Z",
      "id": "uuid"
    }
  }
}
```

---

### Get Product By ID

```http
GET /api/products/:id
```

Example:

```http
GET /api/products/550e8400-e29b-41d4-a716-446655440000
```

---

## Data Consistency

### Duplicate Prevention

```sql
product_code UNIQUE
```

Ensures a product cannot be inserted multiple times.

### Upsert Support

Imports use:

```sql
ON CONFLICT(product_code)
```

to update existing records.

### Stable Sorting

```sql
order by created_at desc, id desc
```

Prevents inconsistent pagination ordering.

---

## Scalability Considerations

Current dataset:

```text
200,000+ products
```

## Assumptions

- Product code uniquely identifies a product.
- Data access occurs through the backend API.
- Supabase is the source of truth.
- Cursor pagination is preferred over offset pagination.

---

## Author

Tijy Thomas – Product Catalog Service|Assessment Project
