import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchProducts, replaceVisibleProduct, setVisibleCount } from "@/store/productSlice";
import styles from "@/components/product-list/ProductList.module.css"
import ProductCard from "../product-card";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import ProductTable from "../product-table";
import ProductChangeModal from "../modals/ProductChangeModal";
import ProductListHeader from "./ProductListHeader";
import Product from "@/types/Product";

const ProductList = () => {
    const dispatch = useAppDispatch();
    const {allProducts, visibleCount, visibleIds} = useSelector((state: RootState) => state.products);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [targerProductId, setTargetProductId] = useState<string | null>(null)
    const handleIconClick = (e: React.MouseEvent, productId: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTargetProductId(productId);
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

    const visibleProducts = useMemo(() => {
        const productMap = new Map(allProducts.map(p => [p.id, p]));
        return visibleIds
          .map(id => productMap.get(id))
          .filter((p): p is Product => p !== undefined); // фильтрация на случай, если какого-то id нет
      }, [allProducts, visibleIds]);


    const hiddenProducts = useMemo(()=> {
        const visibleIdSet = new Set(visibleIds);
        return allProducts.filter(p => !visibleIdSet.has(p.id))
    }, [allProducts, visibleIds])

    console.log("visibleProducts: ", visibleProducts);
    console.log("hiddenProducts: ", hiddenProducts);
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
                            <ProductCard 
                                product={item} 
                                key={item.id} 
                                handleIconClick={(e) => handleIconClick(e, item.id)}
                            />
                        ))}
                        <ProductChangeModal 
                            isOpen={isOpen} 
                            position={position}
                            modalRef={modalRef}
                            products={hiddenProducts}
                            onSelectProduct={(newProduct) => {
                                if (targerProductId){
                                    dispatch(replaceVisibleProduct({oldProductId: targerProductId, newProduct}))
                                    setIsOpen(false);
                                    setTargetProductId(null);
                                }
                            }}
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