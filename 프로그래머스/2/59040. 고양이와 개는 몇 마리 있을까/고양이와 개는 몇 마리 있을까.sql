SELECT ANIMAL_TYPE, COUNT(*) as count
FROM ANIMAL_INS
WHERE ANIMAL_TYPE = "Cat" OR ANIMAL_TYPE = "Dog"
GROUP BY ANIMAL_TYPE
    ORDER BY ANIMAL_TYPE