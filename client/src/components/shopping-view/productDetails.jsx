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
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-xl border bg-muted/20">
          <img
            src={productDetails?.image || "/placeholder.png"}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {productDetails?.title}
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg mt-4 leading-7">
              {productDetails?.description}
            </p>
          </div>

          {/* Extra Info */}
          <div className="flex flex-wrap gap-3 mt-5">
            <span className="rounded-full border px-3 py-1 text-sm">
              Category: {productDetails?.category}
            </span>
            <span className="rounded-full border px-3 py-1 text-sm">
              Brand: {productDetails?.brand}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mt-6">
            {hasSalePrice ? (
              <>
                <p className="text-2xl sm:text-3xl font-bold text-muted-foreground line-through">
                  ${productDetails?.price}
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-primary">
                  ${productDetails?.salePrice}
                </p>
              </>
            ) : (
              <p className="text-3xl sm:text-4xl font-bold text-primary">
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
          <div className="mt-6">
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

          <Separator className="my-8" />

          {/* Static Reviews */}
          <div>
            <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

            <div className="grid gap-4 max-h-[260px] overflow-auto pr-2">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Ali Khan</h3>
                  <span className="text-sm text-yellow-500">★★★★★</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Very good product quality. The design looks premium and the
                  finishing is excellent.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Sara Ahmed</h3>
                  <span className="text-sm text-yellow-500">★★★★☆</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Nice product overall. Worth the price and delivery was smooth.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
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
