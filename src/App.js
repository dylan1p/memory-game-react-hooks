import React, { useReducer, useState, useEffect } from "react";
import Card from "./Card";
import "./App.css";

const initialState = ({ noOfItems, height = 100, width = 100 }) => {
  const state = [...new Array(noOfItems)].reduce((acc, currImage, index) => {
    const randomImage = `https://picsum.photos/${height}/${width}?random&noCache=${Math.random()}`;
    return [
      ...acc,
      { value: index, image: randomImage },
      { value: index, image: randomImage }
    ];
  }, []);

  return state.sort(() => Math.random() - 0.5);
};

function reducer(state, action) {
  switch (action.type) {
    case "match":
      return state.map(
        item => (item.value === action.value ? { ...item, match: true } : item)
      );
    case "reset":
      return state
        .map(item => ({ ...item, match: false }))
        .sort(() => Math.random() - 0.5);
    default:
      throw new Error();
  }
}

const App = props => {
  const [state, dispatch] = useReducer(reducer, initialState(props));
  const [selectedItems = [], setSelectedItems] = useState([]);

  useEffect(
    () => {
      if (selectedItems.length < 2) return;
      if (
        selectedItems[0].value === selectedItems[1].value &&
        selectedItems[0].index !== selectedItems[1].index
      ) {
        dispatch({ type: "match", value: selectedItems[1].value });
        setSelectedItems([]);
      } else {
        setTimeout(() => setSelectedItems([]), 1000);
      }
    },
    [selectedItems]
  );

  useEffect(
    () => {
      if (state.every(item => item.match)) {
        alert("You win!!");
        dispatch({ type: "reset" });
      }
    },
    [state]
  );

  const canSelect = selectedItems.length < 2;
  return (
    <ul className="panels">
      {state.map((item, index) => (
        <Card
          key={index}
          selected={
            selectedItems.find(item => item.index === index) || item.match
          }
          {...item}
          onClick={() => {
            canSelect &&
              setSelectedItems(items =>
                setSelectedItems([...items, { ...item, index }])
              );
          }}
        />
      ))}
    </ul>
  );
};

export default App;
