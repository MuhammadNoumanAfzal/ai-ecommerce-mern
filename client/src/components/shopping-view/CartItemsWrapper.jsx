function CartItemsWrapper({ item }) {
  const effectivePrice =
    item?.salePrice && item.salePrice > 0 ? item.salePrice : item?.price;

  return (
    <div className="flex items-center gap-4 rounded-lg border p-3">
      <img
        src={item?.image || "/placeholder.png"}
        alt={item?.title}
        className="h-16 w-16 rounded-md object-cover"
      />

      <div className="flex-1 space-y-1">
        <h3 className="line-clamp-1 font-medium">{item?.title}</h3>
        <p className="text-sm text-muted-foreground">
          Qty: {item?.quantity || 0}
        </p>
      </div>

      <p className="font-semibold">
        ${((effectivePrice || 0) * (item?.quantity || 0)).toFixed(2)}
      </p>
    </div>
  );
}

export default CartItemsWrapper;
