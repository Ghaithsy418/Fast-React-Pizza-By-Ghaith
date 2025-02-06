import { redirect } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { createOrder, updateOrder } from "../services/apiRestaurant";
import store from "../store";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// eslint-disable-next-line no-unused-vars
export async function ChangePriorityAction({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

export async function CreateOrderAction({ request }) {
  const data = await request.formData();
  const objData = Object.fromEntries(data);

  const order = {
    ...objData,
    cart: JSON.parse(objData.cart),
    priority: objData.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "This phone number isn't valid, We might need it later :)";
  if (Object.keys(errors).length > 0) return errors;

  store.dispatch(clearCart());
  const res = await createOrder(order);
  return redirect(`/order/${res.id}`);
}
