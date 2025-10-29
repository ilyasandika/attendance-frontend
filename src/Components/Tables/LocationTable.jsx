import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {capitalize, updateSearchParams} from "../../utils/helper.js";
import locationServices from "../../services/locationServices.js";
import Action from "../Button/Action.jsx";
import {useTranslation} from "react-i18next";
import ConfirmModal from "../../Modal/ConfirmModal.jsx"; // buat ini nanti

const LocationTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(searchParams.get("locations_search") || "");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const currentPage = Number(searchParams.get("locations_page")) || 1;
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchLocations = useCallback(async () => {
        try {
            const response = await locationServices.getLocationList(currentPage, search, rowsPerPage);
            setLocations(response.data.payload.data);
            setTotalPages(response.data.payload.meta.lastPage || 1);
        } catch (error) {
            console.error("Error fetching locations:", error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, search, rowsPerPage]);

    const deleteLocation = async (id) => {
              await locationServices.deleteLocation(id)
            .then(() => {
                navigate(location.pathname, { state: { success: capitalize(t("successDeleteLocation"), false) } });
                fetchLocations();
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(()=>{
                setDeleteModal(false);
            })
    };

    useEffect(() => {
        if (!searchParams.get("locations_page")) {
            setSearchParams((prev) => {
                prev.set("locations_page", 1);
                return prev;
            });
        }
        const timeout = setTimeout(() => {
            setIsLoading(true);
            fetchLocations();
        }, 500);
        return () => clearTimeout(timeout);
    }, [currentPage, search, rowsPerPage]);

    useEffect(() => {
        updateSearchParams(setSearchParams, currentPage, search, {
            pageName: "locations_page",
            searchName: "locations_search",
        });
    }, [search]);

    const columns = useMemo(
        () => [
            {
                key: "name",
                label: capitalize(t("locations.name")),
                render: (_, row) => (
                    <div className="flex flex-col">
                        <span className="font-bold">{row.name}</span>
                        {row.default ? <span className="text-xs text-green-600 font-semibold">Default</span> : null}
                    </div>
                ),
            },
            {
                key: "latitude",
                label: "Latitude",
            },
            {
                key: "longitude",
                label: "Longitude",
            },
            {
                key: "radius",
                label: "Radius",
                render: (val) => `${val} meter`,
            },
            {
                key: "address",
                label: capitalize(t("address")),
                render: (val) => <span className="line-clamp-1">{val}</span>,
            },
            {
                key: "id",
                label: capitalize(t("action")),
                render: (_, row) => (
                    <Action
                        edit={ {to: `/shifts-locations/locations/edit/${row.id}`} }
                        dump={{onClick:() => {
                                setDeleteId(row.id);
                                setDeleteModal(true)
                            }, disabled: row.isUsed, message: capitalize(t("locations.inUse"), false) }}
                    />
                ),
            },
        ],
        []
    );

    const header = {
        title: capitalize(t('locations.list')),
        button: {
            link: "/shifts-locations/locations/add",
            text: capitalize(t('locations.add')),
        },
    };

    const pagination = {
        setSearch,
        setSearchParams,
        search,
        setRowsPerPage,
        rowsPerPage,
        searchParams,
        totalPages,
        currentPage,
        pageName: "locations_page",
    };

    return (
        <>
            <DataTable header={header} columns={columns} items={locations} pagination={pagination} isLoading={isLoading} />
            {deleteModal && (
                <ConfirmModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} onConfirm={() => deleteLocation(deleteId)}/>
            )}
        </>
    )
};

export default LocationTable;
