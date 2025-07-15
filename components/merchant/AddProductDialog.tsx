"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Upload, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { DocumentData } from "firebase/firestore";

interface AddProductDialogProps {
  product?: DocumentData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    id?: string;
    name: string;
    price: string;
    description: string;
    specification: string;
    condition: string;
    category: string;
    negotiable: string;
    images: File[];
    existingImages?: string[];
    merchantId?: string;
    merchantName?: string;
    merchantWhatsapp?: string;
  }) => Promise<void> | void;
}

const categories = [
  "Computers",
  "Food",
  "Phones",
  "Books",
  "Beauty",
  "Clothes",
];

export default function AddProductDialog({
  product,
  open,
  onOpenChange,
  onSubmit,
}: AddProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    negotiable: "",
    condition: "",
    images: [] as (File | string)[],
    specification: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<(File)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price || "",
        negotiable: product.negotiable || "",
        condition: product.condition || "",
        images: product.images || [],
        specification: product.specifications || "",
      });
      setSelectedFiles(product.images || []);
    } else {
      // Reset form when opening for new product
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        negotiable: "",
        condition: "",
        images: [],
        specification: "",
      });
      setSelectedFiles([]);
    }
  }, [product, open]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files).filter(
        (file) => file.type === "image/png" || file.type === "image/jpeg"
      );
      setSelectedFiles((prev) => [...prev, ...fileArray].slice(0, 5)); // Limit to 5 files
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        id: product?.id,
        images: selectedFiles,
        existingImages: product?.imageUrls || [], // Pass existing images for edit case
      });

      // Only reset form if not editing
      if (!product) {
        setFormData({
          name: "",
          description: "",
          category: "",
          price: "",
          negotiable: "",
          condition: "",
          images: [],
          specification: "",
        });
        setSelectedFiles([]);
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* File Upload Area */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Product Images (Max 5)
            </Label>

            {selectedFiles.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                      {typeof file === "string" ? (
                        <Image
                          src={file}
                          alt={`Preview ${index}`}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index}`}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Drag & drop images here
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      or click to browse (PNG, JPG)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="px-8 py-2 rounded-lg"
                    >
                      Select Files
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/png,image/jpeg"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>

          {/* Product Name */}
          <div>
            <Label htmlFor="productName" className="block mb-2">
              Product Name *
            </Label>
            <Input
              id="productName"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="block mb-2">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your product in detail"
              className="min-h-[100px]"
              required
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="block mb-2">
              Category *
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price and Negotiable */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="block mb-2">
                Price *
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="Enter price"
                required
              />
            </div>
            <div>
              <Label htmlFor="negotiable" className="block mb-2">
                Is price negotiable? *
              </Label>
              <Select
                value={formData.negotiable}
                onValueChange={(value) =>
                  handleInputChange("negotiable", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Condition */}
          <div>
            <Label htmlFor="condition" className="block mb-2">
              Condition *
            </Label>
            <Select
              value={formData.condition}
              onValueChange={(value) => handleInputChange("condition", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="used">Used</SelectItem>
                <SelectItem value="refurbished">Refurbished</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Specification */}
          <div>
            <Label htmlFor="specification" className="block mb-2">
              Specifications
            </Label>
            <Textarea
              id="specification"
              value={formData.specification}
              onChange={(e) =>
                handleInputChange("specification", e.target.value)
              }
              placeholder="Add product specifications (optional)"
              className="min-h-[100px]"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 text-lg font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {product ? "Updating..." : "Submitting..."}
              </>
            ) : product ? (
              "Update Product"
            ) : (
              "Submit Product"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
