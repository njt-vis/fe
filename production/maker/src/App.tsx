import type { Component } from 'solid-js';

import styles from './App.module.css';

const Test = () => {
  const handleClick = () => {};
  return (
    <div>
      <button onClick={handleClick}>click</button>
    </div>
  );
};

const App: Component = () => (
  <div class={styles.App}>
    <Test />
  </div>
);

export default App;
