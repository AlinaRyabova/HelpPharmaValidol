import css from "./Filter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectFilter, selectScreenWidth } from "../../redux/selectors";
import { setFilter } from "../../redux/filterSlice";
import { useState, useEffect, useRef } from "react";

export const Filter = () => {
  const filterWithState = useSelector(selectFilter);
  const realScreenWidth = useSelector(selectScreenWidth);
  const dispatch = useDispatch();
  const [placeholderValue, setPlaceholderValue] = useState("");

  const inputFilterRef = useRef(null);

  const updateStateForFilter = (evt) => {
    evt.preventDefault();
    const filterValue = evt.target.value;
    dispatch(setFilter(filterValue));
  };

  useEffect(() => {
    if (realScreenWidth > 465) {
      setPlaceholderValue("Please start typing the desired name");
    } else if (realScreenWidth <= 465 && realScreenWidth > 370) {
      setPlaceholderValue("Please start typing name");
    } else {
      setPlaceholderValue("Type name");
    }

    if (inputFilterRef.current) {
      const inputFilter = inputFilterRef.current;
      let coef = 1;
      if (realScreenWidth > 1000) {
        coef = 1.3;
      }
      inputFilter.style.borderRadius = realScreenWidth / 100 + "px";
      inputFilter.style.width = realScreenWidth / (2 * coef) + "px";
      inputFilter.style.height = realScreenWidth / (25 * coef) + "px";
      inputFilter.style.padding = `0 ${realScreenWidth / 100}px`;
      inputFilter.style.margin = `0 0 ${realScreenWidth / 50}px 0`;
      inputFilter.style.fontSize = `${realScreenWidth / (71 * coef)}px`;
    }
  }, [realScreenWidth]);

  return (
    <input
      ref={inputFilterRef}
      value={filterWithState}
      className={css.inputFilter}
      type="text"
      name="filter"
      placeholder={placeholderValue}
      onChange={updateStateForFilter}
    />
  );
};
