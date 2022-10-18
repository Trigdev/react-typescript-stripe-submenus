import React, { useState, useContext } from "react";
import sublinks from "./data";

type AppProviderProps = {
  children: React.ReactNode;
};

type LocationProps = {
  center: string | number;
  bottom: string | number;
};

type SublinksProps = {
  page: string;
  links: { label: string; icon: JSX.Element; url: string }[];
};

type ContextState = {
  isSidebarOpen: boolean;
  isSubmenuOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  openSubmenu: (text: string, coordinates: LocationProps) => void;
  closeSubmenu: () => void;
  location: LocationProps;
  page: SublinksProps;
};

const AppContext = React.createContext({} as ContextState);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(true);
  const [location, setLocation] = useState<LocationProps>({} as LocationProps);
  const [page, setPage] = useState<SublinksProps>({
    page: "",
    links: [],
  } as SublinksProps);

  const openSidebar = (): void => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = (): void => {
    setIsSidebarOpen(false);
  };

  const openSubmenu = (text: string, coordinates: LocationProps): void => {
    const newPage = sublinks.find((link) => link.page === text);
    setPage(newPage as SublinksProps);

    setLocation(coordinates);
    setIsSubmenuOpen(true);
  };

  const closeSubmenu = (): void => {
    setIsSubmenuOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        isSubmenuOpen,
        openSidebar,
        closeSidebar,
        openSubmenu,
        closeSubmenu,
        location,
        page,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
