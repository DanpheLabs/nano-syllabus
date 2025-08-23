import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  CreditCard,
  User,
  Moon,
  Sun,
  Volume2,
  Languages,
  Download,
  Trash2,
  Crown,
  Camera
} from "lucide-react"

export function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    reminders: true,
    achievements: true,
    weekly: false
  })

  const [privacy, setPrivacy] = useState({
    profile: "public",
    progress: "friends",
    leaderboard: true
  })

  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    sound: true,
    autoplay: false,
    offlineSync: true
  })

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
        <Badge className="gradient-primary text-white">
          <Crown className="w-3 h-3 mr-1" />
          Premium
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="gradient-primary text-white text-xl">PS</AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-1 -right-1 w-6 h-6 p-0 rounded-full">
                  <Camera className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Prashant Soni</h3>
                <p className="text-sm text-muted-foreground">prashant.soni@email.com</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="display-name">Display Name</Label>
                <Input id="display-name" defaultValue="Prashant Soni" />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="prashant.soni@email.com" />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="Mumbai, India" />
              </div>
            </div>

            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notif">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive course updates via email</p>
                </div>
                <Switch 
                  id="email-notif"
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, email: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notif">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get instant updates</p>
                </div>
                <Switch 
                  id="push-notif"
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, push: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reminders">Study Reminders</Label>
                  <p className="text-sm text-muted-foreground">Daily learning reminders</p>
                </div>
                <Switch 
                  id="reminders"
                  checked={notifications.reminders}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, reminders: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="achievements">Achievement Updates</Label>
                  <p className="text-sm text-muted-foreground">When you unlock achievements</p>
                </div>
                <Switch 
                  id="achievements"
                  checked={notifications.achievements}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, achievements: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">Progress summary emails</p>
                </div>
                <Switch 
                  id="weekly"
                  checked={notifications.weekly}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, weekly: checked }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select 
                  value={preferences.theme}
                  onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, theme: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={preferences.language}
                  onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, language: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sound">Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">Play audio feedback</p>
                </div>
                <Switch 
                  id="sound"
                  checked={preferences.sound}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, sound: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoplay">Auto-play Videos</Label>
                  <p className="text-sm text-muted-foreground">Start videos automatically</p>
                </div>
                <Switch 
                  id="autoplay"
                  checked={preferences.autoplay}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, autoplay: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="offline">Offline Sync</Label>
                  <p className="text-sm text-muted-foreground">Download content for offline use</p>
                </div>
                <Switch 
                  id="offline"
                  checked={preferences.offlineSync}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, offlineSync: checked }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Privacy & Security */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="profile-visibility">Profile Visibility</Label>
              <Select 
                value={privacy.profile}
                onValueChange={(value) => 
                  setPrivacy(prev => ({ ...prev, profile: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="friends">Friends Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="progress-sharing">Progress Sharing</Label>
              <Select 
                value={privacy.progress}
                onValueChange={(value) => 
                  setPrivacy(prev => ({ ...prev, progress: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="friends">Friends Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="leaderboard">Show on Leaderboard</Label>
                <p className="text-sm text-muted-foreground">Appear in rankings</p>
              </div>
              <Switch 
                id="leaderboard"
                checked={privacy.leaderboard}
                onCheckedChange={(checked) => 
                  setPrivacy(prev => ({ ...prev, leaderboard: checked }))
                }
              />
            </div>
          </div>

          <Separator />
          
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button variant="outline">Enable 2FA</Button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Change Password</h4>
              <p className="text-sm text-muted-foreground">Update your account password</p>
            </div>
            <Button variant="outline">Change Password</Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscription & Billing */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Subscription & Billing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-semibold">Premium Plan</h4>
                <p className="text-sm text-muted-foreground">Unlimited learning • $15/month</p>
              </div>
            </div>
            <Badge className="gradient-primary text-white">Active</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
            <Button variant="outline">Update Payment Method</Button>
          </div>

          <Separator />

          <div className="flex justify-between items-center text-destructive">
            <div>
              <h4 className="font-medium">Cancel Subscription</h4>
              <p className="text-sm text-muted-foreground">This will downgrade you to the free plan</p>
            </div>
            <Button variant="destructive" size="sm">
              Cancel Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data & Export */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Data & Export
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Export Your Data</h4>
              <p className="text-sm text-muted-foreground">Download all your learning data</p>
            </div>
            <Button variant="outline">Export Data</Button>
          </div>

          <Separator />

          <div className="flex justify-between items-center text-destructive">
            <div>
              <h4 className="font-medium">Delete Account</h4>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}