import { NextRequest, NextResponse } from "next/server";


export async function POST(request) {
    try{

        const req = await request.json();

        const data = await fetch('https://homecosina.com/graphql', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            query: `
            query recipeQuery($recipe_id: ID!){
                GetRecipeById(recipe_id: $recipe_id){
            
            
                    
                    presentedstring
                    ingredient_name,
            
                    userid,
            
            
                    r_calories,
                    r_total_fat,
                    r_sat_fat,
                    r_protein,
                    r_sodium,
                    r_potassium,
                    r_cholesterol,
                    r_carbohydrates,
                    r_fiber,
                    r_sugar,
            
            
                    recipe_id,
                    steps,
                    title,
                    link,
                    cookingtime_min,
                    recipe_imgurl
                }
            }
            `,
            variables: {
                recipe_id: req.recipeId
            },
            })
        });

        return NextResponse.json({ recInfo: {...(await data.json()).data.GetRecipeById} }, { status: data.status});

    }
    catch(error){
        return NextResponse.json({status: 'error', error: 'An error has occured'}, {status: 500});
    }
}
