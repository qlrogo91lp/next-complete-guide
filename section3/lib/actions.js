"use server";

import { redirect } from "next/dist/server/api-utils";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
    return !text || text.trim() === "";
}

// server action : 서버에서 동작
// formData 객체를 얻을 수 있음
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
        return {
            message: "Invalid input.",
        };
    }

    await saveMeal(meal);
    // 해당 경로 페이지의 캐시를 제거 (실제 빌드했을때 새로 추가한 meal이 보이지 않기 때문)
    revalidatePath('/meals');
    redirect("/meals");
}
