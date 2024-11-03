'use client'
import { useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { FcInfo } from 'react-icons/fc'
import { TransactionButton } from 'thirdweb/react'
import toast from 'react-hot-toast'
import { claimTo } from 'thirdweb/extensions/erc20'
import { useActiveAccount } from 'thirdweb/react'
import { TokenDropContract } from '../../../lib/utils/thirdweb-client'

export function PresaleCard(props: any) {

  const theme: any = useTheme()
  const [preSaleValue, setPreSaleValue] = useState<any>('')
  const account = useActiveAccount()

  return (
    <>
      <div className="">
        <Card className="h-full flex flex-col justify-between rounded-xl border bg-card text-card-foreground shadow">
          <CardHeader className="py-6 px-6 ">
            <div
              className="mb-[20px]"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <img
                src={
                  theme?.theme === 'light'
                    ? '/images/presale.svg'
                    : '/images/presale-dark.svg'
                }
                width={'200px'}
                height={'200px'}
              />
              <span
                className={`ms-2 ${theme?.theme === 'light' ? 'tag-white' : 'tag-dark'
                  } rounded-lg`}
              >
                <FcInfo size={20} />
              </span>
            </div>
            <CardDescription className="text-center flex justify-center px-0">
              <input
                type="number"
                id="Price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:dark focus:border-gray-300 block  maw-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                style={{
                  color: theme?.theme === 'light' ? '#09090B' : 'rgb(202,241,222)'

                }}
                required
                onChange={(e: any) => setPreSaleValue(e.target.value)}
                value={preSaleValue}
              />
            </CardDescription>
          </CardHeader>
          <CardFooter className="text-center mb-5 flex justify-center p-0">
            <span
              className={`${theme?.theme === 'light' ? 'tag-white' : 'tag-dark'
                } rounded-lg`}
            >
              <TransactionButton

                style={{
                  height: '2.5rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                  minWidth: 'auto',
                  padding: '0px',
                  paddingLeft: '0.5rem',
                  paddingRight: '0.5rem',
                }}
                // className="text-center items-center w-[120px] md:w-[150px] p-2 rounded-[100px] cursor-pointer gradient-btn border-2 border-white hover:border-black"
                transaction={async () => {
                  const tx = claimTo({
                    contract: TokenDropContract,
                    quantity: BigInt(preSaleValue.toString()).toString(),
                    to: account?.address as any
                  })
                  return tx
                }}
                onTransactionSent={result => {
                  console.log('Transaction submitted', result.transactionHash)
                }}
                onTransactionConfirmed={receipt => {
                  toast.success('Claimed Successfully')
                }}
                onError={(error: any) => {
                  toast.error(error.message)
                }}
              >
                Buy ATH Presale
              </TransactionButton>

            </span>
          </CardFooter>
        </Card>
      </div>
      <div className="">
        <Card className="h-full flex flex-col justify-between rounded-xl border bg-card text-card-foreground shadow">
          <CardHeader className="py-6 px-6 ">
            <div
              className="mb-[20px]"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <img
                src={
                  theme?.theme === 'light'
                    ? '/images/reward.svg'
                    : '/images/reward-dark.svg'
                }
                width={'200px'}
                height={'200px'}
              />
              <span
                className={`ms-2 ${theme?.theme === 'light' ? 'tag-white' : 'tag-dark'
                  } rounded-lg`}
              >
                <FcInfo size={20} />
              </span>
            </div>
            <CardTitle className="text-center"></CardTitle>
            <CardDescription className="text-center">
              {props?.account && (
                <p
                  className="px-6 text-2xl font-bold text-center"
                  style={{
                    color:
                      theme?.theme === 'light' ? '#09090B' : 'rgb(202,241,222)'
                  }}
                >
                  {props?.rewardData}
                </p>
              )}
            </CardDescription>
          </CardHeader>
          <CardFooter className="text-center mb-5   flex justify-center p-0">
            <span
              className={`${theme?.theme === 'light' ? 'tag-white' : 'tag-dark'
                } rounded-lg`}
            >
              <Button variant="ghost" size="md" >
                Claim ATH Rewards
              </Button>
            </span>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
