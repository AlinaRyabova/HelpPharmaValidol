import { useSelector, useDispatch } from "react-redux";
import {
  selectPharmacies,
  selectFilterPharm,
  selectScreenWidth,
  selectScreenHeight,
  selectIsLoading,
} from "../../redux/selectors";
import css from "./PharmaciesList.module.css";
import { Pharmacy } from "../Pharmacy/Pharmacy";
import { useRef, useEffect } from "react";
import { setPhafm } from "../../redux/filterSlice";
import { Loader } from "../Loader/Loader";

export const PharmaciesList = () => {
  const pharmacies = useSelector(selectPharmacies);
  const disp = useDispatch();
  const actId = useSelector(selectFilterPharm);
  const realScreenWidth = useSelector(selectScreenWidth);
  const realScreenHeight = useSelector(selectScreenHeight);
  const isLoading = useSelector(selectIsLoading);

  const allPharmaciesListDivRef = useRef(null);
  const pharmaciesHlllRef = useRef(null);
  const pharmaciesUlRef = useRef(null);
  const phormasyButtonRef = useRef(null);
  const noPharmPRef = useRef(null);

  const butCl = () => {
    disp(setPhafm(""));
  };

  useEffect(() => {
    const allIdsPh = pharmacies.map((p) => p.id);
    if (allPharmaciesListDivRef.current) {
      const allPharmaciesListDiv = allPharmaciesListDivRef.current;
      allPharmaciesListDiv.style.height = `${
        realScreenHeight - realScreenHeight / 3
      }px`;
      allPharmaciesListDiv.style.width = `${realScreenWidth / 6.8}px`;
    }
    if (pharmaciesHlllRef.current) {
      const pharmaciesHlll = pharmaciesHlllRef.current;
      pharmaciesHlll.style.margin = `${realScreenWidth / 72}px 0 0 0`;
      pharmaciesHlll.style.fontSize = `${realScreenWidth / 80}px`;
    }
    if (pharmaciesUlRef.current && phormasyButtonRef.current) {
      const pharmaciesUl = pharmaciesUlRef.current;
      pharmaciesUl.style.padding = `${realScreenWidth / 72}px ${
        realScreenWidth / 48
      }px`;
      pharmaciesUl.style.gap = `${realScreenWidth / 72}px`;
      const phormasyButton = phormasyButtonRef.current;
      phormasyButton.style.width = realScreenWidth / 9.6 + "px";
      phormasyButton.style.height = realScreenWidth / 29 + "px";
      phormasyButton.style.fontSize = realScreenWidth / 103 + "px";

      if (!allIdsPh.includes(actId)) {
        phormasyButton.classList.add(css.phormasyButtonAct);
      } else {
        phormasyButton.classList.remove(css.phormasyButtonAct);
      }
    }
    if (noPharmPRef.current) {
      const noPharmP = noPharmPRef.current;
      noPharmP.style.margin = `${realScreenWidth / 52}px 0 0 0`;
      noPharmP.style.fontSize = `${realScreenWidth / 60}px`;
    }
  });

  return (
    <div
      ref={allPharmaciesListDivRef}
      className={[css.allPharmaciesListDiv, "allPharmaciesListDiv"].join(" ")}
    >
      {isLoading ? (
        <>
          <h3 ref={pharmaciesHlllRef} className={css.pharmaciesHlll}>
            Pharmacies
          </h3>
          <Loader />
        </>
      ) : pharmacies.length > 0 ? (
        <>
          <h3 ref={pharmaciesHlllRef} className={css.pharmaciesHlll}>
            Pharmacies
          </h3>
          <ul ref={pharmaciesUlRef} className={css.pharmaciesUl}>
            <li className={css.pharmaciesLi}>
              <button
                ref={phormasyButtonRef}
                className={css.phormasyButton}
                type="button"
                onClick={butCl}
              >
                All pharmacies
              </button>
            </li>
            {pharmacies.map((ph) => (
              <li key={ph.id} className={css.pharmaciesLi}>
                <Pharmacy pharmacy={ph} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p ref={noPharmPRef} className={css.noPharmP}>
          No pharmacies found
        </p>
      )}
    </div>
  );
};
