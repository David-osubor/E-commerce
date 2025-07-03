import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase-config";
import { redirect } from "next/dist/server/api-utils";

//Adding new merchant


type MerchantDataType = {
  email: string;
  primaryPhone: string;
  secondaryPhone: string;
  brandName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  categories: string[];
};

function validateMerchantData(data: MerchantDataType) {
  const requiredFields = [
    "email",
    "primaryPhone",
    "secondaryPhone",
    "brandName",
    "address",
    "city",
    "state",
    "postalCode",
    "country",
  ];

  for (const field of requiredFields) {
    if (
      !data[field as keyof MerchantDataType] ||
      data[field as keyof MerchantDataType] === ""
    ) {
      throw new Error(`Missing or empty field: ${field}`);
    }
  }

  if (!Array.isArray(data.categories) || data.categories.length === 0) {
    throw new Error("At least one category must be selected.");
  }
}

export async function addNewMerchant(
  userId: string,
  newMerchant: MerchantDataType
) {
  try {
    validateMerchantData(newMerchant);
    
    const merchantQuery = query(
      collection(db, "merchant"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(merchantQuery);

    if (!querySnapshot.empty) {
      throw new Error("User already has a merchant store.");
    }

    const docRef = await addDoc(collection(db, "merchant"), {
      userId,
      ...newMerchant,
      createdAt: new Date().toISOString(),
    });

    console.log("Merchant created with ID:", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding merchant:", e);
    throw e;
  }
}

export async function getMerchantByUserId(userId: string) {
  try {
    const merchantQuery = query(
      collection(db, "merchant"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(merchantQuery);

    if (querySnapshot.empty) {
      throw new Error("No merchant found for the provided user ID.");
    }

    const merchantDoc = querySnapshot.docs[0];

  } catch (error) {
    console.error("Error fetching merchant:", error);
    throw error;
  }
}

// Example: Adding a new product to a 'products' collection
export async function addNewProduct(name: string, price: number, description: string) {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      name: name,
      price: price,
      description: description,
      addedDate: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Example: Getting all products from the 'products' collection
export async function getProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
}