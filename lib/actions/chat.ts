'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { type Chat } from '@/lib/types'

export async function getChats(userId?: string | null) {
  return []
}

export async function getChat(id: string, userId: string = 'anonymous') {
  return null
}

export async function saveChat(chat: Chat, userId: string = 'anonymous') {}

export async function getSharedChat(id: string) {
  return null
}

export async function shareChat(id: string, userId: string = 'anonymous') {
  return null
}
