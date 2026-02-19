import { useState, useRef, useEffect } from "react";

// ─── Translations ───────────────────────────────────────────────────────────
const T = {
  en: {
    appName: "हाम्रो-CARE",
    tagline: "Your Health, Our Priority",
    selectLang: "Select Language",
    iAmPatient: "I am a Patient",
    iAmDoctor: "I am a Doctor",
    patientLogin: "Patient Login",
    patientRegister: "Patient Registration",
    doctorLogin: "Doctor Login",
    doctorRegister: "Doctor Registration",
    name: "Full Name", age: "Age", gender: "Gender", address: "Address",
    phone: "Phone Number", blood: "Blood Group", password: "Password",
    confirmPass: "Confirm Password", medRecords: "Upload Medical Records (Optional)",
    currentMeds: "Current Medications (Optional)", submit: "Register",
    login: "Login", logout: "Logout", back: "Back",
    dashboard: "Dashboard", myInfo: "My Information",
    aiChatbot: "AI Health Assistant", connectDoctor: "Connect to Doctor",
    nearbyFacilities: "Nearby Facilities", ambulance: "🚑 Call Ambulance",
    sendMsg: "Send", typeMsg: "Describe your symptoms...",
    docLicense: "Doctor License Number", docCertificate: "Upload Doctor Certificate",
    specialization: "Specialization", hospital: "Hospital / Clinic",
    patientRecords: "Patient Records", docCommunity: "Doctor Community",
    docPatientComm: "Doctor-Patient Communication",
    male: "Male", female: "Female", other: "Other",
    alreadyHaveAccount: "Already have an account?", loginHere: "Login here",
    noAccount: "Don't have an account?", registerHere: "Register here",
    emergencyContacts: "Emergency Contacts",
    generateReport: "Generate Medical Report",
    reportSent: "Report sent to available doctors!",
    chatWith: "Chat with",
    videoCall: "Video Call", audioCall: "Audio Call", chat: "Chat",
    communityFeed: "Community Posts", postUpdate: "Post an Update",
    typePost: "Share medical insights...", post: "Post",
    healthPosts: "Health Posts", hospitals: "Hospitals", pharmacy: "Pharmacy",
    welcome: "Welcome", yearOld: "years old",
    disclaimer: "⚠️ AI suggestions are not a substitute for professional medical advice.",
    loading: "Analyzing your symptoms...",
    reportTitle: "AI Medical Report",
    sentToDoc: "This report has been sent to available doctors.",
    callAmbulance: "Calling ambulance... Emergency services alerted!",
    registrationSuccess: "Registration successful! Please login.",
    invalidCredentials: "Invalid phone number or password.",
    passwordMismatch: "Passwords do not match.",
    required: "Please fill all required fields.",
    licenseVerified: "✅ License Verified",
    verifying: "Verifying license...",
    nearby: "Nearby Medical Facilities",
    km: "km away",
    open24: "Open 24/7",
  },
  ne: {
    appName: "हाम्रो-CARE",
    tagline: "तपाईंको स्वास्थ्य, हाम्रो प्राथमिकता",
    selectLang: "भाषा छान्नुहोस्",
    iAmPatient: "म बिरामी हुँ",
    iAmDoctor: "म डाक्टर हुँ",
    patientLogin: "बिरामी लगइन",
    patientRegister: "बिरामी दर्ता",
    doctorLogin: "डाक्टर लगइन",
    doctorRegister: "डाक्टर दर्ता",
    name: "पूरा नाम", age: "उमेर", gender: "लिङ्ग", address: "ठेगाना",
    phone: "फोन नम्बर", blood: "रक्त समूह", password: "पासवर्ड",
    confirmPass: "पासवर्ड पुष्टि", medRecords: "मेडिकल रेकर्ड अपलोड (वैकल्पिक)",
    currentMeds: "हालको औषधि (वैकल्पिक)", submit: "दर्ता गर्नुहोस्",
    login: "लगइन", logout: "लगआउट", back: "पछाडि",
    dashboard: "ड्यासबोर्ड", myInfo: "मेरो जानकारी",
    aiChatbot: "AI स्वास्थ्य सहायक", connectDoctor: "डाक्टरसँग जडान",
    nearbyFacilities: "नजिकका सुविधाहरू", ambulance: "🚑 एम्बुलेन्स बोलाउनुहोस्",
    sendMsg: "पठाउनुहोस्", typeMsg: "आफ्ना लक्षणहरू वर्णन गर्नुहोस्...",
    docLicense: "डाक्टर लाइसेन्स नम्बर", docCertificate: "डाक्टर प्रमाणपत्र अपलोड",
    specialization: "विशेषज्ञता", hospital: "अस्पताल / क्लिनिक",
    patientRecords: "बिरामी रेकर्ड", docCommunity: "डाक्टर समुदाय",
    docPatientComm: "डाक्टर-बिरामी सञ्चार",
    male: "पुरुष", female: "महिला", other: "अन्य",
    alreadyHaveAccount: "पहिले नै खाता छ?", loginHere: "यहाँ लगइन गर्नुहोस्",
    noAccount: "खाता छैन?", registerHere: "यहाँ दर्ता गर्नुहोस्",
    emergencyContacts: "आपतकालीन सम्पर्क",
    generateReport: "मेडिकल रिपोर्ट बनाउनुहोस्",
    reportSent: "रिपोर्ट डाक्टरहरूलाई पठाइयो!",
    chatWith: "सँग च्याट",
    videoCall: "भिडियो कल", audioCall: "अडियो कल", chat: "च्याट",
    communityFeed: "सामुदायिक पोस्टहरू", postUpdate: "अपडेट पोस्ट गर्नुहोस्",
    typePost: "चिकित्सा अन्तर्दृष्टि साझा गर्नुहोस्...", post: "पोस्ट",
    healthPosts: "स्वास्थ्य चौकी", hospitals: "अस्पताल", pharmacy: "फार्मेसी",
    welcome: "स्वागत छ", yearOld: "वर्षको",
    disclaimer: "⚠️ AI सुझावहरू पेशेवर चिकित्सा सल्लाहको विकल्प होइनन्।",
    loading: "लक्षणहरू विश्लेषण गर्दै...",
    reportTitle: "AI मेडिकल रिपोर्ट",
    sentToDoc: "यो रिपोर्ट उपलब्ध डाक्टरहरूलाई पठाइएको छ।",
    callAmbulance: "एम्बुलेन्स बोलाउँदै... आपतकालीन सेवाहरू सतर्क!",
    registrationSuccess: "दर्ता सफल! कृपया लगइन गर्नुहोस्।",
    invalidCredentials: "अमान्य फोन नम्बर वा पासवर्ड।",
    passwordMismatch: "पासवर्डहरू मेल खाँदैनन्।",
    required: "कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्।",
    licenseVerified: "✅ लाइसेन्स प्रमाणित",
    verifying: "लाइसेन्स प्रमाणित गर्दै...",
    nearby: "नजिकका चिकित्सा सुविधाहरू",
    km: "किमी टाढा",
    open24: "२४/७ खुला",
  },
  ma: {
    appName: "हाम्रो-CARE",
    tagline: "अहाँक स्वास्थ्य, हमर प्राथमिकता",
    selectLang: "भाषा चुनू",
    iAmPatient: "हम रोगी छी",
    iAmDoctor: "हम डॉक्टर छी",
    patientLogin: "रोगी लॉगिन",
    patientRegister: "रोगी पंजीकरण",
    doctorLogin: "डॉक्टर लॉगिन",
    doctorRegister: "डॉक्टर पंजीकरण",
    name: "पूरा नाम", age: "उमेर", gender: "लिंग", address: "पता",
    phone: "फोन नंबर", blood: "रक्त समूह", password: "पासवर्ड",
    confirmPass: "पासवर्ड पुष्टि", medRecords: "मेडिकल रेकॉर्ड अपलोड (वैकल्पिक)",
    currentMeds: "वर्तमान दवाई (वैकल्पिक)", submit: "पंजीकरण करू",
    login: "लॉगिन", logout: "लॉगआउट", back: "पाछाँ",
    dashboard: "डैशबोर्ड", myInfo: "हमर जानकारी",
    aiChatbot: "AI स्वास्थ्य सहायक", connectDoctor: "डॉक्टरसँ जुड़ू",
    nearbyFacilities: "नजदीकी सुविधा", ambulance: "🚑 एम्बुलेंस बजाउ",
    sendMsg: "पठाउ", typeMsg: "अपन लक्षण बताउ...",
    docLicense: "डॉक्टर लाइसेंस नंबर", docCertificate: "डॉक्टर सर्टिफिकेट अपलोड",
    specialization: "विशेषज्ञता", hospital: "अस्पताल / क्लिनिक",
    patientRecords: "रोगी रेकॉर्ड", docCommunity: "डॉक्टर समुदाय",
    docPatientComm: "डॉक्टर-रोगी संचार",
    male: "पुरुष", female: "महिला", other: "अन्य",
    alreadyHaveAccount: "पहिने खाता अछि?", loginHere: "एतय लॉगिन करू",
    noAccount: "खाता नहि अछि?", registerHere: "एतय पंजीकरण करू",
    emergencyContacts: "आपातकालीन संपर्क",
    generateReport: "मेडिकल रिपोर्ट बनाउ",
    reportSent: "रिपोर्ट डॉक्टर लोकनिकेँ पठाओल गेल!",
    chatWith: "संग चैट",
    videoCall: "वीडियो कॉल", audioCall: "ऑडियो कॉल", chat: "चैट",
    communityFeed: "सामुदायिक पोस्ट", postUpdate: "अपडेट पोस्ट करू",
    typePost: "चिकित्सा जानकारी साझा करू...", post: "पोस्ट",
    healthPosts: "स्वास्थ्य चौकी", hospitals: "अस्पताल", pharmacy: "फार्मेसी",
    welcome: "स्वागत", yearOld: "साल",
    disclaimer: "⚠️ AI सुझाव पेशेवर चिकित्सा सलाहक विकल्प नहि थिक।",
    loading: "लक्षण विश्लेषण करैत...",
    reportTitle: "AI मेडिकल रिपोर्ट",
    sentToDoc: "ई रिपोर्ट उपलब्ध डॉक्टर लोकनि केँ पठाओल गेल।",
    callAmbulance: "एम्बुलेंस बजाइत अछि... आपातकालीन सेवा सतर्क!",
    registrationSuccess: "पंजीकरण सफल! कृपया लॉगिन करू।",
    invalidCredentials: "अमान्य फोन नंबर वा पासवर्ड।",
    passwordMismatch: "पासवर्ड मेल नहि खाइत।",
    required: "कृपया सबटा आवश्यक फील्ड भरू।",
    licenseVerified: "✅ लाइसेंस सत्यापित",
    verifying: "लाइसेंस सत्यापित करैत...",
    nearby: "नजदीकी चिकित्सा सुविधा",
    km: "किमी दूर",
    open24: "२४/७ खुला",
  },
  bh: {
    appName: "हाम्रो-CARE",
    tagline: "रउआ के स्वास्थ्य, हमार प्राथमिकता",
    selectLang: "भाषा चुनीं",
    iAmPatient: "हम मरीज बानी",
    iAmDoctor: "हम डॉक्टर बानी",
    patientLogin: "मरीज लॉगिन",
    patientRegister: "मरीज पंजीकरण",
    doctorLogin: "डॉक्टर लॉगिन",
    doctorRegister: "डॉक्टर पंजीकरण",
    name: "पूरा नाम", age: "उमेर", gender: "लिंग", address: "पता",
    phone: "फोन नंबर", blood: "रक्त समूह", password: "पासवर्ड",
    confirmPass: "पासवर्ड पुष्टि", medRecords: "मेडिकल रिकॉर्ड अपलोड (वैकल्पिक)",
    currentMeds: "अभी के दवाई (वैकल्पिक)", submit: "पंजीकरण करीं",
    login: "लॉगिन", logout: "लॉगआउट", back: "पाछे",
    dashboard: "डैशबोर्ड", myInfo: "हमार जानकारी",
    aiChatbot: "AI स्वास्थ्य सहायक", connectDoctor: "डॉक्टर से जुड़ीं",
    nearbyFacilities: "नजदीकी सुविधा", ambulance: "🚑 एम्बुलेंस बुलाईं",
    sendMsg: "भेजीं", typeMsg: "आपन लच्छन बताईं...",
    docLicense: "डॉक्टर लाइसेंस नंबर", docCertificate: "डॉक्टर सर्टिफिकेट अपलोड",
    specialization: "विशेषज्ञता", hospital: "अस्पताल / क्लिनिक",
    patientRecords: "मरीज रिकॉर्ड", docCommunity: "डॉक्टर समुदाय",
    docPatientComm: "डॉक्टर-मरीज संवाद",
    male: "पुरुष", female: "महिला", other: "अन्य",
    alreadyHaveAccount: "पहिले से खाता बा?", loginHere: "इहाँ लॉगिन करीं",
    noAccount: "खाता नइखे?", registerHere: "इहाँ पंजीकरण करीं",
    emergencyContacts: "आपातकालीन संपर्क",
    generateReport: "मेडिकल रिपोर्ट बनाईं",
    reportSent: "रिपोर्ट डॉक्टरन के भेजाइल!",
    chatWith: "से चैट",
    videoCall: "वीडियो कॉल", audioCall: "ऑडियो कॉल", chat: "चैट",
    communityFeed: "सामुदायिक पोस्ट", postUpdate: "अपडेट पोस्ट करीं",
    typePost: "चिकित्सा जानकारी साझा करीं...", post: "पोस्ट",
    healthPosts: "स्वास्थ्य चौकी", hospitals: "अस्पताल", pharmacy: "फार्मेसी",
    welcome: "स्वागत बा", yearOld: "साल के",
    disclaimer: "⚠️ AI सुझाव पेशेवर चिकित्सा सलाह के विकल्प नइखे।",
    loading: "लच्छन विश्लेषण होत बा...",
    reportTitle: "AI मेडिकल रिपोर्ट",
    sentToDoc: "ई रिपोर्ट उपलब्ध डॉक्टरन के भेजाइल गइल बा।",
    callAmbulance: "एम्बुलेंस बुलात बानी... आपातकालीन सेवा सचेत!",
    registrationSuccess: "पंजीकरण सफल! कृपया लॉगिन करीं।",
    invalidCredentials: "गलत फोन नंबर या पासवर्ड।",
    passwordMismatch: "पासवर्ड मेल नइखे।",
    required: "कृपया सब जरूरी खाना भरीं।",
    licenseVerified: "✅ लाइसेंस सत्यापित",
    verifying: "लाइसेंस सत्यापित होत बा...",
    nearby: "नजदीकी चिकित्सा सुविधा",
    km: "किमी दूर",
    open24: "२४/७ खुला",
  },
};

