import css from "./DataUserForm.module.css";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserName,
  setUserEmail,
  setUserPhone,
  setUserAddress,
} from "../../redux/drugsLSSlice";
import {
  selectDataUser,
  selectScreenHeight,
  selectScreenWidth,
} from "../../redux/selectors";

export const DataUserForm = () => {
  const disp = useDispatch();
  const dataUser = useSelector(selectDataUser);
  const realScreenHeight = useSelector(selectScreenHeight);
  const realScreenWidth = useSelector(selectScreenWidth);

  const allDivDUFRef = useRef(null);

  const forInpN = (e) => {
    const inpV = e.target.value;
    disp(setUserName(inpV));
  };

  const forInpE = (e) => {
    const inpV = e.target.value;
    disp(setUserEmail(inpV));
  };

  const forInpP = (e) => {
    const inpV = e.target.value;
    disp(setUserPhone(inpV));
  };

  const forInpA = (e) => {
    const inpV = e.target.value;
    disp(setUserAddress(inpV));
  };

  useEffect(() => {
    if (allDivDUFRef.current) {
      const allDivDUF = allDivDUFRef.current;
      allDivDUF.style.height = realScreenHeight - realScreenHeight / 2.5 + "px";
      allDivDUF.style.width =
        (realScreenWidth - 40 - realScreenWidth / 50) / 2 -
        (realScreenWidth / 50) * 2 +
        "px";
      allDivDUF.style.padding = `${realScreenWidth / 50}px`;
      const labelDUForms = document.querySelectorAll(".labelDUForm");
      const pRegDUForms = document.querySelectorAll(".pRegDUForm");
      if (labelDUForms && pRegDUForms) {
        let coef = 1000 / realScreenWidth;
        let secCoef = 1.3;
        if (realScreenWidth < 900 && realScreenWidth >= 800) {
          coef = 900 / realScreenWidth;
        } else if (realScreenWidth < 800 && realScreenWidth >= 700) {
          coef = 800 / realScreenWidth;
        } else if (realScreenWidth < 700 && realScreenWidth >= 600) {
          coef = 700 / realScreenWidth;
        } else if (realScreenWidth < 600 && realScreenWidth >= 500) {
          coef = 600 / realScreenWidth;
        } else if (realScreenWidth < 500 && realScreenWidth >= 400) {
          coef = 500 / realScreenWidth;
        } else if (realScreenWidth < 400 && realScreenWidth >= 350) {
          coef = 450 / realScreenWidth;
        } else if (realScreenWidth < 350 && realScreenWidth >= 310) {
          coef = 390 / realScreenWidth;
          secCoef = 1.6;
        } else if (realScreenWidth < 310) {
          coef = 380 / realScreenWidth;
          secCoef = 1.7;
        }
        const screenWidth = realScreenWidth < 1000 ? realScreenWidth : 1000;
        labelDUForms.forEach((lab) => {
          lab.style.width = screenWidth / (2.86 * coef) + "px";
          lab.style.fontSize =
            screenWidth > 500 ? screenWidth / 55.56 + "px" : "9px";
          lab.style.margin = screenWidth / 65 + "px";
          lab.style.marginRight = (screenWidth / 25) * coef * secCoef + "px";
        });
        pRegDUForms.forEach((p) => {
          p.style.marginLeft = screenWidth / 100 + "px";
        });
      }
    }
  });
  return (
    <div ref={allDivDUFRef} className={css.allDivDUF}>
      <label className={[css.labelDUForm, "labelDUForm"].join(" ")}>
        <span className={[css.pRegDUForm, "pRegDUForm"].join(" ")}>Name</span>
        <input
          className={css.inputDUForm}
          value={dataUser.name}
          onChange={(e) => forInpN(e)}
          name="name"
          type="text"
          autoComplete="on"
          autoFocus
          placeholder={
            realScreenWidth > 455 ? "Please, enter your name" : "Name"
          }
        />
      </label>
      <label className={[css.labelDUForm, "labelDUForm"].join(" ")}>
        <span className={[css.pRegDUForm, "pRegDUForm"].join(" ")}>Email</span>
        <input
          className={css.inputDUForm}
          value={dataUser.email}
          onChange={(e) => forInpE(e)}
          name="email"
          type="email"
          autoComplete="on"
          placeholder={
            realScreenWidth > 455 ? "Please, enter your email" : "Email"
          }
        />
      </label>
      <label className={[css.labelDUForm, "labelDUForm"].join(" ")}>
        <span className={[css.pRegDUForm, "pRegDUForm"].join(" ")}>Phone</span>
        <input
          className={css.inputDUForm}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9()+\\-]/g, "");
          }}
          value={dataUser.phone}
          onChange={(e) => forInpP(e)}
          name="phone"
          type="text"
          autoComplete="on"
          placeholder={
            realScreenWidth > 455 ? "Please, enter your phone" : "Phone"
          }
        />
      </label>
      <label className={[css.labelDUForm, "labelDUForm"].join(" ")}>
        <span className={[css.pRegDUForm, "pRegDUForm"].join(" ")}>
          Address
        </span>
        <input
          className={css.inputDUForm}
          value={dataUser.address}
          onChange={(e) => forInpA(e)}
          name="address"
          type="text"
          autoComplete="on"
          placeholder={
            realScreenWidth > 455 ? "Please, enter your address" : "Address"
          }
        />
      </label>
    </div>
  );
};
