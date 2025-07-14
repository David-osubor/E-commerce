"use server";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase-config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//Adding new merchant

type MerchantDataType = {
  email: string;
  primaryPhone: string;
  whatsappNo: string;
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
    "whatsappNo",
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
      return null;
    }

    const merchantDoc = querySnapshot.docs[0];
    return { id: merchantDoc.id, data: merchantDoc.data() };
  } catch (error) {
    console.error("Error getting merchant:", error);
    throw error;
  }
}

// Function to upload image to Cloudinary
export async function uploadImage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url as string);
        }
      })
      .end(buffer);
  });
}

// Function to delete image from Cloudinary
export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

// Example: Adding a new product to a 'products' collection
export async function addNewProduct(
  name: string,
  price: string,
  description: string,
  specification: string,
  condition: string,
  category: string,
  negotiable: string,
  imageFiles: File[],
  merchantId: string,
  brandName: string,
  merchantNo: string
) {
  try {
    const imageUrls: string[] = [];
    for (const file of imageFiles) {
      const url = await uploadImage(file);
      imageUrls.push(url);
    }
    const docRef = await addDoc(collection(db, "products"), {
      name: name,
      price: price,
      description: description,
      specifications: specification,
      condition: condition,
      category: category,
      negotiable: negotiable,
      imageUrls: imageUrls,
      addedDate: new Date().toISOString(),
      merchantId: merchantId,
      brandName: brandName,
      merchantNo: merchantNo,
    });
    const docData = await getDoc(docRef);
    return { productId: docRef.id, data: docData.data() };
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function updateProduct(
  productId: string,
  updatedData: {
    name: string;
    price: string;
    description: string;
    specification: string;
    condition: string;
    category: string;
    negotiable: string;
    images: (File | string)[];
    merchantId: string;
    merchantName: string;
    merchantWhatsapp: string;
  },
  existingImages: string[] = []
) {
  try {
    // Handle image updates
    const newImageUrls: string[] = [];
    const imagesToKeep: string[] = [...existingImages];

    // Separate new files from existing URLs
    for (const img of updatedData.images) {
      if (typeof img === "string") {
        // This is an existing image URL that should be kept
        imagesToKeep.push(img);
      } else {
        // This is a new file that needs uploading
        const url = await uploadImage(img);
        newImageUrls.push(url);
      }
    }

    // Combine kept and new images
    const allImageUrls = [...imagesToKeep, ...newImageUrls];

    // Update the product document
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      name: updatedData.name,
      price: updatedData.price,
      description: updatedData.description,
      specifications: updatedData.specification,
      condition: updatedData.condition,
      category: updatedData.category,
      negotiable: updatedData.negotiable,
      imageUrls: allImageUrls,
      lastUpdated: new Date().toISOString(), // Add update timestamp
      merchantId: updatedData.merchantId,
      brandName: updatedData.merchantName,
      merchantNo: updatedData.merchantWhatsapp,
    });

    // Get the updated document
    const updatedDoc = await getDoc(productRef);
    return { id: productId, ...updatedDoc.data() };
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e; // Re-throw to handle in the calling function
  }
}

export async function deleteProduct(productId: string) {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
  } catch(err){
    console.log(err)
  }
}

export async function getProductById(productId: string) {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

// Example: Getting all products from the 'products' collection
export async function getProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products: any[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products as DocumentData[];
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
}

export async function getMerchantProducts(merchantId: string) {
  try {
    const q = query(collection(db, "products"), where("merchantId", "==", merchantId))  
    const querySnapshot = await getDocs(q);
    const products: any[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;      
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
}
