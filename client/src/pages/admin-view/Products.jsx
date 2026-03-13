import React, { useEffect, useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonForm from "@/components/comman/Form";
import { addProductFormElements } from "@/config";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProductImageUpload from "@/components/admin-view/Image-upload";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/store/admin/product-slice/Index";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: 0,
  salePrice: 0,
  totalStock: 0,
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  function onSubmit(event) {
    event.preventDefault();

    console.log(formData);
  }

  useEffect(() => {
    dispatchEvent(fetchAllProducts());
  }, [dispatch]);

  console.log(productList, "productList");
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-end">
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="rounded-2xl border border-slate-700 bg-slate-100 px-5 py-2.5 text-slate-950 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={setOpenCreateProductsDialog}
      >
        <SheetContent
          side="right"
          className="w-full overflow-auto border-l border-slate-800 bg-[linear-gradient(180deg,#020617_0%,#0f172a_42%,#111827_100%)] px-0 shadow-[0_20px_80px_rgba(2,6,23,0.6)] sm:max-w-md"
        >
          <div className="min-h-full">
            <SheetHeader className="border-b border-slate-800 bg-slate-950/70 px-5 py-5 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-950 via-slate-800 to-emerald-500 text-white shadow-lg shadow-emerald-900/40">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <SheetTitle className="text-xl font-semibold tracking-tight text-slate-100">
                    Add New Product
                  </SheetTitle>
                  <SheetDescription className="max-w-sm text-sm leading-6 text-slate-400">
                    Build a polished catalog entry with clear details, pricing,
                    and inventory information.
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="px-5 py-5">
              <div className="rounded-[24px] border border-slate-800/80 bg-slate-950/72 p-4 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl">
                <div className="mb-5 rounded-[20px] bg-gradient-to-r from-slate-950 via-slate-800 to-emerald-600 p-4 text-white shadow-lg shadow-slate-300/40">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100/80">
                    Product Editor
                  </p>
                  <h2 className="mt-2 text-lg font-semibold tracking-tight">
                    Fill in the essentials
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-200">
                    Use concise titles, strong descriptions, and accurate stock
                    data to keep your storefront clean and trustworthy.
                  </p>
                </div>

                <CommonForm
                  formControls={addProductFormElements}
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={onSubmit}
                  buttonText="Save Product"
                  formClassName="space-y-4"
                  fieldClassName="rounded-2xl border border-slate-800 bg-slate-900/70 p-3.5 shadow-sm"
                  labelClassName="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                  inputClassName="min-h-11 rounded-xl border-slate-700 bg-slate-950/95 px-4 text-slate-100 shadow-[0_8px_24px_rgba(2,6,23,0.2)] placeholder:text-slate-500 focus-visible:border-emerald-400 focus-visible:ring-emerald-500/20"
                  buttonClassName="h-11 rounded-2xl border border-slate-700 bg-slate-100 text-sm font-semibold tracking-wide text-slate-950 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white"
                />
              </div>
              <ProductImageUpload
                imageFile={imageFile}
                setImageFile={(file) => {
                  setImageFile(file);
                  setFormData((prev) => ({
                    ...prev,
                    image: file,
                  }));
                }}
                imageLoadingState={imageLoadingState}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                isCustomStyling
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;
