import { Link } from "react-router-dom";
import css from "./Navigation.module.css";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDrugsForShop, selectScreenWidth } from "../../redux/selectors";

export const Navigation = () => {
  const drugsForShop = useSelector(selectDrugsForShop);
  const realScreenWidth = useSelector(selectScreenWidth);

  let allQuan = 0;
  if (drugsForShop.length > 0) {
    drugsForShop.forEach((dr) => {
      allQuan += Number(dr.quantity);
    });
  }

  const divNavigationRef = useRef(null);
  const divNavShopCartRef = useRef(null);
  const buttonNavShopCartRef = useRef(null);
  const divPLenDrRef = useRef(null);
  const pLenDrRef = useRef(null);
  const pNavigationRef = useRef(null);

  useEffect(() => {
    if (
      divNavShopCartRef.current &&
      buttonNavShopCartRef.current &&
      divNavigationRef.current &&
      pNavigationRef.current
    ) {
      const divNavigation = divNavigationRef.current;
      const buttonNavShopCart = buttonNavShopCartRef.current;
      const divNavShopCart = divNavShopCartRef.current;
      const pNavigation = pNavigationRef.current;

      let coef = 1;
      if (realScreenWidth > 1000) {
        coef = 1.3;
      }

      divNavigation.style.paddingTop = `${realScreenWidth / 144}px`;
      divNavigation.style.paddingBottom = `${realScreenWidth / 144}px`;
      buttonNavShopCart.style.height = realScreenWidth / (17 * coef) + "px";
      buttonNavShopCart.style.width = realScreenWidth / (17 * coef) + "px";
      divNavShopCart.style.height = realScreenWidth / (24 * coef) + "px";
      divNavShopCart.style.width = realScreenWidth / (24 * coef) + "px";
      pNavigation.style.fontSize = realScreenWidth / (45 * coef) + "px";
      if (divPLenDrRef.current && pLenDrRef.current) {
        const divPLenDr = divPLenDrRef.current;
        const pLenDr = pLenDrRef.current;
        divPLenDr.style.width = realScreenWidth / (35 * coef) + "px";
        divPLenDr.style.height = realScreenWidth / (35 * coef) + "px";
        pLenDr.style.fontSize = realScreenWidth / (58 * coef) + "px";
      }
    }
  });
  return (
    <div ref={divNavigationRef} className={css.divNavigation}>
      <nav className={css.navNavigation}>
        <Link to={"/"} className={css.aNavigation}>
          <p ref={pNavigationRef} className={css.pNavigation}>
            Shop
          </p>
        </Link>
        <button
          type="button"
          ref={buttonNavShopCartRef}
          className={css.buttonNavShopCart}
        >
          <Link
            to={"/shopping-cart"}
            className={[css.aNavigation, css.aNavigationSecond].join(" ")}
          >
            <div ref={divNavShopCartRef} className={css.divNavShopCart}>
              <p className={[css.pNavigation, css.pNavShopCart].join(" ")}>
                Shopping Cart
              </p>
              {drugsForShop.length > 0 && (
                <div ref={divPLenDrRef} className={css.divPLenDr}>
                  <p ref={pLenDrRef} className={css.pLenDr}>
                    {allQuan}
                  </p>
                </div>
              )}
            </div>
          </Link>
        </button>
      </nav>
    </div>
  );
};
