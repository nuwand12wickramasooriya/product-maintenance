import ProductItem from "./ProductItem.jsx";

function ProductList({ products, onQuantityChange, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
        <p className="font-medium text-slate-800">No products yet</p>
        <p className="mt-1 text-sm text-slate-500">
          Add your first product using the form.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          onDelete={onDelete}
          onEdit={onEdit}
          onQuantityChange={onQuantityChange}
          product={product}
        />
      ))}
    </ul>
  );
}

export default ProductList;
