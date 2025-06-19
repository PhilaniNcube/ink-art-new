"use client";

import { useActionState, useRef, useEffect } from "react";
import { useQueryState } from "nuqs";
import {
  uploadImageToPrintify,
  type UploadImageState,
} from "@/utils/actions/printify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, CheckCircle, XCircle, Loader2 } from "lucide-react";

const initialState: UploadImageState = {
  success: false,
  message: "",
};

export function PrintifyImageUpload() {
  const [imageId, setImageId] = useQueryState("image_id");

  const [state, formAction, isPending] = useActionState(
    uploadImageToPrintify,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Handle successful upload by updating URL with image_id
  useEffect(() => {
    if (state.success && state.data && !isPending) {
      setImageId(state.data.id);
      // Reset form
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [state.success, state.data, isPending, setImageId]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload to Printify
        </CardTitle>
        <CardDescription>
          Upload an image to your Printify media library
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Image File</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              required
              disabled={isPending}
              className="file:mr-4 file:py-2 file:px-4 file:text-xs file:font-semibold  outline-none"
            />
            {state.errors?.image && (
              <p className="text-sm text-destructive">
                {state.errors.image[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="file_name">Custom File Name (Optional)</Label>
            <Input
              id="file_name"
              name="file_name"
              type="text"
              placeholder="Enter custom filename..."
              disabled={isPending}
            />
            {state.errors?.file_name && (
              <p className="text-sm text-destructive">
                {state.errors.file_name[0]}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </>
            )}
          </Button>{" "}
          {state.errors?._form && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{state.errors._form[0]}</AlertDescription>
            </Alert>
          )}
          {imageId && (
            <Alert variant="default">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Image uploaded successfully to Printify media library! Image ID:{" "}
                {imageId}
              </AlertDescription>
            </Alert>
          )}
          {state.message && !state.errors?._form && (
            <Alert variant={state.success ? "default" : "destructive"}>
              {state.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          {state.success && state.data && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Upload Successful!
              </h4>
              <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <p>
                  <strong>ID:</strong> {state.data.id}
                </p>
                <p>
                  <strong>File:</strong> {state.data.file_name}
                </p>
                <p>
                  <strong>Size:</strong> {state.data.width} ×{" "}
                  {state.data.height}
                </p>
                <p>
                  <strong>File Size:</strong>{" "}
                  {(state.data.size / 1024).toFixed(1)} KB
                </p>
                {state.data.preview_url && (
                  <div className="mt-2">
                    <p>
                      <strong>Preview:</strong>
                    </p>
                    <img
                      src={state.data.preview_url}
                      alt="Uploaded preview"
                      className="mt-1 max-w-full h-32 object-contain rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