// ─── Mock Data ───────────────────────────────────────────────────────────────
const mockFacilities = [
  { name: "Bir Hospital", type: "hospital", dist: "0.8", open24: true, phone: "01-4221988" },
  { name: "Tribhuvan University Teaching Hospital", type: "hospital", dist: "2.1", open24: true, phone: "01-4412404" },
  { name: "Kathmandu Model Hospital", type: "hospital", dist: "1.5", open24: true, phone: "01-4217766" },
  { name: "Shree Health Post", type: "healthpost", dist: "0.3", open24: false, phone: "01-4441234" },
  { name: "Green Valley Pharmacy", type: "pharmacy", dist: "0.2", open24: false, phone: "01-4556677" },
  { name: "Patan Hospital", type: "hospital", dist: "3.2", open24: true, phone: "01-5522266" },
];

const mockDoctors = [
  { id: "d1", name: "Dr. Sushila Sharma", specialization: "General Medicine", hospital: "Bir Hospital", phone: "9801234567", password: "doctor123", online: true, age: 42, gender: "Female", licenseNo: "NMC-12345", avatar: "👩‍⚕️" },
  { id: "d2", name: "Dr. Rajesh Adhikari", specialization: "Cardiology", hospital: "TUTH", phone: "9807654321", password: "doctor123", online: true, age: 50, gender: "Male", licenseNo: "NMC-54321", avatar: "👨‍⚕️" },
  { id: "d3", name: "Dr. Priya Joshi", specialization: "Pediatrics", hospital: "Kanti Children Hospital", phone: "9809876543", password: "doctor123", online: false, age: 38, gender: "Female", licenseNo: "NMC-99887", avatar: "👩‍⚕️" },
];

const communityPosts = [
  { id: 1, author: "Dr. Sushila Sharma", avatar: "👩‍⚕️", time: "2h ago", content: "Reminder: Dengue cases are rising in Kathmandu valley. Please advise patients to use mosquito nets and eliminate stagnant water. Early symptoms include high fever, joint pain, and rash.", likes: 24, comments: 8 },
  { id: 2, author: "Dr. Rajesh Adhikari", avatar: "👨‍⚕️", time: "5h ago", content: "New study shows that meditation combined with standard hypertension treatment reduces BP by additional 5-7 mmHg in Nepali patients. Worth discussing with patients.", likes: 31, comments: 12 },
  { id: 3, author: "Dr. Priya Joshi", avatar: "👩‍⚕️", time: "1d ago", content: "Winter respiratory infections peaking. Seeing many children with RSV. Ensure parents know danger signs: rapid breathing, chest in-drawing, poor feeding.", likes: 45, comments: 19 },
];

