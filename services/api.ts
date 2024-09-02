import { CategoryModel } from "@/models/CategoryModel";
import { FIRESTORE_DB } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FoodModel } from "@/models/FoodModel";

export const getCategory = async () => {
    const db = FIRESTORE_DB
    const categoryRef = collection(db, "categories")
    var result: CategoryModel[] = []
    try {
        const snapShot = await getDocs(query(categoryRef))
        snapShot.forEach((doc) => {
            const curData = doc.data()
            result.push({id: doc.id,  catId: curData.cat_id, banner: curData.banner, image: curData.image, name: curData.name})
        })
    } catch(e) {
        console.log(e)
    } finally {
        return result
    }
}

export const getFoodByCategory = async (categoryId: string) => {
    const db = FIRESTORE_DB;
    const ref = collection(db, "products");
    const q = query(ref, where("category", "==", categoryId));
    const snapshot = await getDocs(q);
    const result: FoodModel[] = [];
  
    snapshot.forEach((doc) => {
      const data = doc.data();
      result.push({
        id: doc.id,
        name: data.name,
        price: data.price,
        isRecommend: data.isRecommend,
        description: data.description,
        image: data.image,
        category: data.category,
      });
    });
  
    return result;
  };