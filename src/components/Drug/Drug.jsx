/* eslint-disable react/prop-types */
import css from "./Drug.module.css";
import { useEffect, useRef } from "react";
import {
  addFavoriteDrugs,
  delFavoriteDrugs,
  addDrFShop,
  delDrFShop,
} from "../../redux/drugsLSSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFavoriteDrugs,
  selectDrugsForShop,
  selectScreenWidth,
} from "../../redux/selectors";

export const Drug = ({ drug }) => {
  const dispatch = useDispatch();
  const favDr = useSelector(selectFavoriteDrugs);
  const shDr = useSelector(selectDrugsForShop);
  const realScreenWidth = useSelector(selectScreenWidth);

  const isFav = favDr.includes(drug.id);
  const inTrol = shDr.some((sd) => sd.id === drug.id);

  const addToBackedButRef = useRef(null);
  const drugDivRef = useRef(null);
  const divAddToBackedButRef = useRef(null);
  const favoriteRef = useRef(null);
  const infoDrugRef = useRef(null);
  const drugLiRef = useRef(null);
  const drugImgRef = useRef(null);

  const addFavDr = (id) => {
    dispatch(addFavoriteDrugs(id));
  };

  const delFavDr = (id) => {
    dispatch(delFavoriteDrugs(id));
  };

  const addOrDel = (id) => {
    if (isFav) {
      delFavDr(id);
    } else {
      addFavDr(id);
    }
  };

  const addDrSh = (d) => {
    dispatch(addDrFShop(d));
  };

  const delDrSh = (d) => {
    dispatch(delDrFShop(d));
  };

  const addTrOrDel = (d) => {
    if (inTrol) {
      delDrSh(d);
    } else {
      addDrSh(d);
    }
  };

  useEffect(() => {
    if (
      addToBackedButRef.current &&
      drugDivRef.current &&
      divAddToBackedButRef.current &&
      favoriteRef.current &&
      infoDrugRef.current &&
      drugLiRef.current &&
      drugImgRef.current
    ) {
      const drugLi = drugLiRef.current;
      const drugDiv = drugDivRef.current;
      const addToBackedBut = addToBackedButRef.current;
      const divAddToBackedBut = divAddToBackedButRef.current;
      const favorite = favoriteRef.current;
      const infoDrug = infoDrugRef.current;
      const drugImg = drugImgRef.current;

      let c = 2;
      if (realScreenWidth > 1000) {
        c = 2.989;
      }
      const widthSize =
        (realScreenWidth -
          realScreenWidth / 6.6 -
          40 -
          realScreenWidth / 72 -
          (realScreenWidth / 50) * c -
          (realScreenWidth / 55) * c) /
        c;
      drugLi.style.width = `${widthSize}px`;
      drugLi.style.height = `${widthSize * 1.176}px`;

      let secCoef = 1;
      if (realScreenWidth > 1000) {
        secCoef = 1.3;
      }
      drugDiv.style.fontSize = realScreenWidth / (103 * secCoef) + "px";
      drugLi.style.paddingBottom = realScreenWidth / 72 + "px";
      addToBackedBut.style.height = realScreenWidth / (24 * secCoef) + "px";
      addToBackedBut.style.gap = realScreenWidth / 288 + "px";
      addToBackedBut.style.right = realScreenWidth / 72 + "px";
      addToBackedBut.style.bottom = realScreenWidth / 72 + "px";
      addToBackedBut.style.borderRadius = realScreenWidth / 72 + "px";
      addToBackedBut.style.fontSize = realScreenWidth / (80 * secCoef) + "px";
      addToBackedBut.style.padding = `0 ${realScreenWidth / 144}px 0 ${
        realScreenWidth / 96
      }px`;
      divAddToBackedBut.style.width = realScreenWidth / 48 + "px";
      favorite.style.width = realScreenWidth / 48 + "px";
      favorite.style.height = realScreenWidth / 48 + "px";
      favorite.style.right = realScreenWidth / 72 + "px";
      favorite.style.top = realScreenWidth / 72 + "px";
      infoDrug.style.marginLeft = realScreenWidth / 72 + "px";
      infoDrug.style.gap = realScreenWidth / 144 + "px";
      drugImg.style.margin = realScreenWidth / 35 + "px";
      if (isFav) {
        favorite.classList.add(css.isFavorite);
      } else {
        favorite.classList.remove(css.isFavorite);
      }
      if (inTrol) {
        divAddToBackedBut.classList.add(css.divDelToBackedBut);
      } else {
        divAddToBackedBut.classList.remove(css.divDelToBackedBut);
      }
    }
  });

  return (
    <li ref={drugLiRef} className={css.drugLi}>
      <div ref={drugDivRef} className={css.drugDiv}>
        <button
          type="button"
          ref={favoriteRef}
          className={css.favoriteBut}
          onClick={() => addOrDel(drug.id)}
        ></button>
        <img
          ref={drugImgRef}
          className={css.drugImg}
          src={drug.image}
          alt={drug.name}
        />
        <div ref={infoDrugRef} className={css.infoDrug}>
          <p className={css.pInfoDrug}>
            <b>{drug.name}</b>
          </p>
          <p className={css.pInfoDrug}>
            <b>Price: </b>
            {drug.price} &#8372;
          </p>
          <p className={css.pInfoDrug}>
            <b>Manufacturing date:</b> {drug.dataWasAdded}
          </p>
        </div>
        <button
          type="button"
          ref={addToBackedButRef}
          className={css.addToBackedBut}
          onClick={() => addTrOrDel(drug)}
        >
          {inTrol ? <span>Delete</span> : <span>Add</span>}
          <div
            ref={divAddToBackedButRef}
            className={css.divAddToBackedBut}
          ></div>
        </button>
      </div>
    </li>
  );
};
