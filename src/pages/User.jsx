import RecentUserCard from "../Components/Card/RecentUserCard.jsx";
import UserOverview from "../Components/Card/UserOverview.jsx";
import UserTable from "../Components/Tables/UserTable.jsx";

const User = () => {
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