// ─── Styles ─────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap');

  :root {
    --emerald: #0d5c4a;
    --emerald-light: #10735c;
    --emerald-dark: #083d31;
    --saffron: #e8890c;
    --saffron-light: #f5a623;
    --cream: #fdf8f0;
    --warm-white: #fffdf8;
    --text-dark: #1a2a24;
    --text-mid: #3d5a4f;
    --text-light: #6b8a7f;
    --card-bg: rgba(255,253,248,0.95);
    --glass: rgba(13,92,74,0.08);
    --shadow: 0 8px 32px rgba(13,92,74,0.12);
    --shadow-lg: 0 16px 48px rgba(13,92,74,0.18);
    --radius: 20px;
    --radius-sm: 12px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Noto Sans Devanagari', sans-serif;
    background: var(--cream);
    color: var(--text-dark);
    min-height: 100vh;
  }

  .app-wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #e8f5f0 0%, #fdf8f0 40%, #e8f5f0 100%);
    position: relative;
    overflow-x: hidden;
  }

  .app-wrapper::before {
    content: '';
    position: fixed;
    top: -200px; right: -200px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(232,137,12,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .app-wrapper::after {
    content: '';
    position: fixed;
    bottom: -150px; left: -150px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(13,92,74,0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Header */
  .header {
    background: linear-gradient(135deg, var(--emerald-dark) 0%, var(--emerald) 100%);
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 20px rgba(13,92,74,0.3);
  }

  .header-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 900;
    color: #fff;
    letter-spacing: -0.5px;
  }

  .header-logo span { color: var(--saffron-light); }

  .lang-selector {
    display: flex;
    gap: 4px;
    background: rgba(255,255,255,0.1);
    padding: 4px;
    border-radius: 100px;
  }

  .lang-btn {
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.7);
    padding: 4px 10px;
    border-radius: 100px;
    cursor: pointer;
    font-size: 0.72rem;
    font-weight: 600;
    font-family: 'Noto Sans Devanagari', sans-serif;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .lang-btn.active, .lang-btn:hover {
    background: var(--saffron);
    color: #fff;
  }

  .header-actions { display: flex; align-items: center; gap: 12px; }

  .btn-logout {
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.25);
    color: #fff;
    padding: 6px 16px;
    border-radius: 100px;
    cursor: pointer;
    font-size: 0.8rem;
    font-family: 'Noto Sans Devanagari', sans-serif;
    transition: all 0.2s;
  }

  .btn-logout:hover { background: rgba(255,255,255,0.25); }

  /* Landing */
  .landing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 64px);
    padding: 40px 20px;
    text-align: center;
  }

  .landing-hero {
    margin-bottom: 60px;
    animation: fadeUp 0.8s ease both;
  }

  .landing-badge {
    display: inline-block;
    background: linear-gradient(135deg, var(--saffron), var(--saffron-light));
    color: #fff;
    padding: 6px 20px;
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .landing-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 900;
    color: var(--emerald-dark);
    line-height: 1.1;
    margin-bottom: 12px;
  }

  .landing-title span { color: var(--saffron); }

  .landing-tagline {
    font-size: 1.1rem;
    color: var(--text-mid);
    font-weight: 400;
    margin-bottom: 8px;
  }

  .landing-subtitle {
    font-size: 0.85rem;
    color: var(--text-light);
  }

  .role-cards {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
    justify-content: center;
    animation: fadeUp 0.8s 0.2s ease both;
  }

  .role-card {
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 48px 44px;
    width: 280px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: var(--shadow);
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;
  }

  .role-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--emerald), var(--saffron));
    transform: scaleX(0);
    transition: transform 0.3s;
  }

  .role-card:hover { 
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--shadow-lg);
    border-color: var(--emerald-light);
  }

  .role-card:hover::before { transform: scaleX(1); }

  .role-icon {
    font-size: 3.5rem;
    display: block;
    margin-bottom: 16px;
    animation: float 3s ease-in-out infinite;
  }

  .role-card:last-child .role-icon { animation-delay: -1.5s; }

  .role-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--emerald-dark);
    margin-bottom: 8px;
  }

  .role-desc { font-size: 0.85rem; color: var(--text-light); line-height: 1.5; }

  /* Auth Forms */
  .auth-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 20px;
    animation: fadeUp 0.5s ease both;
  }

  .auth-card {
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 40px;
    box-shadow: var(--shadow-lg);
  }

  .auth-header {
    text-align: center;
    margin-bottom: 32px;
  }

  .auth-icon { font-size: 2.5rem; margin-bottom: 12px; }

  .auth-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--emerald-dark);
    margin-bottom: 4px;
  }

  .auth-switch {
    background: linear-gradient(135deg, var(--emerald-dark), var(--emerald));
    border-radius: var(--radius);
    padding: 16px 20px;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(255,255,255,0.85);
    font-size: 0.88rem;
  }

  .auth-switch button {
    background: var(--saffron);
    border: none;
    color: #fff;
    padding: 6px 16px;
    border-radius: 100px;
    cursor: pointer;
    font-size: 0.82rem;
    font-weight: 600;
    font-family: 'Noto Sans Devanagari', sans-serif;
    transition: all 0.2s;
  }

  .auth-switch button:hover { background: var(--saffron-light); }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .form-grid .full { grid-column: 1 / -1; }

  .form-group { display: flex; flex-direction: column; gap: 6px; }
  
  .form-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-mid);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .form-input, .form-select, .form-textarea {
    background: var(--glass);
    border: 1.5px solid rgba(13,92,74,0.15);
    border-radius: var(--radius-sm);
    padding: 10px 14px;
    font-size: 0.92rem;
    color: var(--text-dark);
    font-family: 'Noto Sans Devanagari', sans-serif;
    transition: all 0.2s;
    outline: none;
  }

  .form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: var(--emerald);
    background: rgba(13,92,74,0.06);
    box-shadow: 0 0 0 3px rgba(13,92,74,0.08);
  }

  .form-textarea { resize: vertical; min-height: 80px; }

  .file-input-wrapper {
    background: var(--glass);
    border: 1.5px dashed rgba(13,92,74,0.3);
    border-radius: var(--radius-sm);
    padding: 16px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.85rem;
    color: var(--text-light);
  }

  .file-input-wrapper:hover {
    border-color: var(--emerald);
    color: var(--emerald);
    background: rgba(13,92,74,0.04);
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--emerald), var(--emerald-light));
    color: #fff;
    border: none;
    border-radius: var(--radius-sm);
    padding: 12px 24px;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: 'Noto Sans Devanagari', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
    margin-top: 8px;
    box-shadow: 0 4px 12px rgba(13,92,74,0.25);
  }

  .btn-primary:hover { 
    background: linear-gradient(135deg, var(--emerald-dark), var(--emerald));
    box-shadow: 0 6px 20px rgba(13,92,74,0.35);
    transform: translateY(-1px);
  }

  .btn-secondary {
    background: rgba(13,92,74,0.08);
    color: var(--emerald);
    border: 1.5px solid rgba(13,92,74,0.2);
    border-radius: var(--radius-sm);
    padding: 10px 20px;
    font-size: 0.88rem;
    font-weight: 600;
    font-family: 'Noto Sans Devanagari', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-secondary:hover { background: rgba(13,92,74,0.15); }

  .alert {
    padding: 10px 14px;
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    margin-bottom: 16px;
  }

  .alert-error { background: #fff0f0; color: #c53030; border-left: 3px solid #c53030; }
  .alert-success { background: #f0fff4; color: #276749; border-left: 3px solid #276749; }
  .alert-info { background: #fffcf0; color: #b45309; border-left: 3px solid #e8890c; }

  /* Dashboard */
  .dashboard {
    display: flex;
    min-height: calc(100vh - 64px);
  }

  .sidebar {
    width: 240px;
    background: linear-gradient(180deg, var(--emerald-dark) 0%, var(--emerald) 100%);
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-shrink: 0;
    position: sticky;
    top: 64px;
    height: calc(100vh - 64px);
    overflow-y: auto;
  }

  .sidebar-user {
    text-align: center;
    padding: 20px 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .sidebar-avatar {
    width: 64px;
    height: 64px;
    background: rgba(255,255,255,0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto 10px;
    border: 2px solid rgba(255,255,255,0.25);
  }

  .sidebar-name {
    color: #fff;
    font-weight: 600;
    font-size: 0.88rem;
    margin-bottom: 3px;
  }

  .sidebar-role {
    color: var(--saffron-light);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all 0.2s;
    color: rgba(255,255,255,0.7);
    font-size: 0.85rem;
    font-weight: 500;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
    font-family: 'Noto Sans Devanagari', sans-serif;
  }

  .nav-item:hover { background: rgba(255,255,255,0.1); color: #fff; }
  .nav-item.active { background: rgba(255,255,255,0.15); color: #fff; box-shadow: inset 3px 0 0 var(--saffron); }
  .nav-item .nav-icon { font-size: 1.1rem; flex-shrink: 0; }

  /* Main content */
  .main-content {
    flex: 1;
    padding: 32px;
    overflow-y: auto;
    animation: fadeUp 0.4s ease both;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--emerald-dark);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* Info Card */
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }

  .info-card {
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--shadow);
  }

  .info-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-light); font-weight: 600; margin-bottom: 6px; }
  .info-value { font-size: 1.05rem; font-weight: 600; color: var(--text-dark); }

  .blood-badge {
    display: inline-block;
    background: linear-gradient(135deg, #e53e3e, #c53030);
    color: #fff;
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 0.9rem;
    font-weight: 700;
  }

  /* Chatbot */
  .chatbot-container {
    background: var(--card-bg);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
    height: calc(100vh - 200px);
    min-height: 500px;
    display: flex;
    flex-direction: column;
  }

  .chat-header {
    background: linear-gradient(135deg, var(--emerald-dark), var(--emerald));
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .chat-header-avatar {
    width: 40px; height: 40px;
    background: rgba(255,255,255,0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
  }

  .chat-header-name { color: #fff; font-weight: 600; font-size: 0.95rem; }
  .chat-header-status { color: rgba(255,255,255,0.7); font-size: 0.75rem; display: flex; align-items: center; gap: 4px; }
  .status-dot { width: 7px; height: 7px; background: #48bb78; border-radius: 50%; animation: pulse 2s infinite; }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: linear-gradient(180deg, #f0faf5 0%, #fdf8f0 100%);
  }

  .msg { max-width: 75%; }
  .msg-user { align-self: flex-end; }
  .msg-ai { align-self: flex-start; }

  .msg-bubble {
    padding: 10px 14px;
    border-radius: 18px;
    font-size: 0.88rem;
    line-height: 1.5;
    white-space: pre-wrap;
  }

  .msg-user .msg-bubble {
    background: linear-gradient(135deg, var(--emerald), var(--emerald-light));
    color: #fff;
    border-bottom-right-radius: 4px;
  }

  .msg-ai .msg-bubble {
    background: #fff;
    color: var(--text-dark);
    border-bottom-left-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }

  .msg-time { font-size: 0.68rem; color: var(--text-light); margin-top: 4px; text-align: right; }
  .msg-ai .msg-time { text-align: left; }

  .chat-input-area {
    padding: 16px;
    background: #fff;
    border-top: 1px solid rgba(13,92,74,0.08);
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }

  .chat-input {
    flex: 1;
    border: 1.5px solid rgba(13,92,74,0.2);
    border-radius: 16px;
    padding: 10px 16px;
    font-size: 0.88rem;
    font-family: 'Noto Sans Devanagari', sans-serif;
    resize: none;
    outline: none;
    max-height: 100px;
    color: var(--text-dark);
  }

  .chat-input:focus { border-color: var(--emerald); }

  .btn-send {
    background: linear-gradient(135deg, var(--emerald), var(--emerald-light));
    border: none;
    color: #fff;
    width: 42px; height: 42px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    transition: all 0.2s;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(13,92,74,0.3);
  }

  .btn-send:hover { transform: scale(1.08); }
  .btn-send:disabled { opacity: 0.5; cursor: not-allowed; }

  .chat-actions {
    padding: 12px 16px;
    background: #f9fdf9;
    border-top: 1px solid rgba(13,92,74,0.06);
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .chat-action-btn {
    background: rgba(13,92,74,0.06);
    border: 1px solid rgba(13,92,74,0.15);
    color: var(--emerald);
    padding: 6px 14px;
    border-radius: 100px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Noto Sans Devanagari', sans-serif;
  }

  .chat-action-btn:hover { background: var(--emerald); color: #fff; }

  .btn-ambulance {
    background: linear-gradient(135deg, #e53e3e, #c53030);
    color: #fff;
    border: none;
    padding: 8px 18px;
    border-radius: 100px;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Noto Sans Devanagari', sans-serif;
    animation: pulse 2s infinite;
    box-shadow: 0 2px 8px rgba(229,62,62,0.4);
  }

  .btn-ambulance:hover { background: #9b2c2c; animation: none; }

  /* Facilities */
  .facility-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }

  .facility-card {
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--shadow);
    border-left: 4px solid transparent;
    transition: all 0.2s;
  }

  .facility-card.hospital { border-left-color: var(--emerald); }
  .facility-card.healthpost { border-left-color: #3182ce; }
  .facility-card.pharmacy { border-left-color: var(--saffron); }
  .facility-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }

  .facility-type {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .facility-card.hospital .facility-type { color: var(--emerald); }
  .facility-card.healthpost .facility-type { color: #3182ce; }
  .facility-card.pharmacy .facility-type { color: var(--saffron); }

  .facility-name { font-weight: 700; font-size: 0.95rem; color: var(--text-dark); margin-bottom: 8px; }
  .facility-meta { font-size: 0.8rem; color: var(--text-light); display: flex; gap: 12px; flex-wrap: wrap; }
  .open24-badge { background: #f0fff4; color: #276749; padding: 2px 8px; border-radius: 100px; font-size: 0.7rem; font-weight: 600; }

  /* Doctors list */
  .doctor-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }

  .doctor-card {
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 24px;
    box-shadow: var(--shadow);
    transition: all 0.2s;
    cursor: pointer;
  }

  .doctor-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }

  .doctor-avatar-lg {
    width: 64px; height: 64px;
    background: var(--glass);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin-bottom: 12px;
    border: 3px solid rgba(13,92,74,0.15);
  }

  .doctor-name { font-weight: 700; font-size: 1rem; color: var(--text-dark); }
  .doctor-spec { font-size: 0.82rem; color: var(--emerald); margin: 2px 0; }
  .doctor-hospital { font-size: 0.78rem; color: var(--text-light); }
  .online-badge { display: inline-block; background: #f0fff4; color: #276749; padding: 2px 10px; border-radius: 100px; font-size: 0.7rem; font-weight: 600; margin: 8px 0; }
  .offline-badge { display: inline-block; background: #f7fafc; color: #718096; padding: 2px 10px; border-radius: 100px; font-size: 0.7rem; font-weight: 600; margin: 8px 0; }

  .btn-connect-doctor {
    background: linear-gradient(135deg, var(--emerald), var(--emerald-light));
    color: #fff;
    border: none;
    border-radius: var(--radius-sm);
    padding: 8px 16px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    margin-top: 12px;
    font-family: 'Noto Sans Devanagari', sans-serif;
    transition: all 0.2s;
  }

  .btn-connect-doctor:hover { opacity: 0.9; transform: translateY(-1px); }

  /* Patient records for doctor */
  .record-card {
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 24px;
    box-shadow: var(--shadow);
    margin-bottom: 16px;
    border-left: 4px solid var(--saffron);
  }

  .record-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px; }
  .record-patient-name { font-weight: 700; font-size: 1rem; color: var(--text-dark); }
  .record-time { font-size: 0.75rem; color: var(--text-light); }
  .record-content { font-size: 0.85rem; color: var(--text-mid); line-height: 1.6; white-space: pre-wrap; }

  .urgency-high { background: #fff5f5; border-color: #e53e3e; }
  .urgency-badge { display: inline-block; padding: 2px 10px; border-radius: 100px; font-size: 0.7rem; font-weight: 700; }
  .urgency-badge.high { background: #fff5f5; color: #c53030; }
  .urgency-badge.medium { background: #fffcf0; color: #b45309; }
  .urgency-badge.low { background: #f0fff4; color: #276749; }

  /* Community */
  .post-card {
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 24px;
    box-shadow: var(--shadow);
    margin-bottom: 16px;
    transition: all 0.2s;
  }

  .post-card:hover { box-shadow: var(--shadow-lg); }

  .post-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .post-author-avatar { font-size: 1.8rem; }
  .post-author-name { font-weight: 700; font-size: 0.9rem; color: var(--text-dark); }
  .post-time { font-size: 0.72rem; color: var(--text-light); }
  .post-content { font-size: 0.88rem; color: var(--text-mid); line-height: 1.6; }
  .post-actions { margin-top: 14px; display: flex; gap: 16px; }
  .post-action-btn { background: none; border: none; color: var(--text-light); font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 4px; font-family: 'Noto Sans Devanagari', sans-serif; transition: color 0.2s; }
  .post-action-btn:hover { color: var(--emerald); }

  /* Call Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease;
  }

  .modal {
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 40px;
    max-width: 480px;
    width: 90%;
    text-align: center;
    box-shadow: 0 24px 64px rgba(0,0,0,0.3);
  }

  .call-modal-avatar { font-size: 4rem; margin-bottom: 12px; }
  .call-modal-name { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: var(--emerald-dark); margin-bottom: 4px; }
  .call-modal-status { font-size: 0.9rem; color: var(--text-light); margin-bottom: 28px; }

  .call-animation {
    width: 80px; height: 80px;
    border-radius: 50%;
    background: rgba(13,92,74,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto 24px;
    animation: callPulse 1.5s ease-in-out infinite;
  }

  .modal-btns { display: flex; gap: 12px; justify-content: center; }

  .btn-end-call {
    background: linear-gradient(135deg, #e53e3e, #c53030);
    color: #fff;
    border: none;
    border-radius: 100px;
    padding: 12px 28px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Noto Sans Devanagari', sans-serif;
    box-shadow: 0 4px 12px rgba(229,62,62,0.4);
    transition: all 0.2s;
  }

  .btn-end-call:hover { opacity: 0.9; transform: translateY(-1px); }

  /* Report Modal */
  .report-modal {
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    text-align: left;
  }

  .report-content { 
    background: #f9fdf9; 
    border-radius: var(--radius-sm); 
    padding: 20px; 
    font-size: 0.85rem; 
    line-height: 1.7; 
    color: var(--text-dark);
    white-space: pre-wrap;
    border: 1px solid rgba(13,92,74,0.1);
  }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.96); }
  }

  @keyframes callPulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(13,92,74,0.3); }
    50% { transform: scale(1.05); box-shadow: 0 0 0 12px rgba(13,92,74,0); }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .spinner {
    width: 20px; height: 20px;
    border: 2px solid rgba(13,92,74,0.2);
    border-top-color: var(--emerald);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    display: inline-block;
  }

  .typing-dots span {
    display: inline-block;
    width: 6px; height: 6px;
    background: var(--text-light);
    border-radius: 50%;
    margin: 0 2px;
    animation: bounce 1.2s infinite;
  }

  .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
  .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-6px); }
  }

  @media (max-width: 768px) {
    .sidebar { display: none; }
    .form-grid { grid-template-columns: 1fr; }
    .main-content { padding: 20px; }
    .role-card { width: 100%; max-width: 320px; }
    .auth-card { padding: 24px; }
  }

  .verified-badge {
    background: #f0fff4;
    color: #276749;
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .emergency-strip {
    background: linear-gradient(135deg, #e53e3e, #c53030);
    color: #fff;
    padding: 12px 20px;
    border-radius: var(--radius);
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    box-shadow: 0 4px 12px rgba(229,62,62,0.3);
  }

  .emergency-strip .emergency-text { flex: 1; }
  .emergency-strip strong { display: block; font-size: 0.9rem; }
  .emergency-strip span { font-size: 0.78rem; opacity: 0.85; }
`;

// ─── Main App ────────────────────────────────────────────────────────────────
export default function HamroCare() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("landing");
  const [currentPatient, setCurrentPatient] = useState(null);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [patientAuthMode, setPatientAuthMode] = useState("register");
  const [doctorAuthMode, setDoctorAuthMode] = useState("register");
  const [activeSection, setActiveSection] = useState("info");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  // In-memory stores
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([...mockDoctors]);
  const [sentReports, setSentReports] = useState([]);

  const t = T[lang];

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const logout = () => {
    setCurrentPatient(null);
    setCurrentDoctor(null);
    setPage("landing");
    setActiveSection("info");
  };

  const languages = [
    { code: "en", label: "EN" },
    { code: "ne", label: "नेपाली" },
    { code: "ma", label: "मैथिली" },
    { code: "bh", label: "भोजपुरी" },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="app-wrapper">
        {/* Header */}
        <header className="header">
          <div className="header-logo">
            हाम्रो<span>-CARE</span>
          </div>
          <div className="lang-selector">
            {languages.map((l) => (
              <button key={l.code} className={`lang-btn ${lang === l.code ? "active" : ""}`} onClick={() => setLang(l.code)}>
                {l.label}
              </button>
            ))}
          </div>
          <div className="header-actions">
            {(currentPatient || currentDoctor) && (
              <button className="btn-logout" onClick={logout}>{t.logout}</button>
            )}
          </div>
        </header>

        {/* Toast */}
        {toast && (
          <div style={{ position: "fixed", top: 80, right: 20, zIndex: 300, background: toast.type === "error" ? "#fed7d7" : toast.type === "info" ? "#fefcbf" : "#c6f6d5", color: toast.type === "error" ? "#c53030" : toast.type === "info" ? "#b45309" : "#276749", padding: "12px 20px", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", fontSize: "0.88rem", fontWeight: 600, maxWidth: 340, animation: "fadeUp 0.3s ease" }}>
            {toast.msg}
          </div>
        )}

        {/* Modal */}
        {modal && <ModalRenderer modal={modal} setModal={setModal} t={t} />}

        {/* Pages */}
        {page === "landing" && <LandingPage t={t} setPage={setPage} />}

        {page === "patient-auth" && (
          <PatientAuth
            t={t} lang={lang}
            mode={patientAuthMode} setMode={setPatientAuthMode}
            patients={patients} setPatients={setPatients}
            setCurrentPatient={setCurrentPatient}
            setPage={setPage}
            showToast={showToast}
          />
        )}

        {page === "patient-dashboard" && currentPatient && (
          <PatientDashboard
            t={t} lang={lang}
            patient={currentPatient}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            doctors={doctors}
            sentReports={sentReports}
            setSentReports={setSentReports}
            setModal={setModal}
            showToast={showToast}
          />
        )}

        {page === "doctor-auth" && (
          <DoctorAuth
            t={t} lang={lang}
            mode={doctorAuthMode} setMode={setDoctorAuthMode}
            doctors={doctors} setDoctors={setDoctors}
            setCurrentDoctor={setCurrentDoctor}
            setPage={setPage}
            showToast={showToast}
          />
        )}

        {page === "doctor-dashboard" && currentDoctor && (
          <DoctorDashboard
            t={t} lang={lang}
            doctor={currentDoctor}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sentReports={sentReports}
            patients={patients}
            doctors={doctors}
            setModal={setModal}
            showToast={showToast}
          />
        )}
      </div>
    </>
  );
}

// ─── Landing Page ────────────────────────────────────────────────────────────
function LandingPage({ t, setPage }) {
  return (
    <div className="landing">
      <div className="landing-hero">
        <div className="landing-badge">🏥 Nepal's Digital Health Platform</div>
        <h1 className="landing-title">
          हाम्रो<span>-CARE</span>
        </h1>
        <p className="landing-tagline">{t.tagline}</p>
        <p className="landing-subtitle">Connecting patients and doctors across Nepal | नेपालभर बिरामी र डाक्टरहरूलाई जोड्दै</p>
      </div>
      <div className="role-cards">
        <div className="role-card" onClick={() => setPage("patient-auth")}>
          <span className="role-icon">🤒</span>
          <div className="role-title">{t.iAmPatient}</div>
          <div className="role-desc">Access AI health assistant, connect with doctors, find nearby facilities</div>
        </div>
        <div className="role-card" onClick={() => setPage("doctor-auth")}>
          <span className="role-icon">👨‍⚕️</span>
          <div className="role-title">{t.iAmDoctor}</div>
          <div className="role-desc">Manage patient records, join doctor community, consult patients digitally</div>
        </div>
      </div>
    </div>
  );
}

// ─── Patient Auth ─────────────────────────────────────────────────────────────
function PatientAuth({ t, lang, mode, setMode, patients, setPatients, setCurrentPatient, setPage, showToast }) {
  const [form, setForm] = useState({ name: "", age: "", gender: "Male", address: "", phone: "", blood: "A+", password: "", confirmPass: "", currentMeds: "" });
  const [loginForm, setLoginForm] = useState({ phone: "", password: "" });
  const [error, setError] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleRegister = () => {
    if (!form.name || !form.age || !form.phone || !form.password) { setError(t.required); return; }
    if (form.password !== form.confirmPass) { setError(t.passwordMismatch); return; }
    const newPatient = { ...form, id: Date.now().toString(), avatar: "🧑‍⚕️", registeredAt: new Date().toLocaleDateString() };
    setPatients(prev => [...prev, newPatient]);
    showToast(t.registrationSuccess);
    setMode("login");
    setError("");
  };

  const handleLogin = () => {
    const found = patients.find(p => p.phone === loginForm.phone && p.password === loginForm.password);
    if (found) {
      setCurrentPatient(found);
      setPage("patient-dashboard");
    } else {
      setError(t.invalidCredentials);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Switch strip */}
        <div className="auth-switch">
          <span>{mode === "register" ? t.alreadyHaveAccount : t.noAccount}</span>
          <button onClick={() => { setMode(mode === "register" ? "login" : "register"); setError(""); }}>
            {mode === "register" ? t.loginHere : t.registerHere}
          </button>
        </div>

        <div className="auth-header">
          <div className="auth-icon">🤒</div>
          <div className="auth-title">{mode === "register" ? t.patientRegister : t.patientLogin}</div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {mode === "register" ? (
          <div className="form-grid">
            <div className="form-group"><label className="form-label">{t.name} *</label><input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">{t.age} *</label><input className="form-input" type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">{t.gender}</label>
              <select className="form-select" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                <option>{t.male}</option><option>{t.female}</option><option>{t.other}</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">{t.blood}</label>
              <select className="form-select" value={form.blood} onChange={e => setForm({ ...form, blood: e.target.value })}>
                {bloodGroups.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div className="form-group full"><label className="form-label">{t.address}</label><input className="form-input" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">{t.phone} *</label><input className="form-input" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">{t.password} *</label><input className="form-input" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
            <div className="form-group full"><label className="form-label">{t.confirmPass} *</label><input className="form-input" type="password" value={form.confirmPass} onChange={e => setForm({ ...form, confirmPass: e.target.value })} /></div>
            <div className="form-group full"><label className="form-label">{t.currentMeds}</label><textarea className="form-textarea" value={form.currentMeds} onChange={e => setForm({ ...form, currentMeds: e.target.value })} placeholder="e.g., Metformin 500mg, Aspirin 75mg..." /></div>
            <div className="form-group full"><div className="file-input-wrapper">📎 {t.medRecords}</div></div>
            <div className="form-group full"><button className="btn-primary" onClick={handleRegister}>{t.submit}</button></div>
          </div>
        ) : (
          <div className="form-grid">
            <div className="form-group full"><label className="form-label">{t.phone} *</label><input className="form-input" type="tel" value={loginForm.phone} onChange={e => setLoginForm({ ...loginForm, phone: e.target.value })} /></div>
            <div className="form-group full"><label className="form-label">{t.password} *</label><input className="form-input" type="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} /></div>
            <div className="form-group full"><button className="btn-primary" onClick={handleLogin}>{t.login}</button></div>
          </div>
        )}
        <div style={{ marginTop: 16 }}><button className="btn-secondary" onClick={() => setPage("landing")}>{t.back}</button></div>
      </div>
    </div>
  );
}

// ─── Patient Dashboard ────────────────────────────────────────────────────────
function PatientDashboard({ t, lang, patient, activeSection, setActiveSection, doctors, sentReports, setSentReports, setModal, showToast }) {
  const navItems = [
    { id: "info", icon: "👤", label: t.myInfo },
    { id: "chatbot", icon: "🤖", label: t.aiChatbot },
    { id: "facilities", icon: "🏥", label: t.nearbyFacilities },
    { id: "doctors", icon: "👨‍⚕️", label: t.connectDoctor },
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-user">
          <div className="sidebar-avatar">🧑‍⚕️</div>
          <div className="sidebar-name">{patient.name}</div>
          <div className="sidebar-role">Patient</div>
        </div>
        {navItems.map(item => (
          <button key={item.id} className={`nav-item ${activeSection === item.id ? "active" : ""}`} onClick={() => setActiveSection(item.id)}>
            <span className="nav-icon">{item.icon}</span> {item.label}
          </button>
        ))}
      </aside>
      <main className="main-content">
        {activeSection === "info" && <PatientInfo t={t} patient={patient} />}
        {activeSection === "chatbot" && <AIChatbot t={t} lang={lang} patient={patient} doctors={doctors} sentReports={sentReports} setSentReports={setSentReports} showToast={showToast} />}
        {activeSection === "facilities" && <NearbyFacilities t={t} showToast={showToast} />}
        {activeSection === "doctors" && <ConnectDoctor t={t} doctors={doctors} setModal={setModal} />}
      </main>
    </div>
  );
}

function PatientInfo({ t, patient }) {
  const fields = [
    { label: t.name, value: patient.name },
    { label: t.age, value: `${patient.age} ${t.yearOld}` },
    { label: t.gender, value: patient.gender },
    { label: t.phone, value: patient.phone },
    { label: t.address, value: patient.address || "—" },
    { label: t.blood, value: null, blood: patient.blood },
  ];

  return (
    <>
      <div className="section-title">👤 {t.myInfo}</div>
      <div className="info-grid">
        {fields.map((f, i) => (
          <div className="info-card" key={i}>
            <div className="info-label">{f.label}</div>
            {f.blood ? <span className="blood-badge">{f.blood}</span> : <div className="info-value">{f.value}</div>}
          </div>
        ))}
      </div>
      {patient.currentMeds && (
        <div className="info-card" style={{ marginBottom: 16 }}>
          <div className="info-label">{t.currentMeds}</div>
          <div className="info-value" style={{ fontSize: "0.9rem", fontWeight: 400, marginTop: 6 }}>{patient.currentMeds}</div>
        </div>
      )}
      <div className="emergency-strip">
        <span style={{ fontSize: "1.5rem" }}>🆘</span>
        <div className="emergency-text">
          <strong>{t.emergencyContacts}</strong>
          <span>Ambulance: 102 | Police: 100 | Fire: 101 | Hospital: 01-4221988</span>
        </div>
      </div>
    </>
  );
}

// ─── AI Chatbot ───────────────────────────────────────────────────────────────
function AIChatbot({ t, lang, patient, doctors, sentReports, setSentReports, showToast }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Namaste ${patient.name}! 🙏 I am your AI Health Assistant powered by advanced medical AI. I'm here to help you understand your symptoms and provide health guidance.\n\nPlease tell me:\n• What symptoms are you experiencing?\n• How long have you had them?\n• Any medications you're taking?\n\n⚠️ ${t.disclaimer}` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportModal, setReportModal] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const languageNames = { en: "English", ne: "Nepali", ma: "Maithili", bh: "Bhojpuri" };

  const systemPrompt = `You are हाम्रो-CARE AI Health Assistant, a specialized medical AI for Nepal. You provide health guidance in ${languageNames[lang] || "English"}.

Patient Profile:
- Name: ${patient.name}
- Age: ${patient.age} years
- Gender: ${patient.gender}
- Blood Group: ${patient.blood}
- Current Medications: ${patient.currentMeds || "None mentioned"}
- Location: Nepal

Your responsibilities:
1. Analyze symptoms described by the patient
2. Consider their age, gender, blood group, and current medications
3. Suggest possible conditions (NOT definitive diagnosis)
4. Recommend over-the-counter medicines available in Nepal for symptom relief
5. Advise when to seek emergency care
6. Reference common diseases in Nepal (dengue, typhoid, malaria in certain regions, respiratory infections, etc.)
7. Be culturally sensitive to Nepali context
8. Always recommend consulting a real doctor for serious conditions
9. Mention relevant Nepali herbal remedies when appropriate
10. Warn about drug interactions if patient is on medications

Response format: Be warm, clear, and helpful. Use simple language. Include:
- Assessment of symptoms
- Possible conditions (2-3 likely ones)
- Immediate care suggestions
- Medications for relief (generic names available in Nepal)
- When to seek emergency care
- A gentle reminder this is not a substitute for professional medical care

Important: Always respond in ${languageNames[lang] || "English"}.`;

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const apiMessages = messages.slice(-8).map(m => ({ role: m.role, content: m.content }));
      apiMessages.push({ role: "user", content: userMsg });

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: apiMessages,
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "I apologize, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Connection error. Please check your internet connection and try again." }]);
    }
    setLoading(false);
  };

  const generateReport = async () => {
    setLoading(true);
    const convSummary = messages.filter(m => m.role !== "assistant" || messages.indexOf(m) > 0).map(m => `${m.role === "user" ? patient.name : "AI"}: ${m.content}`).join("\n\n");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are a medical report generator for हाम्रो-CARE Nepal. Generate a structured medical report based on a patient-AI conversation.",
          messages: [{
            role: "user",
            content: `Generate a formal medical report in English for the following patient-AI conversation. Include: Patient Details, Chief Complaints, Symptom Analysis, Possible Conditions, Medications Suggested, Urgency Level (High/Medium/Low), and Recommendations for Doctor.\n\nPatient: ${patient.name}, Age: ${patient.age}, Gender: ${patient.gender}, Blood Group: ${patient.blood}, Current Meds: ${patient.currentMeds || "None"}\n\nConversation:\n${convSummary}`
          }],
        }),
      });
      const data = await response.json();
      const report = data.content?.[0]?.text || "Unable to generate report.";
      const newReport = {
        id: Date.now(),
        patientName: patient.name,
        patientAge: patient.age,
        patientGender: patient.gender,
        blood: patient.blood,
        content: report,
        time: new Date().toLocaleString(),
        urgency: report.toLowerCase().includes("high") ? "high" : report.toLowerCase().includes("medium") ? "medium" : "low",
      };
      setSentReports(prev => [newReport, ...prev]);
      setReportModal(report);
      showToast(t.reportSent, "success");
    } catch (e) {
      showToast("Report generation failed.", "error");
    }
    setLoading(false);
  };

  const quickSymptoms = ["Fever & Headache", "Cough & Cold", "Stomach Pain", "Chest Pain", "Joint Pain", "Dizziness"];

  return (
    <>
      {reportModal && (
        <div className="modal-overlay" onClick={() => setReportModal(null)}>
          <div className="modal report-modal" onClick={e => e.stopPropagation()}>
            <div className="auth-header">
              <div className="auth-icon">📋</div>
              <div className="auth-title">{t.reportTitle}</div>
            </div>
            <div className="alert alert-success" style={{ marginBottom: 16 }}>{t.sentToDoc}</div>
            <div className="report-content">{reportModal}</div>
            <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => setReportModal(null)}>Close</button>
          </div>
        </div>
      )}

      <div className="section-title">🤖 {t.aiChatbot}</div>
      <div className="alert alert-info" style={{ marginBottom: 16 }}>{t.disclaimer}</div>
      <div className="chatbot-container">
        <div className="chat-header">
          <div className="chat-header-avatar">🤖</div>
          <div>
            <div className="chat-header-name">हाम्रो-CARE AI Assistant</div>
            <div className="chat-header-status"><span className="status-dot"></span> Online • Powered by Medical AI</div>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`msg msg-${msg.role === "user" ? "user" : "ai"}`}>
              <div className="msg-bubble">{msg.content}</div>
              <div className="msg-time">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
            </div>
          ))}
          {loading && (
            <div className="msg msg-ai">
              <div className="msg-bubble">
                <div className="typing-dots"><span></span><span></span><span></span></div>
                <span style={{ fontSize: "0.78rem", color: "var(--text-light)", marginLeft: 8 }}>{t.loading}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-actions">
          {quickSymptoms.map(s => (
            <button key={s} className="chat-action-btn" onClick={() => setInput(s)}>+ {s}</button>
          ))}
          <button className="btn-ambulance" onClick={() => showToast(t.callAmbulance, "info")}>{t.ambulance}</button>
          <button className="chat-action-btn" style={{ background: "linear-gradient(135deg,#276749,#2f855a)", color: "#fff", border: "none" }} onClick={generateReport} disabled={messages.length < 3}>
            📋 {t.generateReport}
          </button>
        </div>

        <div className="chat-input-area">
          <textarea
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder={t.typeMsg}
            rows={1}
          />
          <button className="btn-send" onClick={sendMessage} disabled={loading || !input.trim()}>➤</button>
        </div>
      </div>
    </>
  );
}

