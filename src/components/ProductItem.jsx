function ProductItem({ product, onQuantityChange, onEdit, onDelete }) {
  const isOutOfStock = product.quantity === 0;

  return (
    <li className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words font-semibold text-slate-900">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="text-slate-500">Quantity</span>
            <span
              aria-live="polite"
              className={`font-semibold ${
                isOutOfStock ? "text-amber-700" : "text-slate-800"
              }`}
            >
              {product.quantity}
            </span>
            {isOutOfStock && (
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                Out of stock
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            aria-label={`Decrease ${product.name} quantity`}
            className="size-9 rounded-lg border border-slate-300 text-lg font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={isOutOfStock}
            onClick={() => onQuantityChange(product.id, -1)}
            type="button"
          >
            −
          </button>
          <button
            aria-label={`Increase ${product.name} quantity`}
            className="size-9 rounded-lg border border-slate-300 text-lg font-medium text-slate-700 transition hover:bg-slate-50"
            onClick={() => onQuantityChange(product.id, 1)}
            type="button"
          >
            +
          </button>
          <button
            className="min-h-9 rounded-lg px-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            onClick={() => onEdit(product.id)}
            type="button"
          >
            Edit
          </button>
          {isOutOfStock && (
            <button
              className="min-h-9 rounded-lg px-3 text-sm font-semibold text-red-700 transition hover:bg-red-50"
              onClick={() => onDelete(product.id)}
              type="button"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default ProductItem;
