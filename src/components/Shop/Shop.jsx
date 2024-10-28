import { useDispatch } from "react-redux";
import { fetchDrugs, fetchPharmacies } from "../../redux/opertions";
import { PharmaciesList } from "../PharmaciesList/PharmaciesList";
import { DrugsList } from "../DrugsList/DrugsList";
import css from "./Shop.module.css";
import { Filters } from "../Filters/Filters";

const Shop = () => {
  const dispatch = useDispatch();

  dispatch(fetchDrugs());
  dispatch(fetchPharmacies());

  return (
    <>
      <Filters />
      <div className={css.allShopDiv}>
        <PharmaciesList />
        <DrugsList />
      </div>
    </>
  );
};

export default Shop;
