import React from "react";
import { BsBoxSeam, BsCurrencyDollar } from "react-icons/bs";

import { Button, EarningData } from "../components";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { useQuery } from "react-query";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FiBarChart } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { currentColor, formatNumber } = useStateContext();
  const { data: members, isLoading } = useQuery("members", async () => {
    const response = await axiosClient.get("/members");
    return response.data.members;
  });
  const { data: me } = useQuery("me", async () => {
    const response = await axiosClient.get("/me");
    return response.data;
  });
  const { data: pastProfits } = useQuery("pastProfits", async () => {
    const response = await axiosClient.get("/past-profits");
    return response.data.past_profits;
  });
  const { data: receivables } = useQuery("receivables", async () => {
    const response = await axiosClient.get("/receivables");
    return response.data.receivables;
  });

  const calculateTotals = (members) => {
    return members.reduce(
      (totals, member) => {
        totals.sim_pok += member.sim_pok || 0;
        totals.sim_waj += member.sim_waj || 0;
        totals.sim_suk += member.sim_suk || 0;

        return totals;
      },
      {
        sim_pok: 0,
        sim_waj: 0,
        sim_suk: 0,
        total_setoran: 0,
      }
    );
  };

  const calculatePhu = (pastProfits) => {
    return pastProfits.reduce(
      (profits, pastProfit) => {
        profits.modal += pastProfit.modal || 0;
        profits.user.modal += pastProfit.user?.modal || 0;
        profits.transaksi += pastProfit.transaksi || 0;
        profits.user.transaksi += pastProfit.user?.transaksi || 0;

        return profits;
      },
      {
        modal: 0,
        transaksi: 0,
        user: {
          modal: 0,
          transaksi: 0,
        },
      }
    );
  };

  const totals = members ? calculateTotals(members) : {};
  const profits = pastProfits ? calculatePhu(pastProfits) : {};

  const totalMusyarakah = receivables?.reduce(
    (acc, curr) => acc + (curr?.total_musyarakah || 0),
    0
  );
  const totalMudharabah = receivables?.reduce(
    (acc, curr) => acc + (curr?.total_mudharabah || 0),
    0
  );
  const totalMurabahah = receivables?.reduce(
    (acc, curr) => acc + (curr?.total_murabahah || 0),
    0
  );

  return (
    <div className='mt-24'>
      <div className='flex flex-wrap lg:flex-nowrap justify-center '>
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-bold text-gray-400'>Jumlah</p>
              <p className='text-2xl'>
                Rp{" "}
                {isLoading ? (
                  <span className='loading loading-spinner loading-sm'></span>
                ) : (
                  formatNumber(
                    totals?.sim_pok + totals?.sim_waj + totals?.sim_suk || "-"
                  )
                )}
              </p>
            </div>
            <button
              type='button'
              style={{ backgroundColor: currentColor }}
              className='text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4'
            >
              <BsCurrencyDollar />
            </button>
          </div>
          <div className='mt-6'>
            <a
              href='https://forms.gle/XrW6pHZDEj2kTGuD9'
              target='_blank'
              onClick={() => setIsClicked(initialState)}
              style={{
                backgroundColor: currentColor,
                color: "white",
                borderRadius: "10px",
              }}
              className='p-3'
            >
              Ajukan Angsuran
            </a>
          </div>
        </div>
        <div className='flex m-3 flex-wrap justify-center gap-1 items-center'>
          {me?.role === "admin" && (
            <EarningData
              iconColor='#03C9D7'
              iconBg='#E5FAFB'
              icon={<MdOutlineSupervisorAccount />}
              amount={members?.length || "-"}
              percentage=''
              title='Anggota'
            />
          )}
          <EarningData
            iconColor='rgb(255, 244, 229)'
            iconBg='rgb(254, 201, 15)'
            icon={<BsBoxSeam />}
            amount={`Rp ${formatNumber(totals.sim_pok || "-")}`}
            pcColor='green-600'
            percentage=''
            title='Simpanan Pokok'
          />
          <EarningData
            iconColor='rgb(228, 106, 118)'
            iconBg='rgb(255, 244, 229)'
            icon={<FiBarChart />}
            amount={`Rp ${formatNumber(totals.sim_waj || "-")}`}
            pcColor='green-600'
            percentage=''
            title='Simpanan Wajib'
          />
          <EarningData
            iconColor='rgb(0, 194, 146)'
            iconBg='rgb(235, 250, 242)'
            icon={<HiOutlineRefresh />}
            amount={`Rp ${formatNumber(totals.sim_suk || "-")}`}
            pcColor='green-600'
            percentage=''
            title='Simpanan Sukarela'
          />
          <EarningData
            iconColor='#03C9D7'
            iconBg='#E5FAFB'
            icon={<MdOutlineSupervisorAccount />}
            amount={`Rp ${formatNumber(
              Math.round(
                profits.modal +
                  profits.user?.modal +
                  (profits.transaksi + profits.user?.transaksi)
              ) || "-"
            )}`}
            pcColor='green-600'
            percentage=''
            title='SHU'
          />
          <EarningData
            iconColor='rgb(228, 106, 118)'
            iconBg='rgb(255, 244, 229)'
            icon={<FiBarChart />}
            amount={`Rp ${formatNumber(
              totalMusyarakah + totalMudharabah + totalMurabahah || "-"
            )}`}
            pcColor='green-600'
            percentage=''
            title='Jumlah Piutang'
          />
        </div>
      </div>

      <div className='flex gap-10 m-4 flex-wrap justify-center'>
        {/* <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl'>
              <div className='flex justify-between items-center gap-2'>
                <p className='text-xl font-semibold'>Recent Transactions</p>
              </div>
              <div className='mt-10 w-72 md:w-400'>
                {recentTransactions.map((item) => (
                  <div key={item.title} className='flex justify-between mt-4'>
                    <div className='flex gap-4'>
                      <button
                        type='button'
                        style={{
                          color: item.iconColor,
                          backgroundColor: item.iconBg,
                        }}
                        className='text-2xl rounded-lg p-4 hover:drop-shadow-xl'
                      >
                        {item.icon}
                      </button>
                      <div>
                        <p className='text-md font-semibold'>{item.title}</p>
                        <p className='text-sm text-gray-400'>{item.desc}</p>
                      </div>
                    </div>
                    <p className={`text-${item.pcColor}`}>{item.amount}</p>
                  </div>
                ))}
              </div>
              <div className='flex justify-between items-center mt-5 border-t-1 border-color'>
                <div className='mt-3'>
                  <Button
                    color='white'
                    bgColor={currentColor}
                    text='Add'
                    borderRadius='10px'
                  />
                </div>

                <p className='text-gray-400 text-sm'>36 Recent Transactions</p>
              </div>
            </div> */}
        {/* <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760'>
              <div className='flex justify-between items-center gap-2 mb-10'>
                <p className='text-xl font-semibold'>Sales Overview</p>
              </div>
            </div> */}
      </div>

      {/* <div className='flex flex-wrap justify-center'>
            <div className='md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3'>
              <div className='flex justify-between'>
                <p className='text-xl font-semibold'>Weekly Stats</p>
                <button
                  type='button'
                  className='text-xl font-semibold text-gray-500'
                >
                  <IoIosMore />
                </button>
              </div>

              <div className='mt-10 '>
                {weeklyStats.map((item) => (
                  <div
                    key={item.title}
                    className='flex justify-between mt-4 w-full'
                  >
                    <div className='flex gap-4'>
                      <button
                        type='button'
                        style={{ background: item.iconBg }}
                        className='text-2xl hover:drop-shadow-xl text-white rounded-full p-3'
                      >
                        {item.icon}
                      </button>
                      <div>
                        <p className='text-md font-semibold'>{item.title}</p>
                        <p className='text-sm text-gray-400'>{item.desc}</p>
                      </div>
                    </div>

                    <p className={`text-${item.pcColor}`}>{item.amount}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3'>
              <div className='flex justify-between'>
                <p className='text-xl font-semibold'>MedicalPro Branding</p>
                <button
                  type='button'
                  className='text-xl font-semibold text-gray-400'
                >
                  <IoIosMore />
                </button>
              </div>
              <p className='text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-24 bg-orange-400 py-0.5 px-2 text-gray-200 mt-10'>
                16 APR, 2021
              </p>

              <div className='flex gap-4 border-b-1 border-color mt-6'>
                {medicalproBranding.data.map((item) => (
                  <div
                    key={item.title}
                    className='border-r-1 border-color pr-4 pb-2'
                  >
                    <p className='text-xs text-gray-400'>{item.title}</p>
                    <p className='text-sm'>{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className='border-b-1 border-color pb-4 mt-2'>
                <p className='text-md font-semibold mb-2'>Teams</p>

                <div className='flex gap-4'>
                  {medicalproBranding.teams.map((item) => (
                    <p
                      key={item.name}
                      style={{ background: item.color }}
                      className='cursor-pointer hover:drop-shadow-xl text-white py-0.5 px-3 rounded-lg text-xs'
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className='mt-2'>
                <p className='text-md font-semibold mb-2'>Leaders</p>
                <div className='flex gap-4'>
                  {medicalproBranding.leaders.map((item, index) => (
                    <img
                      key={index}
                      className='rounded-full w-8 h-8'
                      src={item.image}
                      alt=''
                    />
                  ))}
                </div>
              </div>
              <div className='flex justify-between items-center mt-5 border-t-1 border-color'>
                <div className='mt-3'>
                  <Button
                    color='white'
                    bgColor={currentColor}
                    text='Add'
                    borderRadius='10px'
                  />
                </div>

                <p className='text-gray-400 text-sm'>36 Recent Transactions</p>
              </div>
            </div>
            <div className='w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3'>
              <div className='flex justify-between'>
                <p className='text-xl font-semibold'>Daily Activities</p>
                <button
                  type='button'
                  className='text-xl font-semibold text-gray-500'
                >
                  <IoIosMore />
                </button>
              </div>
              <div className='mt-10'>
                <img className='md:w-96 h-50 ' src={product9} alt='' />
                <div className='mt-8'>
                  <p className='font-semibold text-lg'>React 18 coming soon!</p>
                  <p className='text-gray-400 '>By Johnathan Doe</p>
                  <p className='mt-8 text-sm text-gray-400'>
                    This will be the small description for the news you have
                    shown here. There could be some great info.
                  </p>
                  <div className='mt-3'>
                    <Button
                      color='white'
                      bgColor={currentColor}
                      text='Read More'
                      borderRadius='10px'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
    </div>
  );
};

export default Dashboard;
