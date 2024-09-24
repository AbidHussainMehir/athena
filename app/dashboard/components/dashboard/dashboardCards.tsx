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
  searchDataAccount: searchDataAccount,
  customEventsData
}: any) {
  const theme: any = useTheme()
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
                <div className="px-6 flex flex-row items-center justify-center ">
                  <p
                    className="px-0 tracking-tight text-sm font-medium"
                    style={{
                      color: theme?.theme === 'dark' ? '#fff' : '#09090B'
                    }}
                  >
                    Total Visits
                  </p>
                </div>
                <CardDescription className="px-0">
                  <p
                    className="px-6 text-2xl font-bold text-center"
                    style={{
                      color: theme?.theme === 'dark' ? '#fff' : '#09090B'
                    }}
                  >
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
                  <div className="px-6 flex flex-row items-center justify-center ">
                    <p
                      className=" px-0 tracking-tight text-sm font-medium"
                      style={{
                        color: theme?.theme === 'dark' ? '#fff' : '#09090B'
                      }}
                    >
                      Total Actions
                    </p>
                  </div>
                </CardTitle>
                <CardDescription className="px-0">
                  <p
                    className="px-6 text-2xl font-bold text-center"
                    style={{
                      color: theme?.theme === 'dark' ? '#fff' : '#09090B'
                    }}
                  >
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
                  <div className="px-6 flex flex-row items-center justify-center ">
                    <p
                      className="px-0 tracking-tight text-sm font-medium"
                      style={{
                        color: theme?.theme === 'dark' ? '#fff' : '#09090B'
                      }}
                    >
                      Total Searches
                    </p>
                  </div>
                </CardTitle>
                <CardDescription className="px-0">
                  <p
                    className="px-6 text-2xl font-bold text-center"
                    style={{
                      color: theme?.theme === 'dark' ? '#fff' : '#09090B'
                    }}
                  >
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
                  <div className="px-6 flex flex-row items-center justify-center ">
                    <p
                      className=" px-0 tracking-tight text-sm font-medium "
                      style={{
                        color: theme?.theme === 'dark' ? '#fff' : '#09090B'
                      }}
                    >
                      Average Time Spent
                    </p>
                  </div>
                </CardTitle>
                <CardDescription className="px-0">
                  <p
                    className="px-6 text-2xl font-bold text-center"
                    style={{
                      color: theme?.theme === 'dark' ? '#fff' : '#09090B'
                    }}
                  >
                    {account
                      ? apiDataAccount?.avg_time_on_site
                      : apiData?.avg_time_on_site}
                    <span className="text-sm">(S / Visit)</span>
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="">
            <Card className="rounded-xl border bg-card text-card-foreground shadow">
              <CardHeader className="px-0 py-4">
                <CardTitle className="px-0  text-sm font-medium">
                  <div className="px-6 flex flex-row items-center justify-center ">
                    <p
                      className=" px-0 tracking-tight text-sm font-medium"
                      style={{
                        color: theme?.theme === 'dark' ? '#fff' : '#09090B'
                      }}
                    >
                      Source Click
                    </p>
                  </div>
                </CardTitle>
                <CardDescription className="px-0">
                  <p
                    className="px-6 text-2xl font-bold text-center"
                    style={{
                      color: theme?.theme === 'dark' ? '#fff' : '#09090B'
                    }}
                  >
                    {account
                      ? customEventsData?.nb_visits
                      : customEventsData?.nb_visits}
                    {/* <span className="text-sm">(S / Visit)</span> */}
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
