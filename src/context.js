import React, { useState, useContext } from 'react'

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
   
    const closeModal = () => {
       setModalOpen(false);
   }

  return (
      <AppContext.Provider value={{
          modalOpen,
          openModal,
          closeModal,
        }}
        >{children}
        </AppContext.Provider>
    )
}
// custom hook
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}