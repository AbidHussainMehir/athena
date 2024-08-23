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

export function PresaleCard() {
  const theme: any = useTheme()

  const [input, setInput] = useState('')

  const inputRef = useRef<HTMLTextAreaElement>(null)
  return (
    <>
      <div className="">
        <Card className="h-full flex flex-col justify-between">
          <CardHeader className="px-0">
            <CardTitle className="text-center px-0">Presale</CardTitle>
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
                theme?.theme === 'dark' ? 'tag-dark' : 'tag-white'
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
        <Card className="h-full flex flex-col justify-between">
          <CardHeader className="px-0 ">
            <CardTitle className="text-center">Rewards</CardTitle>
            <CardDescription className="text-center"></CardDescription>
          </CardHeader>
          <CardFooter className="text-center mb-5   flex justify-center p-0">
            <span
              className={`${
                theme?.theme === 'dark' ? 'tag-dark' : 'tag-white'
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
