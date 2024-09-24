import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Navbar, Footer, Sidebar } from "..";
import ThemeSettings from "../ThemeSettings";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../../context/ContextProvider";

const DefaultLayout = () => {
  const {
    token,
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  if (!token) {
    return <Navigate to='/account/auth/login' />;
  }

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className='flex relative transition duration-300 dark:bg-main-dark-bg'>
        <div className='fixed right-4 bottom-4' style={{ zIndex: "1000" }}>
          <TooltipComponent content='Settings' position='Top'>
            <button
              type='button'
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className='text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray'
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className='w-72 fixed sidebar transition duration-300 dark:bg-secondary-dark-bg bg-white '>
            <Sidebar />
          </div>
        ) : (
          <div className='w-0 transition duration-300 dark:bg-secondary-dark-bg'>
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "transition duration-300 dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "transition duration-300 bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full '>
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}

            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
