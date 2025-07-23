import styles from "@/components/modals/ProductChangeModal.module.css"
import { RefObject } from "react";
interface ProductChangleModalProps{
    isOpen: boolean;
    position: {
        top: number;
        left: number;
    }
    modalRef: RefObject<HTMLDivElement | null>;
}
const ProductChangeModal = ({isOpen, position, modalRef}: ProductChangleModalProps) => {
    return (
        <>
            {isOpen && (
                <div
                    ref={modalRef}
                    className={styles.modal}
                    style={{
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    position: "absolute",
                    width: "300px",
                    maxHeight: "400px",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    overflowY: "auto",
                    zIndex: 1000,
                    }}
                >
                    <input type="text" placeholder="Поиск..." className={styles.modalSearch} />
                    <div>Контент модалки</div>
                </div>
            )}
        </>
    )
}

export default ProductChangeModal;