import locationServices from "../../services/locationServices";
import LocationForm from "../forms/LocationForm";

const CreateLocationPage = () => {
    const handleSubmit = async (data) => {
        try {
            await locationServices.createLocation(data);
            alert("Location created successfully!");
            window.location.href = "/shifts-locations";
        } catch (err) {
            console.error("Create Error:", err);
        }
    };

    return <LocationForm mode="create" onSubmit={handleSubmit} />;
};

export default CreateLocationPage;
