import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const hasSalePrice = Number(product?.salePrice) > 0;
  const displayPrice = hasSalePrice ? product?.salePrice : product?.price;

  return (
    <Card className="h-full w-full overflow-hidden rounded-[22px] border border-slate-800 bg-[linear-gradient(180deg,rgba(15,23,42,0.98)_0%,rgba(2,6,23,1)_100%)] text-slate-100 shadow-[0_14px_36px_rgba(2,6,23,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(16,185,129,0.12)]">
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-800/80 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_55%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,1))] p-2.5">
          <div className="flex h-[108px] items-center justify-center rounded-[16px] border border-slate-800/80 bg-slate-950/85 p-2.5">
            {product?.image ? (
              <img
                src={product.image}
                alt={product?.title}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="text-sm font-medium text-slate-500">
                No image available
              </div>
            )}
          </div>

          <div className="mt-2.5 flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                {product?.category || "Product"}
              </p>
              <h2 className="mt-1 min-h-[38px] line-clamp-2 text-[15px] font-semibold tracking-tight text-slate-50">
                {product?.title}
              </h2>
            </div>
            <div className="shrink-0 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-300">
              {product?.brand || "Brand"}
            </div>
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col gap-2.5 p-3">
          <p className="line-clamp-2 min-h-[30px] text-[12px] leading-4 text-slate-400">
            {product?.description ||
              "Clean product details with pricing and inventory."}
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-[16px] border border-slate-800 bg-slate-900/70 px-2.5 py-2">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Stock
              </p>
              <p className="mt-1 text-[15px] font-semibold text-slate-100">
                {product?.totalStock ?? 0}
              </p>
            </div>
            <div className="rounded-[16px] border border-slate-800 bg-slate-900/70 px-2.5 py-2">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Price
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                {hasSalePrice ? (
                  <span className="text-[10px] font-medium text-slate-500 line-through">
                    ${product?.price}
                  </span>
                ) : null}
                <span className="text-[15px] font-semibold text-emerald-300">
                  ${displayPrice}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`min-h-[34px] rounded-[16px] px-2.5 py-2 text-[12px] font-medium ${
              hasSalePrice
                ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
                : "border border-transparent bg-transparent text-transparent"
            }`}
          >
            {hasSalePrice ? `On sale now for $${product?.salePrice}` : " "}
          </div>
        </CardContent>

        <CardFooter className="mt-auto grid grid-cols-2 gap-2 p-3 pt-0">
          <Button
            className="h-9 rounded-[16px] border border-slate-700 bg-slate-100 text-[13px] font-semibold text-slate-950 transition-all duration-300 hover:bg-emerald-500 hover:text-white"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            className="h-9 rounded-[16px] border border-red-500/20 bg-red-500/10 text-[13px] font-semibold text-red-200 transition-all duration-300 hover:bg-red-500 hover:text-white"
            onClick={() => handleDelete(product?._id)}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
