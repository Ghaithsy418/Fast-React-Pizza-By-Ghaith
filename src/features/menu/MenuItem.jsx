import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getTotalQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemsQuantities from "../cart/UpdateItemsQuantities";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const itemQuantity = useSelector(getTotalQuantityById(id));
  const isInCart = itemQuantity > 0;
  const dispatch = useDispatch();

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex items-start justify-start gap-4 p-2">
      <img
        src={imageUrl}
        alt={name}
        className={`w-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="mt-0.5 grow">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-xs font-medium text-stone-500 capitalize md:text-sm">
          {ingredients.join(", ")}
        </p>
        <div className="mt-4 flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium text-stone-500 uppercase">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex gap-3 md:gap-7 items-center">
              <UpdateItemsQuantities pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type="small">
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
