'use client'

import { useEffect, useState } from 'react'
import { ActionChart } from './actions'
import { AthenaMarketCapChart } from './athenaMarketcap'
import { AthenaTokenChart } from './athenaToken'
import { DashboardCards } from './dashboardCards'
import { GoogleMarketcapChart } from './googleMarketcap'
import { RewardsChart } from './rewards'
import { VisitsChart } from './visits'
import { useActiveAccount } from 'thirdweb/react'

export default function ChartIndex() {
  const [apiData, setApiData] = useState()
  const [chartActionData, setChartActionsData] = useState<any>()
  const [chartVisitsData, setChartVisitsData] = useState<any>()
  const [searchData, setSearchData] = useState()
  const [chartSearchData, setChartSearchData] = useState<any>()
  const [loading, setLoading] = useState(true)
  const account = useActiveAccount()
  console.log({ apiData })
  const handleGetData = async () => {
    try {
      let response
      setLoading(true)
      if (account) {
        response = await fetch(
          `https://analytics.theathena.ai/index.php?module=API&method=VisitsSummary.get&idSite=1&period=year&date=yesterday&format=JSON&token_auth=9645f77e369daeb422fe1b392695a5ed&force_api_session=1&segment=userId==${account?.address}`
        )
      } else {
        response = await fetch(
          'https://analytics.theathena.ai/index.php?module=API&method=VisitsSummary.get&idSite=1&period=year&date=yesterday&format=JSON&token_auth=022dcce6d7ba7e09da509c42e8c3d43a'
        )
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setApiData(data)
      setLoading(false)
    } catch (error) {
      console.error('Fetch error:', error)
      setLoading(false)
    }
  }
  useEffect(() => {
    handleGetData()
  }, [account])
  const handleChartGetData = async () => {
    try {
      let response
      setLoading(true)
      if (account) {
        response = await fetch(
          `https://analytics.theathena.ai/index.php?module=API&method=VisitsSummary.get&idSite=1&period=week&date=last7&format=JSON&token_auth=9645f77e369daeb422fe1b392695a5ed&force_api_session=1&segment=userId==${account?.address}`
        )
      } else {
        response = await fetch(
          'https://analytics.theathena.ai/index.php?module=API&method=VisitsSummary.get&idSite=1&period=week&date=last7&format=JSON&token_auth=022dcce6d7ba7e09da509c42e8c3d43a'
        )
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data && typeof data === 'object') {
        const transformedData = Object.keys(data)?.map(date => ({
          day: date.slice(5, 10).replace('-', '/'),
          actions: data[date]?.nb_actions
        }))
        setChartActionsData(transformedData)
        const transformedData2 = Object.keys(data)?.map(date => ({
          day: date.slice(5, 10).replace('-', '/'),
          visits: data[date]?.nb_visits
        }))
        setChartVisitsData(transformedData2)
      }
      setLoading(false)
    } catch (error) {
      console.error('Fetch error:', error)
      setLoading(false)
    }
  }
  useEffect(() => {
    handleChartGetData()
  }, [account])
  const handleGetSearchData = async () => {
    try {
      let response
      setLoading(true)
      if (account) {
        response = await fetch(
          `https://analytics.theathena.ai/index.php?module=API&format=JSON&idSite=1&period=week&date=yesterday&method=Actions.getSiteSearchKeywords&expanded=1&token_auth=9645f77e369daeb422fe1b392695a5ed&filter_limit=-1&segment=userId==${account?.address}`
        )
      } else {
        response = await fetch(
          'https://analytics.theathena.ai/index.php?module=API&format=JSON&idSite=1&period=week&date=yesterday&method=Actions.getSiteSearchKeywords&expanded=1&token_auth=9645f77e369daeb422fe1b392695a5ed&filter_limit=-1'
        )
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const totalNbVisits = data.reduce(
        (sum: any, item: any) => sum + item.nb_visits,
        0
      )
      setSearchData(totalNbVisits)
      setLoading(false)
    } catch (error) {
      console.error('Fetch error:', error)
      setLoading(false)
    }
  }
  useEffect(() => {
    handleGetSearchData()
  }, [account])
  //search chart api
  const handleGetSearchChartData = async () => {
    try {
      let response
      setLoading(true)
      if (account) {
        response = await fetch(
          `https://analytics.theathena.ai/index.php?module=API&format=JSON&idSite=1&period=month&date=last7&method=Actions.getSiteSearchKeywords&expanded=1&token_auth=9645f77e369daeb422fe1b392695a5ed&filter_limit=-1&segment=userId==${account?.address}`
        )
      } else {
        response = await fetch(
          'https://analytics.theathena.ai/index.php?module=API&format=JSON&idSite=1&period=month&date=last7&method=Actions.getSiteSearchKeywords&expanded=1&token_auth=9645f77e369daeb422fe1b392695a5ed'
        )
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log({ data })
      if (data && typeof data === 'object') {
        const transformedData = Object.keys(data)?.map((date, index) => ({
          day: `${index + 1}`,
          reward: data[date]?.nb_visits
        }))

        setChartSearchData(transformedData)
      }
      setLoading(false)
    } catch (error) {
      console.error('Fetch error:', error)
      setLoading(false)
    }
  }
  useEffect(() => {
    handleGetSearchChartData()
  }, [account])

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center pt-[100px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: 'auto', background: 'none', display: 'block' }}
            width="100px"
            height="100px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="#000"
              strokeWidth="8"
              r="35"
              strokeDasharray="164.93361431346415 56.97787143782138"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                keyTimes="0;1"
                values="0 50 50;360 50 50"
              />
            </circle>
          </svg>
        </div>
      ) : (
        <>
          <DashboardCards apiData={apiData} searchData={searchData} />
          <div className="grid grid-cols-1 md:grid-cols-3 xs:grid-cols-1 sm:grid-cols-1 gap-4">
            <div className="col-auto">
              <ActionChart apiData={chartVisitsData} />
            </div>
            <div>
              <VisitsChart apiData={chartActionData} />
            </div>
            <div>
              <RewardsChart chartSearchData={chartSearchData} />
            </div>
            <div>
              <GoogleMarketcapChart />
            </div>
            <div className="col-auto">
              <AthenaMarketCapChart />
            </div>
            <div>
              <AthenaTokenChart />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
