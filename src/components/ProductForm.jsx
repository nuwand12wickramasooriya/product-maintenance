import { useState } from "react";

function ProductForm({ initialValues, onSave, onCancel }) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [quantity, setQuantity] = useState(
    String(initialValues?.quantity ?? 0),
  );
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const parsedQuantity = Number(quantity);

    if (!trimmedName) {
      setError("Enter a product name.");
      return;
    }

    if (
      quantity.trim() === "" ||
      !Number.isInteger(parsedQuantity) ||
      parsedQuantity < 0
    ) {
      setError("Quantity must be a whole number of 0 or more.");
      return;
    }

    setError("");
    onSave({ name: trimmedName, quantity: parsedQuantity });
    setName("");
    setQuantity("0");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label
          className="mb-1.5 block text-sm font-medium text-slate-700"
          htmlFor="product-name"
        >
          Product name
        </label>
        <input
          autoComplete="off"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          id="product-name"
          name="name"
          onChange={(event) => {
            setName(event.target.value);
            if (error) setError("");
          }}
          placeholder="e.g. Wireless keyboard"
          required
          type="text"
          value={name}
        />
      </div>

      <div>
        <label
          className="mb-1.5 block text-sm font-medium text-slate-700"
          htmlFor="product-quantity"
        >
          Quantity
        </label>
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          id="product-quantity"
          min="0"
          name="quantity"
          onChange={(event) => {
            setQuantity(event.target.value);
            if (error) setError("");
          }}
          required
          step="1"
          type="number"
          value={quantity}
        />
      </div>

      {error && (
        <p className="text-sm font-medium text-red-700" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2 pt-1">
        <button
          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          type="submit"
        >
          {initialValues ? "Save changes" : "Add product"}
        </button>
        {initialValues && (
          <button
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
