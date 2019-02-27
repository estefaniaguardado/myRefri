DO $$ BEGIN

--
-- Data for Name: user;
--

INSERT INTO main."user" (id, email, username, pass, token) VALUES ('378e5e70-856e-421b-931d-1eef5805ea9d', 'annie@example.com', 'annie', 'hola', NULL);
insert into main."user" (id, email, username, pass, token) values ('42f4deaf-e8df-485e-83d0-aa093c1434fa', 'test@example.com', 'test', 'test', NULL);

--
-- Data for Name: category;
--

INSERT INTO main.category (id, category_name) VALUES ('88437244-fe63-4145-a0c9-a64c146cc95c', 'Food');
INSERT INTO main.category (id, category_name) VALUES ('d4fe0341-46e0-47c7-9350-2ae25239a35a', 'Beverages');
INSERT INTO main.category (id, category_name) VALUES ('ec180e06-165e-406e-b903-c4df3b2ed034', 'Household');
INSERT INTO main.category (id, category_name) VALUES ('df78cf22-c7a8-4eae-aafd-3aea81487b7b', 'Pharmacy');
INSERT INTO main.category (id, category_name) VALUES ('fb13317a-eddf-4fb9-b663-08db661f219c', 'Health');
INSERT INTO main.category (id, category_name) VALUES ('a824e22b-ef65-4855-9d21-6dfe59778be4', 'Beauty');
INSERT INTO main.category (id, category_name) VALUES ('dc234f8e-c2d6-490c-8962-10a1c515bb12', 'Outdoor');
INSERT INTO main.category (id, category_name) VALUES ('6d3ec262-d731-4453-9562-811d4e85f6ea', 'Pets');

--
-- Data for Name: product;
--

INSERT INTO main.product (id, perishable, notification_offset, category_id) VALUES ('2fb403dd-d202-4f35-8650-23771534afe0', true, 3, '88437244-fe63-4145-a0c9-a64c146cc95c');
INSERT INTO main.product (id, perishable, notification_offset, category_id) VALUES ('9ae00ca0-ea65-44db-b5a2-32a1eb3bd17d', false, 0, 'd4fe0341-46e0-47c7-9350-2ae25239a35a');
INSERT INTO main.product (id, perishable, notification_offset, category_id) VALUES ('b4c270f0-42b7-4627-b55f-005cd2a2d653', false, 0, 'df78cf22-c7a8-4eae-aafd-3aea81487b7b');


--
-- Data for Name: product_name;
--

INSERT INTO main.product_name (product_id, name) VALUES ('2fb403dd-d202-4f35-8650-23771534afe0', 'Bread');
INSERT INTO main.product_name (product_id, name) VALUES ('b4c270f0-42b7-4627-b55f-005cd2a2d653', 'Aspirin');
INSERT INTO main.product_name (product_id, name) VALUES ('9ae00ca0-ea65-44db-b5a2-32a1eb3bd17d', 'Beer');

--
-- Data for Name: product_unit;
--

INSERT INTO main.product_unit (product_id, unit) VALUES ('2fb403dd-d202-4f35-8650-23771534afe0', 'piece');
INSERT INTO main.product_unit (product_id, unit) VALUES ('2fb403dd-d202-4f35-8650-23771534afe0', 'kilogram');
INSERT INTO main.product_unit (product_id, unit) VALUES ('2fb403dd-d202-4f35-8650-23771534afe0', 'pound');
INSERT INTO main.product_unit (product_id, unit) VALUES ('2fb403dd-d202-4f35-8650-23771534afe0', 'gram');
INSERT INTO main.product_unit (product_id, unit) VALUES ('2fb403dd-d202-4f35-8650-23771534afe0', 'ounce');
INSERT INTO main.product_unit (product_id, unit) VALUES ('b4c270f0-42b7-4627-b55f-005cd2a2d653', 'piece');
INSERT INTO main.product_unit (product_id, unit) VALUES ('9ae00ca0-ea65-44db-b5a2-32a1eb3bd17d', 'piece');
INSERT INTO main.product_unit (product_id, unit) VALUES ('9ae00ca0-ea65-44db-b5a2-32a1eb3bd17d', 'quart');
INSERT INTO main.product_unit (product_id, unit) VALUES ('9ae00ca0-ea65-44db-b5a2-32a1eb3bd17d', 'gallon');
INSERT INTO main.product_unit (product_id, unit) VALUES ('9ae00ca0-ea65-44db-b5a2-32a1eb3bd17d', 'liter');
INSERT INTO main.product_unit (product_id, unit) VALUES ('9ae00ca0-ea65-44db-b5a2-32a1eb3bd17d', 'mililiter');

--
-- Data for Name: list;
--

INSERT INTO main.list (id, user_owner, list_name) VALUES ('7a696598-4d48-4279-990b-9a8cda97d4aa', '378e5e70-856e-421b-931d-1eef5805ea9d', 'Shopping List');
INSERT INTO main.list (id, user_owner, list_name) VALUES ('07a3a036-6f78-4ede-9ecb-da9dba419f90', '42f4deaf-e8df-485e-83d0-aa093c1434fa', 'Test List');

--
-- Data for Name: item;
--
INSERT INTO main.item (id, product_id, added, unit, quantity, list_id, active)
  VALUES ('aa87496c-0685-4de5-a169-4958e71e4d89', '2fb403dd-d202-4f35-8650-23771534afe0', '2018-10-01', 'kilogram', 5, '7a696598-4d48-4279-990b-9a8cda97d4aa', true);
INSERT INTO main.item (id, product_id, added, unit, quantity, list_id, active)
  VALUES ('49831250-0844-4267-8b12-fcd3b3cde642', '2fb403dd-d202-4f35-8650-23771534afe0', '2018-09-01', 'kilogram', 1, '7a696598-4d48-4279-990b-9a8cda97d4aa', true);

END$$