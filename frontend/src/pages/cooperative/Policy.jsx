import React, { useEffect, useRef } from "react";
import { Header } from "../../components";
import axiosClient from "../../axios-client";
import { useQuery } from "react-query";
import { useStateContext } from "../../context/ContextProvider";
import Chart from "chart.js/auto";

const Policy = () => {
  const { activeMenu, currentColor, formatNumber } = useStateContext();
  const { data: policy, isLoading } = useQuery("policy", async () => {
    const response = await axiosClient.get("/policies");
    return response.data.policy;
  });
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const danaCadangan = Math.round((policy?.cadangan / 100) * policy?.phu_comp);
  const dibagikan = Math.round((policy?.dibagikan / 100) * policy?.phu_comp);
  const pemilik = Math.round((policy?.pemilik / 100) * policy?.phu_comp);
  const pengurus = Math.round((policy?.pengurus / 100) * policy?.phu_comp);
  const kesejahteraan = Math.round(
    (policy?.kesejahteraan / 100) * policy?.phu_comp
  );
  const wilayahKerja = Math.round(
    (policy?.wilayah_kerja / 100) * policy?.phu_comp
  );
  const sosial = Math.round((policy?.sosial / 100) * policy?.phu_comp);
  const pendidikan = Math.round((policy?.pendidikan / 100) * policy?.phu_comp);

  useEffect(() => {
    if (!policy) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: [
          "Pemilik/Anggota",
          "Pengurus dan Pengawas",
          "Kesejahteraan Karyawan",
          "Pembangunan Wilayah Kerja",
          "Dana Sosial",
          "Dana Pendidikan",
        ],
        datasets: [
          {
            data: [
              policy.pemilik,
              policy.pengurus,
              policy.kesejahteraan,
              policy.wilayah_kerja,
              policy.sosial,
              policy.pendidikan,
            ],
            backgroundColor: [
              "rgb(69, 114, 167)",
              "rgb(170, 70, 67)",
              "rgb(137, 165, 78)",
              "rgb(113, 88, 143)",
              "rgb(65, 152, 175)",
              "rgb(219, 132, 61)",
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "right",
            labels: {
              generateLabels: function (chart) {
                return chart.data.labels.map(function (label, i) {
                  if (i === 0) {
                    return {
                      text: label,
                      fillStyle: chart.data.datasets[0].backgroundColor[i],
                    };
                  } else {
                    return {
                      text: label,
                      fillStyle: chart.data.datasets[0].backgroundColor[i],
                    };
                  }
                });
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label;
              },
            },
          },
        },
      },
    });
  }, [policy]);

  return (
    <div
      className={`m-2 mt-24 transition duration-300 ${
        activeMenu && "md:max-w-5xl"
      }`}
    >
      {isLoading ? (
        <div className='flex items-center justify-center h-72'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : (
        <div className='md:flex'>
          <div className='bg-white md:m-6 p-8 md:p-8 dark:bg-secondary-dark-bg rounded-3xl transition duration-300 md:w-7/12'>
            <Header category='Kebijakan' title='Koperasi' />
            <div className='overflow-x-auto'>
              <table className='table table-xs'>
                <thead>
                  <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                    <th colSpan={2}>Total Surplus Hasil Usaha</th>
                    <th>{policy.surplus}%</th>
                    <th>Rp {formatNumber(policy.phu_comp)}</th>
                  </tr>
                  <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                    <th colSpan={4} className='uppercase text-center'>
                      Pembagian Surplus Hasil Usaha Menurut AD/ART/RA
                    </th>
                  </tr>
                  <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                    <th colSpan={2}>Dana Cadangan</th>
                    <th>{policy.cadangan}%</th>
                    <th>Rp {formatNumber(danaCadangan)}</th>
                  </tr>
                  <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                    <th colSpan={2}>Dibagikan sesuai AD/ART</th>
                    <th>{policy.dibagikan}%</th>
                    <th>Rp {formatNumber(dibagikan)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                    <td>Pemilik/Anggota</td>
                    <td>{policy.pemilik}%</td>
                    <td></td>
                    <td className='bg-red-700 text-gray-200'>
                      Rp {formatNumber(pemilik)}
                    </td>
                  </tr>
                  <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                    <td>Pengurus dan Pengawas</td>
                    <td>{policy.pengurus}%</td>
                    <td></td>
                    <td>Rp {formatNumber(pengurus)}</td>
                  </tr>
                  <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                    <td>Kesejahteraan Karyawan</td>
                    <td>{policy.kesejahteraan}%</td>
                    <td></td>
                    <td>Rp {formatNumber(kesejahteraan)}</td>
                  </tr>
                  <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                    <td>Pembangunan Wilayah Kerja</td>
                    <td>{policy.wilayah_kerja}%</td>
                    <td></td>
                    <td>Rp {formatNumber(wilayahKerja)}</td>
                  </tr>
                  <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                    <td>Dana Sosial</td>
                    <td>{policy.sosial}%</td>
                    <td></td>
                    <td>Rp {formatNumber(sosial)}</td>
                  </tr>
                  <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                    <td>Dana Pendidikan</td>
                    <td>{policy.pendidikan}%</td>
                    <td></td>
                    <td>Rp {formatNumber(pendidikan)}</td>
                  </tr>
                  <tr
                    className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'
                    style={{ backgroundColor: currentColor }}
                  >
                    <td>Jumlah</td>
                    <td>
                      {(parseFloat(policy.pemilik) || 0) +
                        (parseFloat(policy.pengurus) || 0) +
                        (parseFloat(policy.kesejahteraan) || 0) +
                        (parseFloat(policy.wilayah_kerja) || 0) +
                        (parseFloat(policy.sosial) || 0) +
                        (parseFloat(policy.pendidikan) || 0)}
                      %
                    </td>
                    <td>
                      {(parseFloat(policy.cadangan) || 0) +
                        (parseFloat(policy.dibagikan) || 0)}
                      %
                    </td>
                    <td>
                      Rp{" "}
                      {formatNumber(
                        pemilik +
                          pengurus +
                          kesejahteraan +
                          wilayahKerja +
                          sosial +
                          pendidikan
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='md:w-5/12'>
            <div className='bg-white md:m-6 p-8 md:p-8 dark:bg-secondary-dark-bg rounded-3xl transition duration-300 w-full h-[20rem]'>
              <Header category='Pembagian Laba Usaha' title='Bagian Pemilik' />
              <div className='overflow-x-auto'>
                <table className='table table-xs'>
                  <tbody>
                    <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                      <td>Jasa transaksi</td>
                      <td>{policy.transaksi}%</td>
                    </tr>
                    <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                      <td>Jasa Modal</td>
                      <td>{policy.modal}%</td>
                    </tr>
                    <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                      <td></td>
                      <td>
                        {(parseFloat(policy.transaksi) || 0) +
                          (parseFloat(policy.modal) || 0)}
                        %
                      </td>
                    </tr>
                    <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                      <td>Total Bagian Jasa transaksi</td>
                      <td>
                        Rp{" "}
                        {formatNumber(
                          Math.round(
                            (policy.transaksi / 100) *
                              ((policy.pemilik / 100) * policy.phu_comp)
                          )
                        )}
                      </td>
                    </tr>
                    <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                      <td>Total Bagian Jasa Modal</td>
                      <td>
                        Rp{" "}
                        {formatNumber(
                          Math.round(
                            (policy.modal / 100) *
                              ((policy.pemilik / 100) * policy.phu_comp)
                          )
                        )}
                      </td>
                    </tr>
                    <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                      <th>Total LABA Bagian Pemilik</th>
                      <th>
                        Rp{" "}
                        {formatNumber(
                          Math.round((policy.pemilik / 100) * policy.phu_comp)
                        )}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='bg-white md:m-6 dark:bg-secondary-dark-bg rounded-3xl transition duration-300 w-full'>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Policy;
