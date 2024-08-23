'use client'

import { useEffect, useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { PresaleCard } from './presale'
export function DashboardCards({
  apiData: apiData,
  searchData: searchData
}: any) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1  gap-4 md:gap-2 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2  gap-4 md:gap-2 mb-4">
          <PresaleCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-4   gap-4 md:gap-2 mb-4">
          <div className="">
            <Card className=" transition duration-300 hover:scale-105">
              <CardHeader className="px-0">
                <CardTitle className="text-center px-0">Total Visits</CardTitle>
                <CardDescription className="text-center px-0">
                  {apiData?.nb_visits}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          {/* <div className="bg-white rounded-lg shadow-md">
            <Card className="transition duration-300 hover:scale-105 bg-blue-500 hover:bg-blue-700 text-white">
              <CardHeader className="px-0 py-4">
                <CardTitle className="text-center text-2xl font-bold px-0">
                  Total Visits
                </CardTitle>
                <CardDescription className="text-center text-lg px-0">
                  <span className="text-3xl font-bold">
                    {apiData?.nb_visits}
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div> */}
          {/* <div className="bg-gray-100 rounded-lg shadow-md">
            <Card className="transition duration-300 hover:scale-105 bg-orange-400 hover:bg-orange-600 text-white">
              <CardHeader className="px-0 py-4">
                <CardTitle className="text-center text-2xl font-bold px-0">
                  Total Visits
                </CardTitle>
                <CardDescription className="text-center text-lg px-0">
                  <span className="text-3xl font-bold">
                    {apiData?.nb_visits}
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div> */}

          <div className="">
            <Card>
              <CardHeader className="px-0">
                <CardTitle className="text-center">Total Actions</CardTitle>
                <CardDescription className="text-center">
                  {apiData?.nb_actions}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="">
            <Card>
              <CardHeader className="px-0">
                <CardTitle className="text-center">Total Searches</CardTitle>
                <CardDescription className="text-center">
                  {searchData}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="">
            <Card>
              <CardHeader className="px-0">
                <CardTitle className="text-center ">Total Time Spent</CardTitle>
                <CardDescription className="text-center">
                  {apiData?.avg_time_on_site}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
