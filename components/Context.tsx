import React, { createContext, useContext, useState, ReactNode } from 'react';

type GlobalState = {
    profileChange: boolean;
};

type ContextType = {
    globalState: GlobalState;
    updateGlobalState: (newValue: GlobalState) => void;
};

const AppContext = createContext<ContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
};

type MyContextProviderProps = {
    children: ReactNode;
};

export const AppProvider: React.FC<MyContextProviderProps> = ({ children }) => {
    const [globalState, setGlobalState] = useState<GlobalState>({ profileChange: false });

    const updateGlobalState = (newValue: GlobalState) => {
        setGlobalState(newValue);
    };

    return (
        <AppContext.Provider value={{ globalState, updateGlobalState }}>
            {children}
        </AppContext.Provider>
    );
};