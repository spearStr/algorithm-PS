SELECT II.INGREDIENT_TYPE, SUM(TOTAL_ORDER)
FROM FIRST_HALF FH
JOIN ICECREAM_INFO II ON II.FLAVOR = FH.FLAVOR
GROUP BY II.INGREDIENT_TYPE
    ORDER BY TOTAL_ORDER