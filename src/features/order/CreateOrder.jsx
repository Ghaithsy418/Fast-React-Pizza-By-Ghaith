import { Form, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getTotalCartPrice } from "../cart/cartSlice";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);
  const formError = useActionData();
  const navigation = useNavigation();
  const cart = useSelector(getCart);
  const isSubmitting = navigation.state === "submitting";
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = useSelector(getTotalCartPrice) + priorityPrice;
  const dispatch = useDispatch();

  const isLoadingAddress = addressStatus === "pending";

  return (
    <div className="mt-8">
      <h2 className="mb-8 text-2xl font-semibold text-stone-800">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST" className="p-4">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="customer" className="ml-1 sm:basis-35">
            First Name
          </label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              id="customer"
              required
              className="input w-full"
              defaultValue={username}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="phone" className="ml-1 sm:basis-35">
            Phone number
          </label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              className="input w-full"
            />
            {formError?.phone && (
              <p className="mt-3 ml-4 max-w-[500px] rounded-md bg-red-100 p-1 text-xs text-red-500">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="address" className="ml-1 sm:basis-35">
            Address
          </label>
          <div className="relative grow">
            <input
              type="text"
              name="address"
              id="address"
              required
              className="input w-full"
              defaultValue={address}
              disabled={isLoadingAddress}
            />
            <div className="absolute top-[3px] right-[3px] sm:top-[8px] md:top-[5px] md:right-[5px]">
              <Button
                type="small"
                onClick={() => dispatch(fetchAddress())}
                disabled={isLoadingAddress}
              >
                Get Position
              </Button>
            </div>
            {addressStatus === "error" && (
              <p className="mt-3 ml-4 max-w-[500px] rounded-md bg-red-100 p-1 text-xs text-red-500">
                {addressError}
              </p>
            )}
          </div>
        </div>

        <div className="mb-8 ml-2 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-500 focus:ring-3 focus:ring-yellow-300 focus:ring-offset-1 focus:outline-none"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "Creating order..."
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
