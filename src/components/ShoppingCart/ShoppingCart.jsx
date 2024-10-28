/* eslint-disable react/no-unescaped-entities */
import css from "./ShoppingCart.module.css";
import { DataUserForm } from "../DataUserForm/DataUserForm";
import { SavedDrugs } from "../SavedDrugs/SavedDrugs";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDrugsForShop,
  selectDataUser,
  selectError,
  selectScreenWidth,
} from "../../redux/selectors";
import { delAllDrSh } from "../../redux/drugsLSSlice";
import { orderDrugs } from "../../redux/opertions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShoppingCart = () => {
  const disp = useDispatch();

  const realScreenWidth = useSelector(selectScreenWidth);
  const drForSh = useSelector(selectDrugsForShop);
  const dataUser = useSelector(selectDataUser);
  const error = useSelector(selectError);

  const message = useRef("You haven't selected any products yet");

  let allPrice = 0;
  if (drForSh.length > 0) {
    let allPr = 0;
    drForSh.forEach((dr) => {
      allPr += Number(dr.price.replace(/,/g, ".")) * Number(dr.quantity);
    });
    allPrice = allPr.toFixed(2).replace(/\./g, ",");
  }

  const divDataUsSavDrRef = useRef(null);
  const divTotButShCRef = useRef(null);
  const buttonShDelRef = useRef(null);
  const buttonShCFormRef = useRef(null);
  const divSvgBDelRef = useRef(null);
  const divSvgBShCRef = useRef(null);
  const totShCRef = useRef(null);

  const forAllDel = () => {
    disp(delAllDrSh());
  };

  const forSubmit = (e) => {
    e.preventDefault();
    let allUD = false;
    for (const key in dataUser) {
      if (dataUser[key].trim() === "") {
        allUD = false;
        break;
      } else {
        allUD = true;
      }
    }
    if (!allUD) {
      toast.error(
        <p style={{ fontSize: `14px` }}>Please fill in all customer details</p>
      );
    } else if (drForSh.length < 1) {
      toast.error(
        <p style={{ fontSize: `14px` }}>
          You haven't selected any products yet
        </p>
      );
    } else if (error) {
      toast.error(
        <p style={{ fontSize: `14px` }}>
          Oops... Something went wrong. Please try again later
        </p>
      );
    } else {
      const orderData = {
        user: dataUser,
        order: drForSh,
      };
      disp(orderDrugs(orderData));
      message.current = `${dataUser.name}, thank you for your order. Expect a call from our manager.`;
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(
        <p style={{ fontSize: `14px` }}>
          Oops... Something went wrong. Please try again later
        </p>
      );
      message.current = "You haven't selected any products yet";
    }
  });

  useEffect(() => {
    if (
      divDataUsSavDrRef.current &&
      divTotButShCRef.current &&
      buttonShCFormRef.current &&
      divSvgBShCRef.current &&
      totShCRef.current &&
      buttonShDelRef.current &&
      divSvgBDelRef.current
    ) {
      const divDataUsSavDr = divDataUsSavDrRef.current;
      const divTotButShC = divTotButShCRef.current;
      const buttonShDel = buttonShDelRef.current;
      const buttonShCForm = buttonShCFormRef.current;
      const divSvgBDel = divSvgBDelRef.current;
      const divSvgBShC = divSvgBShCRef.current;
      const totShC = totShCRef.current;
      divDataUsSavDr.style.gap = realScreenWidth / 50 + "px";
      divTotButShC.style.gap = realScreenWidth / 50 + "px";
      divTotButShC.style.paddingTop = realScreenWidth / 100 + "px";
      buttonShDel.style.width = realScreenWidth / 6.67 + "px";
      buttonShDel.style.borderRadius = realScreenWidth / 66.67 + "px";
      buttonShDel.style.fontSize = realScreenWidth / 55.556 + "px";
      buttonShDel.style.gap = realScreenWidth / 66.67 + "px";
      buttonShCForm.style.width = realScreenWidth / 6.67 + "px";
      buttonShCForm.style.borderRadius = realScreenWidth / 66.67 + "px";
      buttonShCForm.style.fontSize = realScreenWidth / 55.556 + "px";
      buttonShCForm.style.gap = realScreenWidth / 66.67 + "px";
      divSvgBDel.style.width = realScreenWidth / 33.33 + "px";
      divSvgBDel.style.height = realScreenWidth / 33.33 + "px";
      divSvgBShC.style.width = realScreenWidth / 33.33 + "px";
      divSvgBShC.style.height = realScreenWidth / 33.33 + "px";
      totShC.style.fontSize = realScreenWidth / 41.667 + "px";
    }
  });

  return (
    <>
      <form className={css.formShC} onSubmit={forSubmit}>
        <div ref={divDataUsSavDrRef} className={css.divDataUsSavDr}>
          <DataUserForm />
          <SavedDrugs message={message.current} />
        </div>
        <div ref={divTotButShCRef} className={css.divTotButShC}>
          <p ref={totShCRef} className={css.totShC}>
            <b>Total price: {allPrice} &#8372;</b>
          </p>
          <button
            ref={buttonShDelRef}
            className={css.buttonShCForm}
            onClick={forAllDel}
            type="button"
          >
            <p>Delete All</p>
            <div ref={divSvgBDelRef} className={css.divSvgBDel}></div>
          </button>
          <button
            ref={buttonShCFormRef}
            className={css.buttonShCForm}
            type="submit"
          >
            <p>Buy</p>
            <div ref={divSvgBShCRef} className={css.divSvgBShC}></div>
          </button>
        </div>
        <ToastContainer />
      </form>
    </>
  );
};

export default ShoppingCart;
