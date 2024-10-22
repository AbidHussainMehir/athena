'use client'

import { useEffect, useState, useRef } from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '../ui/card'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { FcInfo } from 'react-icons/fc'
// import { PreSaleContract } from './utils/contracts/presale'
import { ClaimButton, TransactionButton } from 'thirdweb/react'
import toast from 'react-hot-toast'
// import { claim } from "thirdweb/extensions/erc20";
import { claimTo } from 'thirdweb/extensions/erc20'
import { useActiveAccount } from 'thirdweb/react'
import { TokenDropContract } from '../../../../lib/utils/constants'
export function PresaleCard(props: any) {
  const theme: any = useTheme()

  const [input, setInput] = useState('')
  const [preSaleValue, setPreSaleValue] = useState<any>('1')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  console.log({ props })

  //   const handlepreSale = async () => {
  //     try {
  //       // Assuming your claim function requires a quantity parameter
  //       const contract = await sdk.getContract("{{contract_address}}");
  // await contract.erc20.transfer(walletAddress, amount);
  // // await PreSaleContract.erc720.claim(walletAddress, amount);
  //       const tx = await PreSaleContract.call("claim", BigInt(1));
  //       const transaction = claim({
  //         contract:PreSaleContract,
  //         to: "0x...",
  //         // tokenId: BigInt(id as any),
  //         quantity: BigInt(1),
  //       });
  //       return transaction;
  //     } catch (error:any) {
  //       console.error("Error during claim transaction:", error);
  //       throw new Error(error.message); // Propagate error for TransactionButton to handle
  //     }
  //   };
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
                className={`ms-2 ${
                  theme?.theme === 'light' ? 'tag-white' : 'tag-dark'
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
                required
                onChange={(e: any) => setPreSaleValue(e.target.value)}
                value={preSaleValue}
              />
            </CardDescription>
          </CardHeader>
          <CardFooter className="text-center mb-5 flex justify-center p-0">
            <span
              className={`${
                theme?.theme === 'light' ? 'tag-white' : 'tag-dark'
              } rounded-lg`}
            >
              {/* <Button variant="ghost" size="md">
                Buy ATH Presale
              </Button> */}

              <TransactionButton
                style={{ height: '2.5rem' }}
                className="text-center items-center w-[120px] md:w-[150px] p-2 rounded-[100px] cursor-pointer gradient-btn border-2 border-white hover:border-black"
                transaction={() => {
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
                  console.log('Transaction confirmed', receipt.transactionHash)
                }}
                onError={(error: any) => {
                  toast('error')
                  console.error('Transaction error', error)
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
                className={`ms-2 ${
                  theme?.theme === 'light' ? 'tag-white' : 'tag-dark'
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
              className={`${
                theme?.theme === 'light' ? 'tag-white' : 'tag-dark'
              } rounded-lg`}
            >
              <Button variant="ghost" size="md">
                Claim ATH Rewards
              </Button>
            </span>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
