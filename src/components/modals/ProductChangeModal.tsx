import styles from "@/components/modals/ProductChangeModal.module.css"
import Product from "@/types/Product";
import { RefObject, useMemo, useState } from "react";
import ChangeProductIcon from "../icons/ChangeProductIcon";
interface ProductChangeModalProps{
    isOpen: boolean;
    position: {
        top: number;
        left: number;
    }
    modalRef: RefObject<HTMLDivElement | null>;
    products: Product[];
    onSelectProduct: (product: Product) => void;
}
const ProductChangeModal = ({isOpen, position, modalRef, products, onSelectProduct}: ProductChangeModalProps) => {

    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [products, searchQuery]);
    
    return (
        <>
            {isOpen && (
                <div
                    ref={modalRef}
                    className={styles.modal}
                    style={{
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                    }}
                >
                    {products.length > 3 && <input 
                        type="text" 
                        placeholder="Поиск" 
                        className={styles.modalSearch}
                        onChange={(e)=> setSearchQuery(e.target.value)}
                    />}
                    <div className={styles.productItemsWrapper}>
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className={styles.productItem}
                                onClick={() => onSelectProduct(product)}
                                style={{cursor: "pointer"}}
                            >
                                <ChangeProductIcon/>
                                <img src={product.image} className={styles.image}/>
                                <p className={styles.productText}>{product.name}</p>
                            </div>
                        ))}
                        {filteredProducts.length === 0 && (
                            <p className={styles.productText}>Нет совпадений</p>
                        )}
                    </div> 
                </div>
            )}
        </>
    )
}

export default ProductChangeModal;