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
import ShowDifferencesToogle from "./ShowDifferencesToggle";

const ProductList = () => {
    const dispatch = useAppDispatch();
    const {allProducts, visibleCount, visibleIds} = useSelector((state: RootState) => state.products);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [targerProductId, setTargetProductId] = useState<string | null>(null)
    const MODAL_WIDTH = 421;

    const handleIconClick = (e: React.MouseEvent, productId: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
    
        let left = rect.left + scrollX;
        const top = rect.bottom + scrollY;
    
        const rightEdge = left + MODAL_WIDTH;
        const viewportWidth = window.innerWidth;
    
        if (rightEdge > viewportWidth) {
            left = viewportWidth - MODAL_WIDTH - 20;
        }
    
        setTargetProductId(productId);
        setPosition({ top, left });
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
          .filter((p): p is Product => p !== undefined);
      }, [allProducts, visibleIds]);


    const hiddenProducts = useMemo(()=> {
        const visibleIdSet = new Set(visibleIds);
        return allProducts.filter(p => !visibleIdSet.has(p.id))
    }, [allProducts, visibleIds])
    

    return (
        <>
            <ProductListHeader onChange={handleCountChange} visibleCount={visibleCount}/>
            <div className={styles.outerWrapper}>
                <ShowDifferencesToogle 
                    setShowOnlyDifferences={setShowOnlyDifferences} 
                    showOnlyDifferences={showOnlyDifferences}
                />
                <div className={styles.centeredBlock}>
                    <div className={styles.displayedPhones}>
                        {visibleProducts.map((item) => (
                            <ProductCard 
                                product={item} 
                                key={item.id} 
                                handleIconClick={(e) => handleIconClick(e, item.id)}
                                hiddenProductsLength={hiddenProducts.length}
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