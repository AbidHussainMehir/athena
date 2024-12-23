'use client'
import { useEffect, useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PresaleCard } from './presale'
import { useTheme } from 'next-themes'

export function DashboardCards({
  apiData: apiData,
  searchData: searchData,
  apiDataAccount: apiDataAccount,
  account: account,
  searchDataAccount: searchDataAccount,
  customEventsData,
  customEventsDataAccount,
  likeUnlikeData,
  likeUnlikeDataAccount
}: any) {
  const theme: any = useTheme()

  const [rewardData, setRewardData] = useState<any>(0)
  useEffect(() => {
    try {
      // total visits
      let accAmount = account ? apiDataAccount?.nb_visits : apiData?.nb_visits
      // Total Actions
      accAmount =
        accAmount + (account ? apiDataAccount?.nb_actions : apiData?.nb_actions)
      // searches
      accAmount = accAmount + (account ? searchDataAccount : searchData)
      // sources clicked
      accAmount =
        accAmount +
        (account
          ? customEventsDataAccount?.nb_visits
          : customEventsData?.nb_visits)
      accAmount =
        accAmount +
        (account
          ? likeUnlikeDataAccount[0] + likeUnlikeDataAccount[1]
          : likeUnlikeData[0] + likeUnlikeData[1])
      setRewardData(accAmount)
    } catch (error) { }
  }, [
    account,
    customEventsData,
    customEventsDataAccount,
    searchDataAccount,
    searchData,
    apiDataAccount
  ])
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1  gap-4 md:gap-4 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:col-span-1 md:grid-cols-2  gap-4 md:gap-4 ">
          <PresaleCard account={account} rewardData={rewardData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12   gap-4 md:gap-4  ">
          <div className="col-span-12 md:col-span-4">
            <Card className="  rounded-xl border bg-card text-card-foreground shadow">
              <CardHeader className="px-0 py-4">
                <div className="px-6 flex flex-row items-center justify-center ">
                  <p
                    className="px-0 tracking-tight text-sm font-medium"
                    style={{
                      color: theme?.theme === 'light' ? '#09090B' : '#fff'
                    }}
                  >
                    {account ? 'My Total Visits' : 'Total Visits'}
                  </p>
                </div>
                <CardDescription className="px-0">
                  <p
                    className="px-6 text-2xl font-bold text-center"
                    style={{
                      color: theme?.theme === 'light' ? '#09090B' : '#fff'
                    }}
                  >
                    {account ? apiDataAccount?.nb_visits : apiData?.nb_visits}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="col-span-12 md:col-span-4">
            <Card className="rounded-xl border bg-card text-card-foreground shadow">
              <CardHeader className="px-0 py-4">
                <CardTitle className="px-0 tracking-tight text-sm font-medium">
                  <div className="px-6 flex flex-row items-center justify-center ">
                    <p
                      className=" px-0 tracking-tight text-sm font-medium"
                      style={{
                        color: theme?.theme === 'light' ? '#09090B' : '#fff'
                      }}
                    >
                      {account ? 'My Total Actions' : 'Total Actions'}
                    </p>
                  </div>
                </CardTitle>
                <CardDescription className="px-0">
                  <p
                    className="px-6 text-2xl font-bold text-center"
                    style={{
                      color: theme?.theme === 'light' ? '#09090B' : '#fff'
                    }}
                  >
                    {account ? apiDataAccount?.nb_actions : apiData?.nb_actions}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-4">
            <Card className="rounded-xl border bg-card text-card-foreground shadow">
              <CardHeader className="px-0 py-4">
                <CardTitle className="px-0 tracking-tight text-sm font-medium">
                  <div className="px-6 flex flex-row items-center justify-center ">
                    <p
                      className="px-0 tracking-tight text-sm font-medium"
                      style={{
                        color: theme?.theme === 'light' ? '#09090B' : '#fff'
                      }}
                    >
                      {account ? 'My Total Searches' : "Total Searches"}
                    </p>
                  </div>
                </CardTitle>
                <CardDescription className="px-0">
                  <p
                    className="px-6 text-2xl font-bold text-center"
                    style={{
                      color: theme?.theme === 'light' ? '#09090B' : '#fff'
                    }}
                  >
                    {account ? searchDataAccount : searchData}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-4">
            <Card className="rounded-xl border bg-card text-card-foreground shadow">
              <CardHeader className="px-0 py-4">
                <CardTitle className="px-0  text-sm font-medium">
                  <div className="px-6 flex flex-row items-center justify-center ">
                    <p
                      className=" px-0 tracking-tight text-sm font-medium "
                      style={{
                        color: theme?.theme === 'light' ? '#09090B' : '#fff'
                      }}
                    >
                      {account ? 'My Average Time Spent' : 'Average Time Spent'}
                    </p>
                  </div>
                </CardTitle>
                <CardDescription className="px-0">
                  <p
                    className="px-6 text-2xl font-bold text-center"
                    style={{
                      color: theme?.theme === 'light' ? '#09090B' : '#fff'
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
          <div className="col-span-12 md:col-span-4">
            <Card className="rounded-xl border bg-card text-card-foreground shadow">
              <CardHeader className="px-0 py-4">
                <CardTitle className="px-0  text-sm font-medium">
                  <div className="px-6 flex flex-row items-center justify-center ">
                    <p
                      className=" px-0 tracking-tight text-sm font-medium"
                      style={{
                        color: theme?.theme === 'light' ? '#09090B' : '#fff'
                      }}
                    >
                      {account ? 'My Sources Clicked' : "Sources Clicked"}
                    </p>
                  </div>
                </CardTitle>
                <CardDescription className="px-0">
                  <p
                    className="px-6 text-2xl font-bold text-center"
                    style={{
                      color: theme?.theme === 'light' ? '#09090B' : '#fff'
                    }}
                  >
                    {console.log('account::', account)}
                    {account
                      ? customEventsDataAccount?.nb_visits ?? 'N/A'
                      : customEventsData?.nb_visits ?? 'N/A'}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-4">
            <Card className="rounded-xl border bg-card text-card-foreground shadow">
              <CardHeader className="px-0 py-4">
                <CardTitle className="px-0  text-sm font-medium">
                  <div className="px-6 flex flex-row items-center justify-center ">
                    <p
                      className=" px-0 tracking-tight text-sm font-medium"
                      style={{
                        color: theme?.theme === 'light' ? '#09090B' : '#fff'
                      }}
                    >
                      {account ? 'My Feedbacks' : 'Feedbacks'}
                    </p>
                  </div>
                </CardTitle>
                <CardDescription className="px-0">
                  <p
                    className="px-6 text-2xl font-bold text-center"
                    style={{
                      color: theme?.theme === 'light' ? '#09090B' : '#fff'
                    }}
                  >
                    {account
                      ? likeUnlikeDataAccount[0] + likeUnlikeDataAccount[1]
                        ? likeUnlikeDataAccount[0] + likeUnlikeDataAccount[1]
                        : 'N/A'
                      : likeUnlikeData[0] + likeUnlikeData[1]
                        ? likeUnlikeData[0] + likeUnlikeData[1]
                        : 'N/A'}
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
