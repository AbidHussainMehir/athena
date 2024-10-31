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
import JobsDistributionChart from './JobsDistributionChart'
import WorkDistribution from './WorkDistribution'
import MoveStuffAround from './ticker'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function ChartIndex() {
  const [apiData, setApiData] = useState()
  const [apiDataAccount, setApiDataAccount] = useState()
  const [chartActionData, setChartActionsData] = useState<any>()
  const [chartVisitsData, setChartVisitsData] = useState<any>()
  const [searchData, setSearchData] = useState()
  const [searchDataAccount, setSearchDataAccount] = useState()
  const [chartSearchData, setChartSearchData] = useState<any>()
  const [customEventsData, setCustomEventsData] = useState<any>([])
  const [customEventsDataAccount, setCustomEventsDataAccount] = useState<any>(
    []
  )
  const [likeUnlikeData, setLikeUnlikeData] = useState<any>([])
  const [likeUnlikeDataAccount, setLikeUnlikeDataAccount] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const account = useActiveAccount()
  let isConnected = !!account

  const handleGetDataAccount = async () => {
    try {
      let response: any = null
      setLoading(true)
      if (account) {
        response = await fetch(
          `https://analytics.theathena.ai/index.php?module=API&method=VisitsSummary.get&idSite=1&period=year&date=today&format=JSON&token_auth=9645f77e369daeb422fe1b392695a5ed&force_api_session=1&segment=userId==${account?.address}`
        )
        if (!response?.ok) {
          throw new Error(`HTTP error! status: ${response?.status}`)
        }
        const data = await response.json()
        setApiDataAccount(data)
        setLoading(false)
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setLoading(false)
    }
  }
  useEffect(() => {
    handleGetDataAccount()
  }, [account])
  const handleGetData = async () => {
    try {
      let response
      setLoading(true)
      response = await fetch(
        'https://analytics.theathena.ai/index.php?module=API&method=VisitsSummary.get&idSite=1&period=year&date=today&format=JSON&token_auth=022dcce6d7ba7e09da509c42e8c3d43a'
      )
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

  const handleGetSearchDataAccount = async () => {
    try {
      let response
      setLoading(true)
      if (account) {
        response = await fetch(
          `https://analytics.theathena.ai/index.php?module=API&format=JSON&idSite=1&period=year&date=today&method=Actions.getSiteSearchKeywords&expanded=1&token_auth=9645f77e369daeb422fe1b392695a5ed&filter_limit=-1&segment=userId==${account?.address}`
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        const totalNbVisits = data.reduce(
          (sum: any, item: any) => sum + item.nb_visits,
          0
        )
        setSearchDataAccount(totalNbVisits)
      }

      setLoading(false)
    } catch (error) {
      console.error('Fetch error:', error)
      setLoading(false)
    }
  }
  useEffect(() => {
    handleGetSearchDataAccount()
  }, [account])

  const handleGetSearchData = async () => {
    try {
      let response
      setLoading(true)
      response = await fetch(
        'https://analytics.theathena.ai/index.php?module=API&format=JSON&idSite=1&period=year&date=today&method=Actions.getSiteSearchKeywords&expanded=1&token_auth=9645f77e369daeb422fe1b392695a5ed&filter_limit=-1'
      )

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
      if (data && typeof data === 'object') {
        const currentDate = new Date()
        const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
        const transformedData = Object.keys(data)?.map((date, index) => ({
          day: `${currentMonth}/${date.slice(5, 10).replace('-', '/')}`,
          reward: data[date]?.reduce(
            (sum: any, item: any) => sum + item.nb_visits,
            0
          )
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
  const handleEvents = async () => {
    try {
      let response
      setLoading(true)

      response = await fetch(
        'https://analytics.theathena.ai/index.php?module=API&method=Events.getCategory&idSite=1&period=year&date=yesterday&format=JSON&token_auth=9645f77e369daeb422fe1b392695a5ed&force_api_session=1'
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      let dd = data.filter((n: any) => n.label === 'source-click')
      let likes = data.filter((n: any) => n.label === 'like')
      let unLikes = data.filter((n: any) => n.label === 'unlike')

      let likeUnlike = [
        likes?.[0]?.nb_visits ?? 0,
        unLikes?.[0]?.nb_visits ?? 0
      ]
      setLikeUnlikeData(likeUnlike)
      setCustomEventsData(dd)
      setLoading(false)
    } catch (error) {
      console.error('Fetch error:', error)
      setLoading(false)
    }
  }
  const handleEventsAccount = async () => {
    try {
      let response
      setLoading(true)

      response = await fetch(
        `https://analytics.theathena.ai/index.php?module=API&method=Events.getCategory&idSite=1&period=year&date=yesterday&format=JSON&token_auth=9645f77e369daeb422fe1b392695a5ed&force_api_session=1&segment=userId==${account?.address}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      let dd = data.filter((n: any) => n.label === 'source-click')
      let likes = data.filter((n: any) => n.label === 'like')
      let unLikes = data.filter((n: any) => n.label === 'unlike')
      let likeUnlike = [
        likes?.[0]?.nb_visits ?? 0,
        unLikes?.[0]?.nb_visits ?? 0
      ]

      setLikeUnlikeDataAccount(likeUnlike)

      setCustomEventsDataAccount(dd)
      setLoading(false)
    } catch (error) {
      console.error('Fetch error:', error)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (account) {
      handleEventsAccount()
    } else {
      console.log('inside else')
      handleEvents()
    }
  }, [account])
  console.log('customEventsData', customEventsData)
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center pt-[100px]">
          <img
            src={'/images/loader_animated_dash.svg'}
            width={'200px'}
            height={'200px'}
          />
        </div>
      ) : (
        <>
          {console.log('custom event data', customEventsData)}
          <DashboardCards
            apiData={apiData}
            apiDataAccount={apiDataAccount}
            account={isConnected}
            searchData={searchData}
            searchDataAccount={searchDataAccount}
            customEventsData={
              customEventsData?.length > 0 ? customEventsData[0] : []
            }
            customEventsDataAccount={
              customEventsDataAccount?.length > 0
                ? customEventsDataAccount[0]
                : []
            }
            likeUnlikeData={likeUnlikeData}
            likeUnlikeDataAccount={likeUnlikeDataAccount}
          />
          {/* <div className="grid grid-cols-1 md:grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 gap-4">
            <div>
              <VisitsChart
                apiData={apiData}
                apiDataAccount={apiDataAccount}
                account={isConnected}
                searchData={searchData}
                searchDataAccount={searchDataAccount}
                customEventsData={
                  customEventsData?.length > 0 ? customEventsData[0] : []
                }
              />
            </div>
          </div> */}
          <div className="grid grid-cols-1 lg:grid-cols-3 xs:grid-cols-1 sm:grid-cols-1 gap-4 mb-4">
            <div>
              <JobsDistributionChart />
            </div>

            <div className="col-auto">
              <WorkDistribution
                apiData={apiData}
                apiDataAccount={apiDataAccount}
                account={isConnected}
                searchData={searchData}
                searchDataAccount={searchDataAccount}
                customEventsData={
                  customEventsData?.length > 0 ? customEventsData[0] : []
                }
              />
            </div>
            <div>
              <VisitsChart
                apiData={apiData}
                apiDataAccount={apiDataAccount}
                account={isConnected}
                searchData={searchData}
                searchDataAccount={searchDataAccount}
                customEventsData={
                  customEventsData?.length > 0 ? customEventsData[0] : []
                }
                likeUnlikeData={likeUnlikeData}
                likeUnlikeDataAccount={likeUnlikeDataAccount}
                customEventsDataAccount={
                  customEventsDataAccount?.length > 0
                    ? customEventsDataAccount[0]
                    : []
                }
              />
            </div>
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 xs:grid-cols-1 sm:grid-cols-1 gap-4">
            <div>
              <GoogleMarketcapChart />
            </div>
            <div className="col-auto">
              <AthenaMarketCapChart />
            </div>
            <div>
              <AthenaTokenChart />
            </div>
          </div> */}
          <div className="grid grid-cols-1  gap-4 md:gap-4  my-3">
            
          <div className="col-span-12 ">
            <Card className="rounded-xl border bg-card text-card-foreground shadow py-6">
           
            <div> {/* Adjust the width here */}
            <div className="lg:max-w-[600px] h-[450px] mx-auto w-full" style={{ aspectRatio: "4 / 3" }}>
  <video
    className="w-full h-full object-contain"
    controls
    src="athena-video.mp4" 
    title="Video title"
  >
    Your browser does not support the video tag.
  </video>
</div>

</div>

    
            </Card>
          </div>
          </div>
          <div className="grid grid-cols-1  gap-4 md:gap-4  my-3">
            <MoveStuffAround />
          </div>
        </>
      )}
    </div>
  )
}
