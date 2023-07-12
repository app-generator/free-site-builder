import ContainedButton from "../AllComponents/Buttons/ContainedButton";
import OutlinedButton from "../AllComponents/Buttons/OutlinedButton";
import Input from "../AllComponents/Input/Input";
import CustomCard from "../Cards/CustomCard";
import ImgCard from "../ImageCard/cardComp.jpg";
import containButton from "../ImageCard/btnImg/button.png";
import input from "../ImageCard/input.png";
import BarChart from "../Charts/BarChart";
import LineChart from "../Charts/LineChart";
import Multiplecharts from "../Charts/Multiplecharts";
import barchart from "../ImageCard/chartImg/BarChart.jpg";
import linechart from "../ImageCard/chartImg/LineChart.jpg";
import multiChart from "../ImageCard/chartImg/MultiChart.jpg";
import ColEightFour from "../Grid/ColEightFour";
import ColFour from "../Grid/ColFour";
import ColFourEight from "../Grid/ColFourEight";
import ColSix from "../Grid/ColSix";
import ColThree from "../Grid/ColThree";
import ColTweleve from "../Grid/ColTweleve";
import grid84 from "../ImageCard/Grid/grid-8-4-cols.png";
import grid48 from "../ImageCard/Grid/grid-4-8-cols.png";
import grid4 from "../ImageCard/Grid/grid-4-cols.png";
import grid12 from "../ImageCard/Grid/grid-12-col.png";
import grid3 from "../ImageCard/Grid/grid-3-cols.png";
import grid6 from "../ImageCard/Grid/grid-6-cols.png";
import StickyTable from "../Table/StickyTable";
import sticky_table from "../ImageCard/Tables/stickyTable.jpg";

const componentsdata = [
    {
        id: 1,
        element: <ContainedButton />,
        name: "containerButtton",
        picture: containButton,
        desc: "ContaindButton",
    },
    {
        id: 2,
        element: <OutlinedButton />,
        name: "outlineButton",
        desc: "OutlinedButton",
        picture: containButton,
    },

    {
        id: 3,
        element: <Input />,
        name: "input",
        desc: "Input",
        picture: input,
    },
];
export const chartsData = [
    {
        id: 4,
        element: <BarChart />,
        name: "BarChart",
        desc: "BarChart",
        picture: barchart,
    },
    {
        id: 5,
        element: <LineChart />,
        name: "LineChart",
        desc: "LineChart",
        picture: linechart,
    },

    {
        id: 6,
        element: <Multiplecharts />,
        name: "Multiplecharts",
        desc: "Multiplecharts",
        picture: multiChart,
    },
];

export const gridData = [
    {
        id: 7,
        element: <ColEightFour />,
        name: "COl-8- 4",
        desc: "ColEightFour",
        picture: grid84,
    },
    {
        id: 8,
        element: <ColFour />,
        name: "Col4",
        desc: "ColFour",
        picture: grid4,
    },

    {
        id: 9,
        element: <ColFourEight />,
        name: "Col-4-8",
        desc: "ColFourEight",
        picture: grid48,
    },
    {
        id: 10,
        element: <ColSix />,
        name: "Col-6",
        desc: "ColSix",
        picture: grid6,
    },
    {
        id: 11,
        element: <ColThree />,
        name: "Col-3",
        desc: "ColThree",
        picture: grid3,
    },
    {
        id: 12,
        element: <ColTweleve />,
        name: "Col-12",
        desc: "ColTwelve",
        picture: grid12,
    },
];

export const cardComponet = [
    { id: 13, element: <CustomCard />, picture: ImgCard, desc: "Card Stat" },
];

export const tables = [
    {
        id: 14,
        element: <StickyTable />,
        name: "Tables",
        desc: "Sticky Table",
        picture: sticky_table,
    },
];
export default componentsdata;
