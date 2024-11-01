import React from "react";
import {
  FiEdit,
  FiBarChart,
} from "react-icons/fi";
import {
  BsBoxSeam,
  BsCurrencyDollar,
} from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import { RiStockLine } from "react-icons/ri";
import {
  MdOutlineSupervisorAccount,
  MdDashboard,
  MdPolicy,
} from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaBook, FaMoneyCheckDollar } from "react-icons/fa6";
import avatar from "./avatar.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.png";
import avatar4 from "./avatar4.jpg";
import product5 from "./product5.jpg";
import product6 from "./product6.jpg";
import product7 from "./product7.jpg";

export const gridOrderImage = (props) => (
  <div>
    <img
      className='rounded-xl h-20 md:ml-3'
      src={props.ProductImage}
      alt='order-item'
    />
  </div>
);

export const gridOrderStatus = (props) => (
  <button
    type='button'
    style={{ background: props.StatusBg }}
    className='text-white py-1 px-2 capitalize rounded-2xl text-md'
  >
    {props.Status}
  </button>
);

export const barChartData = [
  [
    { x: "USA", y: 46 },
    { x: "GBR", y: 27 },
    { x: "CHN", y: 26 },
  ],
  [
    { x: "USA", y: 37 },
    { x: "GBR", y: 23 },
    { x: "CHN", y: 18 },
  ],
  [
    { x: "USA", y: 38 },
    { x: "GBR", y: 17 },
    { x: "CHN", y: 26 },
  ],
];

export const colorMappingData = [
  [
    { x: "Jan", y: 6.96 },
    { x: "Feb", y: 8.9 },
    { x: "Mar", y: 12 },
    { x: "Apr", y: 17.5 },
    { x: "May", y: 22.1 },
    { x: "June", y: 25 },
    { x: "July", y: 29.4 },
    { x: "Aug", y: 29.6 },
    { x: "Sep", y: 25.8 },
    { x: "Oct", y: 21.1 },
    { x: "Nov", y: 15.5 },
    { x: "Dec", y: 9.9 },
  ],
  ["#FFFF99"],
  ["#FFA500"],
  ["#FF4040"],
];

export const rangeColorMapping = [
  { label: "1°C to 10°C", start: "1", end: "10", colors: colorMappingData[1] },

  {
    label: "11°C to 20°C",
    start: "11",
    end: "20",
    colors: colorMappingData[2],
  },

  {
    label: "21°C to 30°C",
    start: "21",
    end: "30",
    colors: colorMappingData[3],
  },
];

export const ColorMappingPrimaryXAxis = {
  valueType: "Category",
  majorGridLines: { width: 0 },
  title: "Months",
};

export const ColorMappingPrimaryYAxis = {
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelFormat: "{value}°C",
  title: "Temperature",
};

export const LinePrimaryXAxis = {
  valueType: "DateTime",
  labelFormat: "y",
  intervalType: "Years",
  edgeLabelPlacement: "Shift",
  majorGridLines: { width: 0 },
  background: "white",
};

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "dashboard",
        icon: <MdDashboard />,
      },
    ],
  },

  {
    title: "Koperasi",
    links: [
      {
        name: "identitas koperasi",
        icon: <HiBuildingOffice2 />,
      },
      {
        name: "informasi koperasi",
        icon: <HiBuildingOffice2 />,
      },
      {
        name: "kegiatan koperasi",
        icon: <HiBuildingOffice2 />,
      },
      {
        name: "data anggota",
        icon: <IoMdContacts />,
      },
      {
        name: "bagan perkiraan",
        icon: <RiStockLine />,
      },
      {
        name: "laporan awal ekuitas",
        icon: <FaBook />,
      },
      {
        name: "kebijakan koperasi",
        icon: <MdPolicy />,
      },
      {
        name: "jurnal",
        icon: <FaBook />,
      },
      {
        name: "buku besar",
        icon: <FaBook />,
      },
    ],
  },
  {
    title: "Laporan",
    links: [
      {
        name: "laporan neraca",
        icon: <FiEdit />,
      },
      {
        name: "laporan PHU",
        icon: <FiEdit />,
      },
      {
        name: "laporan arus kas",
        icon: <FiEdit />,
      },
      {
        name: "laporan modal anggota akhir",
        icon: <FiEdit />,
      },
      {
        name: "piutang awal",
        icon: <FaMoneyCheckDollar />,
      },
      {
        name: "laporan piutang akhir",
        icon: <FiEdit />,
      },
      {
        name: "laporan SHU bagian pemilik",
        icon: <FiEdit />,
      },
      {
        name: "Profil",
        icon: <FiEdit />,
      },
      // {
      //   name: "laporan perubahan modal",
      //   icon: <FiEdit />,
      // },
    ],
  },
];

export const linkMember = [
  {
    title: "Dashboard",
    links: [
      {
        name: "dashboard",
        icon: <MdDashboard />,
      },
    ],
  },

  {
    title: "Koperasi",
    links: [
      {
        name: "identitas koperasi",
        icon: <HiBuildingOffice2 />,
      },
      {
        name: "informasi koperasi",
        icon: <HiBuildingOffice2 />,
      },
      {
        name: "kegiatan koperasi",
        icon: <HiBuildingOffice2 />,
      },
    ],
  },
  {
    title: "Laporan",
    links: [
      {
        name: "laporan modal anggota akhir",
        icon: <FiEdit />,
      },
      {
        name: "laporan piutang akhir",
        icon: <FiEdit />,
      },
      {
        name: "laporan SHU bagian pemilik",
        icon: <FiEdit />,
      },
      {
        name: "profil",
        icon: <FiEdit />,
      },
    ],
  },
];

export const cartData = [
  {
    image: product5,
    name: "butterscotch ice-cream",
    category: "Milk product",
    price: "$250",
  },
  {
    image: product6,
    name: "Supreme fresh tomato",
    category: "Vegetable Item",
    price: "$450",
  },
  {
    image: product7,
    name: "Red color candy",
    category: "Food Item",
    price: "$190",
  },
];

export const chatData = [
  {
    image: avatar2,
    message: "Roman Joined the Team!",
    desc: "Congratulate him",
    time: "9:08 AM",
  },
  {
    image: avatar3,
    message: "New message received",
    desc: "Salma sent you new message",
    time: "11:56 AM",
  },
  {
    image: avatar4,
    message: "New Payment received",
    desc: "Check your earnings",
    time: "4:39 AM",
  },
  {
    image: avatar,
    message: "Jolly completed tasks",
    desc: "Assign her new tasks",
    time: "1:12 AM",
  },
];

export const earningData = [
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: "39,354",
    percentage: "-4%",
    title: "Customers",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "red-600",
  },
  {
    icon: <BsBoxSeam />,
    amount: "4,396",
    percentage: "+23%",
    title: "Products",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
    pcColor: "green-600",
  },
  {
    icon: <FiBarChart />,
    amount: "423,39",
    percentage: "+38%",
    title: "Sales",
    iconColor: "rgb(228, 106, 118)",
    iconBg: "rgb(255, 244, 229)",

    pcColor: "green-600",
  },
  {
    icon: <HiOutlineRefresh />,
    amount: "39,354",
    percentage: "-12%",
    title: "Refunds",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
];

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
  },
];
