import React from "react";
import { useSpring, animated } from "react-spring";
import "./Card.css";

export default function({
  value,
  image,
  selected,
  onClick,
  height = 100,
  width = 100
}) {
  const { transform, opacity } = useSpring({
    opacity: selected ? 1 : 0,
    transform: `perspective(600px) rotateY(${selected ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  return (
    <li onClick={onClick}>
      <div className="card-wrapper">
        <animated.div
          className="card back"
          style={{
            opacity: opacity.interpolate(o => 1 - o),
            transform,
            height,
            width
          }}
        />
        <animated.div
          className="card front"
          style={{
            opacity,
            backgroundImage: `url(${image})`,

            transform: transform.interpolate(t => `${t} rotateY(180deg)`),
            height,
            width
          }}
        />
      </div>
    </li>
  );
}
