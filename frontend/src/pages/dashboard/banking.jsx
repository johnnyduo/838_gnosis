import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import GroupChart5 from "@/components/partials/widget/chart/group-chart5";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import HistoryChart from "@/components/partials/widget/chart/history-chart";
import AccountReceivable from "@/components/partials/widget/chart/account-receivable";
import AccountPayable from "@/components/partials/widget/chart/account-payable";
import CardSlider from "@/components/partials/widget/CardSlider";
import TransactionsTable from "@/components/partials/Table/transactions";
import SelectMonth from "@/components/partials/SelectMonth";
import HomeBredCurbs from "./HomeBredCurbs";

import Mainuser from "@/assets/images/all-img/main-user.png";
import { useAccount, useContract, useSigner } from "wagmi";
import { toast } from "react-toastify";
import { ethers } from "ethers";
const users = [
  {
    name: "Ab",
  },
  {
    name: "Bc",
  },
  {
    name: "Cd",
  },
  {
    name: "Df",
  },
  {
    name: "Ab",
  }
];

const BankingPage = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [activeIndex, setActiveIndex] = useState(0);
  const [amount, setAmount] = useState('')
  const [shareReceived, setShareReceived] = useState('')

  useEffect(() => {
    const share = Math.floor(parseFloat(amount) / (1 + Math.random() * 0.1)) || 0
    setShareReceived(share.toString())
  }, [amount])

  const token = useContract({
    address: '0x377e53b8BB022Cc52CD27CE314F5D17DA5b52Be7',
    abi: [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    signerOrProvider: signer,
  })

  const pool = useContract({
    address: '0xC90372DA72d09c4F0eaBC08723FB9BDB44d11412',
    abi: [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
    signerOrProvider: signer,
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    try {
      setLoading(true)

      await (await token.approve('0xC90372DA72d09c4F0eaBC08723FB9BDB44d11412', ethers.utils.parseEther(amount.toString()))).wait()
      await (await pool.deposit(
        address,
        ethers.utils.parseEther(amount.toString()),
      )).wait()

      // const domainList = window.localStorage.getItem('838EARTH_INSURANCE_' + address) ? JSON.parse(window.localStorage.getItem('838EARTH_INSURANCE_' + address)) : [];
      // domainList.push({
      //   ...data,
      //   domainName: subname + '.' + domainName,
      // })
      // window.localStorage.setItem('838EARTH_INSURANCE_' + address, JSON.stringify(domainList))

      // navigate('/crm')

      toast.success("Successfully invested into an insurance pool")
    } catch (err) {
      console.error(err)
      window.alert("Buy failed")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="space-y-5">
      <HomeBredCurbs title="Invest" />
      <Card>
        <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 place-content-center">
          <div className="flex space-x-4 h-full items-center rtl:space-x-reverse">
            <div className="flex-none">
              <div className="h-20 w-20 rounded-full">
                <img src={Mainuser} alt="" className="w-full h-full" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-medium mb-2">
                <span className="block font-light">Good evening,</span>
                <span className="block">scb10x</span>
              </h4>
              <p className="text-sm dark:text-slate-300">scb10x.earth</p>
            </div>
          </div>
          <GroupChart5 />
        </div>
      </Card>
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-4 col-span-12 space-y-5">
          {/* <Card title="My card">
            <div className="max-w-[90%] mx-auto mt-2">
              <CardSlider />
            </div>
          </Card> */}
          <Card title="Add Liquidity Provider">
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-lg text-slate-900 dark:text-white">
                    Claim Pools
                  </span>
                  <Link
                    to="#"
                    className="font-medium text-slate-900 dark:text-white underline text-sm"
                  >
                    View all
                  </Link>
                </div>
                <SimpleBar>
                  <ul className="flex space-x-6 py-3 px-1">
                    {users.map((item, i) => (
                      <li
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={` h-[42px] w-[42px] cursor-pointer text-xl font-medium capitalize flex-none rounded-full bg-primary-500 text-white flex flex-col items-center justify-center
                     ${
                       activeIndex === i
                         ? "ring-2 ring-primary-500 ring-offset-2 "
                         : ""
                     }
                      `}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </SimpleBar>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded-md p-4">
                <span
                  className="text-xs text-slate-500 dark:text-slate-400 block mb-1 cursor-pointer font-normal"
                  htmlFor="cdp"
                >
                  Deposit Amount (USD)
                </span>
                <Textinput
                  placeholder="$0"
                  id="cdp"
                  className="bg-transparent border-none focus:ring-0 focus:border-none p-0 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 placeholder:font-medium  h-auto font-medium"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded-md p-4">
                <label
                  className="text-xs text-slate-500 dark:text-slate-400 block cursor-pointer mb-1"
                  htmlFor="cd"
                >
                  Receive Share
                </label>

                <div>{shareReceived}</div>

                {/* <Textinput
                  placeholder="0"
                  isMask
                  id="cd"
                  className="bg-transparent border-none focus:ring-0 focus:border-none p-0 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 h-auto placeholder:font-medium font-medium"
                  value={shareReceived}
                /> */}
              </div>
              <div className="flex justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                    APR
                  </span>
                  <span className="text-lg font-medium text-slate-900 dark:text-white block">
                    21.4%
                  </span>
                </div>
                <div>
                  <button type="button" className="btn btn-dark disabled:opacity-50" disabled={loading} onClick={() => onSubmit()}>
                    Invest
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-8 col-span-12">
          <div className="space-y-5 bank-table h-full">
            <TransactionsTable />
            {/* <Card title="History" headerslot={<SelectMonth />}>
              <div className="legend-ring4">
                <HistoryChart />
              </div>
            </Card> */}
          </div>
        </div>
      </div>
      {/* <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <Card title="Account Receivable" headerslot={<SelectMonth />}>
          <AccountReceivable />
        </Card>
        <Card title="Account Payable" headerslot={<SelectMonth />}>
          <AccountPayable />
        </Card>
      </div> */}
    </div>
  );
};

export default BankingPage;
