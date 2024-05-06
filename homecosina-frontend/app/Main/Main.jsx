import Image from "next/image";
import styles from "../../styles/main.module.css";
import IngredientSearch from "../Components/IngredientSearch/IngredientSearch";

export default function Main() {
  return (
    <div className={styles.container}>
      <IngredientSearch/>
    </div>
    
  );
}
