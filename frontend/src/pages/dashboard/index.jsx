import React, { useState } from "react";
import Card from "@/components/ui/Card";
import ImageBlock1 from "@/components/partials/widget/block/image-block-1";
import GroupChart1 from "@/components/partials/widget/chart/group-chart-1";
import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
import RadialsChart from "@/components/partials/widget/chart/radials";
import SelectMonth from "@/components/partials/SelectMonth";
import CompanyTable from "@/components/partials/Table/company-table";
import RecentActivity from "@/components/partials/widget/recent-activity";
import MostSales from "../../components/partials/widget/most-sales";
import RadarChart from "../../components/partials/widget/chart/radar-chart";
import HomeBredCurbs from "./HomeBredCurbs";

const Dashboard = () => {
  const [filterMap, setFilterMap] = useState("global");
  return (
    <div>
      <HomeBredCurbs title="Carbon Tracking" />
      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
          <ImageBlock1 />
        </div>
        <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
          <Card bodyClass="p-4">
            <div className="grid md:grid-cols-3 col-span-1 gap-4">
              <GroupChart1 />
            </div>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-8 col-span-12">
          <Card>
            <div className="legend-ring">
              <RevenueBarChart />
            </div>
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <Card title="Your Progress" headerslot={<SelectMonth />}>
            <RadialsChart />
          </Card>
        </div>
        <div className="lg:col-span-8 col-span-12">
          <Card title="Focused Solutions" headerslot={<SelectMonth />} noborder>
            <CompanyTable />
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <Card title="Recent Activity" headerslot={<SelectMonth />}>
            <RecentActivity />
          </Card>
        </div>
        <div className="lg:col-span-8 col-span-12">
          <Card
            title="The Paris Agreement 2015 Goal - 196 Parties"
            headerslot={
              <div className="border border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded p-1 flex items-center">
                <span
                  className={` flex-1 text-sm font-normal px-3 py-1 transition-all duration-150 rounded cursor-pointer
                ${
                  filterMap === "global"
                    ? "bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300"
                    : "dark:text-slate-300"
                }  
                `}
                  onClick={() => setFilterMap("global")}
                >
                  Global
                </span>
                {/* <span
                  className={` flex-1 text-sm font-normal px-3 py-1 rounded transition-all duration-150 cursor-pointer
                    ${
                      filterMap === "usa"
                        ? "bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300"
                        : "dark:text-slate-300"
                    }
                  `}
                  onClick={() => setFilterMap("usa")}
                >
                  USA
                </span> */}
              </div>
            }
          >
            <MostSales filterMap={filterMap} />
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <Card title="Overall Progress" headerslot={<SelectMonth />}>
            <RadarChart />
            <div className="bg-slate-50 dark:bg-slate-900 rounded p-4 mt-8 flex justify-around flex-wrap">
              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">
                  Achieved
                </h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  2.13M Ton
                </div>
                <div className="text-slate-500 dark:text-slate-300 text-xs font-normal">
                  +0.12M Ton (5%)
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">
                  Goal
                </h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  12.86M Ton
                </div>
                <div className="text-slate-500 dark:text-slate-300 text-xs font-normal">
                  +2.13M Ton (16%)
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
