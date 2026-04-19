import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { fetchCartItems } from "@/store/shop/cart-slice";

const getItemUnitPrice = (item) =>
  item?.salePrice > 0 ? item.salePrice : item?.price || 0;

const ShoppingCheckout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, isLoading } = useSelector((state) => state.cart);

  const userId = user?.id || user?._id;
  const items = cartItems?.items || [];

  const totalItems = items.reduce((sum, item) => sum + (item?.quantity || 0), 0);
  const subtotal = items.reduce(
    (sum, item) => sum + getItemUnitPrice(item) * (item?.quantity || 0),
    0,
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch, userId]);

  if (!userId) {
    return (
      <section className="min-h-[60vh] px-4 py-12 md:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="mt-3 text-muted-foreground">
            Please log in first to view the items in your cart.
          </p>
          <Button asChild className="mt-6">
            <Link to="/auth/login">Go to Login</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[60vh] bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
          <p className="mt-2 text-muted-foreground">
            Review the products from your cart before placing the order.
          </p>
        </div>

        {!isLoading && items.length === 0 ? (
          <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-3 text-muted-foreground">
              Add some products to your cart and they will appear here at checkout.
            </p>
            <Button asChild className="mt-6">
              <Link to="/shop/listing">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-xl font-semibold">Cart Items</h2>
                <span className="text-sm text-muted-foreground">
                  {totalItems} item{totalItems === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center"
                  >
                    <img
                      src={item?.image}
                      alt={item?.title}
                      className="h-24 w-24 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item?.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Quantity: {item?.quantity}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Unit Price: ${getItemUnitPrice(item).toFixed(2)}
                      </p>
                    </div>

                    <p className="text-lg font-bold">
                      ${(getItemUnitPrice(item) * item?.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Order Summary</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>

                <div className="flex items-center justify-between border-t pt-4 text-lg font-bold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <Button className="mt-6 w-full" disabled={items.length === 0}>
                Place Order
              </Button>

              <Button asChild variant="outline" className="mt-3 w-full">
                <Link to="/shop/listing">Add More Products</Link>
              </Button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShoppingCheckout;
