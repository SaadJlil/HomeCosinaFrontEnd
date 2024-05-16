'use client'

import Image from "next/image";
import styles from "../../../../styles/ingredientSearchBar.module.css"
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";

import { useState, useEffect } from "react";



export default function IngredientSearchBar({handleIngredientSearchSuggestionsClose, ingName, onPositionChange, forwardRef, setIngredientSearchQuery, handleIngredientName}) {
        
    if (typeof window !== 'undefined'){
        window.addEventListener('resize', () => {
            if (forwardRef.current) {
                const { left, right, bottom } = forwardRef.current.getBoundingClientRect();
                onPositionChange({ x: left, y: bottom, width: right-left });
            }
        });
    }
    
  return (
    <div className={styles.container} >
        <div className={styles.bar} ref={forwardRef}>
            <img src="searchIcon.png" />
            <input 
                id="ingredientsearchbarinput"
                onChange={(evt) => setIngredientSearchQuery(evt.currentTarget.value)} 
                type="text" 
                placeholder="Search for Ingredients..." 
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        const inputString = event.currentTarget.value;
                        if(inputString.length > 0){
                            if(inputString === ingName){
                                handleIngredientName((inputString === inputString.toLowerCase()) ? inputString.toUpperCase() : inputString.toLowerCase());
                            }else{
                                handleIngredientName(inputString);
                            }
                        }
                        handleIngredientSearchSuggestionsClose();
                    }
                }}
            />
        </div>
    </div>
  );
}