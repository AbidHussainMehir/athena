import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LineChart from './lineChart';

export const VisitsChart = ({ apiData, searchData, apiDataAccount, account, searchDataAccount, customEventsData, likeUnlikeData, likeUnlikeDataAccount, customEventsDataAccount }: any) => {

  const data = [['Visits', account ? apiDataAccount?.nb_visits : apiData?.nb_visits],
  // ['Actions',account ? apiDataAccount?.nb_actions : apiData?.nb_actions],
  ['Search', account ? searchDataAccount : searchData],
  ['Time', account ? apiDataAccount?.avg_time_on_site : apiData?.avg_time_on_site],
  ['Sources', account ? customEventsDataAccount?.nb_visits : customEventsData?.nb_visits],
  ['Feedbacks', account ? likeUnlikeDataAccount[0] + likeUnlikeDataAccount[1] : likeUnlikeData[0] + likeUnlikeData[1]]
  ]

  return (
    <Card
      className="rounded-xl  mb-4 border bg-card text-card-foreground shadow "
      style={{ minHeight: '100%' }}
    >
      <CardHeader>
        <CardTitle className="text-center">
          {account ? "My Metrics" : "Athena Metrics"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart data={data} />
      </CardContent>
    </Card>
  )
}
