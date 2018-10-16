DO $$ BEGIN

CREATE SCHEMA IF NOT EXISTS "main";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE main.UNIT AS ENUM ('piece', 'kilogram', 'gram', 'pound', 'ounce', 'liter', 'mililiter', 'quart', 'gallon');

CREATE TABLE IF NOT EXISTS "main"."category" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  category_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "main"."product" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  perishable BOOLEAN NOT NULL,
  notification_offset INT,
  category_id UUID REFERENCES main.category (id) NOT NULL
);

CREATE TABLE IF NOT EXISTS "main"."product_name" (
  product_id UUID REFERENCES main.product (id) NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "main"."product_unit" (
  product_id UUID REFERENCES main.product (id) NOT NULL,
  unit main.UNIT NOT NULL
);

CREATE TABLE IF NOT EXISTS "main"."user" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  username TEXT NOT NULL,
  pass TEXT NOT NULL ,
  token TEXT
);

CREATE TABLE IF NOT EXISTS "main"."list" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  user_owner UUID REFERENCES main.user (id) NOT NULL,
  list_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "main"."user_list" (
  list_id UUID REFERENCES main.list (id) NOT NULL,
  user_id UUID REFERENCES main.user (id) NOT NULL
);

CREATE TABLE IF NOT EXISTS "main"."item" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  product_id UUID REFERENCES main.product (id) NOT NULL,
  added DATE NOT NULL,
  unit main.UNIT NOT NULL,
  quantity INT NOT NULL,
  list_id UUID REFERENCES main.list (id) NOT NULL,
  active BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS "main"."notification" (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4() NOT NULL,
  item_id UUID REFERENCES main.item (id) NOT NULL,
  notification_date DATE NOT NULL
);

CREATE TABLE "main"."session" (
  sid VARCHAR NOT NULL COLLATE "default",
	sess JSON NOT NULL,
	expire TIMESTAMP(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "main"."session" ADD CONSTRAINT "session_pkey" PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;

END$$