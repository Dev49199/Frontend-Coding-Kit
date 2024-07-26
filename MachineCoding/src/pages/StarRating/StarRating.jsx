import { createRef, useCallback, useMemo, useRef, useState } from "react";
import { EmptyStar, FullStar, HalfStar } from "./components/Stars";
import "./StarRatingComponent.css";

export default function StarRating() {
  const COUNT_STAR = 5;
  const [ratingValue, setRatingValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const starRefs = useRef([]);
  const handleStarClick = (event, starNum) => {
    const dimensions = starRefs.current[starNum].getBoundingClientRect();
    if (event.clientX < dimensions.x + dimensions.width / 2) {
      if (ratingValue === starNum + 0.5) {
        setRatingValue(0);
      } else {
        setRatingValue(starNum + 0.5);
      }
    } else {
      if (ratingValue === starNum + 1) {
        setRatingValue(0);
      } else {
        setRatingValue(starNum + 1);
      }
    }
  };

  const handleStarHover = (event, starNum) => {
    const dimensions = starRefs.current[starNum].getBoundingClientRect();
    if (event.clientX < dimensions.x + dimensions.width / 2) {
      setHoverValue(starNum + 0.5);
    } else {
      setHoverValue(starNum + 1);
    }
  };

  const getStars = useMemo(() => {
    const getClickableStar = (index) => {
      return ratingValue > index ? (
        ratingValue - index === 0.5 ? (
          <HalfStar size={80} />
        ) : (
          <FullStar size={80} />
        )
      ) : (
        <EmptyStar size={80} />
      );
    };

    const getHoverStar = (index) => {
      return hoverValue > index ? (
        hoverValue - index === 0.5 ? (
          <HalfStar size={80} />
        ) : (
          <FullStar size={80} />
        )
      ) : (
        <EmptyStar size={80} />
      );
    };
    const stars = Array.from({ length: COUNT_STAR }).map((count, index) => (
      <div
        onClick={(event) => handleStarClick(event, index)}
        ref={(e) => (starRefs.current[index] = e)}
        onMouseMove={(event) => handleStarHover(event, index)}
        onMouseLeave={()=>setHoverValue(0)}
        key={index}
      >
        {ratingValue >= hoverValue ? getClickableStar(index) : getHoverStar(index)}
      </div>
    ));
    return stars;
  }, [ratingValue, hoverValue]);

  return (
    <section>
      <article className="star-ratings">{getStars}</article>
      <p>Rating : {ratingValue}</p>
    </section>
  );
}
