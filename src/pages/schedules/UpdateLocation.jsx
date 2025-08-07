import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import locationServices from "../../services/locationServices";
import LocationForm from "../forms/LocationForm";

const UpdateLocationPage = () => {
    const { id } = useParams();
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (data) => {
        try {
            await locationServices.updateLocation(id, data);
            alert("Location updated successfully!");
            window.location.href = "/shifts-locations";
        } catch (err) {
            console.error("Update Error:", err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await locationServices.getLocationById(id);
                const data = res.data.payload;
                setLocation({
                    name: data.name || "",
                    description: data.description || "",
                    radius: data.radius || "",
                    address: data.address || "",
                    latitude: data.latitude?.toString() || "-6.2",
                    longitude: data.longitude?.toString() || "106.8",
                    default: data.default || false,
                });
            } catch (err) {
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="p-12">Loading...</div>;

    return <LocationForm mode="edit" initialValues={location} onSubmit={handleSubmit} />;
};

export default UpdateLocationPage;
