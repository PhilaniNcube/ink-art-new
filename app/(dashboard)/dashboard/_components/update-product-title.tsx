"use client"

import { useActionState, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Pencil, Save } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { updatePrintifyProductTitle } from "@/utils/actions/products"

// Schema for form validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
})

type UpdateProductTitleDialogProps = {
  productId: string
  currentTitle: string
}

export function UpdateProductTitleDialog({
  productId,
  currentTitle,
}: UpdateProductTitleDialogProps) {
  const [open, setOpen] = useState(false)



  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: currentTitle,
    },
  })



  const title = form.watch("title")

  const clientAction = () => {
    // This function is called when the form is submitted

    updatePrintifyProductTitle(
      productId,
      title
    )

  }

  const [state, formAction, isPending] = useActionState(clientAction, null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Edit Title">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product Title</DialogTitle>
          <DialogDescription>
            Update the title of your product. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            action={formAction}
            className="space-y-4 pt-4"
          >
            <input type="hidden" name="productId" value={productId} />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input {...field} name="title" placeholder="Enter product title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}
