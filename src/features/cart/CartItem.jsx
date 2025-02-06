import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemsQuantities from "./UpdateItemsQuantities";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="p-2 sm:flex sm:items-center sm:justify-between space-x-40">
      <p className="font-semibold">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-5">
        <p className="text-sm text-stone-500">{formatCurrency(totalPrice)}</p>
        <UpdateItemsQuantities pizzaId={pizzaId} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
