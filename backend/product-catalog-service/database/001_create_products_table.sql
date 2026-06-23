create extension if not exists pgcrypto;

create table if not exists products (
    id uuid primary key default gen_random_uuid(),

    product_code text not null unique,

    name text not null,

    category text not null,

    price numeric(10,2) not null,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);

alter table products enable row level security;