// ─── Nearby Facilities ────────────────────────────────────────────────────────
function NearbyFacilities({ t, showToast }) {
  return (
    <>
      <div className="section-title">🏥 {t.nearby}</div>
      <div className="emergency-strip" style={{ marginBottom: 24 }}>
        <span style={{ fontSize: "1.5rem" }}>🚑</span>
        <div className="emergency-text">
          <strong>Emergency Ambulance Service</strong>
          <span>Nepal Ambulance Service: 102 | Red Cross: 01-4228094</span>
        </div>
        <button className="btn-ambulance" onClick={() => showToast("🚑 Calling 102 - Ambulance dispatched!", "info")}>
          Call Now
        </button>
      </div>
      <div className="facility-grid">
        {mockFacilities.map((f, i) => (
          <div key={i} className={`facility-card ${f.type}`}>
            <div className="facility-type">{f.type === "hospital" ? "🏥 " + t.hospitals : f.type === "healthpost" ? "🏡 " + t.healthPosts : "💊 " + t.pharmacy}</div>
            <div className="facility-name">{f.name}</div>
            <div className="facility-meta">
              <span>📍 {f.dist} {t.km}</span>
              {f.open24 && <span className="open24-badge">✅ {t.open24}</span>}
              <span>📞 {f.phone}</span>
            </div>
            <button className="btn-connect-doctor" style={{ marginTop: 10, background: "linear-gradient(135deg,#3182ce,#2b6cb0)" }}
              onClick={() => showToast(`Directions to ${f.name} loading...`, "info")}>
              📍 Get Directions
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Connect to Doctor ────────────────────────────────────────────────────────
function ConnectDoctor({ t, doctors, setModal }) {
  return (
    <>
      <div className="section-title">👨‍⚕️ {t.connectDoctor}</div>
      <div className="doctor-cards">
        {doctors.map(doc => (
          <div key={doc.id} className="doctor-card">
            <div className="doctor-avatar-lg">{doc.avatar || "👨‍⚕️"}</div>
            <div className="doctor-name">{doc.name}</div>
            <div className="doctor-spec">🩺 {doc.specialization}</div>
            <div className="doctor-hospital">🏥 {doc.hospital}</div>
            <span className={doc.online ? "online-badge" : "offline-badge"}>
              {doc.online ? "🟢 Online" : "⚫ Offline"}
            </span>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <button className="btn-connect-doctor" onClick={() => setModal({ type: "chat", doctor: doc })}>💬 {t.chat}</button>
              <button className="btn-connect-doctor" style={{ background: "linear-gradient(135deg,#3182ce,#2b6cb0)" }} onClick={() => setModal({ type: "call", callType: "audio", doctor: doc })}>📞 {t.audioCall}</button>
              <button className="btn-connect-doctor" style={{ background: "linear-gradient(135deg,#805ad5,#6b46c1)" }} onClick={() => setModal({ type: "call", callType: "video", doctor: doc })}>📹 {t.videoCall}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Doctor Auth ──────────────────────────────────────────────────────────────
function DoctorAuth({ t, lang, mode, setMode, doctors, setDoctors, setCurrentDoctor, setPage, showToast }) {
  const [form, setForm] = useState({ name: "", age: "", gender: "Male", specialization: "", hospital: "", phone: "", licenseNo: "", password: "", confirmPass: "" });
  const [loginForm, setLoginForm] = useState({ phone: "", password: "" });
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const verifyLicense = () => {
    if (!form.licenseNo) return;
    setVerifying(true);
    setTimeout(() => { setVerifying(false); setVerified(true); }, 1800);
  };

  const handleRegister = () => {
    if (!form.name || !form.phone || !form.password || !form.licenseNo) { setError(t.required); return; }
    if (form.password !== form.confirmPass) { setError(t.passwordMismatch); return; }
    const newDoc = { ...form, id: Date.now().toString(), avatar: form.gender === "Female" ? "👩‍⚕️" : "👨‍⚕️", online: true };
    setDoctors(prev => [...prev, newDoc]);
    showToast(t.registrationSuccess);
    setMode("login");
    setError("");
  };

  const handleLogin = () => {
    const found = doctors.find(d => d.phone === loginForm.phone && d.password === loginForm.password);
    if (found) {
      setCurrentDoctor(found);
      setPage("doctor-dashboard");
    } else {
      setError(t.invalidCredentials);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-switch">
          <span>{mode === "register" ? t.alreadyHaveAccount : t.noAccount}</span>
          <button onClick={() => { setMode(mode === "register" ? "login" : "register"); setError(""); }}>
            {mode === "register" ? t.loginHere : t.registerHere}
          </button>
        </div>
        <div className="auth-header">
          <div className="auth-icon">👨‍⚕️</div>
          <div className="auth-title">{mode === "register" ? t.doctorRegister : t.doctorLogin}</div>
        </div>
        {error && <div className="alert alert-error">{error}</div>}

        {mode === "register" ? (
          <div className="form-grid">
            <div className="form-group"><label className="form-label">{t.name} *</label><input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">{t.age}</label><input className="form-input" type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">{t.gender}</label>
              <select className="form-select" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                <option>{t.male}</option><option>{t.female}</option><option>{t.other}</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">{t.specialization}</label><input className="form-input" value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} /></div>
            <div className="form-group full"><label className="form-label">{t.hospital}</label><input className="form-input" value={form.hospital} onChange={e => setForm({ ...form, hospital: e.target.value })} /></div>
            <div className="form-group full">
              <label className="form-label">{t.docLicense} *</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input className="form-input" style={{ flex: 1 }} value={form.licenseNo} onChange={e => { setForm({ ...form, licenseNo: e.target.value }); setVerified(false); }} />
                <button className="btn-secondary" onClick={verifyLicense}>{verifying ? <span className="spinner" /> : "Verify"}</button>
              </div>
              {verified && <span className="verified-badge">{t.licenseVerified}</span>}
            </div>
            <div className="form-group full"><div className="file-input-wrapper">📎 {t.docCertificate}</div></div>
            <div className="form-group"><label className="form-label">{t.phone} *</label><input className="form-input" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">{t.password} *</label><input className="form-input" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
            <div className="form-group full"><label className="form-label">{t.confirmPass}</label><input className="form-input" type="password" value={form.confirmPass} onChange={e => setForm({ ...form, confirmPass: e.target.value })} /></div>
            <div className="form-group full"><button className="btn-primary" onClick={handleRegister}>{t.submit}</button></div>
          </div>
        ) : (
          <div className="form-grid">
            <div className="form-group full"><label className="form-label">{t.phone} *</label><input className="form-input" type="tel" value={loginForm.phone} onChange={e => setLoginForm({ ...loginForm, phone: e.target.value })} /></div>
            <div className="form-group full"><label className="form-label">{t.password} *</label><input className="form-input" type="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} /></div>
            <div className="form-group full">
              <div className="alert alert-info">💡 Demo: use phone <strong>9801234567</strong> and password <strong>doctor123</strong></div>
              <button className="btn-primary" onClick={handleLogin}>{t.login}</button>
            </div>
          </div>
        )}
        <div style={{ marginTop: 16 }}><button className="btn-secondary" onClick={() => setPage("landing")}>{t.back}</button></div>
      </div>
    </div>
  );
}

// ─── Doctor Dashboard ─────────────────────────────────────────────────────────
function DoctorDashboard({ t, lang, doctor, activeSection, setActiveSection, sentReports, patients, doctors, setModal, showToast }) {
  const [communityPostsList, setCommunityPostsList] = useState(communityPosts);
  const [newPost, setNewPost] = useState("");

  const navItems = [
    { id: "info", icon: "👤", label: t.myInfo },
    { id: "records", icon: "📋", label: t.patientRecords },
    { id: "community", icon: "👥", label: t.docCommunity },
    { id: "comm", icon: "💬", label: t.docPatientComm },
  ];

  const addPost = () => {
    if (!newPost.trim()) return;
    setCommunityPostsList(prev => [{
      id: Date.now(), author: doctor.name, avatar: doctor.avatar || "👨‍⚕️",
      time: "Just now", content: newPost, likes: 0, comments: 0
    }, ...prev]);
    setNewPost("");
    showToast("Post published!", "success");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{doctor.avatar || "👨‍⚕️"}</div>
          <div className="sidebar-name">{doctor.name}</div>
          <div className="sidebar-role">{doctor.specialization || "Doctor"}</div>
          {doctor.online && <span className="online-badge" style={{ marginTop: 6 }}>🟢 Online</span>}
        </div>
        {navItems.map(item => (
          <button key={item.id} className={`nav-item ${activeSection === item.id ? "active" : ""}`} onClick={() => setActiveSection(item.id)}>
            <span className="nav-icon">{item.icon}</span> {item.label}
          </button>
        ))}
      </aside>
      <main className="main-content">
        {activeSection === "info" && (
          <>
            <div className="section-title">👤 {t.myInfo}</div>
            <div className="info-grid">
              {[
                { label: t.name, value: doctor.name },
                { label: t.specialization, value: doctor.specialization || "—" },
                { label: t.hospital, value: doctor.hospital || "—" },
                { label: t.phone, value: doctor.phone },
                { label: t.docLicense, value: doctor.licenseNo || "—" },
                { label: t.gender, value: doctor.gender },
              ].map((f, i) => (
                <div className="info-card" key={i}>
                  <div className="info-label">{f.label}</div>
                  <div className="info-value">{f.value}</div>
                </div>
              ))}
            </div>
            <div className="info-card">
              <div className="info-label">Verification Status</div>
              <div style={{ marginTop: 6 }}><span className="verified-badge">{t.licenseVerified} • Nepal Medical Council</span></div>
            </div>
          </>
        )}

        {activeSection === "records" && (
          <>
            <div className="section-title">📋 {t.patientRecords}</div>
            {sentReports.length === 0 ? (
              <div className="info-card" style={{ textAlign: "center", padding: 40, color: "var(--text-light)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📭</div>
                <div>No patient reports yet. Reports generated by AI will appear here.</div>
              </div>
            ) : (
              sentReports.map(r => (
                <div key={r.id} className={`record-card ${r.urgency === "high" ? "urgency-high" : ""}`}>
                  <div className="record-header">
                    <div>
                      <div className="record-patient-name">{r.patientName} • {r.patientAge}y • {r.patientGender} • {r.blood}</div>
                      <div className="record-time">📅 {r.time}</div>
                    </div>
                    <span className={`urgency-badge ${r.urgency}`}>
                      {r.urgency === "high" ? "🔴 High Priority" : r.urgency === "medium" ? "🟡 Medium" : "🟢 Low"}
                    </span>
                  </div>
                  <div className="record-content">{r.content}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button className="btn-secondary" onClick={() => showToast("Reviewing record...", "info")}>📝 Review</button>
                    <button className="btn-secondary" onClick={() => showToast("Appointment scheduled!", "success")}>📅 Schedule</button>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {activeSection === "community" && (
          <>
            <div className="section-title">👥 {t.docCommunity}</div>
            <div className="info-card" style={{ marginBottom: 20 }}>
              <div className="info-label" style={{ marginBottom: 8 }}>{t.postUpdate}</div>
              <textarea className="form-textarea" value={newPost} onChange={e => setNewPost(e.target.value)} placeholder={t.typePost} />
              <button className="btn-primary" style={{ marginTop: 8 }} onClick={addPost}>{t.post}</button>
            </div>
            {communityPostsList.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <span className="post-author-avatar">{post.avatar}</span>
                  <div>
                    <div className="post-author-name">{post.author}</div>
                    <div className="post-time">⏰ {post.time}</div>
                  </div>
                </div>
                <div className="post-content">{post.content}</div>
                <div className="post-actions">
                  <button className="post-action-btn">👍 {post.likes}</button>
                  <button className="post-action-btn">💬 {post.comments} Comments</button>
                  <button className="post-action-btn">🔗 Share</button>
                </div>
              </div>
            ))}
          </>
        )}

        {activeSection === "comm" && (
          <>
            <div className="section-title">💬 {t.docPatientComm}</div>
            <div className="doctor-cards">
              {[...patients.slice(0, 3)].map((p, i) => (
                <div key={i} className="doctor-card">
                  <div className="doctor-avatar-lg">🧑‍⚕️</div>
                  <div className="doctor-name">{p.name}</div>
                  <div className="doctor-spec">🩺 Patient</div>
                  <div className="doctor-hospital">📍 {p.address || "Nepal"}</div>
                  <span className="online-badge">🟢 Online</span>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <button className="btn-connect-doctor" onClick={() => showToast(`Opening chat with ${p.name}...`, "info")}>💬 {t.chat}</button>
                    <button className="btn-connect-doctor" style={{ background: "linear-gradient(135deg,#3182ce,#2b6cb0)" }} onClick={() => setModal({ type: "call", callType: "audio", doctor: { name: p.name, avatar: "🧑‍⚕️" } })}>📞</button>
                    <button className="btn-connect-doctor" style={{ background: "linear-gradient(135deg,#805ad5,#6b46c1)" }} onClick={() => setModal({ type: "call", callType: "video", doctor: { name: p.name, avatar: "🧑‍⚕️" } })}>📹</button>
                  </div>
                </div>
              ))}
              {patients.length === 0 && mockDoctors.filter(d => d.id !== "d1").map(doc => (
                <div key={doc.id} className="doctor-card">
                  <div className="doctor-avatar-lg">{doc.avatar}</div>
                  <div className="doctor-name">{doc.name}</div>
                  <div className="doctor-spec">🩺 {doc.specialization}</div>
                  <div className="doctor-hospital">🏥 {doc.hospital}</div>
                  <span className={doc.online ? "online-badge" : "offline-badge"}>{doc.online ? "🟢 Online" : "⚫ Offline"}</span>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <button className="btn-connect-doctor" onClick={() => showToast(`Chat with ${doc.name} opening...`, "info")}>💬 {t.chat}</button>
                    <button className="btn-connect-doctor" style={{ background: "linear-gradient(135deg,#3182ce,#2b6cb0)" }} onClick={() => setModal({ type: "call", callType: "audio", doctor: doc })}>📞</button>
                    <button className="btn-connect-doctor" style={{ background: "linear-gradient(135deg,#805ad5,#6b46c1)" }} onClick={() => setModal({ type: "call", callType: "video", doctor: doc })}>📹</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// ─── Modal Renderer ───────────────────────────────────────────────────────────
function ModalRenderer({ modal, setModal, t }) {
  const [chatInput, setChatInput] = useState("");
  const [chatMsgs, setChatMsgs] = useState([
    { from: "doctor", text: `Hello! This is ${modal.doctor?.name}. How can I help you today?` }
  ]);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMsgs(prev => [...prev, { from: "user", text: chatInput }]);
    const reply = chatInput;
    setChatInput("");
    setTimeout(() => {
      setChatMsgs(prev => [...prev, { from: "doctor", text: `Thank you for sharing that. Based on what you've described, I'd recommend you come in for a proper examination. Please take rest and stay hydrated in the meantime.` }]);
    }, 1200);
  };

  if (modal.type === "call") {
    return (
      <div className="modal-overlay" onClick={() => setModal(null)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="call-animation">{modal.callType === "video" ? "📹" : "📞"}</div>
          <div className="call-modal-name">{modal.doctor?.name}</div>
          <div className="call-modal-status">{modal.callType === "video" ? "Video" : "Audio"} Call • Connecting...</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-light)", margin: "0 0 24px", background: "#f9fdf9", padding: "12px", borderRadius: 10 }}>
            🔒 End-to-end encrypted • Real-time {modal.callType} call
          </div>
          <div className="modal-btns">
            {modal.callType === "video" && <button className="btn-secondary" onClick={() => {}}>🎤 Mute</button>}
            <button className="btn-end-call" onClick={() => setModal(null)}>📵 End Call</button>
          </div>
        </div>
      </div>
    );
  }

  if (modal.type === "chat") {
    return (
      <div className="modal-overlay" onClick={() => setModal(null)}>
        <div className="modal" style={{ maxWidth: 500, padding: 0, overflow: "hidden", textAlign: "left" }} onClick={e => e.stopPropagation()}>
          <div className="chat-header" style={{ borderRadius: "20px 20px 0 0" }}>
            <div className="chat-header-avatar">{modal.doctor?.avatar || "👨‍⚕️"}</div>
            <div>
              <div className="chat-header-name">{modal.doctor?.name}</div>
              <div className="chat-header-status"><span className="status-dot"></span> Online</div>
            </div>
            <button onClick={() => setModal(null)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#fff", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ height: 280, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10, background: "#f0faf5" }}>
            {chatMsgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.from === "user" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                <div style={{ background: m.from === "user" ? "var(--emerald)" : "#fff", color: m.from === "user" ? "#fff" : "var(--text-dark)", padding: "8px 14px", borderRadius: 16, fontSize: "0.85rem", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input-area" style={{ borderRadius: "0 0 20px 20px" }}>
            <input
              className="chat-input"
              style={{ borderRadius: 10 }}
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendChat()}
              placeholder={t.typeMsg}
            />
            <button className="btn-send" onClick={sendChat}>➤</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
