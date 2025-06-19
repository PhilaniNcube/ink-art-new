"use client";

import { useActionState, useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import {
  createPrintifyProduct,
  type CreateProductState,
} from "@/utils/actions/printify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Package, CheckCircle, XCircle, Loader2, Plus, X } from "lucide-react";

const initialState: CreateProductState = {
  success: false,
  message: "",
};

// Common blueprint IDs for reference
const COMMON_BLUEPRINTS = [
  { id: 555, name: "Stretched Canvas" },
  { id: 384, name: "Poster" },
  { id: 6, name: "Mug" },
  { id: 5, name: "T-Shirt" },
  { id: 388, name: "Hoodie" },
];

// Common print provider IDs
const PRINT_PROVIDERS = [
  { id: 1, name: "SPOKE Custom Products" },
  { id: 3, name: "DJ Paper" },
  { id: 5, name: "SwiftPOD" },
  { id: 8, name: "Monster Digital" },
];

interface PrintifyProductFormProps {
  className?: string;
}

export function PrintifyProductForm({ className }: PrintifyProductFormProps) {
  const [imageId] = useQueryState("image_id");
  const [productId, setProductId] = useQueryState("product_id");

  const [state, formAction, isPending] = useActionState(
    createPrintifyProduct,
    initialState
  );

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blueprintId, setBlueprintId] = useState<number | undefined>();
  const [printProviderId, setPrintProviderId] = useState<number | undefined>();
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  // Variant state
  const [variants, setVariants] = useState([
    { id: 1, price: 29.99, is_enabled: true },
  ]);

  // Handle successful product creation
  useEffect(() => {
    if (state.success && state.data && !isPending) {
      setProductId(state.data.id);
      // Reset form
      setTitle("");
      setDescription("");
      setBlueprintId(undefined);
      setPrintProviderId(undefined);
      setTags([]);
      setVariants([{ id: 1, price: 29.99, is_enabled: true }]);
    }
  }, [state.success, state.data, isPending, setProductId]);

  // Clear product_id after 10 seconds
  useEffect(() => {
    if (productId) {
      const timer = setTimeout(() => {
        setProductId(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [productId, setProductId]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddVariant = () => {
    const newId = Math.max(...variants.map((v) => v.id)) + 1;
    setVariants([...variants, { id: newId, price: 29.99, is_enabled: true }]);
  };

  const handleRemoveVariant = (variantId: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((v) => v.id !== variantId));
    }
  };

  const handleVariantChange = (
    variantId: number,
    field: "price" | "is_enabled",
    value: number | boolean
  ) => {
    setVariants(
      variants.map((v) => (v.id === variantId ? { ...v, [field]: value } : v))
    );
  };

  const handleSubmit = (formData: FormData) => {
    if (!imageId) {
      alert("Please upload an image first before creating a product.");
      return;
    }

    if (!blueprintId || !printProviderId) {
      alert("Please select both blueprint and print provider.");
      return;
    }

    // Prepare product data
    const productData = {
      title,
      description: description || undefined,
      blueprint_id: blueprintId,
      print_provider_id: printProviderId,
      variants: variants.map((v) => ({
        id: v.id,
        price: v.price,
        is_enabled: v.is_enabled,
      })),
      print_areas: [
        {
          variant_ids: variants.map((v) => v.id),
          placeholders: [
            {
              position: "front",
              images: [
                {
                  id: imageId,
                  name: title || "Product Image",
                  type: "image",
                  height: 400,
                  width: 400,
                  x: 0,
                  y: 0,
                  scale: 1,
                  angle: 0,
                },
              ],
            },
          ],
        },
      ],
      tags,
    };

    // Add product data as JSON string to form data
    formData.append("productData", JSON.stringify(productData));

    // Call the server action
    formAction(formData);
  };

  if (!imageId) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Create Printify Product
          </CardTitle>
          <CardDescription>
            Please upload an image first before creating a product.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Create Printify Product
        </CardTitle>
        <CardDescription>
          Create a new product using the uploaded image (ID: {imageId})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

            <div className="space-y-2">
              <Label htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product title..."
                required
                disabled={isPending}
              />
              {state.errors?.title && (
                <p className="text-sm text-destructive">
                  {state.errors.title[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description (optional)..."
                disabled={isPending}
                rows={3}
              />
              {state.errors?.description && (
                <p className="text-sm text-destructive">
                  {state.errors.description[0]}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  disabled={isPending}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddTag}
                  disabled={isPending || !newTag.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Configuration</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="blueprint">Blueprint *</Label>
                <Select
                  value={blueprintId?.toString() || ""}
                  onValueChange={(value) => setBlueprintId(Number(value))}
                  disabled={isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blueprint" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMMON_BLUEPRINTS.map((blueprint) => (
                      <SelectItem
                        key={blueprint.id}
                        value={blueprint.id.toString()}
                      >
                        {blueprint.name} (ID: {blueprint.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state.errors?.blueprint_id && (
                  <p className="text-sm text-destructive">
                    {state.errors.blueprint_id[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="printProvider">Print Provider *</Label>
                <Select
                  value={printProviderId?.toString() || ""}
                  onValueChange={(value) => setPrintProviderId(Number(value))}
                  disabled={isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select print provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRINT_PROVIDERS.map((provider) => (
                      <SelectItem
                        key={provider.id}
                        value={provider.id.toString()}
                      >
                        {provider.name} (ID: {provider.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state.errors?.print_provider_id && (
                  <p className="text-sm text-destructive">
                    {state.errors.print_provider_id[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Variants</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddVariant}
                disabled={isPending}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Variant
              </Button>
            </div>

            <div className="space-y-3">
              {variants.map((variant, index) => (
                <div
                  key={variant.id}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <Label htmlFor={`variant-${variant.id}-price`}>
                      Variant {variant.id} Price ($)
                    </Label>
                    <Input
                      id={`variant-${variant.id}-price`}
                      type="number"
                      step="0.01"
                      min="0"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(
                          variant.id,
                          "price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      disabled={isPending}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`variant-${variant.id}-enabled`}
                      checked={variant.is_enabled}
                      onCheckedChange={(checked) =>
                        handleVariantChange(
                          variant.id,
                          "is_enabled",
                          checked as boolean
                        )
                      }
                      disabled={isPending}
                    />
                    <Label
                      htmlFor={`variant-${variant.id}-enabled`}
                      className="text-sm"
                    >
                      Enabled
                    </Label>
                  </div>

                  {variants.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveVariant(variant.id)}
                      disabled={isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {state.errors?.variants && (
              <p className="text-sm text-destructive">
                {state.errors.variants[0]}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending || !title || !blueprintId || !printProviderId}
            className="w-full"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Product...
              </>
            ) : (
              <>
                <Package className="mr-2 h-4 w-4" />
                Create Product
              </>
            )}
          </Button>

          {/* Error Messages */}
          {state.errors?._form && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{state.errors._form[0]}</AlertDescription>
            </Alert>
          )}

          {/* Success Message */}
          {productId && (
            <Alert variant="default">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Product created successfully! Product ID: {productId}
              </AlertDescription>
            </Alert>
          )}

          {state.message && !state.errors?._form && !productId && (
            <Alert variant={state.success ? "default" : "destructive"}>
              {state.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
