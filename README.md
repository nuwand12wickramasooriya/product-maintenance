# Product Maintenance

A beginner-friendly React inventory app for adding, editing, and tracking products. It uses React Hooks for state management and Tailwind CSS for styling.

## Features

- Add a product with a name and quantity.
- Edit an existing product.
- Increase or decrease a product's quantity.
- Keep quantity at zero or above.
- Delete a product only when its quantity is zero.
- Validate that the product name is not empty and quantity is a non-negative whole number.
- View the number of products and total units in inventory.

> Product data is stored in React state only, so it resets when you refresh the page.

## Requirements

- Node.js 20 LTS or later
- npm

## Getting started

In a terminal, navigate to the project folder and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
product-maintenance/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    └── components/
        ├── ProductForm.jsx
        ├── ProductItem.jsx
        └── ProductList.jsx
```

## How it works

- `src/main.jsx` mounts the React application and imports the global stylesheet.
- `src/App.jsx` owns the product list and edit selection. It provides handlers for creating, updating, changing quantities, and deleting products.
- `src/components/ProductForm.jsx` manages the name and quantity inputs with `useState` and validates them before saving.
- `src/components/ProductList.jsx` renders the empty state or the list of products.
- `src/components/ProductItem.jsx` displays one product and its quantity controls.
- `src/index.css` imports Tailwind CSS and sets a few global styles.

Product state is kept in `App` and passed to child components through props. Quantity updates use functional state setters, so each update is based on the latest state.

## Tailwind CSS

This project uses Tailwind CSS v4 with Vite. The `@tailwindcss/vite` plugin is configured in `vite.config.js`, and `src/index.css` loads Tailwind with:

```css
@import "tailwindcss";
```

## Possible improvements

- Persist products in `localStorage` with `useEffect`.
- Add search and sorting controls.
- Use Context API if product state needs to be shared across many distant components.
- Add automated tests for form validation and inventory actions.
