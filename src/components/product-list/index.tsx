import styles from "@/components/product-list/ProductList.module.css"

const ProductList = () => {
    return (
        <>
            <div className={styles.list}>
                <div className={styles.topSection}>
                    <p 
                        className={`${styles.smartphoneText} 
                        ${styles.textWrapper}`}
                    >
                        Смартфоны
                    </p>
                    <p 
                        className={`${styles.productNumbers} 
                        ${styles.textWrapper}`}
                    >
                        Отобразить товары: 2 3 4 5 6 
                    </p>
                </div>
            </div>
            <div className={styles.displayedPhones}>
                <p>Показать различия</p>

            </div>
        </>

    )
}

export default ProductList;