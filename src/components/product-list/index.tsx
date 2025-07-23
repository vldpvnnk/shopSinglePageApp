import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchProducts, setVisibleCount } from "@/store/productSlice";
import styles from "@/components/product-list/ProductList.module.css"
import ProductCard from "../product-card";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import ProductTable from "../product-table";
import ProductChangeModal from "../modals/ProductChangeModal";
import ProductCountSelector from "./ProductCountSelector";
import ProductListHeader from "./ProductListHeader";

const ProductList = () => {
    const dispatch = useAppDispatch();
    const {allProducts, visibleCount} = useSelector((state: RootState) => state.products);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const handleIconClick = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
        setIsOpen(true);
    };
      
    const handleCountChange = (count: number) => {
        dispatch(setVisibleCount(count))
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (!modalRef.current?.contains(e.target as Node)) {
            setIsOpen(false);
          }
        };
      
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const visibleProducts = allProducts.slice(0, visibleCount);

    return (
        <>
            <ProductListHeader onChange={handleCountChange} visibleCount={visibleCount}/>
            <div className={styles.outerWrapper}>
                <div className={styles.showDiffsWrapper}>
                    <div className={styles.showDiffsItems}>
                        <input 
                            type="checkbox" 
                            className={styles.checkboxDifs}
                            checked={showOnlyDifferences}
                            onChange={(e) => setShowOnlyDifferences(e.target.checked)}
                        />
                        <p className={styles.productNumbers}>Показать отличия</p>
                    </div>
                </div>
                <div className={styles.centeredBlock}>
                    <div className={styles.displayedPhones}>
                        {visibleProducts.map((item) => (
                            <ProductCard product={item} key={item.id} handleIconClick={handleIconClick}/>
                        ))}
                        <ProductChangeModal 
                            isOpen={isOpen} 
                            position={position}
                            modalRef={modalRef}
                        />
                    </div>
                </div>
            </div>
            <ProductTable 
                products={visibleProducts}
                showOnlyDifferences={showOnlyDifferences}
            />
        </>

    )
}

export default ProductList;