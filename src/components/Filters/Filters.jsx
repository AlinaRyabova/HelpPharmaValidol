import { Filter } from "../Filter/Filter";
import { FilterAlf } from "../FilterAlf/FilterAlf";
import { FilterPrice } from "../FilterPrice/FilterPrice";
import { FilterDate } from "../FilterDate/FilterDate";
import css from "./Filters.module.css";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectScreenWidth } from "../../redux/selectors";

export const Filters = () => {
  const allFiltersRef = useRef(null);

  const realScreenWidth = useSelector(selectScreenWidth);

  useEffect(() => {
    if (allFiltersRef.current) {
      const allFilters = allFiltersRef.current;
      allFilters.style.gap = realScreenWidth / 100 + "px";
    }
  });

  return (
    <div ref={allFiltersRef} className={css.allFilters}>
      <Filter />
      <FilterAlf />
      <FilterPrice />
      <FilterDate />
    </div>
  );
};
