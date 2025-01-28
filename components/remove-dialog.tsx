"use client"

import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Id } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'

interface RemoveDialogProps {
    documentId: Id<"documents">
    children: React.ReactNode
}

const RemoveDialog = ({ documentId, children }: RemoveDialogProps) => {

    const remove = useMutation(api.documents.removeById)

  return (
      <AlertDialog>
          <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
          <AlertDialogContent onClick={(e) => e.stopPropagation()}>
              <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                      This action cannot be undone.This will permanently delete your document.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={(e) => {
                      e.stopPropagation()
                     remove({id:documentId})
                  }}>Delete</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>

  )
}

export default RemoveDialog