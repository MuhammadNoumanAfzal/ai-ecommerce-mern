import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
// import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("my_file", imageFile);
      const response = await axios.post(
        "http://localhost:3000/api/admin/products/upload-image",
        data,
      );
      console.log(response, "response");

      if (response?.data?.success) {
        setUploadedImageUrl(
          response.data.result.secure_url || response.data.result.url,
        );
      }
    } catch (error) {
      console.error(
        error.response?.data?.message || "Image upload request failed",
      );
      setUploadedImageUrl(null);
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div
      className={`mt-4 w-full ${isCustomStyling ? "" : "mx-auto max-w-md"}`}
    >
      <Label className="mb-3 block text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
        Upload Image
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="rounded-[24px] border border-dashed border-slate-700 bg-slate-950/72 p-4 shadow-[0_20px_60px_rgba(2,6,23,0.35)]"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-[20px] border border-dashed border-emerald-500/25 bg-[linear-gradient(180deg,rgba(15,23,42,0.9)_0%,rgba(17,24,39,0.95)_100%)] px-4 text-center"
          >
            <UploadCloudIcon className="mb-3 h-10 w-10 text-emerald-400" />
            <span className="text-sm font-medium text-slate-100">
              {isEditMode
                ? "Drag and drop or click to replace image"
                : "Drag and drop or click to upload image"}
            </span>
            <span className="mt-2 text-xs text-slate-400">
              Use a clean product image for a stronger catalog view.
            </span>
          </Label>
        ) : imageLoadingState ? (
          <div className="flex h-24 items-center justify-center rounded-[20px] border border-slate-800 bg-slate-900 text-sm text-slate-400">
            Uploading image...
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-[20px] border border-slate-800 bg-slate-900 px-4 py-3">
            <div className="flex items-center">
              <FileIcon className="mr-3 h-8 w-8 text-emerald-400" />
            </div>
            <p className="flex-1 truncate text-sm font-medium text-slate-100">
              {imageFile.name}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:bg-slate-800 hover:text-white"
              onClick={handleRemoveImage}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
