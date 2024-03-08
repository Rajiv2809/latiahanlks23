import { useState, createContext, useContext,  } from "react";



const StateContext = createContext({
    currentUser: {},
    userToken : null,
    toast: {
        message: "",
        show: false,
    },
    stoks: [],
    penjualans:[],
    pendapatans:[],
    tenants:[],
    setStoks: () => {},
    setPenjualans: () => {},
    setPendapatans: () => {},
    setTenants: () => {},
    setUserToken : () => {},
    setCurrentUser : () =>{}
        
    
    }
)

export const ContextProvider = ({ children }) => {
    const [currentUser , setCurrentUser] = useState({});
    const [userToken, setUserToken] = useState(localStorage.getItem('accessToken'));
    const [stoks, setStoks] = useState([]);
    const [penjualans, setPenjualans] =useState([]);
    const [pendapatans, setPendapatans] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [toast, setToast] = useState({ message: "", show: false, color: "" });

    const setToken = (token) => {
        if (token) {
          localStorage.setItem('accessToken', token); 
        } else {
          localStorage.removeItem('accessToken');
        }
        setUserToken(token);
      };
    
      const showToast = (message, color) => {
        setToast({
          message: message,
          show: true,
          color: color,
        });
    
        setTimeout(() => {
          setToast({ message: "", show: false, color: "" });
        }, 3000);
      };
    


    return(
        <StateContext.Provider
            value={{ 
                currentUser,
                userToken,
                setCurrentUser,
                setUserToken,
                stoks,
                penjualans,
                pendapatans,
                tenants,
                setStoks,
                setPendapatans,
                setPenjualans,
                setTenants,
                toast,
                showToast,
                setToken,

                
            }}
        >
            {children}
        </StateContext.Provider>
    )


}

export const useStateContext = () => useContext(StateContext);