'use client'

import Image from "next/image";
import styles from "../../styles/main.module.css";
import IngredientSearch from "../Components/IngredientSearch/IngredientSearch";
import IngredientInfo from "../Components/IngredientInfo/IngredientInfo";
import RecipeSearch from "../Components/RecipeSearch/RecipeSearch"; 

import { useState, useEffect } from "react";


export default function Main() {

  const [MyIngredients, setMyIngredients] = useState([]);
  const [IngredientName, setIngredientName] = useState("");
  const [IngredientInfoOpen, setIngredientInfoOpen] = useState(false);
  const [IngInfo, setIngInfo] = useState({});


  useEffect(() => {
    console.log(MyIngredients);
  }, [MyIngredients]);

  const AddIngredient = (myIng) => {
    if(Object.keys(myIng).length > 0 && !MyIngredients.some(obj => obj.ingredient_name === myIng.ingredient_name)){
      setMyIngredients([...MyIngredients, myIng]);
    }
  }

  const DeleteIngredient = (myIng) => {
    if(typeof(myIng) === "string" && myIng.length > 0){
      const updatedIngredients = MyIngredients.filter(obj => obj.ingredient_name !== myIng);
      setMyIngredients(updatedIngredients);
    }
    else if (Object.keys(myIng).length > 0 && MyIngredients.some(obj => obj.ingredient_name === myIng.ingredient_name)) {
      const updatedIngredients = MyIngredients.filter(obj => obj.ingredient_name !== myIng.ingredient_name);
      setMyIngredients(updatedIngredients);
    }
  }




  const IngredientInfoOpen_handler = () => {
    setIngredientInfoOpen(true);
  }

  const IngredientInfoClose_handler = () => {
    setIngredientInfoOpen(false);
  }


  useEffect(() => {

            async function asyncFetch() {

                if(IngredientName.length > 0){
                  if(IngredientName[0] === "+"){
                    const ingInfo = (await getIngInfo(IngredientName.slice(1))).ingInfo;

                    if (typeof(ingInfo) !== "undefined") {
                        AddIngredient(ingInfo)
                    }
                  }else{
                    const ingInfo = (await getIngInfo(IngredientName)).ingInfo;

                    if (typeof(ingInfo) !== "undefined") {
                        setIngInfo(ingInfo);
                        IngredientInfoOpen_handler();
                    }
                  }
                }

            }

            asyncFetch();

        }
  , [IngredientName]);

  return (
    <div id="mainwindow" className={styles.container}>
      <IngredientSearch 
        IngList={MyIngredients} 
        ingName={IngredientName} 
        handleIngredientName={setIngredientName}
        DeleteIngredient={DeleteIngredient}
        MyIngredients={MyIngredients} 
      />
      <IngredientInfo 
        DeleteIngredient={DeleteIngredient}
        MyIngredients={MyIngredients} 
        AddIngredient={AddIngredient} 
        IngInfo={IngInfo} 
        IngredientInfoClose_handler={IngredientInfoClose_handler} 
        ingredientInfoOpen={IngredientInfoOpen}
      />
      <RecipeSearch/>
    </div>
  );

}



async function getIngInfo(IngName)
{
    try{
        const res = await fetch(
            'http://localhost:3000/api/getinginfo',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({IngredientName: IngName})
            }
        )

        return await res.json();
        
    }
    catch(error){
        console.error('Failed to fetch:', error);
    }
 
}