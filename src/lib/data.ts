export type UserStatus = "Active" | "Blocked";
export type KycStatus = "Pending" | "Verified" | "Rejected";
export type HelpStatus = "To Do" | "Resolved";
export type PlanKey = "trial" | "monthly" | "six" | "yearly";
export type Audience = "Customer" | "Clinic";

export type User = {
  id: number;
  name: string;
  phone: string;
  joined: string;
  status: UserStatus;
  email: string;
};

export const users: User[] = (
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

export type Subscription = {
  plan: PlanKey;
  expires: string;
  trialStart?: string;
  trialEnd?: string;
};

export type Clinic = {
  id: number;
  name: string;
  phone: string;
  address: string;
  joined: string;
  status: UserStatus;
  services: string[];
  dentists: string[];
  subscription: Subscription | null;
  rating: number;
  about: string;
  regType: string;
  regNumber: string;
  submitted: string;
  verification: KycStatus;
  source: "Admin Added" | "Self-Registered";
  docs: string[];
};

const DENTISTS = ["Dr. Sarah Cohen", "Dr. David Levi", "Dr. Maya Katz", "Dr. Omar Haddad"];

// [name, phone, address, joined, status, verification, regType, submitted]
const clinicRows = [
  ["BlueSky Dental Clinic", "+9750-555-0832", "3 / 621 Juvenal Ridge, Tel Aviv", "Jul 16, 2025", "Blocked", "Verified", "Dental Clinic License", "Jul 10, 2025"],
  ["Crown Dental Care", "+9746-555-0678", "0 / 77 Purdy Crescent, Haifa", "Jul 14, 2025", "Active", "Pending", "Dentist Professional License", "Jul 14, 2025"],
  ["Prime Dental Studio", "+9714-555-0985", "Suite 756 031 Ines River, Jerusalem", "Jul 20, 2025", "Active", "Verified", "Dental Clinic License", "Jul 20, 2025"],
  ["EverSmile Dentistry", "+9706-555-0734", "74C Aaliyah River, Haifa", "Jul 20, 2025", "Active", "Verified", "Dental Clinic License", "Jul 20, 2025"],
  ["Prestige Dental Care", "+1720-555-0641", "Level 5 05 Favian Park, Eilat", "Jul 12, 2025", "Active", "Verified", "Dentist Professional License", "Jul 12, 2025"],
  ["PureSmile Dental Care", "+9713-555-0890", "09 Arnulfo Crossing, Netanya", "Jul 10, 2025", "Active", "Pending", "Dentist Professional License", "Jul 14, 2025"],
  ["Oakwood Dental Clinic", "+9706-555-0734", "208 Olson Boulevard, Haifa", "Jul 19, 2025", "Active", "Pending", "Dental Clinic License", "Jul 16, 2025"],
  ["Urban Smile Clinic", "+9714-555-0985", "67B Gregorio Grove, Tel Aviv", "Jul 18, 2025", "Active", "Rejected", "Dental Clinic License", "Jul 18, 2025"],
  ["Ivory Dental Center", "+9715-555-0773", "3 Bauch Nook, Howe Street", "Jul 18, 2025", "Blocked", "Verified", "Dental Clinic License", "Jul 05, 2025"],
  ["White Pearl Dentistry", "+9711-555-0140", "12 Herzl Street, Ashdod", "Jul 20, 2025", "Active", "Pending", "Other / Not Listed", "Jul 20, 2025"],
  ["Pearl Dental Studio", "+9711-555-0188", "5 Ben Gurion Ave, Haifa", "Jul 20, 2025", "Active", "Verified", "Dental Clinic License", "Jul 20, 2025"],
  ["Diamond Dental Care", "+9711-555-0192", "44 Dizengoff Street, Tel Aviv", "Jul 12, 2025", "Active", "Verified", "Dentist Professional License", "Jul 12, 2025"],
  ["Elite Smile Studio", "+9711-555-0201", "8 Rothschild Blvd, Tel Aviv", "Jul 19, 2025", "Active", "Rejected", "Dentist Professional License", "Jul 19, 2025"],
  ["Nova Dental Clinic", "+9711-555-0233", "21 Jaffa Road, Jerusalem", "Jul 18, 2025", "Active", "Rejected", "Dentist Professional License", "Jul 18, 2025"],
] as const;

export const clinics: Clinic[] = clinicRows.map(
  ([name, phone, address, joined, status, verification, regType, submitted], i) => ({
    id: i + 1,
    name,
    phone,
    address,
    joined,
    status: status as UserStatus,
    services: ["Implants", "Crowns", "Veneers"],
    dentists: DENTISTS.slice(0, (i % 3) + 2),
    subscription: i % 4 === 3 ? null : { plan: (["yearly", "monthly", "six", "trial"] as PlanKey[])[i % 4], expires: "01 Nov 2027" },
    rating: 5,
    about: "Professional dental care with personalized treatment plans.",
    regType,
    regNumber: `CLN-2026-${String(842 + i * 7).padStart(5, "0")}`,
    submitted,
    verification: verification as KycStatus,
    source: i % 2 === 0 ? "Self-Registered" : "Admin Added",
    docs: ["Registration.pdf", "License.pdf"],
  }),
);

export type Earning = {
  id: number;
  clinic: string;
  plan: string;
  txn: string;
  date: string;
  amount: string;
};

export const earnings: Earning[] = (
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

export type HelpItem = {
  id: number;
  name: string;
  role: "Clinic" | "User";
  reason: string;
  submitted: string;
  status: HelpStatus;
  message: string;
  phone: string;
  address: string;
  joined: string;
  accountStatus: UserStatus;
};

export const help: HelpItem[] = (
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
  phone: "+9746-555-0678",
  address: "0 / 77 Purdy Crescent, West Arthur",
  joined: "Jul 14, 2025",
  accountStatus: "Active" as UserStatus,
  message:
    role === "Clinic"
      ? "I am reaching out regarding my clinic account registration and verification. My clinic verification is currently pending or has been unsuccessful, and I am unable to start offering services on DentalOffers. I would appreciate an update on my verification status and guidance on what needs to be fixed. Thank you for your time and assistance."
      : "I am reaching out regarding my patient account. I am experiencing an issue with my account or accessing DentalOffers and would appreciate your assistance in resolving it. Please review my request and let me know if any additional information is needed. Thank you for your time and support.",
}));

