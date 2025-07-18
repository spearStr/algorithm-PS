SELECT PRODUCT.PRODUCT_CODE, SUM(SALES_AMOUNT) * PRODUCT.PRICE AS SALES
FROM PRODUCT
JOIN OFFLINE_SALE AS OS ON PRODUCT.PRODUCT_ID = OS.PRODUCT_ID
GROUP BY PRODUCT.PRODUCT_CODE
    ORDER BY SUM(SALES_AMOUNT) * PRODUCT.PRICE DESC, PRODUCT.PRODUCT_CODE