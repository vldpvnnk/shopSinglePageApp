import styles from "@/components/product-list/ProductList.module.css"
import { SetStateAction } from "react";
interface ShowDifferencesToggleProps{
    showOnlyDifferences: boolean;
    setShowOnlyDifferences: (value: SetStateAction<boolean>) => void
}
const ShowDifferencesToggle = ({setShowOnlyDifferences, showOnlyDifferences}: ShowDifferencesToggleProps) => {
    return (
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
    )
}

export default ShowDifferencesToggle;