export type Category = { id: number; name: string };
export const categories: Category[] = [
  "Clear Aligners",
  "Dentures",
  "Dental Cleaning",
  "Dental Bridges",
  "Dental Implants",
  "Teeth Whitening",
  "Dental Veneers",
  "Orthodontics",
  "All-on-4 Dental Implants",
].map((name, i) => ({ id: i + 1, name }));

export type Faq = { id: number; q: string; a: string; audience: Audience };
export const faqs: Faq[] = (
  [
    ["What steps should I follow to schedule a service!", "To schedule a service, pick the service you need, select a Clinic, choose a date and time that works for you, and finalize your appointment.", "Clinic"],
    ["What is the process for booking a service!", "Start by selecting the service you want, then choose a Clinic, pick an available date and time, and confirm your appointment.", "Customer"],
    ["What do I need to do to book a service!", "First, choose the service you wish to book, then select a Clinic, find an available date and time, and confirm your booking.", "Customer"],
    ["How can I schedule a service!", "To book a service, select the service you need, choose a Clinic, pick a suitable date and time, and confirm your booking.", "Clinic"],
    ["What are the steps to book a service!", "To book a service, first choose the service you want, then select a Clinic, pick an available date and time, and confirm your appointment.", "Customer"],
  ] as const
).map(([q, a, audience], i) => ({ id: i + 1, q, a, audience: audience as Audience }));

export const notifications = [
  { title: "New User Registered", body: "A new User account has been created successfully.", time: "04:45 pm", unread: true },
  { title: "New Clinic Registered", body: "A new clinic account has been registered on DentalOffers.", time: "04:35 pm", unread: true },
  { title: "New Support Request", body: "A new Help & Support request has been submitted and requires review.", time: "04:25 pm", unread: false },
  { title: "Clinic Verification Request", body: "A clinic verification request is waiting for admin review.", time: "04:15 pm", unread: false },
];

export const treatmentServices = [
  "Implants",
  "Crowns",
  "Veneers",
  "Dental implants",
  "Tooth crowns",
  "Orthodontics",
  "Root Canal Treatment",
  "Teeth Whitening Services",
  "General Dentistry Care",
  "Dental Check-ups",
];
