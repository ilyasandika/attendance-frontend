import RecentUserCard from "../Components/Card/RecentUserCard.jsx";
import UserOverview from "../Components/Card/UserOverview.jsx";
import UserTable from "../Components/Tables/UserTable.jsx";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import AlertModal from "../Modal/AlertModal.jsx";

const User = () => {
    // const location = useLocation();
    // const [successMessage, setSuccessMessage] = useState();
    //
    // useEffect(() => {
    //     if (location.state?.success) {
    //         setSuccessMessage(location.state.success);
    //         window.history.replaceState({}, document.title);
    //     }
    //     console.log(successMessage);
    // }, [location.state]);


    return (
        <div className="flex flex-col gap-6">
            <div>
                <UserTable />
            </div>
            <div className="flex gap-6">
                <RecentUserCard />
                <UserOverview />
            </div>
        </div>
    );
};

export default User;
