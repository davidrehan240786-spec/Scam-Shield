-- Seed: Realistic Threat Alerts for ScamShield Threat Feed

INSERT INTO public.threat_alerts (title, description, severity, category, platform, tags, is_verified) VALUES
('Fake Electricity Bill WhatsApp Scam', 'Fraudsters are sending WhatsApp messages claiming your electricity connection will be cut tonight. A shortened link asks victims to pay ₹2 to avoid disconnection, then steals card details.', 'Critical', 'Phishing', 'WhatsApp', ARRAY['UPI', 'Phishing', 'Urgency'], true),

('HDFC Bank KYC Expiry Phishing', 'Fake SMS from "HDFCBK" warns users their KYC has expired. Clicking the link opens a convincing fake bank portal that harvests credentials and OTPs.', 'Critical', 'Banking Fraud', 'SMS', ARRAY['Banking', 'OTP Theft', 'KYC'], true),

('Fake Job Offer via Instagram DM', 'Users are receiving DMs from fake recruiter accounts offering ₹40,000/month work-from-home jobs. They request ₹500–₹2000 as a "security deposit" before disappearing.', 'High', 'Fake Jobs', 'Instagram', ARRAY['Job Scam', 'Advance Fee'], true),

('Google Pay QR Code Money Request Scam', 'Scammers pose as buyers on OLX and send QR codes to "pay" sellers. Scanning the code actually initiates a payment request draining the victim''s account.', 'Critical', 'UPI Fraud', 'PhonePe/GPay', ARRAY['UPI', 'QR Code', 'OLX'], true),

('Aadhaar OTP Interception Fraud', 'A new technique allows fraudsters to intercept Aadhaar-linked OTPs by cloning SIM cards. Multiple victims in Bengaluru lost over ₹1L each.', 'Critical', 'OTP Theft', 'Mobile Network', ARRAY['OTP', 'SIM Swap', 'Aadhaar'], true),

('Fake Investment App "CryptoProfitX"', 'A fraudulent investment app promises 30% monthly returns. It shows fake profits to encourage deposits, then blocks withdrawals. Over ₹50L reportedly lost in March.', 'High', 'Banking Fraud', 'Telegram', ARRAY['Crypto', 'Investment', 'Ponzi'], true),

('Parcel Held at Customs - FedEx Phishing', 'Fake FedEx emails and SMS claim a parcel is held at customs requiring a ₹150 customs clearance fee. The payment link steals card details.', 'High', 'Phishing', 'Email/SMS', ARRAY['Phishing', 'FedEx', 'Customs'], true),

('Lottery Win - TRAI Telecom Scam', 'Callers impersonate TRAI officers claiming the victim''s number won a ₹25L lucky draw. They ask for GST payment (₹5,000) before releasing the prize.', 'High', 'Social Media Scams', 'Phone Call', ARRAY['Lottery', 'Impersonation', 'TRAI'], true),

('Fake Rental Advance Fraud on NoBroker', 'Fake landlords list properties far below market rate. After collecting 2–3 months advance rent digitally, they block all contact and the listing disappears.', 'High', 'Fake Jobs', 'NoBroker/99acres', ARRAY['Rental', 'Advance', 'Real Estate'], true),

('WhatsApp "Family Emergency" Money Scam', 'Compromised WhatsApp accounts send messages to victim''s contacts: "Mom, I''m in an emergency, please send ₹3,000 to this UPI ID immediately."', 'High', 'Social Media Scams', 'WhatsApp', ARRAY['Account Takeover', 'UPI', 'Social Engineering'], true),

('Fake IRCTC Ticket Refund Phishing', 'An email claiming to be from IRCTC asks users to update their bank details for a pending ticket refund. The link leads to a credential-harvesting portal.', 'Medium', 'Phishing', 'Email', ARRAY['IRCTC', 'Refund', 'Bank Details'], true),

('Amazon Seller Portal Credential Theft', 'Phishing emails target Amazon sellers with fake "Account Suspended" alerts. The malicious link steals seller credentials and redirects bank payments.', 'High', 'Phishing', 'Email', ARRAY['Amazon', 'Seller', 'Credentials'], true),

('Screen Share OTP Theft via AnyDesk', 'Callers pose as bank customer support and ask victims to install AnyDesk for "verification". They then view OTPs on screen and complete unauthorized transactions.', 'Critical', 'OTP Theft', 'Phone Call', ARRAY['AnyDesk', 'Remote Access', 'OTP'], true),

('Fake Government Subsidy WhatsApp Bot', 'A viral WhatsApp message claims the government is giving ₹8,000 subsidy for women. It redirects through a chain of links collecting personal data and UPI IDs.', 'Medium', 'Social Media Scams', 'WhatsApp', ARRAY['Government', 'Subsidy', 'Data Theft'], true),

('Deepfake Video Call Extortion', 'Scammers make video calls using AI-generated deepfakes of celebrities or officials. They record the call, edit it, and threaten to release it unless the victim pays.', 'Critical', 'Social Media Scams', 'Video Call', ARRAY['Deepfake', 'AI', 'Extortion'], true);
