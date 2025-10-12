import AppRoutes from "./routes/routes.jsx";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import AlertModal from "./Modal/AlertModal.jsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react"; // theme css file

function App() {
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState();

    useEffect(() => {
        if (location.state?.success) {
            setSuccessMessage(location.state.success);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);


    return (
        <div className={"relative"}>
            {
                successMessage && (
                    <AlertModal message={successMessage} onClose={() => setSuccessMessage(null)}/>
                )
            }

            <AppRoutes setSuccessMessage={setSuccessMessage}/>;
        </div>
        )


}

export default App;
