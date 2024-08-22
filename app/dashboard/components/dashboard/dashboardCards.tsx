'use client'

import { useEffect, useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export function DashboardCards({
  apiData: apiData,
  searchData: searchData
}: any) {
  console.log('apiData',apiData)
  return (
    // <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 xs:grid-cols-2 sm:grid-cols-2 gap-4 md:gap-2 mb-4">
    //   <div className="">
    //     <Card className="">
    //       <CardHeader className="px-0">
    //         <CardTitle className="text-center px-0">Presale Price</CardTitle>
    //         <CardDescription className="text-center px-0">
    //           ${apiData?.nb_visits}/ATH token
    //         </CardDescription>
    //       </CardHeader>
    //     </Card>
    //   </div>
    //   <div className="">
    //     <Card>
    //       <CardHeader className="px-0">
    //         <CardTitle className="text-center">Total Supply</CardTitle>
    //         <CardDescription className="text-center">
    //           {apiData?.nb_actions}-ATH tokens
    //         </CardDescription>
    //       </CardHeader>
    //     </Card>
    //   </div>
    //   <div className="">
    //     <Card>
    //       <CardHeader className="px-0">
    //         <CardTitle className="text-center">
    //           Global Search Mcap(2024)
    //         </CardTitle>
    //         <CardDescription className="text-center">
    //           $203 Billion
    //         </CardDescription>
    //       </CardHeader>
    //     </Card>
    //   </div>
    //   <div className="">
    //     <Card>
    //       <CardHeader className="px-0">
    //         <CardTitle className="text-center ">Athena Mcap</CardTitle>
    //         <CardDescription className="text-center">
    //           ${apiData?.avg_time_on_site} million at Presale
    //         </CardDescription>
    //       </CardHeader>
    //     </Card>
    //   </div>
    // </div>
    <>
    <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1  gap-4 md:gap-2 mb-4'>

    <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2  gap-4 md:gap-2 mb-4'>
    <div className="">
        <Card className="">
          <CardHeader className="px-0">
            <CardTitle className="text-center px-0">Total Visits</CardTitle>
            <CardDescription className="text-center px-0">
              {apiData?.nb_visits}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
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
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-4   gap-4 md:gap-2 mb-4">
      <div className="">
        <Card className="">
          <CardHeader className="px-0">
            <CardTitle className="text-center px-0">Total Visits</CardTitle>
            <CardDescription className="text-center px-0">
              {apiData?.nb_visits}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
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
