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

export function PresaleCard(props: any) {
  const theme: any = useTheme()

  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  console.log({ props })

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
            </div>
            <CardDescription className="text-center flex justify-center px-0">
              <input
                type="number"
                id="Price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:dark focus:border-gray-300 block  maw-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </CardDescription>
          </CardHeader>
          <CardFooter className="text-center mb-5 flex justify-center p-0">
            <span
              className={`${
                theme?.theme === 'light' ? 'tag-white' : 'tag-dark'
              } rounded-lg`}
            >
              <Button variant="ghost" size="md">
                Buy ATH Presale
              </Button>
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
