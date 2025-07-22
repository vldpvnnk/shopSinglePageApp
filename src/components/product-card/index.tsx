import styles from "@/components/product-card/ProductCard.module.css"
import ArrowButtonIcon from "../icons/ArrowButtonIcon";
import { useEffect, useState } from "react";
import Product from "@/types/Product";

interface ProductCardProps{
    product: Product;
}

const ProductCard = ({product}: ProductCardProps) => {
    const [productItem, setProductItem] = useState<Product | null>(null)

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const res = await fetch("data/products.json");
                if (!res.ok) throw new Error("Ошибка загрузки");

                const products: Product[] = await res.json();
                const foundProduct = products.find((item) => item.id === product.id);

                if (foundProduct){
                    setProductItem(foundProduct)
                } else {
                    console.warn(`Продукт с id=${product.id} не найден`)
                }
            }
            catch (error){
                console.error("Ошибка при получении данных о продукте", error)
            }
        };
        fetchData();
    }, [product])

    if (!productItem){
        return <div>Загрузка...</div>
    }
    return (
    <>
        <div className={styles.wrapper}>
            <div className={styles.imageBox}>
                <img src={productItem.image} className={styles.image}/>
                <ArrowButtonIcon/>
            </div>
            <p className={styles.name}>{productItem.name}</p>
        </div>
    </>
    )
}

export default ProductCard;