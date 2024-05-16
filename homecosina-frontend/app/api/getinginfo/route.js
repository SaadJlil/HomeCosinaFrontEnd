import { NextRequest, NextResponse } from "next/server";


export async function POST(request) {
    try{

        const req = await request.json();

        const data = await fetch('https://homecosina.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            query: `
                query recipeQuery($ingredient_name: ID!){
                    GetIngredientById(ingredient_name: $ingredient_name){
                        ingredient_name,
                        ing_imageurl,
                        calories,
                        total_fat,
                        sat_fat,
                        protein,
                        sodium,
                        potassium,
                        cholesterol,
                        carbohydrates,
                        fiber,
                        sugar,
                        category
                    }
                }
            `,
            variables: {
                ingredient_name: req.IngredientName.toLowerCase()
            },
            })
        });

        return NextResponse.json({ ingInfo: {...(await data.json()).data.GetIngredientById} }, { status: data.status});

    }
    catch(error){
        return NextResponse.json({status: 'error', error: 'An error has occured'}, {status: 500});
    }
}
