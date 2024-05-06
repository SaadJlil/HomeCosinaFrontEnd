'use client'

import Image from "next/image";
import styles from "../../../../styles/ingredientSearchBar.module.css"
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";

import { useState, useEffect } from "react";



export default function IngredientSearchBar({onPositionChange, forwardRef, setIngredientSearchQuery}) {


    


    if (typeof window !== 'undefined'){
        window.addEventListener('resize', () => {
            if (forwardRef.current) {
                const { left, right, bottom } = searchBarRef.current.getBoundingClientRect();
                onPositionChange({ x: left, y: bottom, width: right-left });
            }
        });
    }
    
  return (
    <div className={styles.container} >
        <div className={styles.bar} ref={forwardRef}>
            <img src="searchIcon.png" />
            <input onChange={(evt) => setIngredientSearchQuery(evt.currentTarget.value)} type="text" placeholder="Search for Ingredients..."></input>
        </div>
    </div>
  );
}