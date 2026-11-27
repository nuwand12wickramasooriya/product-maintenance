import { useState } from "react";
import ProductForm from "./components/ProductForm.jsx";
import ProductList from "./components/ProductList.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  const editingProduct =
    products.find((product) => product.id === editingProductId) ?? null;

  function handleSaveProduct(productDetails) {
    if (editingProductId !== null) {
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === editingProductId
            ? { ...product, ...productDetails }
            : product,
        ),
      );
      setEditingProductId(null);
      return;
    }

    setProducts((currentProducts) => [
      ...currentProducts,
      { id: crypto.randomUUID(), ...productDetails },
    ]);
  }

  function handleQuantityChange(productId, amount) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(0, product.quantity + amount) }
          : product,
      ),
    );
  }

  function handleDeleteProduct(productId) {
    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== productId || product.quantity !== 0,
      ),
    );
    setEditingProductId((currentId) =>
      currentId === productId ? null : currentId,
    );
  }

  function handleEditProduct(productId) {
    setEditingProductId(productId);
  }

  function handleCancelEdit() {
    setEditingProductId(null);
  }

  const totalUnits = products.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-5xl">
        <header className="mb-9">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <span aria-hidden="true" className="size-2 rounded-full bg-blue-600" />
            Inventory workspace
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Product maintenance
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Add products, keep quantities up to date, and remove items when
            they’re out of stock.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <section
            aria-labelledby="product-form-heading"
            className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                {editingProduct ? "Edit product" : "Add a product"}
              </p>
              <h2
                id="product-form-heading"
                className="mt-1 text-xl font-semibold"
              >
                {editingProduct ? "Update product details" : "Product details"}
              </h2>
            </div>
            <ProductForm
              key={editingProduct?.id ?? "new-product"}
              initialValues={editingProduct}
              onSave={handleSaveProduct}
              onCancel={handleCancelEdit}
            />
          </section>

          <section
            aria-labelledby="product-list-heading"
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  Inventory
                </p>
                <h2
                  id="product-list-heading"
                  className="mt-1 text-xl font-semibold"
                >
                  Your products
                </h2>
              </div>
              <div className="text-sm text-slate-500">
                <span className="font-semibold text-slate-800">
                  {products.length}
                </span>{" "}
                {products.length === 1 ? "product" : "products"}
                <span className="mx-2 text-slate-300" aria-hidden="true">
                  ·
                </span>
                <span className="font-semibold text-slate-800">
                  {totalUnits}
                </span>{" "}
                {totalUnits === 1 ? "unit" : "units"}
              </div>
            </div>
            <ProductList
              products={products}
              onQuantityChange={handleQuantityChange}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </section>
        </div>
        <footer className="mt-8 text-center text-sm text-slate-500">
          Product data is kept in memory and resets when you refresh the page.
        </footer>
      </div>
    </main>
  );
}

export default App;
