import styles from "@/components/modals/ProductChangeModal.module.css"
import Product from "@/types/Product";
import { RefObject } from "react";
import ChangeProductIcon from "../icons/ChangeProductIcon";
interface ProductChangleModalProps{
    isOpen: boolean;
    position: {
        top: number;
        left: number;
    }
    modalRef: RefObject<HTMLDivElement | null>;
    products: Product[];
    onSelectProduct: (product: Product) => void;
}
const ProductChangeModal = ({isOpen, position, modalRef, products, onSelectProduct}: ProductChangleModalProps) => {
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
                    <input 
                        type="text" 
                        placeholder="Поиск" 
                        className={styles.modalSearch}
                    />
                    <div className={styles.productItemsWrapper}>
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className={styles.productItem}
                            >
                                <div 
                                    style={{cursor: "pointer"}} 
                                    onClick={() => onSelectProduct(product)}
                                >
                                    <ChangeProductIcon/>
                                </div>
                                <img src={product.image} className={styles.image}/>
                                <p className={styles.productText}>{product.name}</p>
                            </div>
                        ))}
                    </div> 
                </div>
            )}
        </>
    )
}

export default ProductChangeModal;