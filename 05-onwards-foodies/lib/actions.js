'use server';

import { redirect } from "next/dist/server/api-utils";
import { saveMeal } from "./meals";

function isInvalidText(text) {
    return !text || text.trim() === "";
}

// server action : 서버에서 동작
// formData 객체를 얻을 수 있음
// export async function shareMeal(formData) {
export async function shareMeal(prevState, formData) {
    
  // input에서 name으로 설정한 키값으로 값을 가져올 수 있음
    const meal = {
        title: formData.get("title"),
        summary: formData.get("summary"),
        instructions: formData.get("instructions"),
        image: formData.get("image"),
        creator: formData.get("name"),
        creator_email: formData.get("email"),
    };

    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes("@") ||
        !meal.image ||
        meal.image.size === 0
    ) {
        return { message: "Invalid Input" };
    }

    await saveMeal(meal);
    redirect("/meals");
}
