'use client'

import Image from "next/image";
import styles from "../../../../styles/recipeSearchBar.module.css"
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";

import { useState, useEffect } from "react";



export default function RecipeSearchBar({handleCloseSuggestions, recName, onPositionChange, searchRef, forwardRef, setRecipeSearchQuery, handleRecipeName}) {
        
    if (typeof window !== 'undefined'){
        window.addEventListener('resize', () => {
            if (forwardRef.current) {
                const { left, right, bottom } = forwardRef.current.getBoundingClientRect();
                const { left: Sleft } = searchRef.current.getBoundingClientRect();

                onPositionChange({ x: left-Sleft, y: bottom, width: right-left });
            }
        });
    }
    
  return (
    <div className={styles.container} >
        <div className={styles.bar} ref={forwardRef}>
            <input 
                id="recipesearchbarinput"
                onChange={(evt) => setRecipeSearchQuery(evt.currentTarget.value)} 
                type="text" 
                placeholder="Search for Recipe..." 
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        const inputString = event.currentTarget.value;
                        if(inputString === recName){
                            handleRecipeName((inputString === inputString.toLowerCase()) ? inputString.toUpperCase() : inputString.toLowerCase());
                        }else{
                            handleRecipeName(inputString);
                        }
                        handleCloseSuggestions();
                    }
                }}
            />
        </div>
        <button onClick={() => 
                {

                    const inputString = document.getElementById("recipesearchbarinput").value;

                    if(inputString === recName){
                        handleRecipeName((inputString === inputString.toLowerCase()) ? inputString.toUpperCase() : inputString.toLowerCase());
                    }else{
                        handleRecipeName(inputString);
                    }
                }
            }

            className={styles.searchButton}>
            <img src="searchIcon.png" />
        </button>
    </div>
  );
}