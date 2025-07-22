import Product from "./Product";

export default interface ComparisonState {
    allProducts: Product[];
    displayedIds: string[];
    maxDisplayCount: number; 
    showDifferencesOnly: boolean;
}