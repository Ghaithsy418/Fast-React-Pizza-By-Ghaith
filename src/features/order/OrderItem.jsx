import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  console.log(isLoadingIngredients)
  return (
    <li className="px-4 py-2">
      <div className="flex flex-wrap items-center justify-between">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm text-stone-500">
        {!isLoadingIngredients ? ingredients.join(", ") : "Loading..."}
      </p>
    </li>
  );
}

export default OrderItem;
