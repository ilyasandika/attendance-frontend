import {
    ArrowLeftStartOnRectangleIcon, BriefcaseIcon,
    ClockIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    UserGroupIcon
} from '@heroicons/react/24/solid'
import {
    Area,
    AreaChart as AreaChartGraph,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {useEffect, useState} from "react";
import attendanceServices from "../../services/attendanceServices.js";
import dayjs from "dayjs";
import {capitalize} from "../../utils/helper.js";
import {useTranslation} from "react-i18next";
import Loading from "../../Components/Utils/Loading.jsx";

const DashboardInfo = () => {
    const [areaChartOption, setAreaChartOption] = useState("daily");
    const [dataByTime, setDataByTime] = useState([{name : "default", value: 0 }]);
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [pieData, setPieData] = useState([])
    const [prevAttendanceSummary, setPrevAttendanceSummary] = useState({})
    const [attendanceSummary, setAttendanceSummary] = useState({})
    const [loading, setLoading] = useState(true)
    const [loadingTimeline, setLoadingTimeline] = useState(true)
    const [loadingSummary, setLoadingSummary] = useState(true)

    const {t} = useTranslation();

    const getAttendanceTimeLine = async (option) => {
        try {
            const timeLine = await attendanceServices.getAttendanceTimeLine(date, option)

            let data = []
            timeLine.data.payload.map((item) => {
                data.push(
                    {
                        name : item.type === "monthly" ? dayjs(item.date, "YYYY-MM").locale("id").format("MMM YYYY") : item.date,
                        value : (item.totalPresent * 100).toFixed(2),
                    }
                )
            })
            setDataByTime(data)
        } catch {
            console.error("Error fetching attendance time line:", error);
        } finally {
            setLoadingTimeline(false)
        }
    }

    const getAttendanceSummary = async () => {
        try {
            setLoadingSummary(true)
            const response = await attendanceServices.getAttendanceSummary(date);
            const prevData = await attendanceServices.getAttendanceSummary(dayjs(date).subtract(1, "day").format("YYYY-MM-DD"));
            setPrevAttendanceSummary(prevData.data.payload);
            const data = response.data.payload;
            setAttendanceSummary(data);
            setPieData([
                { name: capitalize(t("onTime")), value: data.onTime.value, color: "#4ADE80" },
                { name: capitalize(t("late")), value: data.late.value, color: "#FACC15" },
                { name: capitalize(t("absent")), value: data.absent.value, color: "#F87171" },
                { name: capitalize(t("dayOff")), value: data.dayOff.value, color: "#94A3B8" },
                { name: capitalize(t("earlyLeave")), value: data.earlyLeave.value, color: "#fa8b15" },
            ])
        } catch (error) {
            console.error("Error fetching attendance summary:", error);
        } finally {
            setLoadingSummary(false)
        }
    }

    useEffect(() => {
        getAttendanceSummary();
    }, []);

    useEffect(()=>{
        getAttendanceSummary()
    },[date])


    const changeAreaChartOption = (option) => {
         setAreaChartOption(option);
    }

    function compareWithYesterday(a, b, flipped = false) {
        const value = a - b;

        let isBetter = value > 0;
        if (flipped) {
            isBetter = !isBetter;
        }

        return {
            isBetter,
            value,
        };
    }

    useEffect(()=>{
        const setAreaChartData = () => {
            switch (areaChartOption) {
                case "daily":
                    getAttendanceTimeLine("daily")
                    break;
                case "monthly":
                    getAttendanceTimeLine("monthly");
                    break;
                case "yearly":
                    getAttendanceTimeLine("yearly");
                    break;
            }
        }
        setAreaChartData();
    }, [areaChartOption])


    const renderColorfulLegendText = (value, entry) => {
        const { color } = entry;
        return <span style={{ color }} className="text-xs mt-4">{value}</span>;
    };

    return (
     <>

         <div className="flex justify-end mb-4">
             <input
                 type="date"
                 defaultValue={date}
                 className="p-2 text-center bg-white rounded-xl"
                 onChange={(e) => setDate(e.target.value)}
             />


         </div>


         <div className="flex mb-4 gap-4 w-full">
             <div className="flex flex-col items-center p-4 bg-white justify-center rounded-xl w-[30%]">
                 <span className="font-semibold">{capitalize(t("attendanceDistribution"))}</span>
                 {loadingSummary ?
                    <Loading/>
                     :
                     <div className="h-[220px] w-full">
                         {pieData &&
                             <ResponsiveContainer>
                                 <PieChart>
                                     <Pie
                                         data={pieData}
                                         dataKey="value"
                                         cx="50%"
                                         cy="50%"
                                         outerRadius={80}
                                     >
                                         {pieData.map((entry, index) => (
                                             <Cell key={`cell-${index}`} fill={entry.color} />
                                         ))}
                                     </Pie>
                                     <Tooltip />
                                     <Legend iconSize={8} formatter={renderColorfulLegendText} />
                                 </PieChart>
                             </ResponsiveContainer>
                         }
                     </div>
                 }
             </div>
             <div className="grid grid-cols-3 gap-4 w-[80%]">
                 <CardItems logo={<UserGroupIcon className="w-4"/>}
                            value={attendanceSummary?.totalUser?.value}
                            subValue={capitalize(t("totalUsers"))}
                            information={compareWithYesterday(attendanceSummary?.totalUser?.value, prevAttendanceSummary?.totalUser?.value)}
                            loading = {loadingSummary && true}
                 />

                 <CardItems logo={<ClockIcon className="w-4"/>}
                            value={attendanceSummary?.onTime?.value}
                            subValue={capitalize(t("onTime"))}
                            information={compareWithYesterday(attendanceSummary?.onTime?.value, prevAttendanceSummary?.onTime?.value)}
                            loading = {loadingSummary && true}
                 />
                 <CardItems logo={<ExclamationCircleIcon className="w-4"/>}
                            value={attendanceSummary?.late?.value}
                            subValue={capitalize(t("late"))}
                            information={compareWithYesterday(attendanceSummary?.late?.value, prevAttendanceSummary?.late?.value, true)}
                            loading = {loadingSummary && true}
                 />
                 <CardItems logo={<ArrowLeftStartOnRectangleIcon className="w-4"/>}
                            value={attendanceSummary?.earlyLeave?.value}
                            subValue={capitalize(t("earlyLeave"))}
                            information={compareWithYesterday(attendanceSummary?.earlyLeave?.value, prevAttendanceSummary?.earlyLeave?.value, true)}
                            loading = {loadingSummary && true}
                 />
                 <CardItems logo={<ExclamationTriangleIcon className="w-4"/>}
                            value={attendanceSummary?.absent?.value}
                            subValue={capitalize(t("absent"))}
                            information={compareWithYesterday(attendanceSummary?.absent?.value, prevAttendanceSummary?.absent?.value, true)}
                            loading = {loadingSummary && true}
                 />
                 <CardItems logo={<BriefcaseIcon className="w-4"/>}
                            value={attendanceSummary?.dayOff?.value}
                            subValue={capitalize(t("dayOff"))}
                            information={compareWithYesterday(attendanceSummary?.dayOff?.value, prevAttendanceSummary?.dayOff?.value, true)}
                            loading = {loadingSummary && true}
                 />
             </div>
         </div>
        <AreaChart data={dataByTime} changeAreaChartOption={changeAreaChartOption} areaChartOption={areaChartOption} />
     </>
    )
}

const CardItems = ({logo, value, subValue, information, loading }) => {
    return (

            <div className="px-5 py-5 bg-white rounded-xl">
                <div className="flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-4xl">{loading ? <Loading size={20}/>  : value}</span>
                        <span className="bg-background p-2 rounded-full">{logo}</span>
                    </div>
                    <div className="text-left space-y-1">
                        <p className="text-sm font-medium">{subValue}</p>
                        <div className="flex items-center gap-2">
                            <span className={`${information.value === 0 ? "bg-gray-500/30" : information.isBetter ? "bg-green-500/30" : "bg-red-500/30"}  p-2 rounded-full`}></span>
                            <span className="text-xs">{
                                information.value === 0 ? "Tidak ada perubahan"  : `${information.value > 0 ? '+' + information.value : information.value } dari kemarin`
                            }</span>
                        </div>
                    </div>
                </div>

            </div>
    )
}

const AreaChart = ({data, changeAreaChartOption, areaChartOption}) => {
    const {t} = useTranslation();
    const minItem = data.reduce((min, item) =>
            item.value < min.value ? item : min,
        data[0]
    );

    const maxItem = data.reduce((max, item) =>
            Number(item.value) > Number(max.value) ? item : max,
        data[0]
    );

    const CustomDot = (props) => {

        const { cx, cy, value } = props;

        const isMax = value[1] === maxItem.value;

        return (
            <g>
                <circle cx={cx} cy={cy} r={isMax ? 8 : 4} stroke="#273240" strokeWidth={2} fill="white" />
                {isMax && (
                    <text x={cx} y={cy - 15} textAnchor="middle" className={""}>
                        {Number(value[1])}%
                    </text>
                )}
            </g>
        );
    };

    return (
        <div className="p-8 w-full h-[400px] bg-white rounded-xl mb-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-left text-xl mb-4 font-bold">{capitalize(t("attendanceComparisonChart"))}</h2>
                <div className="flex gap-4 cursor-pointer">
                    <span onClick={() => { changeAreaChartOption("daily")}} className={`p-2 rounded-lg hover:bg-gray-100 ${areaChartOption === "daily" && "bg-gray-100"}`}>{capitalize(t("daily"))}</span>
                    <span onClick={() => { changeAreaChartOption("monthly")}} className={`p-2 rounded-lg hover:bg-gray-100 ${areaChartOption === "monthly" && "bg-gray-100"}`}>{capitalize(t("monthly"))}</span>
                    <span onClick={() => { changeAreaChartOption("yearly")}} className={`p-2 rounded-lg hover:bg-gray-100 ${areaChartOption === "yearly" && "bg-gray-100"}`}>{capitalize(t("annual"))}</span>
                </div>
            </div>
            <ResponsiveContainer>
                <AreaChartGraph
                    data={data}
                    margin={{
                        top: 30,
                        right: 30,
                        left: -10,
                        bottom: 40,
                    }}
                    label
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3354F4" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#3354F4" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name"  tick={{fontSize: 12}} interval={0} />
                    <YAxis domain={[0, 100]}/>
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />

                    <Area type="monotone"
                          dataKey="value"
                          stroke="#273240"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorUv)"
                          dot={<CustomDot/>} />
                </AreaChartGraph>
            </ResponsiveContainer>
        </div>
    )
}

export default DashboardInfo;