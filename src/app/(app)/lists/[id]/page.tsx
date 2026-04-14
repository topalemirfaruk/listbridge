import { getList, getListItems } from '@/lib/actions/lists'
import { ListDetailClient } from './list-detail-client'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const list = await getList(id)
  return { title: list.title }
}

export default async function ListDetailPage({ params }: Props) {
  const { id } = await params
  const list = await getList(id)
  const listItemsData = await getListItems(id)

  return <ListDetailClient list={list} listItems={listItemsData} />
}
