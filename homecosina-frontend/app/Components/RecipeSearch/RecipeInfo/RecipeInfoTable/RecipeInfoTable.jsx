import styles from "../../../../../styles/recipeInfoTable.module.css";

export default function RecipeInfoTable({recipeInfo}) {

    const mainKeys = [
        {presString: "Calories", k: "r_calories", unit: "kcal"},
        {presString: "Protein", k: "r_protein", unit: "g"},
        {presString: "Carbs", k: "r_carbohydrates", unit: "g"},
        {presString: "Sugar", k: "r_sugar", unit: "g"},
        {presString: "Total Fats", k: "r_total_fat", unit: "g"},
        {presString: "Saturated Fats", k: "r_sat_fat", unit: "g"},
        {presString: "Cholesterol", k: "r_cholesterol", unit: "mg"},
        {presString: "Fibers", k: "r_fiber", unit: "mg"},
        {presString: "Sodium", k: "r_sodium", unit: "mg"},
        {presString: "Potassium", k: "r_potassium", unit: "mg"},
    ]
    

    return (
        <div className={styles.container}>
            <table>
                <tbody>
                    {
                        mainKeys.map((value, index) => 
                            <tr key={index}>
                                <td>{value.presString}</td>
                                <td>{`${recipeInfo[value.k]} ${value.unit}`}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

