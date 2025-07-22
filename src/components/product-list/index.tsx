import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { fetchProducts, setVisibleCount } from "@/store/productSlice";
import styles from "@/components/product-list/ProductList.module.css"
import ProductCard from "../product-card";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";

const ProductList = () => {
    const dispatch = useAppDispatch();
    const {allProducts, visibleCount} = useSelector((state: RootState) => state.products)

    const handleCountChange = (count: number) => {
        dispatch(setVisibleCount(count))
    }
    useEffect(() => {
        dispatch(fetchProducts());
      }, [dispatch]);

    const visibleProducts = allProducts.slice(0, visibleCount);
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
                    </div>
                </div>
            </div>
            <div className={styles.displayedPhones}>
                {visibleProducts.map((item) => (
                    <ProductCard product={item} key={item.id}/>
                ))}
            </div>
            <div className={styles.tableWrapper}>
                <div className={styles.table}></div>
            </div>
        </>

    )
}

export default ProductList;