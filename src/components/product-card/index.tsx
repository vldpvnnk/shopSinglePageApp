import styles from "@/components/product-card/ProductCard.module.css"
import ArrowButtonIcon from "../icons/ArrowButtonIcon";
import { useEffect, useState } from "react";
import Product from "@/types/Product";
import Image from "next/image";

interface ProductCardProps{
    product: Product;
    handleIconClick: (e: React.MouseEvent) => void;
    hiddenProductsLength: number;
}

const ProductCard = ({product, handleIconClick, hiddenProductsLength}: ProductCardProps) => {
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
                <Image src={productItem.image} className={styles.image} alt=""/>
                <div onClick={handleIconClick}>
                    {hiddenProductsLength > 1 && <ArrowButtonIcon/> }
                </div>
            </div>
            <p className={styles.name}>{productItem.name}</p>
        </div>
    </>
    )
}

export default ProductCard;