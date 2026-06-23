create index if not exists idx_products_category
on products(category);

create index if not exists idx_products_created_id
on products(created_at desc, id desc);

create index if not exists idx_products_updated_at
on products(updated_at desc);