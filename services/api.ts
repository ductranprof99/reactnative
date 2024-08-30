import { CategoryModel } from "@/models/CategoryModel";
import { FIRESTORE_DB } from "./firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { FoodModel } from "@/models/FoodModel";

export const getCategory = async () => {
    const db = FIRESTORE_DB
    const categoryRef = collection(db, "category")
    var result: CategoryModel[] = []
    try {
        const snapShot = await getDocs(query(categoryRef))
        snapShot.forEach((doc) => {
            const curData = doc.data()
            result.push({id: doc.id, banner: curData.banner, image: curData.image, name: curData.name})
        })
    } catch(e) {
        console.log(e)
    } finally {
        return result
    }
}

export const getFoodByCategory = async (catId: string) => {
    const db = FIRESTORE_DB
    const ref = collection(db, "foods")
    var result: FoodModel[] = []
    try {
        
    } catch(e) {
        console.log(e)
    } finally {
        return result
    }
}