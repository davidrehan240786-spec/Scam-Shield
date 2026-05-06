
export const QUIZ_DATA: Record<string, any[]> = {
  "Phishing Quiz": [
    {
      scenario: "You receive an email from 'Netflix Support' (support@netflix-account-verify.com) stating your payment failed and you need to update your card details immediately to avoid account suspension.",
      type: "scam",
      explanation: "The sender email domain is suspicious. Official Netflix emails come from @netflix.com. The sense of urgency and request for card details on a non-official domain are classic phishing signs.",
      redFlags: ["Suspicious Domain", "Urgent Threat", "Payment Request"]
    },
    {
      scenario: "An email from your boss asks you to buy 5 Google Play gift cards for a client meeting and send the codes over email because they are 'stuck in a meeting'.",
      type: "scam",
      explanation: "This is a Business Email Compromise (BEC) attack. Bosses rarely ask employees to buy gift cards. Scammers use the authority of a superior to bypass normal checks.",
      redFlags: ["Gift Card Request", "Urgent Request", "Unusual Communication"]
    },
    {
      scenario: "You get an SMS: 'Your Amazon package delivery failed. Please verify your address and pay a small re-delivery fee of ₹25 at: https://bit.ly/amzn-track-99'.",
      type: "scam",
      explanation: "Shortened links (bit.ly) are often used to hide malicious domains. Official logistics companies don't ask for re-delivery fees via SMS links.",
      redFlags: ["Shortened Link", "Unsolicited SMS", "Payment Request"]
    },
    {
      scenario: "A notification from LinkedIn says 'Someone viewed your profile'. The link leads to 'linkedin.com/me/profile-views'.",
      type: "safe",
      explanation: "This is a standard LinkedIn notification. The domain is the official linkedin.com, and profile view alerts are a core feature of the platform.",
      trustIndicators: ["Official Domain", "Standard Feature", "Expected Communication"]
    },
    {
      scenario: "You receive a 'Security Alert' from Google (no-reply@accounts.google.com) about a new login from a device in Russia. It asks you to review your activity.",
      type: "safe",
      explanation: "Official Google security alerts come from @accounts.google.com. Checking your activity through the official link provided is the correct safety measure.",
      trustIndicators: ["Verified Sender", "Security Best Practice", "Official Domain"]
    },
    {
      scenario: "An email claims you won a ₹50,000 lottery from 'KBC' and asks you to provide your bank account number and Aadhaar card to claim the prize.",
      type: "scam",
      explanation: "Lottery scams are designed to collect personal data. No legitimate lottery asks for Aadhaar and bank details via an unsolicited email.",
      redFlags: ["Unsolicited Prize", "Personal Data Request", "KYC Theft"]
    },
    {
      scenario: "Your bank sends an email: 'A new beneficiary has been added to your account. If this wasn't you, log in to netbanking.bank-name.com to secure your account.'",
      type: "safe",
      explanation: "Banks send automated alerts for security events. As long as the link leads to the official, verified bank domain, it is a legitimate security measure.",
      trustIndicators: ["Real-time Alert", "Official Domain", "Protective Action"]
    },
    {
      scenario: "You receive a 'Password Reset' email from Microsoft (account-security-noreply@microsoft.com) that you requested 2 minutes ago. It contains a link to reset your password.",
      type: "safe",
      explanation: "Since YOU initiated the password reset and the sender domain is official (@microsoft.com), this is a legitimate security email.",
      trustIndicators: ["User-initiated", "Verified Domain", "Expected Timing"]
    },
    {
      scenario: "Your bank's official mobile app sends a notification: 'A new version of the app is available with enhanced security features. Please update via the App Store/Play Store.'",
      type: "safe",
      explanation: "Official apps communicate updates through system notifications. Redirecting users to official app stores is a standard and safe practice.",
      trustIndicators: ["In-app Notification", "Official App Store", "Standard Procedure"]
    },
    {
      scenario: "You receive a PayPal invoice for $499 for 'Bitcoin Purchase' you didn't make, with a note: 'If you didn't authorize this, call our cancellation desk'.",
      type: "scam",
      explanation: "Scammers use legitimate PayPal invoice features to send fake bills. The 'cancellation desk' number leads to a scammer.",
      redFlags: ["Unexpected Invoice", "Phone Number Request", "Fear Tactic"]
    }
  ],
  "UPI Scam Quiz": [
    {
      scenario: "A stranger on OLX wants to buy your old sofa. They send you a QR code and say 'Scan this to receive the payment of ₹5,000'.",
      type: "scam",
      explanation: "Scanning a QR code in a UPI app is ONLY for sending or authorizing a payment, NEVER for receiving money.",
      redFlags: ["QR Code for Receiving", "Payment Request", "Unknown Buyer"]
    },
    {
      scenario: "You get a GPay notification: 'You have received a cashback reward of ₹1,999. Click here to claim it into your bank account'.",
      type: "scam",
      explanation: "Real cashbacks are credited automatically. If you have to click 'Claim' and enter your PIN, it's a scam.",
      redFlags: ["PIN Request for Reward", "Fake Cashback", "Urgency"]
    },
    {
      scenario: "A 'Customer Care' agent for Zomato calls you after a failed order. They ask you to open your UPI app and 'check for a pending request' to get your refund.",
      type: "scam",
      explanation: "Refunds are processed automatically. Any request to 'approve' a transaction or enter a PIN to get a refund is a scam.",
      redFlags: ["PIN for Refund", "Unsolicited Call", "Approval Request"]
    },
    {
      scenario: "Your friend sends a UPI payment link on WhatsApp and says 'Hey, I forgot my wallet at the shop, can you pay ₹200 for me? I'll return it tonight.'",
      type: "safe",
      explanation: "If you recognize the context and the amount is reasonable between trusted parties, it's likely legitimate.",
      trustIndicators: ["Trusted Contact", "Contextual Request", "Reasonable Amount"]
    },
    {
      scenario: "You receive an automated SMS reminder from Amazon Pay: 'Your monthly Pay Later bill of ₹1,250 is due. Please pay via the Amazon app to avoid late fees.'",
      type: "safe",
      explanation: "Legitimate fintech services send automated reminders for upcoming bills.",
      trustIndicators: ["Automated Reminder", "Known Service", "In-app Payment"]
    },
    {
      scenario: "After paying your electricity bill on PhonePe, you receive a confirmation message and a digital receipt within the app.",
      type: "safe",
      explanation: "In-app confirmations and receipts for transactions you initiated are the standard and safe way platforms communicate.",
      trustIndicators: ["In-app Receipt", "User-initiated", "Verified Merchant"]
    },
    {
      scenario: "A person calls saying they 'accidentally' sent ₹5,000 to your UPI ID and asks you to send it back. You check your bank statement and see the deposit.",
      type: "safe",
      explanation: "If the money actually shows up in your bank statement, it might be a genuine mistake.",
      trustIndicators: ["Verified Deposit", "Bank Record", "No PIN Request"]
    },
    {
      scenario: "A 'Bank Official' calls and asks you to share your UPI PIN to 'link your Aadhaar' or your account will be frozen.",
      type: "scam",
      explanation: "Bank officials will NEVER ask for your UPI PIN.",
      redFlags: ["PIN Request", "Fear Tactic", "Impersonation"]
    },
    {
      scenario: "You receive a 'Collect Request' on PhonePe for ₹4,999 from 'Flipkart Rewards'.",
      type: "scam",
      explanation: "Rewards are never sent as 'Collect Requests'. A collect request is a demand for money from your account.",
      redFlags: ["Collect Request", "Fake Identity", "Payment Request"]
    },
    {
      scenario: "You scan a QR code at a reputable grocery store to pay your bill of ₹450.",
      type: "safe",
      explanation: "Scanning a QR code at a physical shop to pay for items you are purchasing is the standard and safe way to use UPI.",
      trustIndicators: ["Physical Merchant", "Standard Transaction", "Verified Shop"]
    }
  ],
  "OTP Theft Quiz": [
    {
      scenario: "A 'Bank Manager' calls saying your credit card is blocked. They say, 'I'm sending a code to unblock it. Read it to me once you receive it.'",
      type: "scam",
      explanation: "Banks never call you to ask for an OTP. OTPs are for YOUR use only to authorize transactions you initiated.",
      redFlags: ["OTP Request", "Fear Tactic", "Impersonation"]
    },
    {
      scenario: "You receive an OTP for a ₹10,000 transaction on Amazon that you didn't initiate. Seconds later, someone calls saying they are from Amazon and need the code to 'cancel' the order.",
      type: "scam",
      explanation: "Giving them the OTP will complete the fraud, not cancel it.",
      redFlags: ["Unsolicited OTP", "Verification Request", "Urgency"]
    },
    {
      scenario: "A stranger on a Facebook group says 'I'm sending you a code to verify you are a real person before I sell you this phone. Just tell me the number.'",
      type: "scam",
      explanation: "This is a Google Voice or WhatsApp login scam.",
      redFlags: ["Verification Code", "Unknown Sender", "Account Takeover"]
    },
    {
      scenario: "You are logging into your Gmail account on a new laptop. Google sends an OTP to your phone to verify your identity.",
      type: "safe",
      explanation: "This is a standard 2-Factor Authentication (2FA) process.",
      trustIndicators: ["User-initiated", "Official Security Layer", "Device Verification"]
    },
    {
      scenario: "A courier delivery person calls and says 'I'm at your gate, please give me the OTP sent to your phone to confirm delivery.'",
      type: "safe",
      explanation: "Many courier services use OTPs to ensure the package is delivered to the correct person.",
      trustIndicators: ["Physical Presence", "Standard Delivery Procedure", "Official SMS"]
    },
    {
      scenario: "You are making a ₹2,000 purchase on a trusted e-commerce site like Myntra. You receive an OTP from your bank to authorize the transaction.",
      type: "safe",
      explanation: "This is a legitimate use of OTP for a transaction YOU started.",
      trustIndicators: ["User-initiated", "Verified Payment Gateway", "Transaction Match"]
    },
    {
      scenario: "You visit a local telecom store to get a new SIM. The executive asks for an OTP sent to your Aadhaar-linked mobile for e-KYC verification.",
      type: "safe",
      explanation: "In-person verification at an official store is safe.",
      trustIndicators: ["In-person Verification", "Official Store", "Service Request"]
    },
    {
      scenario: "You are trying to reset your Instagram password because you forgot it. Instagram sends you a recovery code via email.",
      type: "safe",
      explanation: "Password resets are initiated by the user.",
      trustIndicators: ["User-initiated", "Official Platform", "Expected Recovery"]
    },
    {
      scenario: "An 'Airtel Agent' calls saying your SIM card will expire today. They ask for an OTP to 'extend the validity for free'.",
      type: "scam",
      explanation: "This is a SIM-swap or account takeover scam.",
      redFlags: ["Fear Tactic", "OTP for Validity", "Impersonation"]
    },
    {
      scenario: "You receive an OTP for 'COWIN' login that you didn't request. A person calls and asks you to share it for 'medical record synchronization'.",
      type: "scam",
      explanation: "Sharing any government-related OTP gives scammers access to your sensitive personal data.",
      redFlags: ["Unsolicited OTP", "Personal Data Risk", "Impersonation"]
    }
  ],
  "Fake Job Scam Quiz": [
    {
      scenario: "You get a WhatsApp message: 'TATA Group is hiring! Work from home, 2 hours a day, earn ₹5,000 daily. Click here to apply: http://tata-jobs-portal.top'.",
      type: "scam",
      explanation: "Legitimate companies don't hire via random WhatsApp messages with high pay for low work.",
      redFlags: ["Too Good to be True", "Suspect Domain", "WhatsApp Recruitment"]
    },
    {
      scenario: "After a 5-minute 'interview' on Telegram, you are told you are hired. They ask you to pay ₹2,500 for 'Laptop processing and ID card fees'.",
      type: "scam",
      explanation: "Real employers NEVER ask for money during the hiring process.",
      redFlags: ["Payment for Job", "Telegram Interview", "Unrealistic Process"]
    },
    {
      scenario: "A recruiter from a well-known company contacts you via LinkedIn and asks for a formal interview through their official portal.",
      type: "safe",
      explanation: "LinkedIn is a professional platform for recruitment.",
      trustIndicators: ["Professional Platform", "Official Portal", "Verified Recruiter"]
    },
    {
      scenario: "You receive a job offer for a 'Data Entry' role. The task is to 'Buy USDT crypto and send it to our wallet' to test the system.",
      type: "scam",
      explanation: "This is a money laundering or 'task' scam.",
      redFlags: ["Crypto Involvement", "Personal Money Request", "Money Laundering"]
    },
    {
      scenario: "A job portal asks for your bank account number and IFSC code so they can 'set up your payroll' after you have signed a formal offer letter.",
      type: "safe",
      explanation: "Banking details are required for salary processing.",
      trustIndicators: ["Formal Offer Letter", "Standard HR Step", "Post-contract Request"]
    },
    {
      scenario: "You are asked to download an 'Employee Tracking App' (an APK file via WhatsApp) to complete your 'remote onboarding'.",
      type: "scam",
      explanation: "Never install APK files from unknown sources. This is likely malware.",
      redFlags: ["APK File Request", "Malware Risk", "WhatsApp Onboarding"]
    },
    {
      scenario: "A 'Recruiter' says you can't start work until you complete a 'mandatory training course' that costs ₹1,500 on their website.",
      type: "scam",
      explanation: "Legitimate companies provide free training or reimburse you.",
      redFlags: ["Payment for Training", "Job Barrier", "Financial Fraud"]
    },
    {
      scenario: "An email from 'Careers@Amazon' asks you to attend a walk-in interview at their official office address listed on their website.",
      type: "safe",
      explanation: "Walk-in interviews at official, physical office locations are legitimate.",
      trustIndicators: ["Physical Office Location", "Official Amazon Email", "Publicly Listed Address"]
    },
    {
      scenario: "You receive a job alert email from Naukri.com: 'New Job Matching Your Profile: Senior Software Engineer at Infosys'. The link leads to the official Naukri website.",
      type: "safe",
      explanation: "Job portals send automated alerts based on your preferences.",
      trustIndicators: ["Official Job Portal", "Profile Matching", "Trusted Platform"]
    },
    {
      scenario: "A recruiter asks for your 10th/12th marksheets and ID proof to verify your educational background during the application process.",
      type: "safe",
      explanation: "Background verification is a standard part of the hiring process.",
      trustIndicators: ["Background Verification", "Standard HR Procedure", "Educational Documents"]
    }
  ],
  "Social Media Scam Quiz": [
    {
      scenario: "Your friend's Instagram account DMs you: 'Hey, I'm stuck at the hospital, can you send me ₹2,000? My UPI isn't working.'",
      type: "scam",
      explanation: "This is an account hijacking scam. Scammers use your friend's stolen account.",
      redFlags: ["Urgent Money Request", "Unexpected DM", "Account Compromise"]
    },
    {
      scenario: "A Facebook post says 'Bill Gates is giving away $1,000 to everyone who shares this post and clicks this link: http://gates-giveaway.net'.",
      type: "scam",
      explanation: "Celebrities don't give away money via random shared posts.",
      redFlags: ["Fake Giveaway", "Suspect Domain", "Unrealistic Claim"]
    },
    {
      scenario: "You see a 'Sponsored' ad on Instagram for a Nike sale: '90% OFF! All shoes for ₹499. One day only!'. The site is 'nike-clearance-sale.org'.",
      type: "scam",
      explanation: "Extreme discounts are often too good to be true.",
      redFlags: ["Extreme Discount", "Fake Domain", "Urgency"]
    },
    {
      scenario: "A verified Twitter (X) brand account responds to your complaint and asks you to DM them your order number for support.",
      type: "safe",
      explanation: "Verified brand accounts often provide customer support on social media.",
      trustIndicators: ["Verified Badge", "Response to Complaint", "Support Request"]
    },
    {
      scenario: "You get a friend request from someone who is ALREADY your friend. Their 'new' profile has the same photos but only 2 followers.",
      type: "scam",
      explanation: "This is a profile cloning scam.",
      redFlags: ["Cloned Profile", "Duplicate Request", "Identity Theft"]
    },
    {
      scenario: "A 'Crypto Expert' on Telegram invites you to a group where everyone is posting screenshots of their massive earnings using his 'AI Bot'.",
      type: "scam",
      explanation: "These groups use fake screenshots and fake accounts to lure victims.",
      redFlags: ["Shilling", "Unrealistic Returns", "Telegram Group"]
    },
    {
      scenario: "An Instagram account for a local restaurant posts a 'GIVEAWAY' for a free meal. To enter, you just need to tag 3 friends in the comments.",
      type: "safe",
      explanation: "Tag-to-enter giveaways are a common and legitimate marketing tactic.",
      trustIndicators: ["Local Business", "Common Marketing Tactic", "No Sensitive Info"]
    },
    {
      scenario: "You receive a security notification from Facebook: 'New login to your account from a device in Mumbai, India'. Since you just logged in from Mumbai, you ignore it.",
      type: "safe",
      explanation: "Platforms notify you of new logins for your safety.",
      trustIndicators: ["Recognized Location", "Personal Activity Match", "Official Security Alert"]
    },
    {
      scenario: "You receive an email from YouTube: 'Your YouTube Premium subscription has been successfully renewed for ₹129'. The amount matches your plan.",
      type: "safe",
      explanation: "Subscription services send receipts for recurring payments.",
      trustIndicators: ["Subscription Match", "Standard Receipt", "Verified Sender"]
    },
    {
      scenario: "A friend DMs you on Twitter: 'Hey, did you see the photos from the trek last weekend? I uploaded them here.' The link is a Google Photos album.",
      type: "safe",
      explanation: "Personal messages from known friends about shared experiences are common.",
      trustIndicators: ["Known Contact", "Shared Experience", "Trusted Hosting Link"]
    }
  ]
};
