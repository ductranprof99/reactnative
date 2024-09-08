import { CategoryModel } from "@/models/CategoryModel";
import { FIRESTORE_DB } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, setDoc, startAt, updateDoc, where } from "firebase/firestore";
import { FoodModel } from "@/models/FoodModel";
import { OrderModel } from "@/models/OrderModel";
import { getUserInfo } from "./auth";

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

export const updateCurrentCart = async (product_id: string, quantity: number, price: number, email: string, address?: string): Promise<boolean> => {
    const current_cart = await getCart(email);
    const db = FIRESTORE_DB;
    let result = false;

    try {
        if (current_cart === null) {
            if (quantity <= 0) {
                // Don't create a new cart for zero or negative quantity
                return true;
            }
            const user = await getUserInfo(email);
            const new_cart: Omit<OrderModel, 'id'> = {
                order_date: new Date().toISOString(),
                user_email: email,
                total: price * quantity,
                product_quantities: [quantity],
                product_ids: [product_id],
                status: "Đang chuẩn bị",
                ship_address: address || user.address,
            };
            // Use addDoc to automatically generate an ID
            await addDoc(collection(db, "orders"), new_cart);
            result = true;
        } else {
            const product_id_index = current_cart.product_ids.indexOf(product_id);
            if (product_id_index !== -1) {
                // Product exists in cart
                const old_quantity = current_cart.product_quantities[product_id_index];
                const partial_total = old_quantity * price;

                if (quantity <= 0) {
                    // Remove product from cart
                    const new_product_ids = current_cart.product_ids.filter(id => id !== product_id);
                    const new_quantities = current_cart.product_quantities.filter((_, index) => index !== product_id_index);

                    const update_cart: Partial<OrderModel> = {
                        product_ids: new_product_ids,
                        product_quantities: new_quantities,
                        total: current_cart.total - partial_total,
                        ship_address: address || current_cart.ship_address
                    };

                    if (new_product_ids.length === 0) {
                        // If cart is empty, delete it
                        await deleteDoc(doc(db, "orders", current_cart.id));
                    } else {
                        await updateDoc(doc(db, "orders", current_cart.id), update_cart);
                    }
                } else {
                    // Update quantity
                    const new_quantities = [...current_cart.product_quantities];
                    new_quantities[product_id_index] = quantity;
                    
                    const update_cart: Partial<OrderModel> = {
                        product_quantities: new_quantities,
                        total: current_cart.total + price * quantity - partial_total,
                        ship_address: address || current_cart.ship_address
                    };
                    await updateDoc(doc(db, "orders", current_cart.id), update_cart);
                }
            } else if (quantity > 0) {
                // Add new product to cart
                const update_cart: Partial<OrderModel> = {
                    product_ids: [...current_cart.product_ids, product_id],
                    product_quantities: [...current_cart.product_quantities, quantity],
                    total: current_cart.total + price * quantity,
                    ship_address: address || current_cart.ship_address
                };
                await updateDoc(doc(db, "orders", current_cart.id), update_cart);
            }
            result = true;
        }
    } catch (error) {
        console.error("Error updating cart:", error);
        result = false;
    }
    return result;
};

export const updateMultipleProductInCart = async (
    product_ids: string[], 
    quantities: number[], 
    prices: number[], 
    email: string, 
    address?: string
): Promise<boolean> => {
    if (product_ids.length !== quantities.length || product_ids.length !== prices.length) {
        console.error("Mismatch in input array lengths");
        return false;
    }

    const current_cart = await getCart(email);
    const db = FIRESTORE_DB;
    let result = false;

    try {
        if (current_cart === null) {
            const user = await getUserInfo(email);
            const new_cart: Omit<OrderModel, 'id'> = {
                order_date: new Date().toISOString(),
                user_email: email,
                total: product_ids.reduce((sum, _, index) => sum + prices[index] * quantities[index], 0),
                product_quantities: quantities,
                product_ids: product_ids,
                status: "Đang chuẩn bị",
                ship_address: address || user.address,
            };

            // Use addDoc to automatically generate an ID
            await addDoc(collection(db, "orders"), new_cart);
            result = true;
        } else {
            let updated_product_ids = [...current_cart.product_ids];
            let updated_quantities = [...current_cart.product_quantities];
            let updated_total = current_cart.total;

            for (let i = 0; i < product_ids.length; i++) {
                const product_id_index = current_cart.product_ids.indexOf(product_ids[i]);
                
                if (product_id_index !== -1) {
                    const old_quantity = updated_quantities[product_id_index];
                    updated_quantities[product_id_index] = quantities[i];
                    updated_total += (quantities[i] - old_quantity) * prices[i];
                } else {
                    updated_product_ids.push(product_ids[i]);
                    updated_quantities.push(quantities[i]);
                    updated_total += quantities[i] * prices[i];
                }
            }

            const update_cart: Partial<OrderModel> = {
                product_ids: updated_product_ids,
                product_quantities: updated_quantities,
                total: updated_total,
                ship_address: address || current_cart.ship_address
            };

            await updateDoc(doc(db, "orders", current_cart.id), update_cart);
            result = true;
        }
    } catch (error) {
        console.error("Error updating cart:", error);
        result = false;
    }

    return result;
};

// ===================== order ======================
