
-- update one record

UPDATE members SET name = 'hasini' WHERE member_id = 1;

-- update multiple records

UPDATE members SET name = 'Gota', address = 'Galle Road' -- use comma to separate multiple columns
WHERE member_id = 3;