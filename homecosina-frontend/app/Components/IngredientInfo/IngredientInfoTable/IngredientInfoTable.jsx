import styles from "../../../../styles/ingredientInfoTable.module.css";

export default function IngredientInfoTable({IngredientInfo}) {

    const mainKeys = [
        {presString: "Calories", k: "calories", unit: "kcal"},
        {presString: "Protein", k: "protein", unit: "g"},
        {presString: "Carbs", k: "carbohydrates", unit: "g"},
        {presString: "Sugar", k: "sugar", unit: "g"},
        {presString: "Total Fats", k: "total_fat", unit: "g"},
        {presString: "Saturated Fats", k: "sat_fat", unit: "g"},
        {presString: "Cholesterol", k: "cholesterol", unit: "mg"},
        {presString: "Fibers", k: "fiber", unit: "mg"},
        {presString: "Sodium", k: "sodium", unit: "mg"},
        {presString: "Potassium", k: "potassium", unit: "mg"},
    ]
    

    return (
        <div className={styles.container}>
            <table>
                <tbody>
                    {
                        mainKeys.map((value, index) => 
                            <tr key={index}>
                                <td>{value.presString}</td>
                                <td>{`${IngredientInfo[value.k].toFixed(1)} ${value.unit}`}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

