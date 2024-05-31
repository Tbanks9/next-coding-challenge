'use client';
import { useState } from 'react';
import styles from './page.module.css';

interface Item {
  name: string;
  quantity: number;
}

interface Product {
  name: string;
  description: string;
}

function ItemCount({ count, name }: { count: number; name: string }) {
  return (
    <div>
      {name} count: {count}
    </div>
  );
}

const products: Product[] = [
  { name: 'Item 1', description: 'Foo' },
  { name: 'Item 2', description: 'Bar' },
  { name: 'Item 3', description: 'Baz' },
  { name: 'Item 4', description: 'Qux' },
];

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);

  const addToCart = (product: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product);
      if (existingItem) {
        return prevItems.map((item) =>
          item.name === product
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { name: product, quantity: 1 }];
      }
    });
    setItemCount((prevCount) => prevCount + 1);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Michael&apos;s Amazing Web Store</p>
        <div>
          <button className={styles.basket}>Basket: {itemCount} items</button>
          {products.map((product) => (
            <ItemCount
              key={product.name}
              name={product.name}
              count={
                items.find((item) => item.name === product.name)?.quantity || 0
              }
            />
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <button
            key={product.name}
            className={styles.card}
            onClick={() => addToCart(product.name)}
            aria-label={`Add ${product.name} to basket`}
          >
            <h2>
              {product.name} <span>-&gt;</span>
            </h2>
            <p>{product.description}</p>
          </button>
        ))}
      </div>
    </main>
  );
}
