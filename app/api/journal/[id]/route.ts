import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const PATCH = async (req: Request, { params }) => {
  const { content } = await req.json()
  const user = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  const analysis = await analyze(updatedEntry.content)

  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    // upsert: "if not found, create it with this"
    create: {
      entryId: updatedEntry.id,
      ...analysis,
    },
    // upsert: "if found, update it with this"
    update: analysis,
  })

  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } })
}
