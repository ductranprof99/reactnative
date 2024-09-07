import { CategoryModel } from "@/models/CategoryModel";
import { FIRESTORE_DB } from "./firebase";
import { collection, getDocs, limit, orderBy, query, startAt, where } from "firebase/firestore";
import { FoodModel } from "@/models/FoodModel";
import { OrderModel } from "@/models/OrderModel";

export const getCategory = async () => {
    const db = FIRESTORE_DB
    const categoryRef = collection(db, "categories")
    var result: CategoryModel[] = []
    try {
        const snapShot = await getDocs(query(categoryRef))
        snapShot.forEach((doc) => {
            const curData = doc.data()
            result.push({ id: doc.id, catId: curData.cat_id, banner: curData.banner, image: curData.image, name: curData.name })
        })
    } catch (e) {
        console.log(e)
    } finally {
        return result
    }
}

// ================ product =======================

export const getFoodByCategory = async (categoryId: string): Promise<FoodModel[]> => {
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

export const getFoodByListId = async (productIds: string[]): Promise<FoodModel[]> => {
    const db = FIRESTORE_DB;
    const ref = collection(db, "products");
    const q = query(ref, where("id", "in", productIds));
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
}

export const getRecommendFood = async (): Promise<FoodModel[]> => {
    const db = FIRESTORE_DB;
    const ref = collection(db, "products");
    const q = query(ref, where("isRecommend", "==", true));
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

export const getBatchFood = async (prev_name: string = "", batchFood: number = 5): Promise<FoodModel[]> => {
    const db = FIRESTORE_DB;
    const ref = collection(db, "products");
    var q = query(
        ref,
        orderBy("name", "asc"),
        limit(batchFood)
    );
    if (prev_name !== "") {
        q = query(
            ref,
            orderBy("name", "asc"),
            startAt(prev_name),
            limit(batchFood)
        );
    }
    const snapshot = await getDocs(q);
    const result: FoodModel[] = [];
    snapshot.forEach((doc) => {
        const data = doc.data();
        if (prev_name !== "" && doc.data().name === prev_name) {

        } else {
            result.push({
                id: doc.id,
                name: data.name,
                price: data.price,
                isRecommend: data.isRecommend,
                description: data.description,
                image: data.image,
                category: data.category,
            });
        }
    });

    return result;
};

// ===================== cart ======================
export const getCart = async (email: string): Promise<OrderModel | null> => {
    const db = FIRESTORE_DB;
    const ref = collection(db, "orders");
    const q = query(ref, 
        where("user_email", "==", email),
        where("status", "==", "Đang chuẩn bị"),
        limit(1)
    );
    const snapshot = await getDocs(q);
    var result: OrderModel | null = null;

    snapshot.forEach((doc) => {
        const data = doc.data();
        result = {
            order_date: data.order_date,
            id: doc.id,
            user_email: data.user_email,
            total: data.total,
            product_quantities: data.product_quantities,
            product_ids: data.product_ids,
            status: data.status,
            ship_address: data.ship_address,
        };
    });

    return result;
}

export const getOrder = async (email: string): Promise<OrderModel[]> => {
    const db = FIRESTORE_DB;
    const ref = collection(db, "orders");
    const q = query(ref, 
        where("user_email", "==", email),
        where("status", "!=", "Đang chuẩn bị"),
    );
    const snapshot = await getDocs(q);
    var result: OrderModel[] = [];

    snapshot.forEach((doc) => {
        const data = doc.data();
        result.push({
            order_date: data.order_date,
            id: doc.id,
            user_email: data.user_email,
            total: data.total,
            product_quantities: data.product_quantities,
            product_ids: data.product_ids,
            status: data.status,
            ship_address: data.ship_address,
        });
    });
    return result;
}


export const addToCart = async (product_id: string, quantity: number, email: string) => {

}

// ===================== order ======================
