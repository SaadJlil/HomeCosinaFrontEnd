'use client'

import Image from "next/image";
import styles from "../../styles/main.module.css";
import IngredientSearch from "../Components/IngredientSearch/IngredientSearch";
import IngredientInfo from "../Components/IngredientInfo/IngredientInfo";
import RecipeSearch from "../Components/RecipeSearch/RecipeSearch"; 
import RecipeInfo from "../Components/RecipeSearch/RecipeInfo/RecipeInfo";

import { useState, useEffect } from "react";


export default function Main() {

  const [MyIngredients, setMyIngredients] = useState([]);
  const [IngredientName, setIngredientName] = useState("");
  const [IngredientInfoOpen, setIngredientInfoOpen] = useState(false);
  const [IngInfo, setIngInfo] = useState({});

  const [RecipeId, setRecipeId] = useState("");
  const [recInfo, setRecInfo] = useState({});
  const [RecipeInfoOpen, setRecipeInfoOpen] = useState(false);


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

  const RecipeInfoOpen_handler = () => {
    setRecipeInfoOpen(true);
  }

  const RecipeInfoClose_handler = () => {
    setRecipeInfoOpen(false);
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
  
  useEffect(() => {

            async function asyncFetch() {

                if(RecipeId.length > 0){
                    const recInfo = (await getRecInfo(RecipeId)).recInfo;

                    if (typeof(recInfo) !== "undefined") {
                        setRecInfo(recInfo)
                    }
                }

            }

            asyncFetch();

        }
  , [RecipeId]);



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
      <RecipeSearch 
        recipeInfoOpenHandler={RecipeInfoOpen_handler} 
        recipeIdHandler={setRecipeId}
        MyIngredients={MyIngredients}
      />
      <RecipeInfo 
        recipeInfoOpen={RecipeInfoOpen}
        recInfo={recInfo}
        RecipeInfoClose_handler={RecipeInfoClose_handler}
      />

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


async function getRecInfo(recId)
{
    try{
        const res = await fetch(
            'http://localhost:3000/api/getrecinfo',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({recipeId: recId})
            }
        )

        return await res.json();
        
    }
    catch(error){
        console.error('Failed to fetch:', error);
    }
}
