/* eslint-disable react/prop-types */
import css from "../PharmaciesList/PharmaciesList.module.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPhafm } from "../../redux/filterSlice";
import { selectFilterPharm, selectScreenWidth } from "../../redux/selectors";

export const Pharmacy = ({ pharmacy }) => {
  const disp = useDispatch();
  const actId = useSelector(selectFilterPharm);
  const realScreenWidth = useSelector(selectScreenWidth);

  const phormasyButtonRef = useRef(null);

  const butClick = (id) => {
    disp(setPhafm(id));
  };

  useEffect(() => {
    if (phormasyButtonRef.current) {
      const phormasyButton = phormasyButtonRef.current;
      phormasyButton.style.width = realScreenWidth / 9.6 + "px";
      phormasyButton.style.height = realScreenWidth / 29 + "px";
      phormasyButton.style.fontSize = realScreenWidth / 103 + "px";
      if (pharmacy.id === actId) {
        phormasyButton.classList.add(css.phormasyButtonAct);
      } else {
        phormasyButton.classList.remove(css.phormasyButtonAct);
      }
    }
  });
  return (
    <button
      ref={phormasyButtonRef}
      className={css.phormasyButton}
      type="button"
      onClick={() => butClick(pharmacy.id)}
    >
      {pharmacy.name}
    </button>
  );
};
