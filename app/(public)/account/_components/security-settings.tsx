"use client"

import { useState } from "react"
import { KeyRound, LogOut, Mail, ShieldAlert } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { LogoutButton } from "@/components/logout-button"

type SecuritySettingsProps = {
  user: any
}

export function SecuritySettings({ user }: SecuritySettingsProps) {
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  
  // Function to send a password reset email (this would connect to your Auth system)
  const resetPassword = async () => {
    setIsResettingPassword(true)
    // Here you would implement the actual password reset logic
    // For example, using Supabase's password reset feature
    
    // Simulate API call delay
    setTimeout(() => {
      setIsResettingPassword(false)
    }, 2000)
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your account security and sessions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Email Verification</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your email has been verified
              </p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100">
            Verified
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <KeyRound className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Password</p>
              <p className="text-sm text-muted-foreground mt-1">
                Change your password regularly
              </p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Change Password</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset your password</DialogTitle>
                <DialogDescription>
                  We'll send a password reset link to your email address:
                  <strong> {user?.email}</strong>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={resetPassword} disabled={isResettingPassword}>
                  {isResettingPassword ? "Sending..." : "Send Reset Link"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-destructive/10 rounded-full">
              <ShieldAlert className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Sign out</p>
              <p className="text-sm text-muted-foreground mt-1">
                Sign out from your account
              </p>
            </div>
          </div>
          <LogoutButton>
           
          </LogoutButton>
        </div>
      </CardContent>
    </Card>
  )
}

// Adding Badge component since it's used but not imported
import { Badge } from "@/components/ui/badge";
