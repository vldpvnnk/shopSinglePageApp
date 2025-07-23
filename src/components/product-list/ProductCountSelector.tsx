import styles from "@/components/product-list/ProductList.module.css"

interface ProductCountSelectorProps {
    handleCountChange: (count: number) => void;
    visibleCount: number
}
const ProductCountSelector = ({handleCountChange, visibleCount}: ProductCountSelectorProps) => {
    return (                    
    <div 
        className={`${styles.productNumbers} 
        ${styles.textWrapper} ${styles.displayedPhonesNumbers}`}
    >
        Отобразить товары:{' '}
        {[2,3,4,5,6].map((item) => (
            <p
                key={item}
                onClick={() => handleCountChange(item)}
                className={`${styles.productNumbers} 
                ${styles.textWrapper}` }
                style={{cursor: "pointer", 
                    borderBottom: visibleCount === item ? "2px solid blue": ""
                }}
            >
                {item}
            </p>
        ))}
    </div>)
}

export default ProductCountSelector;