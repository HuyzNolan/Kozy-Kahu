"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteConfirmationDialogProps {
  isOpen: boolean
  taskTitle: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmationDialog({ isOpen, taskTitle, onConfirm, onCancel }: DeleteConfirmationDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-foreground">Xóa nhiệm vụ</AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground mt-2">
            Bạn có chắc chắn muốn xóa nhiệm vụ <span className="font-medium text-foreground">"{taskTitle}"</span>? Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel
            onClick={onCancel}
            className="rounded-lg border border-border bg-background text-foreground hover:bg-muted"
          >
            Hủy bỏ
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-lg bg-destructive text-white hover:bg-destructive/90"
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
