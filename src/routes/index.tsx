import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Baby,
  BadgeCheck,
  Bone,
  Brain,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Droplets,
  Ear,
  ExternalLink,
  Eye,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  Microscope,
  Phone,
  Ribbon,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Users,
  Wind,
  X,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import heroDoctor from "@/assets/d4h-hero.png";
import doctorAnanya from "@/assets/doctor-ananya.png";
import doctorArjun from "@/assets/doctor-arjun.png";
import doctorMeera from "@/assets/doctor-meera.png";
import hospitalPhoto from "@/assets/hospital.png";
import diagnosticsPhoto from "@/assets/diagnostics.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dial 4 Healthcare (D4H) | Trustworthy Healthcare Network" },
      {
        name: "description",
        content:
          "Dial 4 Healthcare (D4H) connects you with trusted doctors, multi-speciality hospitals, and accredited diagnostic centres. Discover healthcare services and get personalized guidance all in one place.",
      },
      {
        property: "og:title",
        content: "Dial 4 Healthcare (D4H) | Trustworthy Healthcare Network",
      },
      {
        property: "og:description",
        content:
          "Discover trusted doctors, hospitals, and diagnostic centres with Dial 4 Healthcare. Find verified care and personalized guidance in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

type ProviderType = "Doctors" | "Hospitals" | "Diagnostics";

interface DoctorItem {
  id: string;
  name: string;
  speciality: string;
  bestKnownFor: string;
  category: string;
  experience: string;
  rating: number;
  reviewCount: number;
  image: string;
  link: string;
  location: string;
  timings: string;
  consultationFee: string;
}

interface ProviderItem {
  id: string;
  type: ProviderType;
  name: string;
  specialityOrCategory: string;
  location: string;
  experienceOrBeds: string;
  rating: number;
  reviewCount: number;
  image: string;
  imageAlt: string;
  badge: string;
  bio: string;
  consultationFee?: string;
  timings: string;
  link?: string;
}

interface SpecialtyItem {
  title: string;
  description: string;
  icon: typeof Stethoscope;
  category: string;
  image: string;
}

interface OfferPackage {
  id: string;
  title: string;
  shortDescription: string;
  testsCount: string;
  turnaround: string;
  image: string;
  tag: string;
  inclusions: string[];
}

interface GoogleReviewItem {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  relativeTime: string;
  quote: string;
  treatment: string;
}

// Clean, simplified top navigation
const simpleNavItems = [
  { label: "Doctors", href: "#doctors" },
  { label: "Hospitals", href: "#hospitals" },
  { label: "Diagnostics", href: "#diagnostics" },
  { label: "Specialities", href: "#specialities" },
  { label: "About", href: "#about" },
];

const primarySpecialties: SpecialtyItem[] = [
  {
    title: "Infertility Specialist",
    description: "Expert fertility treatments and personalized guidance to support your parenthood journey.",
    icon: Baby,
    category: "Reproductive Care",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Consultant ENT",
    description: "Diagnosis and modern surgical care for ear, nose, throat, and sinus health.",
    icon: Ear,
    category: "Head & Neck",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Ophthalmology",
    description: "Comprehensive eye exams, cataract laser surgery, and retinal microsurgery.",
    icon: Eye,
    category: "Vision Care",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Diabetology",
    description: "Comprehensive blood sugar regulation, endocrine wellness, and lifestyle guidance.",
    icon: Activity,
    category: "Metabolic Health",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Orthopaedic",
    description: "Joint preservation, fracture management, arthritis care, and sports rehabilitation.",
    icon: Bone,
    category: "Bone & Joint",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Spine Specialist",
    description: "Advanced endoscopic therapies and treatments for disc pain, spine injury, and posture.",
    icon: Stethoscope,
    category: "Spine & Neuro",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Hematology",
    description: "Precision laboratory evaluation and clinical care for blood and bone marrow disorders.",
    icon: Droplets,
    category: "Blood Care",
    image: "https://images.unsplash.com/photo-1579165466791-78822d31e050?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Oncology",
    description: "Multidisciplinary cancer care with precision medical, surgical, and supportive guidance.",
    icon: Ribbon,
    category: "Cancer Care",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
  },
];

const extendedSpecialties = [
  { title: "Cardiology", description: "Heart health, ECG, and cardiovascular consultations.", icon: HeartPulse, category: "Heart" },
  { title: "Interventional Radiology", description: "Minimally invasive image-guided diagnostic procedures.", icon: Microscope, category: "Radiology" },
  { title: "General Surgery", description: "Advanced laparoscopic and minor/major surgical care.", icon: Scissors, category: "Surgical" },
  { title: "Pediatric Surgeon", description: "Compassionate surgical solutions for infants and children.", icon: Baby, category: "Pediatrics" },
  { title: "Oncosurgeon", description: "Precision surgical removal of tumors with organ-preserving techniques.", icon: Ribbon, category: "Oncology" },
  { title: "Breast Cancer Surgeon", description: "Dedicated oncoplastic surgeries, biopsies, and reconstruction.", icon: ShieldCheck, category: "Women's Health" },
  { title: "Gynecologic Cancer Surgeon", description: "Specialized care for ovarian, cervical, and uterine health.", icon: Sparkles, category: "Women's Health" },
  { title: "Urology", description: "Treatment for kidney stones, prostate health, and urinary tract care.", icon: Droplets, category: "Urology" },
  { title: "Neurosurgeon", description: "Specialized care for brain disorders, nerve injuries, and spine.", icon: Brain, category: "Neurology" },
  { title: "Chest Physician", description: "Pulmonology care for asthma, chronic cough, and allergy relief.", icon: Wind, category: "Pulmonology" },
  { title: "Lung Surgery", description: "Thoracic surgical care for lung nodules and chest conditions.", icon: Activity, category: "Thoracic" },
  { title: "Psychiatrist", description: "Supportive mental health guidance, therapy, and clinical wellness.", icon: Brain, category: "Mental Health" },
];

// All 26 authentic Dial 4 Healthcare doctors provided with images, specialities, best-known-for and links
const authenticDoctors: DoctorItem[] = [
  {
    id: "dr-chirag-chheda",
    name: "Dr. Chirag Chheda",
    speciality: "Ophthalmology",
    bestKnownFor: "Advanced cataract & refractive surgery",
    category: "Ophthalmology",
    experience: "16+ Years Exp",
    rating: 4.9,
    reviewCount: 194,
    image: doctorMeera,
    link: "https://dial4healthcare.com/doctors/dr-chirag-chheda.php",
    location: "Mumbai",
    timings: "Mon - Sat: 10:00 AM - 05:00 PM",
    consultationFee: "₹1,000",
  },
  {
    id: "dr-zeba-pathan",
    name: "Dr. Zeba Pathan",
    speciality: "Infertility Specialist & Laparoscopic Surgeon",
    bestKnownFor: "Infertility Specialist & Laparoscopic Surgeon",
    category: "Infertility",
    experience: "14+ Years Exp",
    rating: 4.9,
    reviewCount: 220,
    image: doctorAnanya,
    link: "https://dial4healthcare.com/doctors/dr-zeba-pathan.php",
    location: "Mumbai",
    timings: "Mon - Sat: 11:00 AM - 04:30 PM",
    consultationFee: "₹1,200",
  },
  {
    id: "dr-fahad-shaikh",
    name: "Dr. Fahad M. Shaikh",
    speciality: "Consultant Orthopedic & Joint Replacement Surgeon",
    bestKnownFor: "Joint replacement surgeries and orthopedic trauma care",
    category: "Orthopaedic",
    experience: "15+ Years Exp",
    rating: 4.8,
    reviewCount: 165,
    image: doctorArjun,
    link: "https://dial4healthcare.com/doctors/dr-fahad-m-shaikh.php",
    location: "Mumbai",
    timings: "Mon - Fri: 10:00 AM - 06:00 PM",
    consultationFee: "₹1,100",
  },
  {
    id: "dr-shyam-mohan",
    name: "Dr. Shyam Mohan",
    speciality: "Consultant Urologist & Robotic Surgeon",
    bestKnownFor: "Advanced urological surgeries, kidney stones & robotic techniques",
    category: "Urology",
    experience: "18+ Years Exp",
    rating: 4.9,
    reviewCount: 210,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-shyam-mohan.php",
    location: "Mumbai",
    timings: "Mon - Sat: 09:30 AM - 04:00 PM",
    consultationFee: "₹1,500",
  },
  {
    id: "dr-tejas-vaja",
    name: "Dr. Tejas Pragji Vaja",
    speciality: "Neurosurgeon | Brain, Spine & Pain Specialist",
    bestKnownFor: "Advanced neurosurgical care for complex cranial and spinal surgeries",
    category: "Spine & Neuro",
    experience: "17+ Years Exp",
    rating: 4.9,
    reviewCount: 180,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-tejas-pragji-vaja.php",
    location: "Mumbai",
    timings: "Mon - Fri: 11:00 AM - 05:00 PM",
    consultationFee: "₹1,600",
  },
  {
    id: "dr-mujtaba-khan",
    name: "Dr. Mujtaba Ali Khan",
    speciality: "Diabetologist, Thyroid & Obesity Specialist",
    bestKnownFor: "Specializes in diabetes reversal, thyroid & lifestyle care plans",
    category: "Diabetology",
    experience: "13+ Years Exp",
    rating: 4.8,
    reviewCount: 145,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-mujtaba-ali-khan.php",
    location: "Mumbai",
    timings: "Mon - Sat: 10:00 AM - 07:00 PM",
    consultationFee: "₹900",
  },
  {
    id: "dr-mohammed-ali-shaikh",
    name: "Dr. Mohammed Ali Shaikh",
    speciality: "Psychiatrist & Mental Health Specialist",
    bestKnownFor: "Depression, anxiety, addiction & behavioral therapy for all ages",
    category: "Psychiatry",
    experience: "12+ Years Exp",
    rating: 4.9,
    reviewCount: 130,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-mohammed-ali-shaikh.php",
    location: "Mumbai",
    timings: "Tue - Sat: 11:00 AM - 06:00 PM",
    consultationFee: "₹1,200",
  },
  {
    id: "dr-fahad-afzal",
    name: "Dr. Fahad Afzal",
    speciality: "Medical & Hemato Oncologist (Cancer Specialist)",
    bestKnownFor: "Chemotherapy, targeted immunotherapy & bone marrow transplant care",
    category: "Oncology",
    experience: "15+ Years Exp",
    rating: 4.9,
    reviewCount: 175,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-fahad-afzal.php",
    location: "Mumbai",
    timings: "Mon - Fri: 09:00 AM - 03:00 PM",
    consultationFee: "₹1,500",
  },
  {
    id: "dr-dharmik-bhuva",
    name: "Dr. Dharmik D. Bhuva",
    speciality: "Vascular & Interventional Radiology Specialist",
    bestKnownFor: "Minimally invasive varicose veins, blood vessel & diabetic foot treatments",
    category: "Radiology",
    experience: "14+ Years Exp",
    rating: 4.8,
    reviewCount: 155,
    image: "https://images.unsplash.com/photo-1594824813576-92f758419616?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-dharmik-d-bhuva.php",
    location: "Mumbai",
    timings: "Mon - Sat: 10:30 AM - 05:00 PM",
    consultationFee: "₹1,300",
  },
  {
    id: "dr-shrikanth-atluri",
    name: "Dr. Shrikanth Atluri",
    speciality: "Uro Onco Surgeon",
    bestKnownFor: "Consultant Uro-Oncologist & Robotic Surgeon within Surgical Oncology",
    category: "Oncology",
    experience: "19+ Years Exp",
    rating: 4.9,
    reviewCount: 198,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-shrikanth-atluri.php",
    location: "Mumbai",
    timings: "Mon - Fri: 10:00 AM - 04:00 PM",
    consultationFee: "₹1,800",
  },
  {
    id: "dr-nilesh-chordiya",
    name: "Dr. Nilesh Chordiya",
    speciality: "Thoracoscopic Esophagus and Lung Surgery",
    bestKnownFor: "Laparoscopic & thoracoscopic surgeries for GI, lung & urological cancers",
    category: "Surgical",
    experience: "17+ Years Exp",
    rating: 4.9,
    reviewCount: 160,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-nilesh-chordiya.php",
    location: "Mumbai",
    timings: "Mon - Sat: 10:00 AM - 05:00 PM",
    consultationFee: "₹1,500",
  },
  {
    id: "dr-shahaji-deshmukh",
    name: "Dr. Shahaji Deshmukh",
    speciality: "Consultant Pediatric Surgeon",
    bestKnownFor: "Surgical care for infants and children with congenital conditions",
    category: "Pediatric",
    experience: "16+ Years Exp",
    rating: 4.8,
    reviewCount: 142,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-shahaji-deshmukh.php",
    location: "Mumbai",
    timings: "Mon - Fri: 09:30 AM - 03:30 PM",
    consultationFee: "₹1,200",
  },
  {
    id: "dr-sanket-mehta",
    name: "Dr. Sanket Mehta",
    speciality: "GI Cancers & Gynecological Cancers",
    bestKnownFor: "Pioneering Cytoreductive Surgery and HIPEC cancer protocols",
    category: "Oncology",
    experience: "20+ Years Exp",
    rating: 5.0,
    reviewCount: 230,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-sanket-mehta.php",
    location: "Mumbai",
    timings: "Tue - Sat: 10:00 AM - 04:00 PM",
    consultationFee: "₹2,000",
  },
  {
    id: "dr-shazia-waghoo",
    name: "Dr. Shazia Waghoo",
    speciality: "Consultant General Surgeon",
    bestKnownFor: "Safe, minimally invasive laparoscopic general surgical procedures",
    category: "Surgical",
    experience: "13+ Years Exp",
    rating: 4.8,
    reviewCount: 125,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-shazia-waghoo.php",
    location: "Mumbai",
    timings: "Mon - Sat: 11:00 AM - 05:00 PM",
    consultationFee: "₹1,000",
  },
  {
    id: "dr-shazia-khan",
    name: "Dr. Shazia Khan",
    speciality: "Dermatologist & Skin Specialist",
    bestKnownFor: "Acne, rosacea, skin tumors, fungal and advanced dermatological care",
    category: "Dermatology",
    experience: "11+ Years Exp",
    rating: 4.9,
    reviewCount: 190,
    image: doctorAnanya,
    link: "https://dial4healthcare.com/doctors/dr-shazia-khan.php",
    location: "Mumbai",
    timings: "Mon - Sat: 10:00 AM - 06:00 PM",
    consultationFee: "₹900",
  },
  {
    id: "dr-neel-mehta",
    name: "Dr. Neel S. Mehta",
    speciality: "Chest Physician & Pulmonologist",
    bestKnownFor: "Interventional pulmonology, asthma, allergy and respiratory health",
    category: "Pulmonology",
    experience: "15+ Years Exp",
    rating: 4.9,
    reviewCount: 168,
    image: doctorArjun,
    link: "https://dial4healthcare.com/doctors/dr-neel-s-mehta.php",
    location: "Mumbai",
    timings: "Mon - Fri: 10:00 AM - 05:00 PM",
    consultationFee: "₹1,100",
  },
  {
    id: "dr-deepak-shejol",
    name: "Dr. Deepak R Shejol",
    speciality: "Consultant Cardiologist",
    bestKnownFor: "Interventional cardiology, heart attack prevention and cardiac care",
    category: "Cardiology",
    experience: "18+ Years Exp",
    rating: 4.9,
    reviewCount: 245,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-deepak-r-shejol.php",
    location: "Mumbai",
    timings: "Mon - Sat: 09:00 AM - 03:00 PM",
    consultationFee: "₹1,500",
  },
  {
    id: "dr-chetan-anchan",
    name: "Dr. Chetan Anchan",
    speciality: "Bone Metastases & Skin Tumors",
    bestKnownFor: "Malignant and benign bone & soft tissue tumors and skeletal metastases",
    category: "Oncology",
    experience: "22+ Years Exp",
    rating: 5.0,
    reviewCount: 260,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-chetan-anchan.php",
    location: "Mumbai",
    timings: "Mon - Fri: 11:00 AM - 04:00 PM",
    consultationFee: "₹2,000",
  },
  {
    id: "dr-hamza-dalal",
    name: "Dr. Hamza Dalal",
    speciality: "Consultant Hematologist & BMT Physician",
    bestKnownFor: "Blood disorders, anemia, blood cancers and bone marrow transplant care",
    category: "Hematology",
    experience: "14+ Years Exp",
    rating: 4.9,
    reviewCount: 150,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-hamza-dalal.php",
    location: "Mumbai",
    timings: "Mon - Sat: 10:00 AM - 04:30 PM",
    consultationFee: "₹1,400",
  },
  {
    id: "dr-mohammed-ansari",
    name: "Dr. Mohammed Humam Ansari",
    speciality: "Consultant ENT & Head–Neck Surgeon",
    bestKnownFor: "Diagnosis and surgical management of ear, nose, throat & head-neck conditions",
    category: "ENT",
    experience: "16+ Years Exp",
    rating: 4.8,
    reviewCount: 185,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-mohammed-humam-ansari.php",
    location: "Mumbai",
    timings: "Mon - Sat: 09:30 AM - 05:30 PM",
    consultationFee: "₹1,000",
  },
  {
    id: "dr-sanjay-singh",
    name: "Dr. Sanjay Singh",
    speciality: "Orthopaedic Surgeon (Shoulder, Knee & Elbow)",
    bestKnownFor: "Treats joint pain, sports injuries & ligament tears using arthroscopy",
    category: "Orthopaedic",
    experience: "17+ Years Exp",
    rating: 4.9,
    reviewCount: 205,
    image: doctorArjun,
    link: "https://dial4healthcare.com/doctors/dr-sanjay-singh.php",
    location: "Mumbai",
    timings: "Mon - Fri: 10:00 AM - 06:00 PM",
    consultationFee: "₹1,200",
  },
  {
    id: "dr-jay-anam",
    name: "Dr. Jay R. Anam",
    speciality: "Breast Cancer Surgeon | Oncoplasty Specialist",
    bestKnownFor: "Breast cancer surgery & oncoplastic breast-conserving procedures",
    category: "Oncology",
    experience: "15+ Years Exp",
    rating: 4.9,
    reviewCount: 215,
    image: "https://images.unsplash.com/photo-1594824813576-92f758419616?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-jay-r-anam.php",
    location: "Mumbai",
    timings: "Mon - Sat: 11:00 AM - 05:00 PM",
    consultationFee: "₹1,600",
  },
  {
    id: "dr-jitesh-rajpurohit",
    name: "Dr. Jitesh Rajpurohit",
    speciality: "Thoracic, GI & Gynecologic Cancer Surgeon",
    bestKnownFor: "Thoracic & GI cancer surgeries including lung, esophageal & mediastinal tumors",
    category: "Oncology",
    experience: "18+ Years Exp",
    rating: 4.9,
    reviewCount: 190,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-jitesh-rajpurohit.php",
    location: "Mumbai",
    timings: "Mon - Fri: 10:00 AM - 04:00 PM",
    consultationFee: "₹1,700",
  },
  {
    id: "dr-amit-chakraborty",
    name: "Dr. Amit Chakraborty",
    speciality: "Consultant Cancer Surgeon | Head & Neck Oncosurgeon",
    bestKnownFor: "Minimally invasive and robotic oncosurgery for Head & Neck cancers",
    category: "Oncology",
    experience: "19+ Years Exp",
    rating: 4.9,
    reviewCount: 220,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-amit-b-chakraborty.php",
    location: "Mumbai",
    timings: "Mon - Sat: 10:00 AM - 05:00 PM",
    consultationFee: "₹1,800",
  },
  {
    id: "dr-kunal-shah",
    name: "Dr. Kunal Shah",
    speciality: "Spine Specialist",
    bestKnownFor: "Non-surgical and surgical management of complex spine-related disorders",
    category: "Spine & Neuro",
    experience: "14+ Years Exp",
    rating: 4.8,
    reviewCount: 160,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-kunal-shah.php",
    location: "Mumbai",
    timings: "Mon - Fri: 10:30 AM - 06:00 PM",
    consultationFee: "₹1,300",
  },
  {
    id: "dr-mudit-shah",
    name: "Dr. Mudit Shah",
    speciality: "Paediatric Orthopaedic",
    bestKnownFor: "Orthopaedic care in children with Cerebral Palsy & neuromuscular disorders",
    category: "Pediatric",
    experience: "15+ Years Exp",
    rating: 4.9,
    reviewCount: 178,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    link: "https://dial4healthcare.com/doctors/dr-mudit-shah.php",
    location: "Mumbai",
    timings: "Tue - Sat: 10:00 AM - 04:00 PM",
    consultationFee: "₹1,300",
  },
];

const hospitalsData: ProviderItem[] = [
  {
    id: "hosp-metro",
    type: "Hospitals",
    name: "Metro Health Super Speciality Hospital",
    specialityOrCategory: "Tertiary Multi-Speciality Care",
    location: "Mumbai Central, Mumbai",
    experienceOrBeds: "350+ Beds",
    rating: 4.9,
    reviewCount: 420,
    image: hospitalPhoto,
    imageAlt: "Metro Health Hospital",
    badge: "NABH Accredited",
    bio: "Metro Health Super Speciality Hospital stands at the forefront of modern medical infrastructure with 350 beds, cutting-edge ICUs, and comprehensive emergency services available round the clock.",
    consultationFee: "Varies by department",
    timings: "Open 24/7 · Emergency Available",
    link: "https://dial4healthcare.com/hospitals.php",
  },
  {
    id: "hosp-apex",
    type: "Hospitals",
    name: "Apex Super Speciality Medical Institute",
    specialityOrCategory: "Cardiology, Oncology & Neuro Sciences",
    location: "Whitefield, Bengaluru",
    experienceOrBeds: "280+ Beds",
    rating: 4.8,
    reviewCount: 310,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Apex Super Speciality Hospital",
    badge: "JCI & NABH",
    bio: "Apex Super Speciality Medical Institute brings internationally benchmarked clinical care to patients, featuring world-class diagnostic imaging and multidisciplinary surgical teams.",
    consultationFee: "Varies by department",
    timings: "Open 24/7 · Emergency Available",
    link: "https://dial4healthcare.com/hospitals.php",
  },
  {
    id: "hosp-carepoint",
    type: "Hospitals",
    name: "CarePoint Healthcare & Research Centre",
    specialityOrCategory: "Multi-Disciplinary Medical Centre",
    location: "Connaught Place, New Delhi",
    experienceOrBeds: "220+ Beds",
    rating: 4.8,
    reviewCount: 275,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "CarePoint Healthcare Centre",
    badge: "NABH Accredited",
    bio: "CarePoint Healthcare provides patient-centered tertiary medical services with specialized clinical excellence in cardiology, orthopaedics, obstetrics, and general surgery.",
    consultationFee: "Varies by department",
    timings: "Open 24/7 · Emergency Available",
    link: "https://dial4healthcare.com/hospitals.php",
  },
];

const diagnosticsData: ProviderItem[] = [
  {
    id: "diag-apex",
    type: "Diagnostics",
    name: "Apex Advanced Diagnostics & Imaging",
    specialityOrCategory: "Pathology, Radiology & Molecular Lab",
    location: "Andheri East, Mumbai",
    experienceOrBeds: "NABL & CAP Certified",
    rating: 4.9,
    reviewCount: 380,
    image: diagnosticsPhoto,
    imageAlt: "Apex Diagnostics Laboratory",
    badge: "NABL Certified",
    bio: "Apex Advanced Diagnostics delivers clinically precise results using automated robotic analysers, low-radiation digital imaging, and certified pathologist verifications.",
    consultationFee: "Test packages from ₹499",
    timings: "Mon - Sun: 06:30 AM - 09:30 PM",
    link: "https://dial4healthcare.com/diagnostics.php",
  },
];

const offerPackages: OfferPackage[] = [
  {
    id: "pkg-fullbody",
    title: "Comprehensive Full Body Health Package",
    shortDescription: "Essential preventative screening covering 65+ vital blood parameters for total wellness and early detection.",
    testsCount: "65+ Tests Included",
    turnaround: "Report within 12 Hours",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
    tag: "Popular",
    inclusions: [
      "Complete Blood Count (CBC)",
      "Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)",
      "Liver Function Test (SGOT, SGPT, Bilirubin)",
      "Kidney Function Test (Creatinine, Urea, Uric Acid)",
      "Fasting Blood Glucose & HbA1c",
      "Vitamin D3 & Vitamin B12 Levels",
      "Doctor Review Session Included",
    ],
  },
  {
    id: "pkg-cardiac",
    title: "Executive Cardiac & Diabetes Screening",
    shortDescription: "Targeted heart and vascular health assessment for proactive cardiac risk management and glucose monitoring.",
    testsCount: "35+ Parameters",
    turnaround: "Same-Day Reports",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=900&q=80",
    tag: "Cardiac Care",
    inclusions: [
      "Standard 12-Lead Digital ECG",
      "High-Sensitivity hs-CRP Marker",
      "Apolipoprotein A1 & B Panel",
      "HbA1c Glycated Hemoglobin",
      "Serum Electrolytes Assessment",
      "Cardiologist Consultation Included",
    ],
  },
  {
    id: "pkg-women",
    title: "Women's Fertility & Hormone Wellness",
    shortDescription: "Complete reproductive hormone mapping designed to evaluate fertility health and endocrine balance.",
    testsCount: "20+ Markers",
    turnaround: "Report in 24 Hours",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80",
    tag: "Fertility Focus",
    inclusions: [
      "Anti-Müllerian Hormone (AMH) Ovarian Reserve",
      "FSH & LH Hormonal Profile",
      "Thyroid Panel (TSH, Free T3 & T4)",
      "Prolactin & Estradiol Levels",
      "Serum Ferritin & Iron Analysis",
      "Infertility Specialist Consultation",
    ],
  },
  {
    id: "pkg-senior",
    title: "Senior Citizen Advanced Care Package",
    shortDescription: "Tailored geriatrics package focusing on bone density, renal filtration, vision, and joint health.",
    testsCount: "50+ Tests",
    turnaround: "Report in 24 Hours",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=900&q=80",
    tag: "Senior Wellness",
    inclusions: [
      "Bone Mineral Density & Calcium Profile",
      "Renal Function & eGFR Filtration Rate",
      "Urine Microalbumin & Creatinine",
      "High-Sensitivity Cardiac Risk Markers",
      "Comprehensive Diabetic & Lipid Assessment",
      "Geriatrician Consultation",
    ],
  },
];

const googleReviews: GoogleReviewItem[] = [
  {
    id: "gr1",
    name: "Rajesh Verma",
    location: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    relativeTime: "2 days ago",
    quote: "D4H connected us with Dr. Chirag Chheda for cataract surgery. The entire coordination was transparent, quick, and comforting.",
    treatment: "Ophthalmology Consultation",
  },
  {
    id: "gr2",
    name: "Priya Sundaram",
    location: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    relativeTime: "1 week ago",
    quote: "Consulting Dr. Zeba Pathan through Dial 4 Healthcare gave us great confidence. Truly a patient-first healthcare network.",
    treatment: "Infertility & Laparoscopic Care",
  },
  {
    id: "gr3",
    name: "Amit Patel",
    location: "Ahmedabad",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    relativeTime: "2 weeks ago",
    quote: "Dr. Fahad M. Shaikh helped my father with knee replacement surgery. Seamless hospital admission through Dial 4 Healthcare.",
    treatment: "Orthopaedic Joint Surgery",
  },
  {
    id: "gr4",
    name: "Sunita Rao",
    location: "New Delhi",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    relativeTime: "3 weeks ago",
    quote: "The helpline coordinator booked an appointment with Dr. Shyam Mohan within minutes. Very reliable and courteous support.",
    treatment: "Urology Consultation",
  },
  {
    id: "gr5",
    name: "Dr. Vikram Sethi",
    location: "Pune",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    relativeTime: "1 month ago",
    quote: "As a doctor myself, I appreciate D4H's high specialist vetting standards. Top oncology and surgical network.",
    treatment: "Oncology Specialist Network",
  },
  {
    id: "gr6",
    name: "Meenakshi Iyer",
    location: "Chennai",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    relativeTime: "1 month ago",
    quote: "Prompt home sample diagnostic collection and instant report delivery. The team answers calls 24/7 without delay.",
    treatment: "Diagnostic Health Screening",
  },
];

const blogArticles = [
  {
    id: "b1",
    title: "Navigating Fertility Treatment: Patient Guide",
    excerpt: "Key guidance on understanding reproductive health and when to consult an infertility specialist.",
    date: "Nov 2026",
    category: "Infertility",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
    readTime: "4 min read",
  },
  {
    id: "b2",
    title: "Early Heart Health Markers to Know",
    excerpt: "Essential symptoms and proactive lipid testing habits for cardiovascular longevity.",
    date: "Oct 2026",
    category: "Cardiology",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80",
    readTime: "3 min read",
  },
  {
    id: "b3",
    title: "Why Annual Diagnostics Matter",
    excerpt: "How annual blood panels catch silent metabolic risks well before symptoms arise.",
    date: "Sep 2026",
    category: "Diagnostics",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80",
    readTime: "4 min read",
  },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-label="Google logo">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

// Brand Logo displaying official uploaded Dial 4 Healthcare logo
function BrandLogo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 select-none shrink-0">
      <img
        src="/d4h-logo.png"
        alt="Dial 4 Healthcare Logo"
        className={`h-11 sm:h-12 w-auto object-contain shrink-0 ${dark ? "brightness-110 drop-shadow-md" : ""}`}
      />
      <div className="flex flex-col leading-tight whitespace-nowrap">
        <div className={`text-[1.12rem] lg:text-[1.22rem] font-extrabold tracking-tight ${dark ? "text-white" : "text-[#292729]"}`}>
          Dial <span className="text-[#00AEEF]">4</span> Healthcare
        </div>
        <div className={`text-[0.62rem] lg:text-[0.68rem] font-bold tracking-wider uppercase ${dark ? "text-[#00AEEF]" : "text-[#0098D4]"}`}>
          Discovery & Care Network
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState<"All" | "Doctors" | "Hospitals" | "Diagnostics" | "Specialities">("All");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  const [doctorCategoryFilter, setDoctorCategoryFilter] = useState("All");

  // Horizontal scroll ref for doctors carousel & auto-scroll timer
  const doctorScrollRef = useRef<HTMLDivElement>(null);
  const isDoctorHoveredRef = useRef(false);

  // Modals state
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [guidanceModalOpen, setGuidanceModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorItem | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<ProviderItem | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<OfferPackage | null>(null);
  const [blogsModalOpen, setBlogsModalOpen] = useState(false);

  // Form feedback state
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);
  const [guidanceSuccess, setGuidanceSuccess] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Scroll animations & scroll progress tracking
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      setShowBackToTop(window.scrollY > 380);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for sleek scroll-triggered reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(
        ".reveal-init, .reveal-scale-init, .reveal-fade-left, .reveal-fade-right"
      );
      elements.forEach((el) => {
        if (!el.classList.contains("reveal-visible")) {
          observer.observe(el);
        }
      });
    };

    observeAll();

    // Re-observe if dynamic elements render or tab filter changes
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  // Filtered doctors for side-scroll
  const filteredDoctors = useMemo(() => {
    let list = authenticDoctors;
    if (doctorCategoryFilter !== "All") {
      list = list.filter((doc) => doc.category.toLowerCase() === doctorCategoryFilter.toLowerCase());
    }
    const q = submittedSearch.toLowerCase().trim();
    if (!q) return list;
    return list.filter((d) =>
      `${d.name} ${d.speciality} ${d.bestKnownFor} ${d.category} ${d.location}`.toLowerCase().includes(q)
    );
  }, [submittedSearch, doctorCategoryFilter]);

  // Auto-scroll doctors carousel every 3 seconds by one card width
  useEffect(() => {
    const timer = setInterval(() => {
      if (isDoctorHoveredRef.current) return;
      const el = doctorScrollRef.current;
      if (!el) return;

      const firstCard = el.firstElementChild as HTMLElement | null;
      // Single card width + gap (gap-6 = 24px)
      const step = firstCard ? firstCard.offsetWidth + 24 : 368;

      // Loop back smoothly to the beginning if reaching the end
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 30) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [filteredDoctors]);

  // Live instant search matches dropdown
  const liveMatches = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (q.length < 2) return null;

    const matchingDoctors = authenticDoctors.filter((d) =>
      `${d.name} ${d.speciality} ${d.bestKnownFor}`.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchingHospitals = hospitalsData.filter((h) =>
      `${h.name} ${h.specialityOrCategory}`.toLowerCase().includes(q)
    ).slice(0, 2);

    const matchingSpecs = [...primarySpecialties, ...extendedSpecialties].filter((s) =>
      s.title.toLowerCase().includes(q)
    ).slice(0, 3);

    const totalCount = matchingDoctors.length + matchingHospitals.length + matchingSpecs.length;
    if (totalCount === 0) return null;

    return {
      doctors: matchingDoctors,
      hospitals: matchingHospitals,
      specialties: matchingSpecs,
    };
  }, [searchTerm]);

  const filteredHospitals = useMemo(() => {
    const q = submittedSearch.toLowerCase().trim();
    if (!q) return hospitalsData;
    return hospitalsData.filter((h) =>
      `${h.name} ${h.specialityOrCategory} ${h.location}`.toLowerCase().includes(q)
    );
  }, [submittedSearch]);

  const filteredDiagnostics = useMemo(() => {
    const q = submittedSearch.toLowerCase().trim();
    if (!q) return diagnosticsData;
    return diagnosticsData.filter((diag) =>
      `${diag.name} ${diag.specialityOrCategory} ${diag.location}`.toLowerCase().includes(q)
    );
  }, [submittedSearch]);

  function scrollDoctors(direction: "left" | "right") {
    if (!doctorScrollRef.current) return;
    const el = doctorScrollRef.current;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 24 : 368;
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedSearch(searchTerm.trim());

    if (searchCategory === "Doctors") {
      document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" });
    } else if (searchCategory === "Hospitals") {
      document.getElementById("hospitals")?.scrollIntoView({ behavior: "smooth" });
    } else if (searchCategory === "Diagnostics") {
      document.getElementById("diagnostics")?.scrollIntoView({ behavior: "smooth" });
    } else if (searchCategory === "Specialities") {
      document.getElementById("specialities")?.scrollIntoView({ behavior: "smooth" });
    } else {
      document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleSuggestionClick(term: string) {
    setSearchTerm(term);
    setSubmittedSearch(term);
    document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleContactForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const message = String(formData.get("message") ?? "");

    const subject = encodeURIComponent(`Healthcare Enquiry from ${name}`);
    const body = encodeURIComponent(
      `Patient Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nEnquiry:\n${message}\n\n-- Dial 4 Healthcare platform`
    );

    setContactSuccess(true);
    setTimeout(() => {
      window.location.href = `mailto:d4h.official@gmail.com?subject=${subject}&body=${body}`;
    }, 600);
  }

  function handleAppointmentBooking(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAppointmentSuccess(true);
  }

  function handleGuidanceRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGuidanceSuccess(true);
  }

  function openBookingWithDoctor(doctor: DoctorItem) {
    setSelectedDoctor(doctor);
    setSelectedProvider(null);
    setAppointmentSuccess(false);
    setAppointmentModalOpen(true);
  }

  function openBookingWithProvider(provider: ProviderItem) {
    setSelectedProvider(provider);
    setSelectedDoctor(null);
    setAppointmentSuccess(false);
    setAppointmentModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-[#F4FAFD] text-[#292729] font-sans selection:bg-[#00AEEF]/20 selection:text-[#0098D4]">
      {/* Scroll Progress Indicator Bar at Very Top */}
      <div
        className="scroll-progress-line"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* 1. Header & Navigation (Clean, simplified, sticky glass-like navbar) */}
      <header className="sticky top-0 z-50 w-full border-b border-[#E1EFF5]/80 bg-white/95 backdrop-blur-md transition-all duration-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 lg:gap-4">
          <a href="#home" className="shrink-0 transition-transform duration-200 hover:scale-[1.01]" aria-label="Dial 4 Healthcare Homepage">
            <BrandLogo />
          </a>

          {/* Simple, clean desktop menu */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[0.88rem] xl:text-[0.94rem] font-bold text-[#292729]/85 shrink-0">
            {simpleNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="whitespace-nowrap transition-colors duration-150 hover:text-[#00AEEF] relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#00AEEF] hover:after:w-full after:transition-all after:duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side contact & CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
            <a
              href="tel:+917400465666"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold text-[#292729] hover:text-[#00AEEF] bg-[#E8F7FC] hover:bg-[#d6f0fb] transition-all border border-[#00AEEF]/20 shadow-2xs whitespace-nowrap shrink-0"
              title="Call Dial 4 Healthcare helpline"
            >
              <Phone className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
              <span className="whitespace-nowrap">+91 74004 65666</span>
            </a>

            <a
              href="https://dial4healthcare.com/register.php"
              target="_blank"
              rel="noreferrer"
              className="text-xs xl:text-sm font-bold text-[#5B6B79] hover:text-[#00AEEF] px-2 py-1 transition-colors whitespace-nowrap shrink-0"
            >
              Register
            </a>

            <Button
              type="button"
              onClick={() => {
                setSelectedDoctor(null);
                setSelectedProvider(null);
                setAppointmentSuccess(false);
                setAppointmentModalOpen(true);
              }}
              className="btn-shimmer animate-pulse-ring bg-[#00AEEF] hover:bg-[#0098D4] text-white font-bold px-4 xl:px-5 py-2.5 rounded-xl shadow-md shadow-[#00AEEF]/25 hover:shadow-lg transition-all text-xs xl:text-sm flex items-center gap-2 cursor-pointer border-0 whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Book Appointment</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-[#292729] hover:bg-[#E8F7FC] focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#00AEEF]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E1EFF5] bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1">
              {simpleNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#292729] hover:bg-[#E8F7FC] hover:text-[#00AEEF] transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#00AEEF]" />
                </a>
              ))}
              <a
                href="https://dial4healthcare.com/register.php"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#0098D4] hover:bg-[#E8F7FC] flex items-center justify-between"
              >
                <span>Healthcare Provider Register</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </nav>
            <div className="mt-4 pt-4 border-t border-[#E1EFF5] flex flex-col gap-2.5">
              <a
                href="tel:+917400465666"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-[#0098D4] bg-[#E8F7FC]"
              >
                <Phone className="w-4 h-4 text-[#00AEEF]" />
                <span>+91 74004 65666</span>
              </a>
              <Button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSelectedDoctor(null);
                  setSelectedProvider(null);
                  setAppointmentSuccess(false);
                  setAppointmentModalOpen(true);
                }}
                className="w-full bg-[#00AEEF] hover:bg-[#0098D4] text-white font-bold py-2.5 rounded-xl shadow-md text-sm"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* 2. Hero Section with HIGHLIGHTED Search Bar and official branding */}
        <section id="home" className="relative pt-10 pb-16 md:py-20 overflow-hidden bg-gradient-to-b from-[#E8F7FC]/80 via-[#F4FAFD] to-white">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#00AEEF]/10 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column */}
              <div className="reveal-fade-left lg:col-span-7 flex flex-col items-start text-left z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#00AEEF]/30 shadow-xs mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00AEEF] animate-pulse" />
                  <span className="text-xs font-extrabold tracking-wider text-[#0098D4] uppercase">
                    YOUR HEALTHCARE PARTNER
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#292729] tracking-tight leading-[1.12] mb-3">
                  Trustworthy <span className="text-[#00AEEF]">Healthcare</span> Network
                </h1>

                <p className="text-base sm:text-lg text-[#5B6B79] max-w-xl leading-relaxed mb-6">
                  Discover trusted doctors, hospitals and diagnostic centres. Find the right healthcare services and get the guidance you need, all in one place.
                </p>

                {/* THE HIGHLIGHTED SEARCH BAR (Main Focal Point) */}
                <div className="w-full max-w-2xl relative mb-4">
                  {/* Category Pills above search bar */}
                  <div className="flex items-center gap-1.5 mb-2 overflow-x-auto scrollbar-none pb-1">
                    {(["All", "Doctors", "Hospitals", "Diagnostics", "Specialities"] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSearchCategory(cat)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          searchCategory === cat
                            ? "bg-[#00AEEF] text-white shadow-xs"
                            : "bg-white text-[#5B6B79] hover:bg-[#E8F7FC] hover:text-[#0098D4] border border-[#E1EFF5]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Highlighted Search Container with Glowing Ring & Animation */}
                  <form
                    onSubmit={handleSearchSubmit}
                    className="search-highlight-box w-full bg-white p-2.5 rounded-2xl sm:rounded-3xl border-2 border-[#00AEEF] flex flex-col sm:flex-row items-center gap-2.5 relative z-20"
                  >
                    <div className="flex items-center w-full px-3 gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#E8F7FC] text-[#00AEEF] flex items-center justify-center shrink-0">
                        <Search className="w-5 h-5 text-[#00AEEF]" />
                      </div>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Doctors, Hospitals, Diagnostics, Specialities..."
                        className="w-full bg-transparent text-sm sm:text-base text-[#292729] placeholder-[#5B6B79]/60 focus:outline-none py-2 font-medium"
                        aria-label="Search healthcare network"
                      />
                      {searchTerm && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchTerm("");
                            setSubmittedSearch("");
                          }}
                          className="text-[#5B6B79] hover:text-[#292729] p-1 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-gradient-to-r from-[#00AEEF] to-[#0098D4] hover:from-[#0098D4] hover:to-[#0087bd] text-white font-extrabold px-8 py-3.5 rounded-xl sm:rounded-2xl shrink-0 transition-all shadow-md text-sm sm:text-base cursor-pointer border-0 flex items-center justify-center gap-2"
                    >
                      <span>Search Care</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </form>

                  {/* Instant Live Search Results Dropdown Preview */}
                  {liveMatches && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border-2 border-[#00AEEF]/30 shadow-2xl p-4 z-30 animate-in fade-in slide-in-from-top-1 max-h-80 overflow-y-auto">
                      <div className="text-xs font-bold text-[#0098D4] uppercase tracking-wider mb-2">
                        Matching Results for "{searchTerm}"
                      </div>
                      {liveMatches.doctors.length > 0 && (
                        <div className="mb-3">
                          <div className="text-xs font-bold text-[#292729] mb-1.5 flex items-center gap-1.5">
                            <Stethoscope className="w-3.5 h-3.5 text-[#00AEEF]" />
                            <span>Doctors</span>
                          </div>
                          <div className="space-y-1">
                            {liveMatches.doctors.map((doc) => (
                              <button
                                key={doc.id}
                                type="button"
                                onClick={() => {
                                  openBookingWithDoctor(doc);
                                  setSearchTerm("");
                                }}
                                className="w-full text-left p-2 rounded-xl hover:bg-[#E8F7FC] transition-colors flex items-center justify-between text-xs"
                              >
                                <div>
                                  <span className="font-bold text-[#292729]">{doc.name}</span>
                                  <span className="text-[#5B6B79] ml-2">({doc.speciality})</span>
                                </div>
                                <span className="text-[#00AEEF] font-semibold">Book →</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {liveMatches.specialties.length > 0 && (
                        <div>
                          <div className="text-xs font-bold text-[#292729] mb-1.5 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#00AEEF]" />
                            <span>Specialities</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {liveMatches.specialties.map((s) => (
                              <button
                                key={s.title}
                                type="button"
                                onClick={() => {
                                  handleSuggestionClick(s.title);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#F4FAFD] hover:bg-[#E8F7FC] text-[#0098D4] text-xs font-semibold border border-[#E1EFF5]"
                              >
                                {s.title}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Quick Search Suggestions */}
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-[#5B6B79] mb-7">
                  <span className="text-[#292729] font-bold">Quick suggestions:</span>
                  {[
                    "Ophthalmology",
                    "Infertility Specialist",
                    "Orthopaedic",
                    "Oncology",
                    "Cardiology",
                    "Diabetology",
                    "Urology",
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleSuggestionClick(tag)}
                      className="px-3 py-1 rounded-full bg-white hover:bg-[#E8F7FC] hover:text-[#00AEEF] border border-[#E1EFF5] transition-all cursor-pointer shadow-2xs font-medium"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#doctors"
                    className="btn-shimmer inline-flex items-center justify-center gap-2 bg-[#00AEEF] hover:bg-[#0098D4] text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-[#00AEEF]/25 hover:shadow-lg transition-all text-sm sm:text-base cursor-pointer"
                  >
                    <span>Explore Doctors</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedDoctor(null);
                      setSelectedProvider(null);
                      setAppointmentSuccess(false);
                      setAppointmentModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#E8F7FC] text-[#292729] font-bold px-7 py-3.5 rounded-xl border border-[#00AEEF]/40 hover:border-[#00AEEF] transition-all text-sm sm:text-base shadow-xs cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#00AEEF]" />
                    <span>Book Appointment</span>
                  </Button>
                </div>
              </div>

              {/* Right Column – Visual Composition with Floating & Pulsing Animations */}
              <div className="reveal-fade-right lg:col-span-5 relative flex justify-center items-center">
                <div className="animate-pulse-aura absolute w-[24rem] sm:w-[28rem] h-[24rem] sm:h-[28rem] rounded-full bg-gradient-to-tr from-[#00AEEF]/25 via-[#E8F7FC] to-[#0098D4]/20 blur-xl -z-0" />

                <div className="relative z-10 w-full max-w-[22rem] sm:max-w-[25rem] aspect-4/5 rounded-3xl overflow-hidden shadow-2xl shadow-[#0098D4]/20 border-4 border-white bg-white">
                  <img
                    src={heroDoctor}
                    alt="Professional doctor ready to guide patients on Dial 4 Healthcare"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292729]/75 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs uppercase tracking-wider font-extrabold text-[#00AEEF]">Personalized Healthcare</p>
                    <p className="text-sm font-bold">26+ Verified Super Specialists on Network</p>
                  </div>
                </div>

                {/* Floating Badge 1 with subtle float animation */}
                <div className="animate-float-slow absolute -top-3 -left-2 sm:-left-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E1EFF5] shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F7FC] flex items-center justify-center text-[#00AEEF]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-[#292729]">26+ Verified Doctors</div>
                    <div className="text-xs font-semibold text-[#5B6B79]">Certified Super Specialists</div>
                  </div>
                </div>

                {/* Floating Badge 2 with counter-cadence float */}
                <div className="animate-float-reverse absolute -bottom-5 -right-2 sm:-right-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E1EFF5] shadow-xl max-w-[17rem]">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Available Today
                    </span>
                    <span className="text-xs text-[#5B6B79]">4:30 PM Slot</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <img
                      src={doctorAnanya}
                      alt="Doctor thumbnail"
                      className="w-9 h-9 rounded-full object-cover border border-[#00AEEF]/40"
                    />
                    <div>
                      <div className="text-sm font-bold text-[#292729]">Dr. Zeba Pathan</div>
                      <div className="text-xs text-[#0098D4] font-medium">Infertility Specialist</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Our Specialities (Right after Hero) */}
        <section id="specialities" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="reveal-fade-left flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-extrabold text-[#0098D4] uppercase tracking-wider block mb-1">
                  Specialized Medical Disciplines
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#292729]">Our Specialities</h2>
              </div>
              <p className="text-[#5B6B79] max-w-md text-sm sm:text-base leading-relaxed">
                Find experienced specialists across a wide range of medical fields with advanced clinical treatment facilities.
              </p>
            </div>

            {/* 4-Column Grid with TALL, High-Visibility Image Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {primarySpecialties.map((spec, idx) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={spec.title}
                    style={{ transitionDelay: `${idx * 80}ms` }}
                    className="reveal-init card-glow-hover flex flex-col rounded-3xl bg-[#F4FAFD] border border-[#E1EFF5] shadow-xs group overflow-hidden"
                  >
                    <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-[#E8F7FC]">
                      <img
                        src={spec.image}
                        alt={spec.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#292729]/80 via-[#292729]/15 to-transparent" />
                      <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#0098D4] shadow-xs flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-[#00AEEF] animate-beat-hover" />
                        <span>{spec.category}</span>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <h3 className="text-lg font-bold text-white drop-shadow-sm">{spec.title}</h3>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <p className="text-sm text-[#5B6B79] leading-relaxed mb-5">
                        {spec.description}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(spec.title)}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#00AEEF] group-hover:text-[#0098D4] transition-colors cursor-pointer"
                      >
                        <span>Explore Specialists</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* In-place Expandable Specialities Toggle */}
            <div className="mt-10 text-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAllSpecialties(!showAllSpecialties)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white border-[#00AEEF]/40 hover:border-[#00AEEF] text-[#0098D4] hover:text-[#00AEEF] font-bold text-sm shadow-xs cursor-pointer"
              >
                <span>{showAllSpecialties ? "Show Fewer Specialities" : "More Specialities (View All 20)"}</span>
                {showAllSpecialties ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>

            {showAllSpecialties && (
              <div className="mt-8 pt-8 border-t border-[#E1EFF5] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-in fade-in duration-300">
                {extendedSpecialties.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={spec.title}
                      className="p-5 rounded-2xl bg-[#F4FAFD] border border-[#E1EFF5] hover:border-[#00AEEF]/40 hover:shadow-xs transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-white text-[#00AEEF] flex items-center justify-center mb-3 shadow-2xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold text-[#292729] mb-1">{spec.title}</h4>
                        <p className="text-xs text-[#5B6B79] leading-relaxed mb-3">{spec.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(spec.title)}
                        className="text-xs font-bold text-[#00AEEF] hover:underline text-left cursor-pointer"
                      >
                        Find Specialists →
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 4. DOCTORS SECTION – SIDE SCROLL WITH IMAGES & REAL DOCTORS DATA */}
        <section id="doctors" className="py-20 bg-[#F4FAFD] scroll-mt-24 border-t border-[#E1EFF5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
            <div className="reveal-fade-left flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E1EFF5] pb-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#00AEEF]/30 text-xs font-bold text-[#0098D4] uppercase tracking-wider mb-2">
                  <Stethoscope className="w-3.5 h-3.5 text-[#00AEEF]" />
                  <span>Specialist Doctors Network</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#292729]">
                  Meet Our Doctors ({filteredDoctors.length})
                </h2>
                <p className="text-sm sm:text-base text-[#5B6B79] mt-1">
                  Experienced specialists and surgical consultants with verified clinical excellence.
                </p>
              </div>

              {/* Side-Scroll Navigation Buttons */}
              <div className="flex items-center gap-3 self-start sm:self-end">
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F7FC] text-xs font-bold text-[#0098D4] border border-[#00AEEF]/20">
                  <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-pulse" />
                  <span>Auto-scrolls every 3s</span>
                </div>
                <span className="text-xs font-bold text-[#5B6B79]">Scroll Doctors</span>
                <button
                  type="button"
                  onClick={() => scrollDoctors("left")}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-[#00AEEF] hover:text-white border border-[#E1EFF5] text-[#292729] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                  aria-label="Previous doctors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollDoctors("right")}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-[#00AEEF] hover:text-white border border-[#E1EFF5] text-[#292729] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                  aria-label="Next doctors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Speciality Filter Pills for Side Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
              {[
                { label: "All Specialists", value: "All" },
                { label: "Ophthalmology", value: "Ophthalmology" },
                { label: "Infertility", value: "Infertility" },
                { label: "Orthopaedic", value: "Orthopaedic" },
                { label: "Oncology", value: "Oncology" },
                { label: "Urology", value: "Urology" },
                { label: "Spine & Neuro", value: "Spine & Neuro" },
                { label: "Diabetology", value: "Diabetology" },
                { label: "Psychiatry", value: "Psychiatry" },
                { label: "Pulmonology", value: "Pulmonology" },
                { label: "Cardiology", value: "Cardiology" },
              ].map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setDoctorCategoryFilter(f.value)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    doctorCategoryFilter === f.value
                      ? "bg-[#00AEEF] text-white shadow-xs"
                      : "bg-white text-[#5B6B79] hover:bg-[#E8F7FC] hover:text-[#0098D4] border border-[#E1EFF5]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* HORIZONTAL SIDE-SCROLLING CAROUSEL */}
            <div
              ref={doctorScrollRef}
              onMouseEnter={() => {
                isDoctorHoveredRef.current = true;
              }}
              onMouseLeave={() => {
                isDoctorHoveredRef.current = false;
              }}
              onTouchStart={() => {
                isDoctorHoveredRef.current = true;
              }}
              onTouchEnd={() => {
                isDoctorHoveredRef.current = false;
              }}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 px-1 scroll-smooth"
            >
              {filteredDoctors.map((doc, idx) => (
                <div
                  key={doc.id}
                  style={{ transitionDelay: `${(idx % 6) * 60}ms` }}
                  className="reveal-init card-glow-hover w-[19.5rem] sm:w-[21.5rem] shrink-0 snap-inline-start rounded-3xl bg-white border border-[#E1EFF5] shadow-xs flex flex-col overflow-hidden group cursor-pointer"
                >
                  {/* Tall Image Frame for Clear Doctor Portrait */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#E8F7FC]">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#292729]/80 via-[#292729]/10 to-transparent" />
                    <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#0098D4] shadow-xs flex items-center gap-1.5">
                      <BadgeCheck className="w-4 h-4 text-[#00AEEF] animate-beat-hover" />
                      <span>Verified Doctor</span>
                    </div>
                    <div className="absolute top-3.5 right-3.5 bg-[#292729]/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{doc.rating}</span>
                      <span className="text-white/70">({doc.reviewCount})</span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-xs font-extrabold text-[#00AEEF] uppercase tracking-wider block">
                        {doc.experience}
                      </span>
                      <h3 className="text-xl font-extrabold text-white leading-tight">
                        {doc.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#00AEEF] mb-3">
                        {doc.speciality}
                      </p>

                      {/* Best Known For Highlight Badge */}
                      <div className="p-3 rounded-xl bg-[#E8F7FC] border border-[#00AEEF]/20 text-xs text-[#0098D4] mb-4">
                        <strong className="text-[#292729] block mb-0.5">Best Known For:</strong>
                        <p className="line-clamp-2 font-medium">{doc.bestKnownFor}</p>
                      </div>

                      <div className="flex flex-col gap-1 text-xs text-[#5B6B79] mb-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
                          <span>{doc.location} · Network Partner</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
                          <span>{doc.timings}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[#E1EFF5]">
                      <a
                        href={doc.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-1 text-xs font-bold py-2.5 px-3 rounded-xl bg-white border border-[#E1EFF5] hover:border-[#00AEEF] text-[#292729] hover:text-[#00AEEF] transition-colors"
                      >
                        <span>Profile</span>
                        <ExternalLink className="w-3 h-3 text-[#00AEEF]" />
                      </a>
                      <Button
                        type="button"
                        onClick={() => openBookingWithDoctor(doc)}
                        className="btn-shimmer w-full text-xs font-bold bg-[#00AEEF] hover:bg-[#0098D4] text-white rounded-xl py-2.5 shadow-xs cursor-pointer border-0"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. MULTI-SPECIALITY HOSPITALS SECTION */}
        <section id="hospitals" className="py-20 bg-white scroll-mt-24 border-t border-[#E1EFF5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
            <div className="reveal-fade-left flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E1EFF5] pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7FC] border border-[#00AEEF]/30 text-xs font-bold text-[#0098D4] uppercase tracking-wider mb-2">
                  <Building2 className="w-3.5 h-3.5 text-[#00AEEF]" />
                  <span>Hospitals Network</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292729]">
                  Multi-Speciality Hospitals
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#5B6B79]">
                NABH accredited tertiary facilities equipped with 24/7 ICUs & emergency care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredHospitals.map((hosp, idx) => (
                <div
                  key={hosp.id}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                  className="reveal-init card-glow-hover rounded-3xl bg-[#F4FAFD] border border-[#E1EFF5] shadow-xs flex flex-col overflow-hidden group"
                >
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#E8F7FC]">
                    <img
                      src={hosp.image}
                      alt={hosp.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#292729]/75 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#0098D4] shadow-xs flex items-center gap-1.5">
                      <BadgeCheck className="w-4 h-4 text-[#00AEEF] animate-beat-hover" />
                      <span>{hosp.badge}</span>
                    </div>
                    <div className="absolute top-3.5 right-3.5 bg-[#292729]/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{hosp.rating}</span>
                      <span className="text-white/70">({hosp.reviewCount})</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold text-[#292729] mb-1.5 group-hover:text-[#0098D4] transition-colors leading-snug">
                        {hosp.name}
                      </h3>
                      <p className="text-sm font-semibold text-[#00AEEF] mb-3">
                        {hosp.specialityOrCategory}
                      </p>

                      <div className="flex flex-col gap-1.5 text-sm text-[#5B6B79] mb-5">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#00AEEF] shrink-0" />
                          <span className="truncate">{hosp.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#00AEEF] shrink-0" />
                          <span>{hosp.experienceOrBeds} · Emergency 24/7 Available</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E1EFF5]">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedProvider(hosp)}
                        className="w-full text-xs sm:text-sm font-bold rounded-xl py-2.5 cursor-pointer bg-white border-[#E1EFF5]"
                      >
                        Details
                      </Button>
                      <Button
                        type="button"
                        onClick={() => openBookingWithProvider(hosp)}
                        className="btn-shimmer w-full text-xs sm:text-sm font-bold bg-[#00AEEF] hover:bg-[#0098D4] text-white rounded-xl py-2.5 shadow-xs cursor-pointer border-0"
                      >
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. DIAGNOSTICS & PATHOLOGY CENTRES */}
        <section id="diagnostics" className="py-20 bg-[#F4FAFD] scroll-mt-24 border-t border-[#E1EFF5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
            <div className="reveal-fade-left flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E1EFF5] pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#00AEEF]/30 text-xs font-bold text-[#0098D4] uppercase tracking-wider mb-2">
                  <Microscope className="w-3.5 h-3.5 text-[#00AEEF]" />
                  <span>Diagnostics</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292729]">
                  Diagnostic & Pathology Centres
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#5B6B79]">
                NABL accredited pathology and imaging diagnostic centres with automated sample testing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredDiagnostics.map((diag, idx) => (
                <div
                  key={diag.id}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                  className="reveal-init card-glow-hover rounded-3xl bg-white border border-[#E1EFF5] shadow-xs flex flex-col overflow-hidden group"
                >
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#E8F7FC]">
                    <img
                      src={diag.image}
                      alt={diag.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#292729]/75 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#0098D4] shadow-xs flex items-center gap-1.5">
                      <BadgeCheck className="w-4 h-4 text-[#00AEEF] animate-beat-hover" />
                      <span>{diag.badge}</span>
                    </div>
                    <div className="absolute top-3.5 right-3.5 bg-[#292729]/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{diag.rating}</span>
                      <span className="text-white/70">({diag.reviewCount})</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold text-[#292729] mb-1.5 group-hover:text-[#0098D4] transition-colors leading-snug">
                        {diag.name}
                      </h3>
                      <p className="text-sm font-semibold text-[#00AEEF] mb-3">
                        {diag.specialityOrCategory}
                      </p>

                      <div className="flex flex-col gap-1.5 text-sm text-[#5B6B79] mb-5">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#00AEEF] shrink-0" />
                          <span className="truncate">{diag.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Microscope className="w-4 h-4 text-[#00AEEF] shrink-0" />
                          <span>{diag.experienceOrBeds}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E1EFF5]">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedProvider(diag)}
                        className="w-full text-xs sm:text-sm font-bold rounded-xl py-2.5 cursor-pointer bg-white border-[#E1EFF5]"
                      >
                        View Tests
                      </Button>
                      <Button
                        type="button"
                        onClick={() => openBookingWithProvider(diag)}
                        className="btn-shimmer w-full text-xs sm:text-sm font-bold bg-[#00AEEF] hover:bg-[#0098D4] text-white rounded-xl py-2.5 shadow-xs cursor-pointer border-0"
                      >
                        Book Lab Test
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Healthcare Guidance Section */}
        <section className="bg-animated-gradient py-20 bg-gradient-to-r from-[#E8F7FC] via-[#F4FAFD] to-[#E8F7FC] border-y border-[#E1EFF5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="reveal-fade-left lg:col-span-7">
                <span className="text-xs font-extrabold text-[#0098D4] uppercase tracking-wider block mb-2">
                  Personalized Guidance
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#292729] tracking-tight leading-tight mb-4">
                  Need Help? <span className="text-[#00AEEF]">Let Us Guide You.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#5B6B79] leading-relaxed mb-7 max-w-xl">
                  Not sure which doctor, hospital or diagnostic centre is right for you? Get personalised recommendations and guidance from our team.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    onClick={() => {
                      setGuidanceSuccess(false);
                      setGuidanceModalOpen(true);
                    }}
                    className="btn-shimmer bg-[#00AEEF] hover:bg-[#0098D4] text-white font-bold px-8 py-4 rounded-xl shadow-md shadow-[#00AEEF]/25 text-sm sm:text-base cursor-pointer border-0"
                  >
                    <span>Ask for Our Recommendation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <a
                    href="tel:+917400465666"
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#292729] hover:text-[#00AEEF] px-6 py-3.5 rounded-xl bg-white border border-[#E1EFF5] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#00AEEF]" />
                    <span>Call +91 74004 65666</span>
                  </a>
                </div>
              </div>

              <div className="reveal-fade-right lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-4/3 group">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80"
                    alt="Doctor consultation guidance"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292729]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#00AEEF]">Dial 4 Healthcare Guidance</p>
                    <p className="text-sm font-semibold">20 Years of Trusted Healthcare Network</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Special Offers */}
        <section id="offers" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="reveal-fade-left flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-extrabold text-[#0098D4] uppercase tracking-wider block mb-1">
                  Preventive Care Packages
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#292729]">
                  Healthcare Offers & Packages
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#5B6B79] max-w-sm">
                Curated preventive health checkups with same-day digital laboratory reporting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {offerPackages.map((pkg, idx) => (
                <div
                  key={pkg.id}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                  className="reveal-scale-init card-glow-hover rounded-3xl bg-[#F4FAFD] border border-[#E1EFF5] overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-[#E8F7FC]">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#292729]/60 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3.5 left-3.5 bg-[#00AEEF] text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                        {pkg.tag}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs font-bold text-[#0098D4] mb-2.5">
                        <span>{pkg.testsCount}</span>
                        <span>{pkg.turnaround}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#292729] mb-2 group-hover:text-[#0098D4] transition-colors leading-snug">
                        {pkg.title}
                      </h3>
                      <p className="text-sm text-[#5B6B79] leading-relaxed mb-4">
                        {pkg.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Button
                      type="button"
                      onClick={() => setSelectedOffer(pkg)}
                      className="btn-shimmer w-full bg-white hover:bg-[#00AEEF] text-[#0098D4] hover:text-white border border-[#00AEEF]/40 font-bold text-sm py-3 rounded-xl transition-all cursor-pointer shadow-2xs"
                    >
                      Explore Offer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Platform Statistics */}
        <section className="py-14 bg-[#F4FAFD] border-y border-[#E1EFF5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { count: "3", label: "Hospitals", icon: Building2, desc: "Multi-Speciality Tertiary Facilities" },
                { count: "26+", label: "Doctors", icon: Stethoscope, desc: "Certified Super Specialists" },
                { count: "1", label: "Diagnostics", icon: Microscope, desc: "NABL Accredited Laboratory" },
                { count: "7", label: "Happy Patients", icon: Users, desc: "Treated & Guided with Care" },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    style={{ transitionDelay: `${idx * 90}ms` }}
                    className="reveal-scale-init card-glow-hover flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-[#E1EFF5] group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#E8F7FC] text-[#00AEEF] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform animate-beat-hover">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#292729] mb-0.5 group-hover:text-[#00AEEF] transition-colors">
                      {stat.count}
                    </div>
                    <div className="text-sm font-bold text-[#0098D4]">{stat.label}</div>
                    <div className="text-xs text-[#5B6B79] mt-0.5">{stat.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. Google Verified Reviews with Continuous Left-Scrolling Marquee */}
        <section className="py-20 bg-white overflow-hidden border-b border-[#E1EFF5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <div className="reveal-fade-left flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4FAFD] border border-[#E1EFF5] shadow-xs mb-3">
                  <GoogleIcon />
                  <span className="text-xs sm:text-sm font-bold text-[#292729]">Google Verified Patient Reviews</span>
                  <span className="flex items-center gap-1 text-xs font-extrabold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    4.9 / 5.0
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#292729] mt-1 mb-1">
                  What Our Users Have to Say!
                </h2>
                <p className="text-sm text-[#5B6B79]">
                  Experiences that reflect the trust and care behind our healthcare network.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#5B6B79] bg-[#F4FAFD] px-3.5 py-2 rounded-xl border border-[#E1EFF5]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Continuous Left Scrolling · Hover to Pause</span>
              </div>
            </div>
          </div>

          <div className="relative w-full overflow-hidden py-3">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-left flex gap-6 px-4">
              {[...googleReviews, ...googleReviews].map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  className="w-[21rem] sm:w-[23rem] shrink-0 bg-[#F4FAFD] rounded-3xl p-6 border border-[#E1EFF5] shadow-xs flex flex-col justify-between hover:shadow-lg hover:border-[#00AEEF]/50 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-1.5">
                        <GoogleIcon />
                        <span className="text-[0.68rem] font-bold text-[#5B6B79] uppercase tracking-wider">
                          Google Review
                        </span>
                      </div>
                      <span className="text-xs text-[#5B6B79]">{review.relativeTime}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400 mb-3.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-sm text-[#292729] leading-relaxed mb-5">
                      "{review.quote}"
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-[#E1EFF5] flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#00AEEF]"
                    />
                    <div>
                      <div className="text-sm font-extrabold text-[#292729] flex items-center gap-1">
                        <span>{review.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00AEEF]" />
                      </div>
                      <div className="text-xs text-[#0098D4] font-medium">{review.treatment} · {review.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. About Dial 4 Healthcare */}
        <section id="about" className="py-20 bg-[#F4FAFD]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="reveal-fade-left lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#E8F7FC] aspect-4/3 sm:aspect-1">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80"
                    alt="Medical team"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292729]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#00AEEF]">
                      Healthcare Industry Leader
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">20 Years of Healthcare Experience</h3>
                  </div>
                </div>
              </div>

              <div className="reveal-fade-right lg:col-span-7">
                <span className="text-xs font-extrabold text-[#0098D4] uppercase tracking-wider block mb-1">
                  About Dial 4 Healthcare
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#292729] tracking-tight leading-tight mb-4">
                  Connecting People to Better Healthcare
                </h2>

                <div className="space-y-3.5 text-sm sm:text-base text-[#5B6B79] leading-relaxed mb-6">
                  <p>
                    Dial 4 Healthcare follows a three-pronged business approach. With almost 20 years of marketing experience in the healthcare industry, we have developed a healthcare-focused marketing division and built a trusted network of healthcare service providers who rely on us to grow their businesses.
                  </p>
                  <p>
                    Our goal is to connect patients with reliable healthcare providers while helping healthcare professionals expand their reach.
                  </p>
                </div>

                <Button
                  asChild
                  className="bg-[#00AEEF] hover:bg-[#0098D4] text-white font-bold px-8 py-4 rounded-xl shadow-md text-sm border-0"
                >
                  <a href="#contact">
                    Get in Touch <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Contact Section */}
        <section id="contact" className="py-20 bg-white border-t border-[#E1EFF5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="reveal-fade-left lg:col-span-5">
                <span className="text-xs font-extrabold text-[#0098D4] uppercase tracking-wider block mb-1">
                  Assistance Desk
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#292729] mb-3">
                  Get in Touch
                </h2>
                <p className="text-sm sm:text-base text-[#5B6B79] leading-relaxed mb-7">
                  Have questions or need help finding the right healthcare provider? Our team is here to assist you.
                </p>

                <div className="space-y-3.5 mb-7">
                  <a
                    href="tel:+917400465666"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#F4FAFD] border border-[#E1EFF5] hover:border-[#00AEEF]/50 transition-all group shadow-2xs"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#00AEEF] text-white flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#5B6B79]">Helpline Desk</div>
                      <div className="text-base font-extrabold text-[#292729] group-hover:text-[#00AEEF] transition-colors">
                        +91 74004 65666
                      </div>
                    </div>
                  </a>

                  <a
                    href="mailto:d4h.official@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#F4FAFD] border border-[#E1EFF5] hover:border-[#00AEEF]/50 transition-all group shadow-2xs"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#0098D4] text-white flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#5B6B79]">Email Support</div>
                      <div className="text-base font-extrabold text-[#292729] group-hover:text-[#00AEEF] transition-colors">
                        d4h.official@gmail.com
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="reveal-fade-right lg:col-span-7">
                <div className="p-7 sm:p-9 rounded-3xl bg-[#F4FAFD] border border-[#E1EFF5] shadow-xs">
                  <h3 className="text-xl font-extrabold text-[#292729] mb-1">Send Us a Message</h3>
                  <p className="text-sm text-[#5B6B79] mb-5">
                    We’ll respond promptly to help connect you with the right provider.
                  </p>

                  {contactSuccess ? (
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                      <CheckCircle2 className="w-9 h-9 text-emerald-600 mx-auto mb-2" />
                      <h4 className="text-base font-bold text-emerald-900 mb-1">Message Prepared</h4>
                      <p className="text-xs sm:text-sm text-emerald-700 mb-3">
                        Your email client should open to send your message to <strong>d4h.official@gmail.com</strong>.
                      </p>
                      <Button
                        type="button"
                        onClick={() => setContactSuccess(false)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl"
                      >
                        Send Another Enquiry
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactForm} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#292729] mb-1" htmlFor="contact-name">
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E1EFF5] text-sm text-[#292729] focus:outline-none focus:border-[#00AEEF]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-[#292729] mb-1" htmlFor="contact-email">
                            Email Address *
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E1EFF5] text-sm text-[#292729] focus:outline-none focus:border-[#00AEEF]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#292729] mb-1" htmlFor="contact-phone">
                            Phone Number *
                          </label>
                          <input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="+91 74004 65666"
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E1EFF5] text-sm text-[#292729] focus:outline-none focus:border-[#00AEEF]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#292729] mb-1" htmlFor="contact-message">
                          Your Enquiry *
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={3}
                          required
                          placeholder="Tell us what care, doctor, or test you need..."
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E1EFF5] text-sm text-[#292729] focus:outline-none focus:border-[#00AEEF] resize-y"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#00AEEF] hover:bg-[#0098D4] text-white font-bold py-3.5 rounded-xl shadow-md text-sm transition-all cursor-pointer border-0"
                      >
                        Submit Enquiry
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 13. Footer */}
      <footer className="bg-[#292729] text-white border-t border-[#292729] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
            <div className="flex flex-col items-start">
              <BrandLogo dark />
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mt-3.5 mb-5 max-w-sm">
                Dial 4 Healthcare connects patients with trusted doctors, multi-speciality hospitals, and accredited diagnostic centres.
              </p>
              <div className="flex items-center gap-2.5">
                {["facebook", "twitter", "linkedin", "instagram"].map((soc) => (
                  <a
                    key={soc}
                    href={`https://${soc}.com`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Dial 4 Healthcare on ${soc}`}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#00AEEF] text-white flex items-center justify-center transition-colors text-xs"
                  >
                    <span className="capitalize">{soc.charAt(0)}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#00AEEF] mb-3.5">Quick Links</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-white/75">
                {simpleNavItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="hover:text-[#00AEEF] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="https://dial4healthcare.com/register.php"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00AEEF] hover:underline"
                  >
                    Healthcare Provider Register
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setBlogsModalOpen(true)}
                    className="hover:text-[#00AEEF] transition-colors cursor-pointer"
                  >
                    Clinical Blogs
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#00AEEF] mb-3.5">Our Specialities</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-white/75">
                {[
                  "Infertility Specialist",
                  "Consultant ENT",
                  "Ophthalmology",
                  "Diabetology",
                  "Orthopaedic",
                  "Spine Specialist",
                  "Hematology",
                  "Oncology",
                ].map((spec) => (
                  <li key={spec}>
                    <a
                      href="#specialities"
                      onClick={() => handleSuggestionClick(spec)}
                      className="hover:text-[#00AEEF] transition-colors"
                    >
                      {spec}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#00AEEF] mb-3.5">Contact</h4>
              <div className="space-y-3 text-xs sm:text-sm text-white/75">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                  <a href="mailto:d4h.official@gmail.com" className="hover:text-[#00AEEF]">
                    d4h.official@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                  <a href="tel:+917400465666" className="hover:text-[#00AEEF]">
                    +91 74004 65666
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                  <span>Mon - Sat: 09:00 AM - 08:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-white/60">
            <div>Copyright 2026 Dial 4 Healthcare. All Rights Reserved.</div>
            <div>
              Designed By{" "}
              <a
                href="https://www.azhariinfotech.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[#00AEEF] hover:underline"
              >
                Azhari Infotech
              </a>
              .
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#0098D4] text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white animate-in fade-in slide-in-from-bottom-3"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* MODAL 1: Book Appointment Modal */}
      {appointmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-[#E1EFF5] max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setAppointmentModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#5B6B79] hover:bg-[#F4FAFD] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-extrabold uppercase text-[#0098D4] tracking-wider">
                Appointment Booking
              </span>
              <h3 className="text-xl font-extrabold text-[#292729]">
                {selectedDoctor
                  ? `Book with ${selectedDoctor.name}`
                  : selectedProvider
                  ? `Book with ${selectedProvider.name}`
                  : "Book an Appointment"}
              </h3>
              {selectedDoctor && (
                <p className="text-xs sm:text-sm text-[#00AEEF] font-semibold mt-0.5">
                  {selectedDoctor.speciality} · {selectedDoctor.location}
                </p>
              )}
              {selectedProvider && (
                <p className="text-xs sm:text-sm text-[#00AEEF] font-semibold mt-0.5">
                  {selectedProvider.specialityOrCategory} · {selectedProvider.location}
                </p>
              )}
            </div>

            {appointmentSuccess ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-[#292729] mb-1">Appointment Request Confirmed!</h4>
                <p className="text-xs sm:text-sm text-[#5B6B79] mb-4">
                  Our coordinator will call you back to confirm your time slot and details.
                </p>
                <Button
                  type="button"
                  onClick={() => setAppointmentModalOpen(false)}
                  className="bg-[#00AEEF] text-white text-xs font-bold rounded-xl px-5"
                >
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleAppointmentBooking} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#292729] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter patient name"
                    className="w-full px-3 py-2 rounded-xl border border-[#E1EFF5] text-sm text-[#292729] focus:outline-none focus:border-[#00AEEF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#292729] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 74004 65666"
                      className="w-full px-3 py-2 rounded-xl border border-[#E1EFF5] text-sm text-[#292729] focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#292729] mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-[#E1EFF5] text-sm text-[#292729] focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#292729] mb-1">Select Healthcare Speciality / Provider</label>
                  <select
                    defaultValue={selectedDoctor?.id ?? selectedProvider?.id ?? "general"}
                    className="w-full px-3 py-2 rounded-xl border border-[#E1EFF5] text-sm text-[#292729] focus:outline-none focus:border-[#00AEEF]"
                  >
                    <option value="general">General Healthcare Consultation</option>
                    {authenticDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} - {doc.speciality}
                      </option>
                    ))}
                    {hospitalsData.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.specialityOrCategory})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#292729] mb-1">Brief Symptoms or Concern</label>
                  <textarea
                    rows={2}
                    placeholder="Describe your health need or query..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E1EFF5] text-sm text-[#292729] focus:outline-none focus:border-[#00AEEF]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#00AEEF] hover:bg-[#0098D4] text-white font-bold py-3 rounded-xl text-sm cursor-pointer border-0 mt-2"
                >
                  Confirm Appointment Request
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Ask for Our Recommendation */}
      {guidanceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-[#E1EFF5] max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setGuidanceModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#5B6B79] hover:bg-[#F4FAFD] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-extrabold uppercase text-[#0098D4] tracking-wider">
                Healthcare Recommendation
              </span>
              <h3 className="text-xl font-extrabold text-[#292729]">Ask for Our Recommendation</h3>
              <p className="text-xs sm:text-sm text-[#5B6B79] mt-0.5">
                Our care coordinators will guide you to the ideal doctor, hospital, or diagnostic center.
              </p>
            </div>

            {guidanceSuccess ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-[#292729] mb-1">Request Received!</h4>
                <p className="text-xs sm:text-sm text-[#5B6B79] mb-4">
                  Our coordinator will contact you via phone within 30 minutes.
                </p>
                <Button
                  type="button"
                  onClick={() => setGuidanceModalOpen(false)}
                  className="bg-[#00AEEF] text-white text-xs font-bold rounded-xl px-5"
                >
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleGuidanceRequest} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#292729] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 rounded-xl border border-[#E1EFF5] text-sm text-[#292729] focus:outline-none focus:border-[#00AEEF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#292729] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 74004 65666"
                      className="w-full px-3 py-2 rounded-xl border border-[#E1EFF5] text-sm text-[#292729] focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#292729] mb-1">City / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, Delhi"
                      className="w-full px-3 py-2 rounded-xl border border-[#E1EFF5] text-sm text-[#292729] focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#292729] mb-1">Describe symptoms or medical need</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g., Looking for a cataract surgeon or fertility consultation..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E1EFF5] text-sm text-[#292729] focus:outline-none focus:border-[#00AEEF]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#00AEEF] hover:bg-[#0098D4] text-white font-bold py-3 rounded-xl text-sm cursor-pointer border-0 mt-2"
                >
                  Get Recommendation
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: Provider Profile Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-[#E1EFF5] max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedProvider(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#5B6B79] hover:bg-[#F4FAFD] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-5">
              <img
                src={selectedProvider.image}
                alt={selectedProvider.imageAlt}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#00AEEF]"
              />
              <div>
                <span className="text-xs font-bold text-[#0098D4] uppercase tracking-wider block">
                  {selectedProvider.badge}
                </span>
                <h3 className="text-xl font-extrabold text-[#292729]">{selectedProvider.name}</h3>
                <p className="text-xs sm:text-sm text-[#00AEEF] font-semibold">
                  {selectedProvider.specialityOrCategory}
                </p>
                <div className="text-xs text-[#5B6B79] mt-0.5">
                  {selectedProvider.location} · {selectedProvider.experienceOrBeds}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[#292729] mb-5">
              <p className="text-[#5B6B79] leading-relaxed">{selectedProvider.bio}</p>

              <div className="p-3 rounded-xl bg-[#F4FAFD] border border-[#E1EFF5] flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <span className="text-[#5B6B79]">Fee/Pricing: </span>
                  <span className="font-bold text-[#292729]">{selectedProvider.consultationFee ?? "Standard rates"}</span>
                </div>
                <div>
                  <span className="text-[#5B6B79]">Timings: </span>
                  <span className="font-bold text-[#292729]">{selectedProvider.timings}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedProvider(null)}
                className="rounded-xl text-xs sm:text-sm font-bold"
              >
                Close
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setAppointmentSuccess(false);
                  setAppointmentModalOpen(true);
                }}
                className="bg-[#00AEEF] hover:bg-[#0098D4] text-white rounded-xl text-xs sm:text-sm font-bold cursor-pointer border-0"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Offer Details Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-[#E1EFF5] max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedOffer(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#5B6B79] hover:bg-[#F4FAFD] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-extrabold uppercase text-[#0098D4] tracking-wider">
                {selectedOffer.tag}
              </span>
              <h3 className="text-xl font-extrabold text-[#292729]">{selectedOffer.title}</h3>
              <p className="text-sm text-[#5B6B79] mt-1 leading-relaxed">{selectedOffer.shortDescription}</p>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm font-bold text-[#0098D4] mb-4 p-3 rounded-xl bg-[#E8F7FC]">
              <span>{selectedOffer.testsCount}</span>
              <span>·</span>
              <span>{selectedOffer.turnaround}</span>
            </div>

            <div className="mb-6">
              <h4 className="text-xs sm:text-sm font-bold text-[#292729] mb-2">Package Inclusions:</h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#5B6B79]">
                {selectedOffer.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              type="button"
              onClick={() => {
                setSelectedOffer(null);
                setAppointmentSuccess(false);
                setAppointmentModalOpen(true);
              }}
              className="w-full bg-[#00AEEF] hover:bg-[#0098D4] text-white text-sm font-bold py-3 rounded-xl cursor-pointer border-0"
            >
              Book Package
            </Button>
          </div>
        </div>
      )}

      {/* MODAL 5: Healthcare Blogs Drawer / Modal */}
      {blogsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-[#E1EFF5] max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setBlogsModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#5B6B79] hover:bg-[#F4FAFD] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-xs font-extrabold uppercase text-[#0098D4] tracking-wider">
                Clinical Insights
              </span>
              <h3 className="text-2xl font-extrabold text-[#292729]">Healthcare Blogs</h3>
            </div>

            <div className="space-y-3.5">
              {blogArticles.map((art) => (
                <div
                  key={art.id}
                  className="flex flex-col sm:flex-row gap-3.5 p-3.5 rounded-2xl bg-[#F4FAFD] border border-[#E1EFF5] hover:border-[#00AEEF]/40 transition-all"
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full sm:w-28 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#0098D4] font-bold mb-1">
                        <span>{art.category}</span>
                        <span>·</span>
                        <span className="text-[#5B6B79]">{art.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#292729] leading-snug mb-1">{art.title}</h4>
                      <p className="text-xs text-[#5B6B79] line-clamp-2">{art.excerpt}</p>
                    </div>
                    <div className="text-xs text-[#00AEEF] font-bold flex items-center gap-1 mt-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
