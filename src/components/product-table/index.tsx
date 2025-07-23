import Product from "@/types/Product";
import styles from "@/components/product-table/ProductTable.module.css"
import PresentValueIcon from "../icons/PresentValueIcon";
import MissingValueIcon from "../icons/MissingValueIcon";
interface ProductTableProps {
    products: Product[];
    showOnlyDifferences: boolean;
}

const ProductTable = ({products, showOnlyDifferences}: ProductTableProps) => {

    if (products.length === 0) return null;

    const featureKeys = Object.keys(products[0].features);

    const isDifferent = (key: string) => {
        const values = new Set(products.map((p) => p.features[key]));
        return values.size > 1;
    }

    const filteredKeys = showOnlyDifferences ? featureKeys.filter(isDifferent) : featureKeys;
    const iconKey = [
        "Частота обновления экрана",
        "NFC",
        "Поддержка ESIM",
        "Поддержка беспроводной зарядки"
    ]
    return (
        <div className={styles.tableWrapper}>
            <div className={styles.table}>
                {filteredKeys.map((featureKey) => {

                    const isIconKey = iconKey.includes(featureKey) ;
                    return (
                        <div key={featureKey} className={styles.row}>
                        <div className={styles.featureName}>
                            <p className={styles.featureNameText}>
                                {featureKey}
                            </p>
                        </div>
                        {products.map((product) => {
                            const value = product.features[featureKey];
                            return (
                                <div key={product.id} className={styles.featureValue}>  
                                <p className={styles.featureValueText}>
                                {isIconKey ? (
                                    value === "Да" ? (
                                    <PresentValueIcon />
                                    ) : (
                                    <MissingValueIcon />
                                    )
                                ) : (
                                    value
                                )}
                                </p>
                            </div>
                            )
                        })}
                    </div>
                    )
                })}
            </div>
        </div>

    )
}

export default ProductTable;