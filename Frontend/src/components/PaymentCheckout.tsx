import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { 
  CreditCard, 
  Shield, 
  Check, 
  Crown,
  Zap,
  Star,
  ArrowLeft,
  Lock,
  Calendar
} from "lucide-react"

interface PaymentCheckoutProps {
  onBack?: () => void
  onSuccess?: () => void
}

export function PaymentCheckout({ onBack, onSuccess }: PaymentCheckoutProps) {
  const [selectedPlan, setSelectedPlan] = useState("monthly")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [billingInfo, setBillingInfo] = useState({
    email: "prashant.soni@email.com",
    fullName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    country: ""
  })

  const plans = {
    monthly: {
      name: "Premium Monthly",
      price: 15,
      period: "month",
      discount: null,
      popular: false
    },
    annual: {
      name: "Premium Annual",
      price: 12.50,
      originalPrice: 15,
      period: "month",
      discount: "Save 17%",
      popular: true,
      billedAnnually: 150
    }
  }

  const features = [
    "Unlimited courses and content",
    "Advanced AI memory techniques", 
    "Priority customer support",
    "Offline learning capability",
    "Detailed progress analytics",
    "Ad-free learning experience",
    "Export learning certificates"
  ]

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      onSuccess?.()
    }, 2000)
  }

  const selectedPlanData = plans[selectedPlan]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Upgrade to Premium</h1>
            <p className="text-muted-foreground">Unlock unlimited learning potential</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plan Selection & Payment Form */}
          <div className="space-y-6">
            {/* Plan Selection */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  Choose Your Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={selectedPlan}
                  onValueChange={setSelectedPlan}
                  className="space-y-4"
                >
                  {Object.entries(plans).map(([key, plan]) => (
                    <div key={key} className="relative">
                      <div className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedPlan === key 
                          ? 'border-primary bg-primary/5 ring-1 ring-primary/20' 
                          : 'border-border hover:border-primary/50'
                      }`}>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={key} id={key} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Label htmlFor={key} className="font-semibold cursor-pointer">
                                {plan.name}
                              </Label>
                              {plan.popular && (
                                <Badge className="gradient-primary text-white text-xs">
                                  Most Popular
                                </Badge>
                              )}
                              {plan.discount && (
                                <Badge variant="secondary" className="text-xs">
                                  {plan.discount}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold">${plan.price}</span>
                              <span className="text-muted-foreground">/{plan.period}</span>
                              {'originalPrice' in plan && plan.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${plan.originalPrice}
                                </span>
                              )}
                            </div>
                            {'billedAnnually' in plan && plan.billedAnnually && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Billed annually (${plan.billedAnnually})
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup 
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="w-4 h-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={billingInfo.email}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="As it appears on your card"
                        value={billingInfo.fullName}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, fullName: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={billingInfo.cardNumber}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={billingInfo.expiryDate}
                          onChange={(e) => setBillingInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={billingInfo.cvv}
                          onChange={(e) => setBillingInfo(prev => ({ ...prev, cvv: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="Select country"
                        value={billingInfo.country}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, country: e.target.value }))}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-sm">
                  <Shield className="w-4 h-4 text-success" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="shadow-soft sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Selected Plan */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{selectedPlanData.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedPlan === 'annual' ? 'Billed annually' : 'Billed monthly'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${selectedPlan === 'annual' ? selectedPlanData.billedAnnually : selectedPlanData.price}
                      </p>
                      {selectedPlan === 'annual' && (
                        <p className="text-sm text-muted-foreground">
                          (${selectedPlanData.price}/month)
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-success flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Total */}
                <div className="space-y-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>
                      ${selectedPlan === 'annual' ? selectedPlanData.billedAnnually : selectedPlanData.price}
                    </span>
                  </div>
                  {selectedPlan === 'annual' && (
                    <p className="text-sm text-success">
                      You save $30 annually!
                    </p>
                  )}
                </div>

                {/* Payment Button */}
                <Button 
                  className="w-full gradient-primary text-white shadow-medium hover:shadow-strong"
                  onClick={handlePayment}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Complete Payment
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By continuing, you agree to our Terms of Service and Privacy Policy. 
                  Cancel anytime from your account settings.
                </p>

                {/* Money Back Guarantee */}
                <div className="text-center p-4 rounded-lg bg-success/5 border border-success/20">
                  <Shield className="w-8 h-8 text-success mx-auto mb-2" />
                  <h5 className="font-semibold text-success mb-1">30-Day Money-Back Guarantee</h5>
                  <p className="text-sm text-muted-foreground">
                    Not satisfied? Get a full refund within 30 days, no questions asked.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}