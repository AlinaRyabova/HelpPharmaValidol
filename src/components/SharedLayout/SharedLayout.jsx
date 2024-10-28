import { Navigation } from "../Navigation/Navigation";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import css from "./SharedLayout.module.css";
import { useDispatch } from "react-redux";
import { setScreenOrientation } from "../../redux/drugsLSSlice";
import { useEffect } from "react";
import useResizeAware from "react-resize-aware";

export const SharedLayout = () => {
  const dispatch = useDispatch();

  const [resizeListener, sizes] = useResizeAware();

  useEffect(() => {
    if (sizes) {
      dispatch(
        setScreenOrientation({
          screenWidth: sizes.width,
          screenHeight: sizes.height,
        })
      );
    }
  });

  return (
    <div className={css.allDiv}>
      {resizeListener}
      <header>
        <Navigation />
      </header>
      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
