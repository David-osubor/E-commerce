"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Upload } from "lucide-react";
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

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export default function AddProductDialog({
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
    specification: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files).filter(
        (file) => file.type === "image/png" || file.type === "image/jpeg"
      );
      setSelectedFiles((prev) => [...prev, ...fileArray]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, images: selectedFiles });

    // Reset form
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      negotiable: "",
      condition: "",
      specification: "",
    });
    setSelectedFiles([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* File Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Select your file or drag and drop
                </p>
                <p className="text-sm text-gray-500 mb-4">png, jpg accepted</p>
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg"
                >
                  browse
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/png,image/jpeg"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
              </div>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  {selectedFiles.length} file(s) selected
                </p>
              </div>
            )}
          </div>

          {/* Product Name */}
          <div>
            <Label
              htmlFor="productName"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Product Name
            </Label>
            <Input
              id="productName"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full min-h-[100px]"
              required
            />
          </div>

          {/* Category */}
          <div>
            <Label
              htmlFor="category"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Category
            </Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full"
              required
            />
          </div>

          {/* Price and Negotiable */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="price"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="negotiable"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Is price Negotiable?
              </Label>
              <Select
                value={formData.negotiable}
                onValueChange={(value) =>
                  handleInputChange("negotiable", value)
                }
              >
                <SelectTrigger className="w-full">
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
            <Label
              htmlFor="condition"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Condition
            </Label>
            <Select
              value={formData.condition}
              onValueChange={(value) => handleInputChange("condition", value)}
            >
              <SelectTrigger className="w-full">
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
            <Label
              htmlFor="specification"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Specification
            </Label>
            <Textarea
              id="specification"
              value={formData.specification}
              onChange={(e) =>
                handleInputChange("specification", e.target.value)
              }
              className="w-full min-h-[100px]"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg font-medium rounded-lg"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
