import styles from "@/components/product-list/ProductList.module.css"
import { SetStateAction } from "react";
interface ShowDifferencesToogleProps{
    showOnlyDifferences: boolean;
    setShowOnlyDifferences: (value: SetStateAction<boolean>) => void
}
const ShowDifferencesToogle = ({setShowOnlyDifferences, showOnlyDifferences}: ShowDifferencesToogleProps) => {
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

export default ShowDifferencesToogle;