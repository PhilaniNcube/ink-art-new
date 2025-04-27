"use client"

import { useState, useActionState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateProfile } from "@/utils/actions/profile"
import { toast } from "sonner"
import { CircleDashed } from "lucide-react"

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
})

type ProfileFormProps = {
  user: any
  profile: {
    first_name: string | null
    last_name: string | null
  } | null
}

export function ProfileForm({ user, profile }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfile, null)
  
  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: profile?.first_name || "",
      lastName: profile?.last_name || "",
    },
  })


  
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your account information
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form action={formAction}>
          <CardContent className="space-y-4 max-w-4xl">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} name="firstName" placeholder="Enter your first name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} name="lastName" placeholder="Enter your last name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input value={user?.email || ""} disabled />
                </FormControl>
                <FormDescription>
                  Your email address cannot be changed.
                </FormDescription>
              </FormItem>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              disabled={
                !form.formState.isDirty || 
                form.formState.isSubmitting ||
                !form.formState.isValid || isPending
              }
              className="relative"
            >
              {isPending && (
                <div className="absolute inset-0 flex items-center justify-center">
                 <CircleDashed className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )}
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
