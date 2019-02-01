DO $$ BEGIN

--
-- Data for Name: user;
--

INSERT INTO main."user" (id, username, pass, token) VALUES ('378e5e70-856e-421b-931d-1eef5805ea9d', 'annie', 'hola', NULL);
insert into main."user" (id, username, pass, token) values ('42f4deaf-e8df-485e-83d0-aa093c1434fa', 'test', 'test', NULL);

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
-- Data for Name: list;
--

INSERT INTO main.list (id, user_owner, list_name) VALUES ('7a696598-4d48-4279-990b-9a8cda97d4aa', '378e5e70-856e-421b-931d-1eef5805ea9d', 'Shopping List');
INSERT INTO main.list (id, user_owner, list_name) VALUES ('07a3a036-6f78-4ede-9ecb-da9dba419f90', '42f4deaf-e8df-485e-83d0-aa093c1434fa', 'Test List');

--
-- Data for Name: user_list;
--
INSERT INTO main.user_list (list_id, user_id) VALUES ('7a696598-4d48-4279-990b-9a8cda97d4aa', '378e5e70-856e-421b-931d-1eef5805ea9d');
insert into main.user_list (list_id, user_id) values ('07a3a036-6f78-4ede-9ecb-da9dba419f90', '42f4deaf-e8df-485e-83d0-aa093c1434fa');

END$$
