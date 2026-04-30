import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminOrders } from "@/store/shop/order-slice";

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const formatDate = (dateValue) => {
  if (!dateValue) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateValue));
};

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-slate-800/80 bg-slate-950/70 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.35)]">
        <h1 className="text-2xl font-semibold text-white">Customer Orders</h1>
        <p className="mt-2 text-sm text-slate-400">
          Cash on delivery orders from checkout will appear here for the admin team.
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-[28px] border border-slate-800/80 bg-slate-950/70 p-8 text-slate-300">
          Loading orders...
        </div>
      ) : error ? (
        <div className="rounded-[28px] border border-red-500/25 bg-red-500/10 p-8 text-red-200">
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-[28px] border border-slate-800/80 bg-slate-950/70 p-8 text-slate-300">
          No orders have been placed yet.
        </div>
      ) : (
        <div className="grid gap-5">
          {orders.map((order) => (
            <article
              key={order._id}
              className="rounded-[28px] border border-slate-800/80 bg-slate-950/75 p-6 text-slate-100 shadow-[0_20px_60px_rgba(2,6,23,0.28)]"
            >
              <div className="flex flex-col gap-4 border-b border-slate-800 pb-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
                    Order #{order._id?.slice(-6)?.toUpperCase()}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">{order.customerName}</h2>
                  <p className="mt-1 text-sm text-slate-400">{order.email}</p>
                  <p className="text-sm text-slate-400">{order.phone}</p>
                </div>

                <div className="grid gap-2 text-sm text-slate-300">
                  <p>
                    <span className="text-slate-500">Placed:</span> {formatDate(order.createdAt)}
                  </p>
                  <p>
                    <span className="text-slate-500">Payment:</span> Cash on Delivery
                  </p>
                  <p>
                    <span className="text-slate-500">Status:</span> {order.orderStatus}
                  </p>
                  <p className="text-base font-semibold text-white">
                    Total: {formatCurrency(order.totalAmount)}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Ordered Items
                  </h3>
                  <div className="mt-3 space-y-3">
                    {order.items?.map((item) => (
                      <div
                        key={`${order._id}-${item.productId}`}
                        className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3"
                      >
                        <div>
                          <p className="font-medium text-white">{item.title}</p>
                          <p className="text-sm text-slate-400">
                            Qty: {item.quantity} x {formatCurrency(item.price)}
                          </p>
                        </div>
                        <p className="font-semibold text-emerald-300">
                          {formatCurrency(item.quantity * item.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Delivery Details
                  </h3>
                  <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
                    <p>{order.address}</p>
                    <p className="mt-1">
                      {order.city}, {order.postalCode}
                    </p>
                    {order.notes ? (
                      <p className="mt-4 rounded-xl bg-slate-950/80 p-3 text-slate-400">
                        {order.notes}
                      </p>
                    ) : (
                      <p className="mt-4 text-slate-500">No delivery notes.</p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminOrders;
