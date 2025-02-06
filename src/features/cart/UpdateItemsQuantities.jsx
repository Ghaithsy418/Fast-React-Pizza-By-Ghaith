import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseQuantity, getTotalQuantityById, increaseQuantity } from './cartSlice'

function UpdateItemsQuantities({pizzaId}) {
    const totalQuantity = useSelector(getTotalQuantityById(pizzaId));
    const dispatch = useDispatch();
    return (
        <div className="flex items-center gap-2">
            <Button type="round" onClick={()=> dispatch(decreaseQuantity(pizzaId))} >-</Button>
            <span className="font-medium text-sm md:text-base md:font-semibold">{totalQuantity}</span>
            <Button type="round" onClick={()=> dispatch(increaseQuantity(pizzaId))} >+</Button>
        </div>
    )
}

export default UpdateItemsQuantities
