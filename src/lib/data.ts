export type UserStatus = "Active" | "Blocked";

export const users = (
  [
    ["Michael Smith", "+9750-555-0832", "Jul 16, 2025", "Blocked", "sakib.cse@gmail.com"],
    ["Linda Perez", "+9746-555-0678", "Jul 14, 2025", "Active", "sajid.bd@gmail.com"],
    ["John Miller", "+9714-555-0985", "Jul 20, 2025", "Active", "john.m@gmail.com"],
    ["Michael Smith", "+9706-555-0734", "Jul 20, 2025", "Active", "m.smith@gmail.com"],
    ["Emily Carter", "+1720-555-0641", "Jul 12, 2025", "Active", "emily.c@gmail.com"],
    ["Ayesha Rahman", "+9713-555-0890", "Jul 10, 2025", "Active", "ayesha.r@gmail.com"],
    ["Karen Thompson", "+9706-555-0734", "Jul 19, 2025", "Active", "karen.t@gmail.com"],
    ["James Anderson", "+9714-555-0985", "Jul 18, 2025", "Active", "james.a@gmail.com"],
    ["Sophia White", "+9715-555-0773", "Jul 18, 2025", "Blocked", "sophia.w@gmail.com"],
    ["David Brown", "+9711-555-0120", "Jul 08, 2025", "Active", "david.b@gmail.com"],
    ["Olivia Davis", "+9712-555-0321", "Jul 07, 2025", "Active", "olivia.d@gmail.com"],
  ] as const
).map(([name, phone, joined, status, email], i) => ({
  id: i + 1,
  name,
  phone,
  joined,
  status: status as UserStatus,
  email,
}));

export const clinics = (
  [
    ["BlueSky Dental Clinic", "+9750-555-0832", "3 / 621 Juvenal Ridge, Tel Aviv", "Jul 16, 2025", "Blocked"],
    ["Crown Dental Care", "+9746-555-0678", "0 / 77 Purdy Crescent, Haifa", "Jul 14, 2025", "Active"],
    ["Prime Dental Studio", "+9714-555-0985", "Suite 756 031 Ines River, Jerusalem", "Jul 20, 2025", "Active"],
    ["EverSmile Dentistry", "+9706-555-0734", "74C Aaliyah River, Haifa", "Jul 20, 2025", "Active"],
    ["Prestige Dental Care", "+1720-555-0641", "Level 5 05 Favian Park, Eilat", "Jul 12, 2025", "Active"],
    ["PureSmile Dental", "+9713-555-0890", "09 Arnulfo Crossing, Netanya", "Jul 10, 2025", "Active"],
    ["Oakwood Dental", "+9706-555-0734", "208 Olson Boulevard, Haifa", "Jul 19, 2025", "Active"],
    ["Urban Smile Clinic", "+9714-555-0985", "67B Gregorio Grove, Tel Aviv", "Jul 18, 2025", "Active"],
    ["Ivory Dental Center", "+9715-555-0773", "3 Bauch Nook, Howe Street", "Jul 18, 2025", "Blocked"],
  ] as const
).map(([name, phone, address, joined, status], i) => ({
  id: i + 1,
  name,
  phone,
  address,
  joined,
  status: status as UserStatus,
}));

export type KycStatus = "Pending" | "Verified" | "Rejected";

export const kyc = (
  [
    ["Oakwood Dental Clinic", "Dental Clinic License", "Jul 16, 2025", "Pending"],
    ["PureSmile Dental Care", "Dentist Professional License", "Jul 14, 2025", "Pending"],
    ["White Pearl Dentistry", "Other / Not Listed", "Jul 20, 2025", "Pending"],
    ["Pearl Dental Studio", "Dental Clinic License", "Jul 20, 2025", "Verified"],
    ["Diamond Dental Care", "Dentist Professional License", "Jul 12, 2025", "Verified"],
    ["BlueSky Dental Clinic", "Dental Clinic License", "Jul 10, 2025", "Verified"],
    ["Elite Smile Studio", "Dentist Professional License", "Jul 19, 2025", "Rejected"],
    ["Urban Smile Clinic", "Dental Clinic License", "Jul 18, 2025", "Rejected"],
    ["Nova Dental Clinic", "Dentist Professional License", "Jul 18, 2025", "Rejected"],
  ] as const
).map(([clinic, type, requested, status], i) => ({
  id: i + 1,
  clinic,
  type,
  requested,
  status: status as KycStatus,
  regNumber: `REG-${100230 + i * 17}`,
  phone: "+9750-555-0832",
  email: "clinic@example.com",
}));

export const earnings = (
  [
    ["Silverline Dental Clinic", "Monthly", "TXN001234577", "Oct 5 • 2:30 PM", "11.99"],
    ["Crown Dental Care", "6 Months", "TXN001234573", "Nov 12 • 9:15 AM", "59.99"],
    ["White Pearl Dentistry", "Annual", "TXN001234577", "Oct 15 • 11:45 AM", "98.99"],
    ["Urban Smile Clinic", "6 Months", "TXN001234569", "Dec 1 • 3:00 PM", "11.99"],
    ["Harmony Dental Care", "Annual", "TXN001234567", "Jan 20 • 1:00 PM", "59.99"],
    ["Prestige Dental Care", "6 Months", "TXN001234580", "Feb 8 • 4:30 PM", "98.99"],
    ["Bright Smile Dental Clinic", "Annual", "TXN001234574", "Mar 22 • 10:00 AM", "11.99"],
    ["Prime Dental Studio", "Monthly", "TXN001234581", "Apr 30 • 5:00 PM", "59.99"],
  ] as const
).map(([clinic, plan, txn, date, amount], i) => ({ id: i + 1, clinic, plan, txn, date, amount }));

