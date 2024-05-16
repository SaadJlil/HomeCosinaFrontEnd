import Image from "next/image";
import styles from "../../../../styles/ingredientSearchHeader.module.css";
import HeaderH1 from "../../UI/HeaderH1";

export default function RecipeSearchHeader() {
  return (
     <div className={styles.container}>
        <HeaderH1 title={"Recipes"}/>
     </div>
  );
}