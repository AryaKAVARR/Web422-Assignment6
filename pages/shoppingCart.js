import { useAtom } from 'jotai';
import { shoppingListAtom } from '../store';

export default function Cart() {
  const [shoppingList, setShoppingList] = useAtom(shoppingListAtom);

  if (!shoppingList || shoppingList.length === 0) {
    return null;
  }

  const removeFromCart = (index) => {
    const updatedShoppingList = [...shoppingList];
    updatedShoppingList.splice(index, 1);
    setShoppingList(updatedShoppingList);
  };

  return (
    <>
      <br />
      <ul>
        {shoppingList.map((product, index) => (
          <li key={index}>
            <strong>{product.title}</strong>: {product.description}
            <br />
            <strong>${product.price.toFixed(2)}</strong>
            <button onClick={() => removeFromCart(index)}>Remove</button>
            <br />
            <br />
          </li>
        ))}
      </ul>
      <hr />
      <ul>
        <li>
          <strong>
            Total: ${shoppingList.reduce((total, product) => total + product.price, 0).toFixed(2)}
          </strong>
        </li>
      </ul>
    </>
  );
}
