import css from "./DropListPrice.module.css";
import { setPrice, setAlf, setDate } from "../../redux/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { selectScreenWidth } from "../../redux/selectors";

export const DropListPrice = () => {
  const disp = useDispatch();

  const realScreenWidth = useSelector(selectScreenWidth);

  const l = "l";
  const n = "n";
  const h = "h";

  const ulDrLRef = useRef(null);
  const firstChildRef = useRef(null);
  const lastChildRef = useRef(null);

  const setState = (l) => {
    disp(setPrice(l));
    disp(setAlf(n));
    disp(setDate(n));
  };

  useEffect(() => {
    if (ulDrLRef.current && firstChildRef.current && lastChildRef.current) {
      const ulDrL = ulDrLRef.current;
      const firstChild = firstChildRef.current;
      const lastChild = lastChildRef.current;
      const buttonFAs = document.querySelectorAll(".buttonFA");
      const divArrows = document.querySelectorAll(".divArrow");

      let coef = 1;
      if (realScreenWidth > 1000) {
        coef = 1.3;
      }

      ulDrL.style.width = realScreenWidth / (10 * coef) + "px";
      ulDrL.style.borderRadius = realScreenWidth / 100 + "px";
      firstChild.style.borderRadius = `${realScreenWidth / 111}px ${
        realScreenWidth / 111
      }px 0 0`;
      lastChild.style.borderRadius = `0 0 ${realScreenWidth / 111}px ${
        realScreenWidth / 111
      }px`;
      if (buttonFAs) {
        buttonFAs.forEach((buttonFA) => {
          buttonFA.style.width = realScreenWidth / (10 * coef) + "px";
          buttonFA.style.fontSize = realScreenWidth / (71 * coef) + "px";
          buttonFA.style.height = realScreenWidth / (24 * coef) + "px";
          buttonFA.style.gap = realScreenWidth / (66.67 * coef) + "px";
          buttonFA.style.paddingLeft = realScreenWidth / 200 + "px";
        });
      }
      if (divArrows) {
        divArrows.forEach((divArrow) => {
          divArrow.style.width = realScreenWidth / (50 * coef) + "px";
          divArrow.style.height = realScreenWidth / (50 * coef) + "px";
        });
      }
    }
  });

  return (
    <ul ref={ulDrLRef} className={css.ulDrL}>
      <li>
        <button
          type="button"
          ref={firstChildRef}
          className={[css.buttonFA, css.firstChild, "buttonFA"].join(" ")}
          onClick={() => {
            setState(l);
          }}
        >
          <p>L to H</p>
          <div className={[css.divArrow, "divArrow"].join(" ")}></div>
        </button>
      </li>
      <li>
        <button
          type="button"
          className={[css.buttonFA, "buttonFA"].join(" ")}
          onClick={() => {
            setState(h);
          }}
        >
          <p>H to L</p>
          <div className={[css.divArrow, "divArrow"].join(" ")}></div>
        </button>
      </li>
      <li>
        <button
          type="button"
          ref={lastChildRef}
          className={[css.buttonFA, css.lastChild, "buttonFA"].join(" ")}
          onClick={() => {
            setState(n);
          }}
        >
          <p>Reset</p>
          <div className={[css.divArrow, "divArrow"].join(" ")}></div>
        </button>
      </li>
    </ul>
  );
};
