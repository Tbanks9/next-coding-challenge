'use client';
import { useState } from 'react';
import styles from './page.module.css';

// I originally initialised two types: Item and Product. It made sense for me to merge them in the end.
interface Item {
  name: string;
  description: string;
  quantity: number;
}

function ItemCount({ count, name }: { count: number; name: string }) {
  return (
    <div>
      {name} count: {count}
    </div>
  );
}

const initialItems: Item[] = [
  { name: 'Item 1', description: 'Foo', quantity: 0 },
  { name: 'Item 2', description: 'Bar', quantity: 0 },
  { name: 'Item 3', description: 'Baz', quantity: 0 },
  { name: 'Item 4', description: 'Qux', quantity: 0 },
];

export default function Home() {
  // In order to display the items original states and render the buttons, I've set the inital state with initialItems
  const [items, setItems] = useState<Item[]>(initialItems);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (productName: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.name === productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Michael&apos;s Amazing Web Store</p>
        <div>
          <button className={styles.basket}>Basket: {itemCount} items</button>
          {items.map((item) => (
            <ItemCount key={item.name} name={item.name} count={item.quantity} />
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {items.map((item) => (
          <button
            key={item.name}
            className={styles.card}
            onClick={() => addToCart(item.name)}
            aria-label={`Add ${item.name} to basket`}
          >
            <h2>
              {item.name} <span>-&gt;</span>
            </h2>
            <p>{item.description}</p>
          </button>
        ))}
      </div>
    </main>
  );
}
