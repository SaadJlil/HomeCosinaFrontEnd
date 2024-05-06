import Image from "next/image";
import styles from "../../../../styles/ingredientSearchHeader.module.css";
import IngredientSearchBar from "../IngredientSearchBar/IngredientSearchBar";
import HeaderH1 from "../../UI/HeaderH1";

export default function IngredientSearchHeader() {
  return (
     <div className={styles.container}>
        <HeaderH1 title={"Ingredients"}/>
     </div>
  );
}