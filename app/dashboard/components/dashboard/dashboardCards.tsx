'use client'

import { useEffect, useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { PresaleCard } from './presale'
import { useTheme } from 'next-themes'

export function DashboardCards({
  apiData: apiData,
  searchData: searchData,
  apiDataAccount: apiDataAccount,
  account: account,
  searchDataAccount: searchDataAccount
}: any) {
  // import ChartsIndex from '@/components/dashboard/chartsIndex'

  const { theme } = useTheme()
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1  gap-4 md:gap-4 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2  gap-4 md:gap-4 ">
          <PresaleCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-4   gap-4 md:gap-4 ">
          <div className="">
            <Card className="  rounded-xl border bg-card text-card-foreground shadow">
              <CardHeader className="px-0 py-4">
                <div className="px-6 flex flex-row items-center justify-between ">
                  <p className="px-0 tracking-tight text-sm font-medium">
                    Total Visits
                  </p>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                      stroke={theme === 'dark' ? 'white' : 'black'}
                      stroke-width="2"
                    />
                    <line
                      x1="16"
                      y1="16"
                      x2="20"
                      y2="20"
                      stroke={theme === 'dark' ? 'white' : 'black'}
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <CardDescription className="px-0">
                  <p className="px-6 text-2xl font-bold">
                    {account ? apiDataAccount?.nb_visits : apiData?.nb_visits}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="">
            <Card className="rounded-xl border bg-card text-card-foreground shadow">
              <CardHeader className="px-0 py-4">
                <CardTitle className="px-0 tracking-tight text-sm font-medium">
                  <div className="px-6 flex flex-row items-center justify-between ">
                    <p className=" px-0 tracking-tight text-sm font-medium">
                      Total Actions
                    </p>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        stroke={theme === 'dark' ? 'white' : 'black'}
                        stroke-width="2"
                      />
                      <path
                        d="M7 7H14"
                        stroke={theme === 'dark' ? 'white' : 'black'}
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M7 12H14"
                        stroke={theme === 'dark' ? 'white' : 'black'}
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M7 17H10"
                        stroke={theme === 'dark' ? 'white' : 'black'}
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M16 16L19 19L22 16"
                        stroke={theme === 'dark' ? 'white' : 'black'}
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </CardTitle>
                <CardDescription className="px-0">
                  <p className="px-6 text-2xl font-bold">
                    {account ? apiDataAccount?.nb_actions : apiData?.nb_actions}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="">
            <Card className="rounded-xl border bg-card text-card-foreground shadow">
              <CardHeader className="px-0 py-4">
                <CardTitle className="px-0 tracking-tight text-sm font-medium">
                  <div className="px-6 flex flex-row items-center justify-between ">
                    <p className="px-0 tracking-tight text-sm font-medium">
                      Total Searches
                    </p>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="6"
                        stroke={theme === 'dark' ? 'white' : 'black'}
                        stroke-width="2"
                      />
                      <line
                        x1="15.5"
                        y1="15.5"
                        x2="20"
                        y2="20"
                        stroke={theme === 'dark' ? 'white' : 'black'}
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <rect
                        x="2"
                        y="14"
                        width="3"
                        height="6"
                        fill={theme === 'dark' ? 'white' : 'black'}
                      />
                      <rect
                        x="8"
                        y="10"
                        width="3"
                        height="10"
                        fill={theme === 'dark' ? 'white' : 'black'}
                      />
                      <rect
                        x="14"
                        y="8"
                        width="3"
                        height="12"
                        fill={theme === 'dark' ? 'white' : 'black'}
                      />
                    </svg>
                  </div>
                </CardTitle>
                <CardDescription className="px-0">
                  <p className="px-6 text-2xl font-bold">
                    {account ? searchDataAccount : searchData}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="">
            <Card className="rounded-xl border bg-card text-card-foreground shadow">
              <CardHeader className="px-0 py-4">
                <CardTitle className="px-0  text-sm font-medium">
                  <div className="px-6 flex flex-row items-center justify-between ">
                    <p className=" px-0  text-sm font-medium">
                      Average Time Spent
                    </p>

                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke={theme === 'dark' ? 'white' : 'black'}
                        stroke-width="2"
                      />
                      <path
                        d="M12 6V12L15 14"
                        stroke={theme === 'dark' ? 'white' : 'black'}
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                </CardTitle>
                <CardDescription className="px-0">
                  <p className="px-6 text-2xl font-bold">
                    {account
                      ? apiDataAccount?.avg_time_on_site
                      : apiData?.avg_time_on_site}
                    <span className="text-sm">(S / Visit)</span>
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