export type HelpStatus = "To Do" | "Resolved";

export const help = (
  [
    ["Alex Müller", "Clinic", "Account & Login", "Sep 12 • 11:00 AM", "To Do"],
    ["Leon Schäfer", "User", "Clinic Verification", "Aug 31 • 9:00 AM", "To Do"],
    ["Sophie Schneider", "User", "Chat / Messaging Issue", "Sep 10 • 2:00 PM", "To Do"],
    ["Mia Krämer", "Clinic", "Subscription & Billing", "Aug 28 • 3:00 PM", "To Do"],
    ["Jonas Weber", "User", "Technical Issue", "Sep 1 • 1:00 PM", "Resolved"],
    ["Sophie Schneider", "Clinic", "Account Verification", "Sep 15 • 10:30 AM", "Resolved"],
    ["Lena Fischer", "User", "Technical Issue", "Aug 25 • 4:00 PM", "Resolved"],
    ["Hannah Wagner", "User", "Profile & Settings", "Sep 3 • 12:00 PM", "Resolved"],
    ["Maximilian Becker", "Clinic", "Clinic Verification", "Aug 22 • 5:00 PM", "Resolved"],
  ] as const
).map(([name, role, reason, submitted, status], i) => ({
  id: i + 1,
  name,
  role,
  reason,
  submitted,
  status: status as HelpStatus,
  message:
    "Hello, I am facing an issue related to this topic. Could you please look into it and get back to me as soon as possible? Thank you.",
}));

export const categories = [
  "Clear Aligners",
  "Dentures",
  "Dental Cleaning",
  "Dental Bridges",
  "Dental Implants",
  "Teeth Whitening",
  "Dental Veneers",
  "Orthodontics",
  "All-on-4 Dental Implants",
];

export const faqs = (
  [
    ["What steps should I follow to schedule a service!", "To schedule a service, pick the service you need, select a Clinic, choose a date and time that works for you, and finalize your appointment."],
    ["What is the process for booking a service!", "Start by selecting the service you want, then choose a Clinic, pick an available date and time, and confirm your appointment."],
    ["What do I need to do to book a service!", "First, choose the service you wish to book, then select a Clinic, find an available date and time, and confirm your booking."],
    ["How can I schedule a service!", "To book a service, select the service you need, choose a Clinic, pick a suitable date and time, and confirm your booking."],
    ["What are the steps to book a service!", "To book a service, first choose the service you want, then select a Clinic, pick an available date and time, and confirm your appointment."],
  ] as const
).map(([q, a], i) => ({ id: i + 1, q, a }));

export const notifications = [
  { title: "New User Registered", body: "A new User account has been created successfully.", time: "04:45 pm", unread: true },
  { title: "New Clinic Registered", body: "A new clinic account has been registered on DentalOffers.", time: "04:35 pm", unread: true },
  { title: "New Support Request", body: "A new Help & Support request has been submitted and requires review.", time: "04:25 pm", unread: false },
  { title: "Clinic Verification Request", body: "A clinic verification request is waiting for admin review.", time: "04:15 pm", unread: false },
];

export const treatmentServices = [
  "Dental Implants",
  "Dental Crowns",
  "Veneers",
  "Orthodontics",
  "Root Canal Treatment",
  "Teeth Whitening Services",
  "General Dentistry Care",
  "Dental Check-Ups",
];

export const termsHtml = `<h4>Terms &amp; Conditions</h4><p>Last updated: 27 October 2026</p>
<h4>01. About DentalOffers</h4><p>DentalOffers connects patients with dental clinics, allowing patients to submit treatment requests, receive quotations, compare offers, and communicate with clinics.</p>
<h4>02. Your Account</h4><p>You must provide accurate information and keep your account secure. You are responsible for activity carried out through your account.</p>
<h4>03. Treatment Requests &amp; Offers</h4><p>You can submit treatment requests and receive quotations from clinics. You are responsible for reviewing offers and discussing treatment details directly with your chosen clinic. Selecting an offer does not automatically confirm an appointment or treatment.</p>
<h4>04. Dental Treatment &amp; Payments</h4><p>DentalOffers is a connection platform, not a dental care provider. Clinics are responsible for their treatment services, prices, and clinical decisions. Patients pay clinics directly for treatment unless otherwise stated.</p>
<h4>05. Acceptable Use</h4><p>You must not misuse the platform, submit false information, harass other users, or engage in unlawful activities.</p>
<h4>06. Account Suspension &amp; Deletion</h4><p>You may request account deletion through the app where available. We may restrict accounts that violate these terms or pose a security risk. Certain records may be retained where legally required.</p>
<h4>07. Changes &amp; Contact</h4><p>We may update these terms when necessary. For questions, contact us at [Support Email].<br/>By using DentalOffers, you agree to these Terms &amp; Conditions.</p>`;

export const privacyHtml = `<h4>Privacy Policy</h4><p>Last updated: 27 October 2026</p>
<h4>01. Information We Collect</h4><p>We collect information you provide such as name, phone number, email, treatment requests and clinic details, plus basic device and usage data.</p>
<h4>02. How We Use Information</h4><p>We use your information to operate the platform, connect patients with clinics, verify clinics, provide support and improve our services.</p>
<h4>03. Sharing</h4><p>Your treatment request details are shared with clinics so they can send offers. We do not sell your personal data.</p>
<h4>04. Security &amp; Retention</h4><p>We use reasonable safeguards to protect your data and retain records only as long as necessary or legally required.</p>
<h4>05. Contact</h4><p>For privacy questions, contact support@dentaloffers.com.</p>`;
