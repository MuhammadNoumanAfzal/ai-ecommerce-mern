import React, { useEffect, useState } from "react";
import ProductFilter from "@/components/shopping-view/Filter";
import ShoppingProductTile from "../../components/shopping-view/ProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import { addToCart } from "@/store/shop/cart-slice";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/productDetails";
import { toast } from "sonner";

const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

function createSearchParamsHelper(filters) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts,
  );
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const [open, setOpen] = useState(false);

  const categorySearchParam = searchParams.get("category");

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (sectionId, currentOption) => {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(sectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [sectionId]: [currentOption],
      };
    } else {
      const indexOfCurrentOption = cpyFilters[sectionId].indexOf(currentOption);

      if (indexOfCurrentOption === -1) {
        cpyFilters[sectionId].push(currentOption);
      } else {
        cpyFilters[sectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
    const userId = user?.id || user?._id;
    const currentProduct = productList?.find(
      (product) => product._id === getCurrentProductId,
    );

    if (!userId) {
      toast.error("Please login to add items to your cart");
      return;
    }

    if (!currentProduct) {
      toast.error("Product not found");
      return;
    }

    const currentCartItem = cartItems?.items?.find(
      (item) => item.productId === getCurrentProductId,
    );
    const currentQuantity = currentCartItem?.quantity || 0;

    if (currentQuantity >= currentProduct.totalStock) {
      toast.error(`Only ${currentProduct.totalStock} item(s) available in stock`);
      return;
    }

    dispatch(
      addToCart({
        userId,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Item added to cart");
        return;
      }

      toast.error(data?.payload?.message || "Failed to add item to cart");
    });
  }


  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filtersParams: filters, sortParams: sort }),
      );
  }, [dispatch, filters, sort]);


  useEffect(() => {
    if (productDetails) {
      setOpen(true);
    }
  }, [productDetails]);

  console.log(productDetails);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />

      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length || 0} Products
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0 ? (
            productList.map((productItem) => (
              <ShoppingProductTile
                key={productItem._id}
                product={productItem}
                handleGetProductDetails={handleGetProductDetails}
                handleAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              No products found.
            </div>
          )}
        </div>
      </div>
      <ProductDetailsDialog
        open={open}
        setOpen={setOpen}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShoppingListing;
