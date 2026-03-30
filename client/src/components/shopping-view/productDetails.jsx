import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";

function ProductDetailsDialog({
  open,
  setOpen,
  productDetails,
  handleAddToCart,
}) {
  if (!productDetails) return null;

  const hasSalePrice =
    productDetails?.salePrice && productDetails?.salePrice > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid max-h-[85vh] grid-cols-1 gap-5 overflow-y-auto p-4 sm:p-5 md:grid-cols-2 md:gap-6 max-w-[88vw] sm:max-w-[70vw] lg:max-w-[58vw]">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-xl border bg-muted/20">
          <img
            src={productDetails?.image || "/placeholder.png"}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square max-h-[320px] w-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {productDetails?.title}
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              {productDetails?.description}
            </p>
          </div>

          {/* Extra Info */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border px-3 py-1 text-sm">
              Category: {productDetails?.category}
            </span>
            <span className="rounded-full border px-3 py-1 text-sm">
              Brand: {productDetails?.brand}
            </span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-center gap-3">
            {hasSalePrice ? (
              <>
                <p className="text-xl font-bold text-muted-foreground line-through sm:text-2xl">
                  ${productDetails?.price}
                </p>
                <p className="text-2xl font-bold text-primary sm:text-3xl">
                  ${productDetails?.salePrice}
                </p>
              </>
            ) : (
              <p className="text-2xl font-bold text-primary sm:text-3xl">
                ${productDetails?.price}
              </p>
            )}
          </div>

          {/* Stock */}
          <div className="mt-4">
            <span
              className={`text-sm font-medium ${
                productDetails?.totalStock > 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {productDetails?.totalStock > 0
                ? `${productDetails?.totalStock} items available`
                : "Out of Stock"}
            </span>
          </div>

          {/* Add to Cart */}
          <div className="mt-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed" disabled>
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart?.(
                    productDetails?._id,
                    productDetails?.totalStock,
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>

          <Separator className="my-6" />

          {/* Static Reviews */}
          <div>
            <h2 className="mb-3 text-lg font-bold">Customer Reviews</h2>

            <div className="grid max-h-[200px] gap-3 overflow-auto pr-2">
              <div className="rounded-lg border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">Ali Khan</h3>
                  <span className="text-sm text-yellow-500">★★★★★</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Very good product quality. The design looks premium and the
                  finishing is excellent.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">Sara Ahmed</h3>
                  <span className="text-sm text-yellow-500">★★★★☆</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Nice product overall. Worth the price and delivery was smooth.
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">Usman</h3>
                  <span className="text-sm text-yellow-500">★★★★★</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Totally satisfied. I would definitely recommend this product.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
