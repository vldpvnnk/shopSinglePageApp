import styles from "@/components/product-list/ProductList.module.css"
import ProductCountSelector from "./ProductCountSelector";

const ProductListHeader = ({ visibleCount, onChange }: { visibleCount: number; onChange: (v: number) => void }) => {
    return (
        <div className={styles.list}>
        <div className={styles.topSection}>
            <p 
                className={`${styles.smartphoneText} 
                ${styles.textWrapper}`}
            >
                Смартфоны
            </p>
            <ProductCountSelector 
                handleCountChange={onChange} 
                visibleCount={visibleCount}
            />
        </div>
    </div>
    )
}

export default ProductListHeader;