import { REMOVE, CLEAR_CART, GET_TOTALS, TOGGLE_AMOUNT } from './actions';
import cartItems from "./cart-items";

const initialStore = {
    cart: cartItems,
    total: 0,
    amount: 0,
};

// reducer - function that used to update store with two arguments (state, action)
function reducer(state = initialStore, action) {
    if (action.type === REMOVE) {
        return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) };
    }
    if (action.type === CLEAR_CART) {
        return { ...state, cart: [] };
    }
    if (action.type === GET_TOTALS) {
        let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const { price, amount } = cartItem;
            cartTotal.total += price * amount;
            cartTotal.amount += amount;
            return cartTotal;
        }, { total: 0, amount: 0 });
        total = +total.toFixed(2);
        return { ...state, total, amount };
    }
    if (action.type === TOGGLE_AMOUNT) {
        return {
            ...state, cart: state.cart.map(item => {
                if (item.id === action.payload.id) {
                    if (action.payload.toggle === 'increase') item = { ...item, amount: item.amount + 1 };
                    if (action.payload.toggle === 'decrease') item = { ...item, amount: item.amount - 1 };
                }
                return item;
            })
        };
    }
    return state;
}

export default reducer;