import { useState, useRef, useEffect, useCallback } from "react";

// ─── Translations ───────────────────────────────────────────────────────────
const T = {
  en: {
    appName: "हाम्रो-CARE", tagline: "Your Health, Our Priority", selectLang: "Select Language",
    iAmPatient: "I am a Patient", iAmDoctor: "I am a Doctor",
    patientLogin: "Patient Login", patientRegister: "Patient Registration",
    doctorLogin: "Doctor Login", doctorRegister: "Doctor Registration",
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
    emergencyContacts: "Emergency Contacts", generateReport: "Generate Medical Report",
    reportSent: "Report sent to available doctors!", chatWith: "Chat with",
    videoCall: "Video Call", audioCall: "Audio Call", chat: "Chat",
    communityFeed: "Community Posts", postUpdate: "Post an Update",
    typePost: "Share medical insights...", post: "Post",
    healthPosts: "Health Posts", hospitals: "Hospitals", pharmacy: "Pharmacy",
    welcome: "Welcome", yearOld: "years old",
    disclaimer: "⚠️ AI suggestions are not a substitute for professional medical advice.",
    loading: "Analyzing your symptoms...", reportTitle: "AI Medical Report",
    sentToDoc: "This report has been sent to available doctors.",
    callAmbulance: "Calling ambulance... Emergency services alerted!",
    registrationSuccess: "Registration successful! Please login.",
    invalidCredentials: "Invalid phone number or password.",
    passwordMismatch: "Passwords do not match.", required: "Please fill all required fields.",
    licenseVerified: "✅ License Verified", verifying: "Verifying license...",
    nearby: "Nearby Medical Facilities", km: "km away", open24: "Open 24/7",
    appointments: "Appointments", bookAppt: "Book Appointment",
    selectDoctor: "Select Doctor", chooseDate: "Choose Date", chooseTime: "Choose Time",
    notes: "Notes (Optional)", upcomingAppts: "Upcoming Appointments",
    apptBooked: "Appointment booked successfully!", noAppts: "No appointments yet.",
    healthTips: "Health Tips", statsTitle: "My Health Overview",
    aiConversations: "AI Conversations", reportsGenerated: "Reports Generated",
    connectedDoctors: "Connected Doctors", healthScore: "Health Score",
  },
  ne: {
    appName: "हाम्रो-CARE", tagline: "तपाईंको स्वास्थ्य, हाम्रो प्राथमिकता", selectLang: "भाषा छान्नुहोस्",
    iAmPatient: "म बिरामी हुँ", iAmDoctor: "म डाक्टर हुँ",
    patientLogin: "बिरामी लगइन", patientRegister: "बिरामी दर्ता",
    doctorLogin: "डाक्टर लगइन", doctorRegister: "डाक्टर दर्ता",
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
    emergencyContacts: "आपतकालीन सम्पर्क", generateReport: "मेडिकल रिपोर्ट बनाउनुहोस्",
    reportSent: "रिपोर्ट डाक्टरहरूलाई पठाइयो!", chatWith: "सँग च्याट",
    videoCall: "भिडियो कल", audioCall: "अडियो कल", chat: "च्याट",
    communityFeed: "सामुदायिक पोस्टहरू", postUpdate: "अपडेट पोस्ट गर्नुहोस्",
    typePost: "चिकित्सा अन्तर्दृष्टि साझा गर्नुहोस्...", post: "पोस्ट",
    healthPosts: "स्वास्थ्य चौकी", hospitals: "अस्पताल", pharmacy: "फार्मेसी",
    welcome: "स्वागत छ", yearOld: "वर्षको",
    disclaimer: "⚠️ AI सुझावहरू पेशेवर चिकित्सा सल्लाहको विकल्प होइनन्।",
    loading: "लक्षणहरू विश्लेषण गर्दै...", reportTitle: "AI मेडिकल रिपोर्ट",
    sentToDoc: "यो रिपोर्ट उपलब्ध डाक्टरहरूलाई पठाइएको छ।",
    callAmbulance: "एम्बुलेन्स बोलाउँदै... आपतकालीन सेवाहरू सतर्क!",
    registrationSuccess: "दर्ता सफल! कृपया लगइन गर्नुहोस्।",
    invalidCredentials: "अमान्य फोन नम्बर वा पासवर्ड।",
    passwordMismatch: "पासवर्डहरू मेल खाँदैनन्।", required: "कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्।",
    licenseVerified: "✅ लाइसेन्स प्रमाणित", verifying: "लाइसेन्स प्रमाणित गर्दै...",
    nearby: "नजिकका चिकित्सा सुविधाहरू", km: "किमी टाढा", open24: "२४/७ खुला",
    appointments: "अपोइन्टमेन्ट", bookAppt: "अपोइन्टमेन्ट बुक गर्नुहोस्",
    selectDoctor: "डाक्टर छान्नुहोस्", chooseDate: "मिति छान्नुहोस्", chooseTime: "समय छान्नुहोस्",
    notes: "टिप्पणी (वैकल्पिक)", upcomingAppts: "आगामी अपोइन्टमेन्टहरू",
    apptBooked: "अपोइन्टमेन्ट सफलतापूर्वक बुक भयो!", noAppts: "अहिलेसम्म कुनै अपोइन्टमेन्ट छैन।",
    healthTips: "स्वास्थ्य सुझावहरू", statsTitle: "मेरो स्वास्थ्य अवलोकन",
    aiConversations: "AI कुराकानी", reportsGenerated: "रिपोर्टहरू",
    connectedDoctors: "जडान भएका डाक्टर", healthScore: "स्वास्थ्य स्कोर",
  },
  ma: {
    appName: "हाम्रो-CARE", tagline: "अहाँक स्वास्थ्य, हमर प्राथमिकता", selectLang: "भाषा चुनू",
    iAmPatient: "हम रोगी छी", iAmDoctor: "हम डॉक्टर छी",
    patientLogin: "रोगी लॉगिन", patientRegister: "रोगी पंजीकरण",
    doctorLogin: "डॉक्टर लॉगिन", doctorRegister: "डॉक्टर पंजीकरण",
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
    emergencyContacts: "आपातकालीन संपर्क", generateReport: "मेडिकल रिपोर्ट बनाउ",
    reportSent: "रिपोर्ट डॉक्टर लोकनिकेँ पठाओल गेल!", chatWith: "संग चैट",
    videoCall: "वीडियो कॉल", audioCall: "ऑडियो कॉल", chat: "चैट",
    communityFeed: "सामुदायिक पोस्ट", postUpdate: "अपडेट पोस्ट करू",
    typePost: "चिकित्सा जानकारी साझा करू...", post: "पोस्ट",
    healthPosts: "स्वास्थ्य चौकी", hospitals: "अस्पताल", pharmacy: "फार्मेसी",
    welcome: "स्वागत", yearOld: "साल",
    disclaimer: "⚠️ AI सुझाव पेशेवर चिकित्सा सलाहक विकल्प नहि थिक।",
    loading: "लक्षण विश्लेषण करैत...", reportTitle: "AI मेडिकल रिपोर्ट",
    sentToDoc: "ई रिपोर्ट उपलब्ध डॉक्टर लोकनि केँ पठाओल गेल।",
    callAmbulance: "एम्बुलेंस बजाइत अछि... आपातकालीन सेवा सतर्क!",
    registrationSuccess: "पंजीकरण सफल! कृपया लॉगिन करू।",
    invalidCredentials: "अमान्य फोन नंबर वा पासवर्ड।",
    passwordMismatch: "पासवर्ड मेल नहि खाइत।", required: "कृपया सबटा आवश्यक फील्ड भरू।",
    licenseVerified: "✅ लाइसेंस सत्यापित", verifying: "लाइसेंस सत्यापित करैत...",
    nearby: "नजदीकी चिकित्सा सुविधा", km: "किमी दूर", open24: "२४/७ खुला",
    appointments: "अपॉइंटमेंट", bookAppt: "अपॉइंटमेंट बुक करू",
    selectDoctor: "डॉक्टर चुनू", chooseDate: "तिथि चुनू", chooseTime: "समय चुनू",
    notes: "टिप्पणी (वैकल्पिक)", upcomingAppts: "आगामी अपॉइंटमेंट",
    apptBooked: "अपॉइंटमेंट सफलतापूर्वक बुक भेल!", noAppts: "अखन धरि कोनो अपॉइंटमेंट नहि।",
    healthTips: "स्वास्थ्य सुझाव", statsTitle: "हमर स्वास्थ्य अवलोकन",
    aiConversations: "AI वार्तालाप", reportsGenerated: "रिपोर्ट",
    connectedDoctors: "जुड़ल डॉक्टर", healthScore: "स्वास्थ्य स्कोर",
  },
  bh: {
    appName: "हाम्रो-CARE", tagline: "रउआ के स्वास्थ्य, हमार प्राथमिकता", selectLang: "भाषा चुनीं",
    iAmPatient: "हम मरीज बानी", iAmDoctor: "हम डॉक्टर बानी",
    patientLogin: "मरीज लॉगिन", patientRegister: "मरीज पंजीकरण",
    doctorLogin: "डॉक्टर लॉगिन", doctorRegister: "डॉक्टर पंजीकरण",
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
    emergencyContacts: "आपातकालीन संपर्क", generateReport: "मेडिकल रिपोर्ट बनाईं",
    reportSent: "रिपोर्ट डॉक्टरन के भेजाइल!", chatWith: "से चैट",
    videoCall: "वीडियो कॉल", audioCall: "ऑडियो कॉल", chat: "चैट",
    communityFeed: "सामुदायिक पोस्ट", postUpdate: "अपडेट पोस्ट करीं",
    typePost: "चिकित्सा जानकारी साझा करीं...", post: "पोस्ट",
    healthPosts: "स्वास्थ्य चौकी", hospitals: "अस्पताल", pharmacy: "फार्मेसी",
    welcome: "स्वागत बा", yearOld: "साल के",
    disclaimer: "⚠️ AI सुझाव पेशेवर चिकित्सा सलाह के विकल्प नइखे।",
    loading: "लच्छन विश्लेषण होत बा...", reportTitle: "AI मेडिकल रिपोर्ट",
    sentToDoc: "ई रिपोर्ट उपलब्ध डॉक्टरन के भेजाइल गइल बा।",
    callAmbulance: "एम्बुलेंस बुलात बानी... आपातकालीन सेवा सचेत!",
    registrationSuccess: "पंजीकरण सफल! कृपया लॉगिन करीं।",
    invalidCredentials: "गलत फोन नंबर या पासवर्ड।",
    passwordMismatch: "पासवर्ड मेल नइखे।", required: "कृपया सब जरूरी खाना भरीं।",
    licenseVerified: "✅ लाइसेंस सत्यापित", verifying: "लाइसेंस सत्यापित होत बा...",
    nearby: "नजदीकी चिकित्सा सुविधा", km: "किमी दूर", open24: "२४/७ खुला",
    appointments: "अपॉइंटमेंट", bookAppt: "अपॉइंटमेंट बुकाईं",
    selectDoctor: "डॉक्टर चुनीं", chooseDate: "तारीख चुनीं", chooseTime: "समय चुनीं",
    notes: "नोट (वैकल्पिक)", upcomingAppts: "आगे के अपॉइंटमेंट",
    apptBooked: "अपॉइंटमेंट बुक हो गइल!", noAppts: "अभी कवनो अपॉइंटमेंट नइखे।",
    healthTips: "स्वास्थ्य टिप्स", statsTitle: "हमार स्वास्थ्य सारांश",
    aiConversations: "AI बातचीत", reportsGenerated: "रिपोर्ट",
    connectedDoctors: "जुड़ल डॉक्टर", healthScore: "स्वास्थ्य स्कोर",
  },
};

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

const communityPostsData = [
  { id: 1, author: "Dr. Sushila Sharma", avatar: "👩‍⚕️", time: "2h ago", content: "Reminder: Dengue cases are rising in Kathmandu valley. Please advise patients to use mosquito nets and eliminate stagnant water. Early symptoms include high fever, joint pain, and rash.", likes: 24, comments: 8 },
  { id: 2, author: "Dr. Rajesh Adhikari", avatar: "👨‍⚕️", time: "5h ago", content: "New study shows that meditation combined with standard hypertension treatment reduces BP by additional 5-7 mmHg in Nepali patients. Worth discussing with patients.", likes: 31, comments: 12 },
  { id: 3, author: "Dr. Priya Joshi", avatar: "👩‍⚕️", time: "1d ago", content: "Winter respiratory infections peaking. Seeing many children with RSV. Ensure parents know danger signs: rapid breathing, chest in-drawing, poor feeding.", likes: 45, comments: 19 },
];

const healthTipsData = [
  { icon: "💧", tip: "Drink 8–10 glasses of water daily. At altitude in Nepal, dehydration happens faster — carry a water bottle everywhere.", category: "Hydration" },
  { icon: "🦟", tip: "Dengue & Malaria peak June–September. Use mosquito repellent, wear full sleeves, and eliminate stagnant water around your home.", category: "Seasonal" },
  { icon: "🏔️", tip: "Altitude sickness above 2,500m: ascend slowly, rest for 2 days after every 1,000m gain, and descend immediately if symptoms worsen.", category: "Altitude" },
  { icon: "🥗", tip: "Eat seasonal fruits like Amlaa (gooseberry) rich in Vitamin C to boost immunity during monsoon season.", category: "Nutrition" },
  { icon: "🫁", tip: "Air quality in Kathmandu valley is poor during dry season. Wear N95 masks outdoors, especially near Ratnapark and Ring Road.", category: "Air Quality" },
  { icon: "🧼", tip: "Typhoid and cholera are endemic. Always wash hands before eating, drink filtered/boiled water, and avoid raw street food.", category: "Sanitation" },
  { icon: "☀️", tip: "Apply SPF 30+ sunscreen daily. UV radiation is 25% stronger in Nepal's hills due to thinner atmosphere.", category: "Skin" },
  { icon: "🧘", tip: "Practice 20 minutes of pranayama daily. Breathing exercises help with both altitude adjustment and mental health.", category: "Wellness" },
  { icon: "🩺", tip: "Get your annual health checkup at a government hospital — CBC, blood sugar, and BP screening is free for those above 40.", category: "Preventive" },
  { icon: "🌿", tip: "Tulsi (Holy Basil) tea with ginger helps soothe respiratory infections common during monsoon. A traditional Nepali remedy.", category: "Ayurveda" },
];

const tickerTips = [
  "💧 Stay hydrated — drink 8+ glasses of water daily",
  "🦟 Use mosquito nets during monsoon season",
  "🏔️ Acclimatize slowly above 2,500m altitude",
  "🧼 Wash hands frequently to prevent typhoid",
  "🥗 Eat local fruits rich in Vitamin C",
  "🫁 Wear masks on high-pollution days in KTM valley",
  "☀️ UV rays are stronger at high altitude — use sunscreen",
  "🩺 Get annual health checkups at government hospitals",
  "🌿 Tulsi + ginger tea helps fight monsoon colds",
  "🧘 10 minutes of deep breathing improves lung health",
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --em: #0d5c4a; --em-l: #10735c; --em-d: #083d31;
    --sf: #e8890c; --sf-l: #f5a623;
    --cream: #edf7f3; --warm: #fffdf8;
    --td: #1a2a24; --tm: #3d5a4f; --tl: #6b8a7f;
    --card: rgba(255,253,248,0.97);
    --glass: rgba(13,92,74,0.06);
    --sh: 0 8px 32px rgba(13,92,74,.10);
    --sh-lg: 0 16px 48px rgba(13,92,74,.16);
    --r: 18px; --r-sm: 12px;
  }

  body { font-family: 'Noto Sans Devanagari', sans-serif; background: var(--cream); color: var(--td); }

  .app { min-height: 100vh; background: linear-gradient(135deg,#d8f0e8 0%,#fffdf8 40%,#d8f0e8 100%); }

  /* HEADER */
  .hdr {
    background: linear-gradient(135deg,var(--em-d),var(--em));
    height: 60px; padding: 0 16px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 4px 20px rgba(13,92,74,.3);
    gap: 10px;
  }
  .hdr-logo { display:flex; align-items:center; gap:8px; cursor:pointer; text-decoration:none; }
  .hdr-logo-txt { font-family:'Sora',sans-serif; font-size:1rem; font-weight:800; color:#fff; }
  .hdr-logo-txt span { color:var(--sf-l); }
  .hdr-logo-sub { font-size:0.55rem; color:rgba(255,255,255,.6); letter-spacing:1px; text-transform:uppercase; }
  .lang-sel { display:flex; gap:2px; background:rgba(255,255,255,.1); padding:3px; border-radius:100px; }
  .lang-btn { background:transparent; border:none; color:rgba(255,255,255,.7); padding:3px 8px; border-radius:100px; cursor:pointer; font-size:0.68rem; font-weight:600; transition:all .2s; font-family:'Noto Sans Devanagari',sans-serif; }
  .lang-btn.active, .lang-btn:hover { background:var(--sf); color:#fff; }
  .hdr-acts { display:flex; align-items:center; gap:7px; }
  .dark-btn { background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.2); color:#fff; width:34px; height:34px; border-radius:50%; cursor:pointer; font-size:.9rem; display:flex; align-items:center; justify-content:center; transition:all .25s; }
  .dark-btn:hover { background:rgba(255,255,255,.22); }
  .logout-btn { background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.25); color:#fff; padding:5px 12px; border-radius:100px; cursor:pointer; font-size:.75rem; font-family:'Noto Sans Devanagari',sans-serif; transition:all .2s; }
  .logout-btn:hover { background:rgba(255,255,255,.25); }

  /* DARK MODE */
  .app[data-dark="true"] { background: linear-gradient(135deg,#0a1510,#0f1a16,#0a1510); }
  .app[data-dark="true"] .auth-card,
  .app[data-dark="true"] .info-card,
  .app[data-dark="true"] .role-card,
  .app[data-dark="true"] .chatbox,
  .app[data-dark="true"] .fac-card,
  .app[data-dark="true"] .doc-card,
  .app[data-dark="true"] .rec-card,
  .app[data-dark="true"] .post-card,
  .app[data-dark="true"] .stat-card,
  .app[data-dark="true"] .tip-sl,
  .app[data-dark="true"] .appt-card,
  .app[data-dark="true"] .appt-form { background: rgba(18,32,26,.97); border-color:rgba(255,255,255,.06); color:#e8f5f0; }
  .app[data-dark="true"] .sidebar { background:linear-gradient(180deg,#061009,#0a1a12); }
  .app[data-dark="true"] .fi, .app[data-dark="true"] .fs, .app[data-dark="true"] .fta, .app[data-dark="true"] .ci { background:rgba(255,255,255,.05); border-color:rgba(255,255,255,.1); color:#e8f5f0; }
  .app[data-dark="true"] .chat-msgs { background:linear-gradient(180deg,#0a1a12,#0f1a16); }
  .app[data-dark="true"] .chat-inp-area, .app[data-dark="true"] .chat-acts { background:#111d18; border-color:rgba(255,255,255,.06); }
  .app[data-dark="true"] .ai-bub { background:#1a2e22; color:#e8f5f0; }
  .app[data-dark="true"] .modal-box { background:#111d18; }
  .app[data-dark="true"] .bnav { background:rgba(10,20,15,.98); border-color:rgba(255,255,255,.08); }
  .app[data-dark="true"] .stats-row { background:rgba(18,32,26,.6); }
  .app[data-dark="true"] .feat-card { background:rgba(18,32,26,.8); }
  .app[data-dark="true"] .ticker { background:linear-gradient(90deg,#041008,#0a1a12); }
  .app[data-dark="true"] .info-label { color:#6a9080; }
  .app[data-dark="true"] .info-value { color:#e8f5f0; }
  .app[data-dark="true"] .sec-title { color:#a8ffdc; }
  .app[data-dark="true"] .auth-sw { background:linear-gradient(135deg,#041008,#0a1a12); }

  /* LANDING */
  .landing { display:flex; flex-direction:column; align-items:center; min-height:calc(100vh - 60px); padding:0 20px 80px; }
  .hero { text-align:center; padding:50px 0 32px; animation:fadeUp .7s ease both; }
  .badge { display:inline-block; background:linear-gradient(135deg,var(--sf),var(--sf-l)); color:#fff; padding:5px 18px; border-radius:100px; font-size:.72rem; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; margin-bottom:18px; box-shadow:0 4px 12px rgba(232,137,12,.35); }
  .big-title { font-family:'Sora',sans-serif; font-size:clamp(2.4rem,7vw,4.5rem); font-weight:800; color:var(--em-d); line-height:1.05; margin-bottom:12px; }
  .big-title span { color:var(--sf); }
  .tagline { font-size:1rem; color:var(--tm); margin-bottom:6px; }
  .subtitle { font-size:.78rem; color:var(--tl); }

  .stats-row { display:flex; gap:16px; flex-wrap:wrap; justify-content:center; padding:22px 28px; background:rgba(255,255,255,.55); backdrop-filter:blur(12px); border-radius:var(--r); border:1px solid rgba(13,92,74,.1); margin-bottom:40px; animation:fadeUp .7s .15s ease both; box-shadow:var(--sh); }
  .stat-it { text-align:center; padding:0 16px; }
  .stat-num { font-family:'Sora',sans-serif; font-size:2rem; font-weight:800; color:var(--em-d); line-height:1; margin-bottom:3px; }
  .stat-num span { color:var(--sf); }
  .stat-lbl { font-size:.73rem; color:var(--tl); font-weight:500; }
  .stat-div { width:1px; background:rgba(13,92,74,.12); align-self:stretch; }

  .role-cards { display:flex; gap:20px; flex-wrap:wrap; justify-content:center; animation:fadeUp .7s .25s ease both; margin-bottom:50px; }
  .role-card { background:var(--card); border-radius:var(--r); padding:38px 34px; width:250px; cursor:pointer; transition:all .35s cubic-bezier(.34,1.56,.64,1); box-shadow:var(--sh); border:2px solid transparent; position:relative; overflow:hidden; }
  .role-card::before { content:''; position:absolute; top:0;left:0;right:0; height:3px; background:linear-gradient(90deg,var(--em),var(--sf)); transform:scaleX(0); transform-origin:left; transition:transform .35s; }
  .role-card:hover { transform:translateY(-10px) scale(1.02); box-shadow:var(--sh-lg); border-color:rgba(13,92,74,.2); }
  .role-card:hover::before { transform:scaleX(1); }
  .role-icon { font-size:3rem; display:block; margin-bottom:12px; animation:float 3s ease-in-out infinite; }
  .role-card:last-child .role-icon { animation-delay:-1.5s; }
  .role-title { font-family:'Sora',sans-serif; font-size:1.1rem; font-weight:700; color:var(--em-d); margin-bottom:7px; }
  .role-desc { font-size:.78rem; color:var(--tl); line-height:1.6; }

  .feats-sec { width:100%; max-width:860px; margin-bottom:50px; animation:fadeUp .7s .35s ease both; }
  .feats-title { font-family:'Sora',sans-serif; font-size:1.2rem; font-weight:700; color:var(--em-d); text-align:center; margin-bottom:20px; }
  .feats-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:14px; }
  .feat-card { background:rgba(255,255,255,.7); backdrop-filter:blur(8px); border-radius:var(--r); padding:22px 18px; border:1px solid rgba(13,92,74,.08); transition:all .3s; text-align:center; box-shadow:0 4px 16px rgba(13,92,74,.06); }
  .feat-card:hover { transform:translateY(-4px); box-shadow:var(--sh); }
  .feat-icon { font-size:2rem; margin-bottom:8px; }
  .feat-name { font-family:'Sora',sans-serif; font-size:.85rem; font-weight:700; color:var(--em-d); margin-bottom:5px; }
  .feat-desc { font-size:.72rem; color:var(--tl); line-height:1.5; }

  /* TICKER */
  .ticker { position:fixed; bottom:0;left:0;right:0; background:linear-gradient(90deg,var(--em-d),var(--em)); height:38px; display:flex; align-items:center; overflow:hidden; z-index:50; }
  .tick-lbl { background:var(--sf); color:#fff; padding:0 12px; height:100%; display:flex; align-items:center; font-size:.68rem; font-weight:700; letter-spacing:1px; text-transform:uppercase; flex-shrink:0; white-space:nowrap; }
  .tick-track { display:flex; animation:ticker 40s linear infinite; white-space:nowrap; }
  .tick-item { color:rgba(255,255,255,.9); font-size:.75rem; padding:0 28px; flex-shrink:0; }

  /* AUTH */
  .auth-wrap { max-width:580px; margin:0 auto; padding:36px 20px 100px; animation:fadeUp .45s ease both; }
  .auth-card { background:var(--card); border-radius:var(--r); padding:32px; box-shadow:var(--sh-lg); border:1px solid rgba(13,92,74,.07); }
  .auth-hdr { text-align:center; margin-bottom:24px; }
  .auth-icon { font-size:2.2rem; margin-bottom:8px; }
  .auth-title { font-family:'Sora',sans-serif; font-size:1.6rem; font-weight:700; color:var(--em-d); }
  .auth-sw { background:linear-gradient(135deg,var(--em-d),var(--em)); border-radius:var(--r-sm); padding:12px 16px; margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; color:rgba(255,255,255,.85); font-size:.82rem; gap:10px; }
  .auth-sw button { background:var(--sf); border:none; color:#fff; padding:5px 14px; border-radius:100px; cursor:pointer; font-size:.76rem; font-weight:600; font-family:'Noto Sans Devanagari',sans-serif; transition:all .2s; flex-shrink:0; }
  .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .form-grid .full { grid-column:1/-1; }
  .form-grp { display:flex; flex-direction:column; gap:4px; }
  .form-lbl { font-size:.7rem; font-weight:600; color:var(--tm); text-transform:uppercase; letter-spacing:.5px; }
  .fi, .fs, .fta { background:var(--glass); border:1.5px solid rgba(13,92,74,.12); border-radius:var(--r-sm); padding:9px 12px; font-size:.88rem; color:var(--td); font-family:'Noto Sans Devanagari',sans-serif; transition:all .2s; outline:none; width:100%; }
  .fi:focus, .fs:focus, .fta:focus { border-color:var(--em); box-shadow:0 0 0 3px rgba(13,92,74,.07); }
  .fta { resize:vertical; min-height:75px; }
  .file-wrap { background:var(--glass); border:1.5px dashed rgba(13,92,74,.25); border-radius:var(--r-sm); padding:12px; text-align:center; cursor:pointer; font-size:.78rem; color:var(--tl); }
  .btn-p { background:linear-gradient(135deg,var(--em),var(--em-l)); color:#fff; border:none; border-radius:var(--r-sm); padding:11px 22px; font-size:.9rem; font-weight:600; font-family:'Noto Sans Devanagari',sans-serif; cursor:pointer; transition:all .25s; width:100%; margin-top:4px; box-shadow:0 4px 12px rgba(13,92,74,.22); }
  .btn-p:hover { background:linear-gradient(135deg,var(--em-d),var(--em)); transform:translateY(-1px); }
  .btn-s { background:rgba(13,92,74,.07); color:var(--em); border:1.5px solid rgba(13,92,74,.18); border-radius:var(--r-sm); padding:8px 16px; font-size:.82rem; font-weight:600; font-family:'Noto Sans Devanagari',sans-serif; cursor:pointer; transition:all .2s; }
  .btn-s:hover { background:rgba(13,92,74,.14); }
  .alert { padding:9px 12px; border-radius:var(--r-sm); font-size:.8rem; margin-bottom:12px; }
  .alert-err { background:#fff0f0; color:#c53030; border-left:3px solid #c53030; }
  .alert-ok { background:#f0fff4; color:#276749; border-left:3px solid #276749; }
  .alert-inf { background:#fffcf0; color:#b45309; border-left:3px solid #e8890c; }

  /* DASHBOARD */
  .dash { display:flex; min-height:calc(100vh - 60px); }
  .sidebar { width:220px; background:linear-gradient(180deg,var(--em-d),var(--em)); padding:18px 12px; display:flex; flex-direction:column; gap:2px; flex-shrink:0; position:sticky; top:60px; height:calc(100vh - 60px); overflow-y:auto; }
  .sb-user { text-align:center; padding:16px 8px; margin-bottom:4px; border-bottom:1px solid rgba(255,255,255,.1); }
  .sb-av { width:56px;height:56px; background:rgba(255,255,255,.14); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.8rem; margin:0 auto 8px; border:2px solid rgba(255,255,255,.22); }
  .sb-name { color:#fff; font-weight:600; font-size:.82rem; margin-bottom:2px; }
  .sb-role { color:var(--sf-l); font-size:.65rem; text-transform:uppercase; letter-spacing:1px; }
  .nav-it { display:flex; align-items:center; gap:8px; padding:8px 12px; border-radius:var(--r-sm); cursor:pointer; transition:all .2s; color:rgba(255,255,255,.68); font-size:.8rem; font-weight:500; border:none; background:transparent; width:100%; text-align:left; font-family:'Noto Sans Devanagari',sans-serif; }
  .nav-it:hover { background:rgba(255,255,255,.1); color:#fff; }
  .nav-it.active { background:rgba(255,255,255,.14); color:#fff; box-shadow:inset 3px 0 0 var(--sf); }
  .main { flex:1; padding:24px; overflow-y:auto; animation:fadeUp .4s ease both; padding-bottom:55px; }

  .sec-title { font-family:'Sora',sans-serif; font-size:1.4rem; font-weight:700; color:var(--em-d); margin-bottom:20px; display:flex; align-items:center; gap:8px; }

  /* STATS CARDS */
  .pt-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:22px; }
  .stat-card { border-radius:var(--r); padding:18px; display:flex; flex-direction:column; gap:5px; position:relative; overflow:hidden; box-shadow:var(--sh); transition:transform .25s,box-shadow .25s; cursor:default; animation:fadeUp .4s ease both; }
  .stat-card:hover { transform:translateY(-3px); box-shadow:var(--sh-lg); }
  .stat-card:nth-child(1) { background:linear-gradient(135deg,#0d5c4a,#10735c); }
  .stat-card:nth-child(2) { background:linear-gradient(135deg,#1a5276,#2980b9); }
  .stat-card:nth-child(3) { background:linear-gradient(135deg,#6c3483,#8e44ad); }
  .stat-card:nth-child(4) { background:linear-gradient(135deg,#b7770d,#e8890c); }
  .stat-card::before { content:''; position:absolute; right:-18px;top:-18px; width:72px;height:72px; border-radius:50%; background:rgba(255,255,255,.08); }
  .sc-icon { font-size:1.5rem; }
  .sc-val { font-family:'Sora',sans-serif; font-size:1.9rem; font-weight:800; color:#fff; line-height:1; }
  .sc-lbl { font-size:.7rem; color:rgba(255,255,255,.8); font-weight:500; text-transform:uppercase; letter-spacing:.5px; }

  /* INFO CARDS */
  .info-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:12px; margin-bottom:18px; }
  .info-card { background:var(--card); border-radius:var(--r); padding:16px; box-shadow:var(--sh); border:1px solid rgba(13,92,74,.06); transition:transform .2s; }
  .info-card:hover { transform:translateY(-2px); }
  .info-label { font-size:.67rem; text-transform:uppercase; letter-spacing:1px; color:var(--tl); font-weight:600; margin-bottom:4px; }
  .info-value { font-size:.95rem; font-weight:600; color:var(--td); }
  .blood-bdg { display:inline-block; background:linear-gradient(135deg,#e53e3e,#c53030); color:#fff; padding:2px 11px; border-radius:100px; font-size:.85rem; font-weight:700; }

  /* TIPS CAROUSEL */
  .tip-sl { background:var(--card); border-radius:var(--r); padding:26px 28px; box-shadow:var(--sh); border:1px solid rgba(13,92,74,.07); display:flex; align-items:flex-start; gap:18px; min-height:130px; animation:fadeUp .4s ease both; }
  .tip-big-icon { font-size:2.8rem; flex-shrink:0; }
  .tip-cat { display:inline-block; background:linear-gradient(135deg,var(--em),var(--em-l)); color:#fff; padding:2px 9px; border-radius:100px; font-size:.65rem; font-weight:700; letter-spacing:.8px; text-transform:uppercase; margin-bottom:7px; }
  .tip-txt { font-size:.88rem; color:var(--tm); line-height:1.65; }
  .tips-nav { display:flex; justify-content:center; gap:7px; margin-top:12px; align-items:center; }
  .tdot { width:7px;height:7px; border-radius:50%; background:rgba(13,92,74,.2); cursor:pointer; transition:all .25s; border:none; }
  .tdot.active { background:var(--em); width:22px; border-radius:4px; }
  .tnav-btn { background:rgba(13,92,74,.08); border:1.5px solid rgba(13,92,74,.15); color:var(--em); width:30px;height:30px; border-radius:50%; cursor:pointer; font-size:.82rem; display:flex; align-items:center; justify-content:center; transition:all .2s; }
  .tnav-btn:hover { background:var(--em); color:#fff; }

  /* CHATBOT */
  .chatbox { background:var(--card); border-radius:var(--r); box-shadow:var(--sh); overflow:hidden; height:calc(100vh - 210px); min-height:480px; display:flex; flex-direction:column; border:1px solid rgba(13,92,74,.07); }
  .ch-hdr { background:linear-gradient(135deg,var(--em-d),var(--em)); padding:12px 16px; display:flex; align-items:center; gap:10px; }
  .ch-av { width:36px;height:36px; background:rgba(255,255,255,.14); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.1rem; }
  .ch-name { color:#fff; font-weight:600; font-size:.88rem; }
  .ch-status { color:rgba(255,255,255,.7); font-size:.68rem; display:flex; align-items:center; gap:3px; }
  .sdot { width:6px;height:6px; background:#48bb78; border-radius:50%; animation:pulse 2s infinite; }
  .chat-msgs { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px; background:linear-gradient(180deg,#edf7f3,#fffdf8); }
  .msg { max-width:76%; }
  .msg-u { align-self:flex-end; }
  .msg-a { align-self:flex-start; }
  .u-bub { padding:8px 12px; border-radius:16px; font-size:.83rem; line-height:1.55; white-space:pre-wrap; background:linear-gradient(135deg,var(--em),var(--em-l)); color:#fff; border-bottom-right-radius:4px; }
  .ai-bub { padding:8px 12px; border-radius:16px; font-size:.83rem; line-height:1.55; white-space:pre-wrap; background:#fff; color:var(--td); border-bottom-left-radius:4px; box-shadow:0 2px 8px rgba(0,0,0,.06); }
  .msg-time { font-size:.63rem; color:var(--tl); margin-top:2px; text-align:right; }
  .msg-a .msg-time { text-align:left; }
  .chat-inp-area { padding:12px; background:#fff; border-top:1px solid rgba(13,92,74,.07); display:flex; gap:8px; align-items:flex-end; }
  .ci { flex:1; border:1.5px solid rgba(13,92,74,.18); border-radius:14px; padding:8px 12px; font-size:.83rem; font-family:'Noto Sans Devanagari',sans-serif; resize:none; outline:none; max-height:90px; color:var(--td); transition:border-color .2s; background:transparent; }
  .ci:focus { border-color:var(--em); }
  .send-btn { background:linear-gradient(135deg,var(--em),var(--em-l)); border:none; color:#fff; width:38px;height:38px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:.9rem; transition:all .2s; flex-shrink:0; box-shadow:0 2px 8px rgba(13,92,74,.28); }
  .send-btn:hover { transform:scale(1.09); }
  .send-btn:disabled { opacity:.5; cursor:not-allowed; }
  .chat-acts { padding:10px 12px; background:#f9fdf9; border-top:1px solid rgba(13,92,74,.05); display:flex; gap:6px; flex-wrap:wrap; }
  .ca-btn { background:rgba(13,92,74,.06); border:1px solid rgba(13,92,74,.14); color:var(--em); padding:4px 12px; border-radius:100px; font-size:.72rem; font-weight:600; cursor:pointer; transition:all .2s; font-family:'Noto Sans Devanagari',sans-serif; }
  .ca-btn:hover { background:var(--em); color:#fff; }
  .amb-btn { background:linear-gradient(135deg,#e53e3e,#c53030); color:#fff; border:none; padding:5px 14px; border-radius:100px; font-size:.74rem; font-weight:700; cursor:pointer; transition:all .2s; font-family:'Noto Sans Devanagari',sans-serif; animation:pulse 2s infinite; box-shadow:0 2px 8px rgba(229,62,62,.38); }
  .amb-btn:hover { background:#9b2c2c; animation:none; }

  /* FACILITIES */
  .fac-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:12px; }
  .fac-card { background:var(--card); border-radius:var(--r); padding:16px; box-shadow:var(--sh); border:1px solid rgba(13,92,74,.06); border-left-width:4px; transition:all .25s; animation:fadeUp .4s ease both; }
  .fac-card:hover { transform:translateY(-3px); box-shadow:var(--sh-lg); }
  .fac-card.hospital { border-left-color:var(--em); }
  .fac-card.healthpost { border-left-color:#3182ce; }
  .fac-card.pharmacy { border-left-color:var(--sf); }
  .fac-type { font-size:.65rem; text-transform:uppercase; letter-spacing:1px; font-weight:700; margin-bottom:4px; }
  .fac-card.hospital .fac-type { color:var(--em); }
  .fac-card.healthpost .fac-type { color:#3182ce; }
  .fac-card.pharmacy .fac-type { color:var(--sf); }
  .fac-name { font-weight:700; font-size:.88rem; color:var(--td); margin-bottom:6px; }
  .fac-meta { font-size:.75rem; color:var(--tl); display:flex; gap:8px; flex-wrap:wrap; }
  .o24-bdg { background:#f0fff4; color:#276749; padding:2px 7px; border-radius:100px; font-size:.65rem; font-weight:600; }

  /* DOCTORS */
  .doc-cards { display:grid; grid-template-columns:repeat(auto-fill,minmax(255px,1fr)); gap:12px; }
  .doc-card { background:var(--card); border-radius:var(--r); padding:20px; box-shadow:var(--sh); transition:all .28s; border:1px solid rgba(13,92,74,.06); animation:fadeUp .4s ease both; }
  .doc-card:hover { transform:translateY(-5px); box-shadow:var(--sh-lg); }
  .doc-av { width:56px;height:56px; background:var(--glass); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.8rem; margin-bottom:10px; border:3px solid rgba(13,92,74,.12); }
  .doc-name { font-weight:700; font-size:.93rem; color:var(--td); }
  .doc-spec { font-size:.77rem; color:var(--em); margin:2px 0; }
  .doc-hosp { font-size:.73rem; color:var(--tl); }
  .on-bdg { display:inline-block; background:#f0fff4; color:#276749; padding:2px 9px; border-radius:100px; font-size:.65rem; font-weight:600; margin:6px 0; }
  .off-bdg { display:inline-block; background:#f7fafc; color:#718096; padding:2px 9px; border-radius:100px; font-size:.65rem; font-weight:600; margin:6px 0; }
  .con-btn { background:linear-gradient(135deg,var(--em),var(--em-l)); color:#fff; border:none; border-radius:var(--r-sm); padding:6px 12px; font-size:.76rem; font-weight:600; cursor:pointer; flex:1; font-family:'Noto Sans Devanagari',sans-serif; transition:all .2s; }
  .con-btn:hover { opacity:.9; transform:translateY(-1px); }

  /* APPOINTMENTS */
  .appt-form { background:var(--card); border-radius:var(--r); padding:24px; box-shadow:var(--sh); margin-bottom:22px; border:1px solid rgba(13,92,74,.07); animation:fadeUp .4s ease both; }
  .appt-form-title { font-family:'Sora',sans-serif; font-size:1rem; font-weight:700; color:var(--em-d); margin-bottom:16px; }
  .appt-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .appt-grid .full { grid-column:1/-1; }
  .appt-list { display:flex; flex-direction:column; gap:10px; }
  .appt-card { background:var(--card); border-radius:var(--r-sm); padding:16px 18px; box-shadow:var(--sh); border:1px solid rgba(13,92,74,.07); border-left:4px solid var(--em); display:flex; align-items:flex-start; gap:14px; transition:all .2s; animation:slideR .35s ease both; }
  .appt-card:hover { transform:translateX(3px); box-shadow:var(--sh-lg); }
  .appt-ic { font-size:1.7rem; flex-shrink:0; margin-top:2px; }
  .appt-doc { font-weight:700; font-size:.88rem; color:var(--td); margin-bottom:2px; }
  .appt-meta { font-size:.76rem; color:var(--tl); }
  .appt-notes { font-size:.74rem; color:var(--tm); margin-top:3px; font-style:italic; }
  .appt-status { margin-left:auto; display:flex; flex-direction:column; align-items:flex-end; gap:3px; }
  .appt-bdg { background:linear-gradient(135deg,var(--em),var(--em-l)); color:#fff; padding:2px 9px; border-radius:100px; font-size:.65rem; font-weight:700; text-transform:uppercase; }

  /* DOCTOR SECTIONS */
  .rec-card { background:var(--card); border-radius:var(--r); padding:20px; box-shadow:var(--sh); margin-bottom:12px; border:1px solid rgba(13,92,74,.06); border-left:4px solid var(--sf); animation:fadeUp .4s ease both; }
  .rec-hdr { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:10px; flex-wrap:wrap; gap:7px; }
  .rec-pname { font-weight:700; font-size:.93rem; color:var(--td); }
  .rec-time { font-size:.69rem; color:var(--tl); }
  .rec-content { font-size:.8rem; color:var(--tm); line-height:1.65; white-space:pre-wrap; }
  .u-high { border-left-color:#e53e3e; }
  .urg-bdg { display:inline-block; padding:2px 9px; border-radius:100px; font-size:.65rem; font-weight:700; }
  .urg-bdg.high { background:#fff5f5; color:#c53030; }
  .urg-bdg.medium { background:#fffcf0; color:#b45309; }
  .urg-bdg.low { background:#f0fff4; color:#276749; }
  .post-card { background:var(--card); border-radius:var(--r); padding:20px; box-shadow:var(--sh); margin-bottom:12px; transition:all .2s; border:1px solid rgba(13,92,74,.06); animation:fadeUp .4s ease both; }
  .post-card:hover { box-shadow:var(--sh-lg); }
  .post-hdr { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
  .post-av { font-size:1.6rem; }
  .post-auth { font-weight:700; font-size:.84rem; color:var(--td); }
  .post-time { font-size:.68rem; color:var(--tl); }
  .post-content { font-size:.83rem; color:var(--tm); line-height:1.65; }
  .post-acts { margin-top:12px; display:flex; gap:12px; }
  .pa-btn { background:none; border:none; color:var(--tl); font-size:.75rem; cursor:pointer; display:flex; align-items:center; gap:3px; font-family:'Noto Sans Devanagari',sans-serif; transition:color .2s; }
  .pa-btn:hover { color:var(--em); }

  /* EMERGENCY STRIP */
  .em-strip { background:linear-gradient(135deg,#e53e3e,#c53030); color:#fff; padding:10px 16px; border-radius:var(--r); display:flex; align-items:center; gap:10px; margin-bottom:20px; box-shadow:0 4px 12px rgba(229,62,62,.28); }
  .em-txt strong { display:block; font-size:.85rem; }
  .em-txt span { font-size:.73rem; opacity:.85; }

  /* MODAL */
  .mo { position:fixed; inset:0; background:rgba(0,0,0,.72); display:flex; align-items:center; justify-content:center; z-index:200; backdrop-filter:blur(6px); animation:fadeIn .2s ease; }
  .modal-box { background:var(--card); border-radius:var(--r); padding:32px; max-width:460px; width:90%; text-align:center; box-shadow:0 24px 64px rgba(0,0,0,.28); animation:scaleIn .25s ease both; }
  .call-name { font-family:'Sora',sans-serif; font-size:1.3rem; font-weight:700; color:var(--em-d); margin-bottom:3px; }
  .call-stat { font-size:.85rem; color:var(--tl); margin-bottom:22px; }
  .call-anim { width:72px;height:72px; border-radius:50%; background:rgba(13,92,74,.1); display:flex; align-items:center; justify-content:center; font-size:1.8rem; margin:0 auto 20px; animation:callPulse 1.5s ease-in-out infinite; }
  .mo-btns { display:flex; gap:10px; justify-content:center; }
  .end-btn { background:linear-gradient(135deg,#e53e3e,#c53030); color:#fff; border:none; border-radius:100px; padding:10px 24px; font-size:.85rem; font-weight:600; cursor:pointer; font-family:'Noto Sans Devanagari',sans-serif; box-shadow:0 4px 12px rgba(229,62,62,.38); transition:all .2s; }
  .end-btn:hover { opacity:.9; transform:translateY(-1px); }
  .rep-modal { max-width:580px; max-height:80vh; overflow-y:auto; text-align:left; }
  .rep-content { background:#f9fdf9; border-radius:var(--r-sm); padding:16px; font-size:.8rem; line-height:1.7; color:var(--td); white-space:pre-wrap; border:1px solid rgba(13,92,74,.09); }
  .ver-bdg { background:#f0fff4; color:#276749; padding:3px 11px; border-radius:100px; font-size:.7rem; font-weight:600; }

  /* TOAST */
  .toast { position:fixed; top:70px; right:14px; z-index:300; padding:11px 16px; border-radius:var(--r-sm); font-size:.83rem; font-weight:600; max-width:320px; box-shadow:0 8px 24px rgba(0,0,0,.14); animation:slideR .35s cubic-bezier(.34,1.56,.64,1) both; border-left:4px solid transparent; display:flex; align-items:center; gap:7px; }
  .toast.ok { background:#f0fff4; color:#276749; border-left-color:#48bb78; }
  .toast.err { background:#fff5f5; color:#c53030; border-left-color:#fc8181; }
  .toast.inf { background:#fffcf0; color:#b45309; border-left-color:var(--sf); }

  /* BOTTOM NAV */
  .bnav { display:none; position:fixed; bottom:38px;left:0;right:0; background:rgba(255,253,248,.98); backdrop-filter:blur(12px); border-top:1px solid rgba(13,92,74,.1); padding:5px 6px; z-index:90; justify-content:space-around; box-shadow:0 -4px 20px rgba(13,92,74,.1); }
  .bn-it { display:flex; flex-direction:column; align-items:center; gap:2px; padding:5px 8px; border-radius:var(--r-sm); cursor:pointer; transition:all .2s; background:transparent; border:none; color:var(--tl); font-family:'Noto Sans Devanagari',sans-serif; position:relative; flex:1; }
  .bn-it.active { color:var(--em); }
  .bn-it.active::before { content:''; position:absolute; top:0;left:20%;right:20%; height:3px; background:var(--em); border-radius:0 0 3px 3px; animation:fadeIn .2s ease; }
  .bn-icon { font-size:1.2rem; transition:transform .2s; }
  .bn-it.active .bn-icon { transform:scale(1.12); }
  .bn-lbl { font-size:.58rem; font-weight:600; text-transform:uppercase; letter-spacing:.5px; }

  /* SPINNER + DOTS */
  .spinner { width:16px;height:16px; border:2px solid rgba(13,92,74,.18); border-top-color:var(--em); border-radius:50%; animation:spin .7s linear infinite; display:inline-block; }
  .tdots span { display:inline-block; width:5px;height:5px; background:var(--tl); border-radius:50%; margin:0 2px; animation:bounce 1.2s infinite; }
  .tdots span:nth-child(2) { animation-delay:.2s; }
  .tdots span:nth-child(3) { animation-delay:.4s; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes scaleIn { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.65;transform:scale(.96)} }
  @keyframes callPulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(13,92,74,.3)} 50%{transform:scale(1.05);box-shadow:0 0 0 12px rgba(13,92,74,0)} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes slideR { from{opacity:0;transform:translateX(22px)} to{opacity:1;transform:translateX(0)} }
  @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }

  @media (max-width:768px) {
    .sidebar { display:none !important; }
    .bnav { display:flex !important; }
    .form-grid { grid-template-columns:1fr; }
    .main { padding:14px; padding-bottom:100px; }
    .role-card { width:100%; max-width:300px; }
    .auth-card { padding:20px; }
    .pt-stats { grid-template-columns:1fr 1fr; }
    .appt-grid { grid-template-columns:1fr; }
    .stat-div { display:none; }
    .ticker { bottom:82px; }
    .bnav { bottom:38px; }
  }
  @media (max-width:480px) {
    .pt-stats { grid-template-columns:1fr; }
    .sc-val { font-size:1.5rem; }
    .big-title { font-size:2.4rem; }
  }
`;

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
  const [darkMode, setDarkMode] = useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([...mockDoctors]);
  const [sentReports, setSentReports] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [aiConvCount, setAiConvCount] = useState(0);
  const t = T[lang];

  const showToast = useCallback((msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const logout = () => { setCurrentPatient(null); setCurrentDoctor(null); setPage("landing"); setActiveSection("info"); };

  const langs = [{ code:"en",label:"EN" },{ code:"ne",label:"नेपाली" },{ code:"ma",label:"मैथिली" },{ code:"bh",label:"भोजपुरी" }];

  return (
    <>
      <style>{styles}</style>
      <div className="app" data-dark={darkMode}>
        <header className="hdr">
          <div className="hdr-logo" onClick={logout}>
            <div style={{width:42,height:42,borderRadius:"50%",background:"rgba(255,255,255,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",border:"2px solid rgba(255,255,255,.3)"}}>🏥</div>
            <div><div className="hdr-logo-txt">हाम्रो<span>-CARE</span></div><div className="hdr-logo-sub">Anytime Assistance</div></div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,flex:1,justifyContent:"center"}}>
            <div className="lang-sel">{langs.map(l=><button key={l.code} className={`lang-btn ${lang===l.code?"active":""}`} onClick={()=>setLang(l.code)}>{l.label}</button>)}</div>
          </div>
          <div className="hdr-acts">
            <button className="dark-btn" onClick={()=>setDarkMode(d=>!d)}>{darkMode?"☀️":"🌙"}</button>
            {(currentPatient||currentDoctor) && <button className="logout-btn" onClick={logout}>{t.logout}</button>}
          </div>
        </header>

        {toast && <div className={`toast ${toast.type}`}>{toast.type==="ok"?"✅":toast.type==="err"?"❌":"ℹ️"} {toast.msg}</div>}
        {modal && <ModalRenderer modal={modal} setModal={setModal} t={t} />}

        {page==="landing" && <LandingPage t={t} setPage={setPage} />}
        {page==="patient-auth" && <PatientAuth t={t} mode={patientAuthMode} setMode={setPatientAuthMode} patients={patients} setPatients={setPatients} setCurrentPatient={setCurrentPatient} setPage={setPage} showToast={showToast} />}
        {page==="patient-dashboard" && currentPatient && <PatientDashboard t={t} lang={lang} patient={currentPatient} activeSection={activeSection} setActiveSection={setActiveSection} doctors={doctors} sentReports={sentReports} setSentReports={setSentReports} appointments={appointments} setAppointments={setAppointments} aiConvCount={aiConvCount} setAiConvCount={setAiConvCount} setModal={setModal} showToast={showToast} />}
        {page==="doctor-auth" && <DoctorAuth t={t} mode={doctorAuthMode} setMode={setDoctorAuthMode} doctors={doctors} setDoctors={setDoctors} setCurrentDoctor={setCurrentDoctor} setPage={setPage} showToast={showToast} />}
        {page==="doctor-dashboard" && currentDoctor && <DoctorDashboard t={t} lang={lang} doctor={currentDoctor} activeSection={activeSection} setActiveSection={setActiveSection} sentReports={sentReports} patients={patients} doctors={doctors} setModal={setModal} showToast={showToast} />}

        {page==="landing" && (
          <div className="ticker">
            <div className="tick-lbl">💚 HEALTH TIPS</div>
            <div style={{overflow:"hidden",flex:1}}>
              <div className="tick-track">
                {[...tickerTips,...tickerTips].map((tip,i)=><span key={i} className="tick-item">{tip} <span style={{color:"#f5a623"}}> ◆ </span></span>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function StatCount({ target, suffix="", start }) {
  const c = useCountUp(target, 1600, start);
  return <>{c.toLocaleString()}{suffix}</>;
}

function LandingPage({ t, setPage }) {
  const [sv, setSv] = useState(false);
  useEffect(()=>{ const tm=setTimeout(()=>setSv(true),400); return()=>clearTimeout(tm); },[]);
  const stats = [{label:"Patients Served",target:10000,suffix:"+",icon:"🧑‍⚕️"},{label:"Doctors",target:500,suffix:"+",icon:"👨‍⚕️"},{label:"Hospitals",target:50,suffix:"+",icon:"🏥"},{label:"Success Rate",target:98,suffix:"%",icon:"⭐"}];
  const feats = [{icon:"🤖",name:"AI Diagnosis",desc:"Symptom analysis powered by medical AI trained on Nepali healthcare data"},{icon:"👨‍⚕️",name:"Doctor Connect",desc:"Video, audio & chat consultations with verified Nepali doctors"},{icon:"🚑",name:"Emergency",desc:"One-tap ambulance call & real-time emergency service integration"},{icon:"🌐",name:"Multi-Language",desc:"Full support for Nepali, Maithili, Bhojpuri and English"}];
  return (
    <div className="landing">
      <div className="hero">
        <div className="badge">🏥 Nepal's #1 Digital Health Platform</div>
        <h1 className="big-title">हाम्रो<span>-CARE</span></h1>
        <p className="tagline">{t.tagline}</p>
        <p className="subtitle">Connecting patients and doctors across Nepal</p>
      </div>
      <div className="stats-row">
        {stats.map((s,i)=>(
          <div key={i} style={{display:"contents"}}>
            <div className="stat-it"><div className="stat-num"><StatCount target={s.target} suffix={s.suffix} start={sv}/></div><div className="stat-lbl">{s.icon} {s.label}</div></div>
            {i<stats.length-1 && <div className="stat-div"/>}
          </div>
        ))}
      </div>
      <div className="role-cards">
        <div className="role-card" onClick={()=>setPage("patient-auth")}>
          <span className="role-icon">🤒</span>
          <div className="role-title">{t.iAmPatient}</div>
          <div className="role-desc">Access AI health assistant, connect with doctors, find nearby facilities</div>
        </div>
        <div className="role-card" onClick={()=>setPage("doctor-auth")}>
          <span className="role-icon">👨‍⚕️</span>
          <div className="role-title">{t.iAmDoctor}</div>
          <div className="role-desc">Manage patient records, join doctor community, consult patients digitally</div>
        </div>
      </div>
      <div className="feats-sec">
        <div className="feats-title">⚡ Platform Features</div>
        <div className="feats-grid">
          {feats.map((f,i)=><div key={i} className="feat-card"><div className="feat-icon">{f.icon}</div><div className="feat-name">{f.name}</div><div className="feat-desc">{f.desc}</div></div>)}
        </div>
      </div>
    </div>
  );
}

function PatientAuth({ t, mode, setMode, patients, setPatients, setCurrentPatient, setPage, showToast }) {
  const [form, setForm] = useState({ name:"",age:"",gender:"Male",address:"",phone:"",blood:"A+",password:"",confirmPass:"",currentMeds:"" });
  const [lf, setLf] = useState({ phone:"",password:"" });
  const [err, setErr] = useState("");
  const bgs = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
  const reg = () => {
    if(!form.name||!form.age||!form.phone||!form.password){setErr(t.required);return;}
    if(form.password!==form.confirmPass){setErr(t.passwordMismatch);return;}
    setPatients(p=>[...p,{...form,id:Date.now().toString(),avatar:"🧑‍⚕️"}]);
    showToast(t.registrationSuccess); setMode("login"); setErr("");
  };
  const login = () => {
    const f=patients.find(p=>p.phone===lf.phone&&p.password===lf.password);
    if(f){setCurrentPatient(f);setPage("patient-dashboard");}else setErr(t.invalidCredentials);
  };
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-sw">
          <span>{mode==="register"?t.alreadyHaveAccount:t.noAccount}</span>
          <button onClick={()=>{setMode(mode==="register"?"login":"register");setErr("");}}>{mode==="register"?t.loginHere:t.registerHere}</button>
        </div>
        <div className="auth-hdr"><div className="auth-icon">🤒</div><div className="auth-title">{mode==="register"?t.patientRegister:t.patientLogin}</div></div>
        {err&&<div className="alert alert-err">{err}</div>}
        {mode==="register"?(
          <div className="form-grid">
            <div className="form-grp"><label className="form-lbl">{t.name} *</label><input className="fi" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
            <div className="form-grp"><label className="form-lbl">{t.age} *</label><input className="fi" type="number" value={form.age} onChange={e=>setForm({...form,age:e.target.value})}/></div>
            <div className="form-grp"><label className="form-lbl">{t.gender}</label><select className="fs" value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})}><option>{t.male}</option><option>{t.female}</option><option>{t.other}</option></select></div>
            <div className="form-grp"><label className="form-lbl">{t.blood}</label><select className="fs" value={form.blood} onChange={e=>setForm({...form,blood:e.target.value})}>{bgs.map(b=><option key={b}>{b}</option>)}</select></div>
            <div className="form-grp full"><label className="form-lbl">{t.address}</label><input className="fi" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></div>
            <div className="form-grp"><label className="form-lbl">{t.phone} *</label><input className="fi" type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
            <div className="form-grp"><label className="form-lbl">{t.password} *</label><input className="fi" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></div>
            <div className="form-grp full"><label className="form-lbl">{t.confirmPass} *</label><input className="fi" type="password" value={form.confirmPass} onChange={e=>setForm({...form,confirmPass:e.target.value})}/></div>
            <div className="form-grp full"><label className="form-lbl">{t.currentMeds}</label><textarea className="fta" value={form.currentMeds} onChange={e=>setForm({...form,currentMeds:e.target.value})} placeholder="e.g., Metformin 500mg..."/></div>
            <div className="form-grp full"><div className="file-wrap">📎 {t.medRecords}</div></div>
            <div className="form-grp full"><button className="btn-p" onClick={reg}>{t.submit}</button></div>
          </div>
        ):(
          <div className="form-grid">
            <div className="form-grp full"><label className="form-lbl">{t.phone} *</label><input className="fi" type="tel" value={lf.phone} onChange={e=>setLf({...lf,phone:e.target.value})}/></div>
            <div className="form-grp full"><label className="form-lbl">{t.password} *</label><input className="fi" type="password" value={lf.password} onChange={e=>setLf({...lf,password:e.target.value})}/></div>
            <div className="form-grp full"><button className="btn-p" onClick={login}>{t.login}</button></div>
          </div>
        )}
        <div style={{marginTop:12}}><button className="btn-s" onClick={()=>setPage("landing")}>{t.back}</button></div>
      </div>
    </div>
  );
}

function PatientDashboard({ t, lang, patient, activeSection, setActiveSection, doctors, sentReports, setSentReports, appointments, setAppointments, aiConvCount, setAiConvCount, setModal, showToast }) {
  const navItems = [{id:"info",icon:"👤",label:t.myInfo},{id:"chatbot",icon:"🤖",label:t.aiChatbot},{id:"facilities",icon:"🏥",label:t.nearbyFacilities},{id:"doctors",icon:"👨‍⚕️",label:t.connectDoctor},{id:"appointments",icon:"📅",label:t.appointments},{id:"tips",icon:"💡",label:t.healthTips}];
  return (
    <div className="dash">
      <aside className="sidebar">
        <div className="sb-user"><div className="sb-av">🧑‍⚕️</div><div className="sb-name">{patient.name}</div><div className="sb-role">Patient</div></div>
        {navItems.map(it=><button key={it.id} className={`nav-it ${activeSection===it.id?"active":""}`} onClick={()=>setActiveSection(it.id)}><span>{it.icon}</span> {it.label}</button>)}
      </aside>
      <div className="bnav">
        {navItems.map(it=><button key={it.id} className={`bn-it ${activeSection===it.id?"active":""}`} onClick={()=>setActiveSection(it.id)}><span className="bn-icon">{it.icon}</span><span className="bn-lbl">{it.label.split(" ")[0]}</span></button>)}
      </div>
      <main className="main">
        {activeSection==="info" && <PatientInfo t={t} patient={patient} sentReports={sentReports} aiConvCount={aiConvCount} appointments={appointments} doctors={doctors}/>}
        {activeSection==="chatbot" && <AIChatbot t={t} lang={lang} patient={patient} doctors={doctors} sentReports={sentReports} setSentReports={setSentReports} setAiConvCount={setAiConvCount} showToast={showToast}/>}
        {activeSection==="facilities" && <NearbyFacilities t={t} showToast={showToast}/>}
        {activeSection==="doctors" && <ConnectDoctor t={t} doctors={doctors} setModal={setModal}/>}
        {activeSection==="appointments" && <Appointments t={t} doctors={doctors} appointments={appointments} setAppointments={setAppointments} showToast={showToast}/>}
        {activeSection==="tips" && <HealthTipsSection t={t}/>}
      </main>
    </div>
  );
}

function AnimNum({ target, start }) {
  const v = useCountUp(target, 1400, start);
  return <>{v}</>;
}

function PatientInfo({ t, patient, sentReports, aiConvCount, appointments, doctors }) {
  const [ss, setSs] = useState(false);
  useEffect(()=>{ const tm=setTimeout(()=>setSs(true),200); return()=>clearTimeout(tm); },[]);
  const scs = [{icon:"🤖",label:t.aiConversations,value:aiConvCount},{icon:"📋",label:t.reportsGenerated,value:sentReports.length},{icon:"👨‍⚕️",label:t.connectedDoctors,value:doctors.filter(d=>d.online).length},{icon:"💚",label:t.healthScore,value:87}];
  const ifs = [{label:t.name,value:patient.name},{label:t.age,value:`${patient.age} ${t.yearOld}`},{label:t.gender,value:patient.gender},{label:t.phone,value:patient.phone},{label:t.address,value:patient.address||"—"},{label:t.blood,value:null,blood:patient.blood}];
  return (
    <>
      <div className="sec-title">👤 {t.myInfo}</div>
      <div className="pt-stats">
        {scs.map((s,i)=>(
          <div key={i} className="stat-card" style={{animationDelay:`${i*.07}s`}}>
            <div className="sc-icon">{s.icon}</div>
            <div className="sc-val"><AnimNum target={s.value} start={ss}/></div>
            <div className="sc-lbl">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="info-grid">
        {ifs.map((f,i)=>(
          <div className="info-card" key={i}>
            <div className="info-label">{f.label}</div>
            {f.blood?<span className="blood-bdg">{f.blood}</span>:<div className="info-value">{f.value}</div>}
          </div>
        ))}
      </div>
      {patient.currentMeds && <div className="info-card" style={{marginBottom:14}}><div className="info-label">{t.currentMeds}</div><div className="info-value" style={{fontSize:".85rem",fontWeight:400,marginTop:4}}>{patient.currentMeds}</div></div>}
      <div className="em-strip">
        <span style={{fontSize:"1.3rem"}}>🆘</span>
        <div className="em-txt" style={{flex:1}}><strong>{t.emergencyContacts}</strong><span>Ambulance: 102 | Police: 100 | Fire: 101 | Hospital: 01-4221988</span></div>
      </div>
    </>
  );
}

function HealthTipsSection({ t }) {
  const [cur, setCur] = useState(0);
  const [key, setKey] = useState(0);
  const goto = useCallback((i)=>{ setCur((i+healthTipsData.length)%healthTipsData.length); setKey(k=>k+1); },[]);
  useEffect(()=>{ const tm=setInterval(()=>goto(cur+1),5000); return()=>clearInterval(tm); },[cur,goto]);
  const tip = healthTipsData[cur];
  return (
    <>
      <div className="sec-title">💡 {t.healthTips}</div>
      <div style={{marginBottom:20}}>
        <div className="tip-sl" key={key}>
          <div className="tip-big-icon">{tip.icon}</div>
          <div style={{flex:1}}><span className="tip-cat">{tip.category}</span><p className="tip-txt">{tip.tip}</p></div>
        </div>
        <div className="tips-nav">
          <button className="tnav-btn" onClick={()=>goto(cur-1)}>‹</button>
          {healthTipsData.map((_,i)=><button key={i} className={`tdot ${i===cur?"active":""}`} onClick={()=>goto(i)}/>)}
          <button className="tnav-btn" onClick={()=>goto(cur+1)}>›</button>
        </div>
      </div>
      <div style={{marginTop:24}}>
        <div style={{fontFamily:"Sora,sans-serif",fontSize:"1rem",fontWeight:700,color:"var(--em-d)",marginBottom:12}}>All Health Tips for Nepal</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
          {healthTipsData.map((tip,i)=>(
            <div key={i} className="info-card" style={{cursor:"pointer",borderLeft:"3px solid var(--em)"}} onClick={()=>goto(i)}>
              <div style={{display:"flex",gap:9,alignItems:"flex-start"}}>
                <span style={{fontSize:"1.4rem",flexShrink:0}}>{tip.icon}</span>
                <div><span className="tip-cat" style={{marginBottom:3}}>{tip.category}</span><p style={{fontSize:".76rem",color:"var(--tm)",lineHeight:1.5}}>{tip.tip.slice(0,80)}...</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AIChatbot({ t, lang, patient, doctors, sentReports, setSentReports, setAiConvCount, showToast }) {
  const [messages, setMessages] = useState([{role:"assistant",content:`Namaste ${patient.name}! 🙏 I am your AI Health Assistant. Please describe your symptoms and I'll help you understand what might be happening.\n\n⚠️ ${t.disclaimer}`}]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [repModal, setRepModal] = useState(null);
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);

  const langNames = {en:"English",ne:"Nepali",ma:"Maithili",bh:"Bhojpuri"};
  const sysPr = `You are हाम्रो-CARE AI Health Assistant for Nepal. Respond in ${langNames[lang]||"English"}. Patient: ${patient.name}, Age: ${patient.age}, Gender: ${patient.gender}, Blood: ${patient.blood}, Meds: ${patient.currentMeds||"None"}. Analyze symptoms, suggest possible conditions (not diagnosis), recommend OTC medicines available in Nepal, and advise when to seek emergency care. Reference common Nepali diseases (dengue, typhoid, altitude sickness). Be warm and culturally sensitive. Always remind this is not professional advice.`;

  const send = async () => {
    if(!input.trim()||loading) return;
    const txt=input.trim(); setInput("");
    setMessages(p=>[...p,{role:"user",content:txt}]);
    setLoading(true); setAiConvCount(c=>c+1);
    try {
      const msgs=messages.slice(-8).map(m=>({role:m.role,content:m.content}));
      msgs.push({role:"user",content:txt});
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sysPr,messages:msgs})});
      const data=await res.json();
      const reply=data.content?.[0]?.text||"I couldn't process that. Please try again.";
      setMessages(p=>[...p,{role:"assistant",content:reply}]);
    } catch { setMessages(p=>[...p,{role:"assistant",content:"⚠️ Connection error. Please check your internet and try again."}]); }
    setLoading(false);
  };

  const genReport = async () => {
    if(messages.length<3) return; setLoading(true);
    const conv=messages.map(m=>`${m.role==="user"?patient.name:"AI"}: ${m.content}`).join("\n\n");
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:"Generate a structured medical report from patient-AI conversation for हाम्रो-CARE Nepal.",messages:[{role:"user",content:`Generate a formal medical report. Include: Patient Details, Chief Complaints, Symptom Analysis, Possible Conditions, Medications Suggested, Urgency Level (High/Medium/Low), Recommendations.\n\nPatient: ${patient.name}, ${patient.age}y, ${patient.gender}, ${patient.blood}\n\nConversation:\n${conv}`}]})});
      const data=await res.json();
      const report=data.content?.[0]?.text||"Unable to generate report.";
      const nr={id:Date.now(),patientName:patient.name,patientAge:patient.age,patientGender:patient.gender,blood:patient.blood,content:report,time:new Date().toLocaleString(),urgency:report.toLowerCase().includes("high")?"high":report.toLowerCase().includes("medium")?"medium":"low"};
      setSentReports(p=>[nr,...p]); setRepModal(report); showToast(t.reportSent,"ok");
    } catch { showToast("Report generation failed.","err"); }
    setLoading(false);
  };

  const quick=["Fever & Headache","Cough & Cold","Stomach Pain","Chest Pain","Joint Pain","Dizziness"];
  return (
    <>
      {repModal&&(
        <div className="mo" onClick={()=>setRepModal(null)}>
          <div className="modal-box rep-modal" onClick={e=>e.stopPropagation()}>
            <div className="auth-hdr"><div className="auth-icon">📋</div><div className="auth-title">{t.reportTitle}</div></div>
            <div className="alert alert-ok" style={{marginBottom:12}}>{t.sentToDoc}</div>
            <div className="rep-content">{repModal}</div>
            <button className="btn-p" style={{marginTop:12}} onClick={()=>setRepModal(null)}>Close</button>
          </div>
        </div>
      )}
      <div className="sec-title">🤖 {t.aiChatbot}</div>
      <div className="alert alert-inf" style={{marginBottom:12}}>{t.disclaimer}</div>
      <div className="chatbox">
        <div className="ch-hdr">
          <div className="ch-av">🤖</div>
          <div><div className="ch-name">हाम्रो-CARE AI</div><div className="ch-status"><span className="sdot"></span> Online · Medical AI</div></div>
        </div>
        <div className="chat-msgs">
          {messages.map((msg,i)=>(
            <div key={i} className={`msg ${msg.role==="user"?"msg-u":"msg-a"}`}>
              <div className={msg.role==="user"?"u-bub":"ai-bub"}>{msg.content}</div>
              <div className="msg-time">{new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div>
            </div>
          ))}
          {loading&&<div className="msg msg-a"><div className="ai-bub"><div className="tdots"><span/><span/><span/></div> <span style={{fontSize:".72rem",color:"var(--tl)",marginLeft:6}}>{t.loading}</span></div></div>}
          <div ref={endRef}/>
        </div>
        <div className="chat-acts">
          {quick.map(s=><button key={s} className="ca-btn" onClick={()=>setInput(s)}>+ {s}</button>)}
          <button className="amb-btn" onClick={()=>showToast(t.callAmbulance,"inf")}>{t.ambulance}</button>
          <button className="ca-btn" style={{background:"linear-gradient(135deg,#276749,#2f855a)",color:"#fff",border:"none"}} onClick={genReport} disabled={messages.length<3}>📋 {t.generateReport}</button>
        </div>
        <div className="chat-inp-area">
          <textarea className="ci" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder={t.typeMsg} rows={1}/>
          <button className="send-btn" onClick={send} disabled={loading||!input.trim()}>➤</button>
        </div>
      </div>
    </>
  );
}

function NearbyFacilities({ t, showToast }) {
  return (
    <>
      <div className="sec-title">🏥 {t.nearby}</div>
      <div className="em-strip" style={{marginBottom:20}}>
        <span style={{fontSize:"1.3rem"}}>🚑</span>
        <div className="em-txt" style={{flex:1}}><strong>Emergency Ambulance Service</strong><span>Nepal Ambulance: 102 | Red Cross: 01-4228094</span></div>
        <button className="amb-btn" onClick={()=>showToast("🚑 Calling 102 — Ambulance dispatched!","inf")}>Call Now</button>
      </div>
      <div className="fac-grid">
        {mockFacilities.map((f,i)=>(
          <div key={i} className={`fac-card ${f.type}`} style={{animationDelay:`${i*.07}s`}}>
            <div className="fac-type">{f.type==="hospital"?"🏥 "+t.hospitals:f.type==="healthpost"?"🏡 "+t.healthPosts:"💊 "+t.pharmacy}</div>
            <div className="fac-name">{f.name}</div>
            <div className="fac-meta"><span>📍 {f.dist} {t.km}</span>{f.open24&&<span className="o24-bdg">✅ {t.open24}</span>}<span>📞 {f.phone}</span></div>
            <button className="con-btn" style={{marginTop:8,background:"linear-gradient(135deg,#3182ce,#2b6cb0)",width:"100%"}} onClick={()=>showToast(`Directions to ${f.name}...`,"inf")}>📍 Get Directions</button>
          </div>
        ))}
      </div>
    </>
  );
}

function ConnectDoctor({ t, doctors, setModal }) {
  return (
    <>
      <div className="sec-title">👨‍⚕️ {t.connectDoctor}</div>
      <div className="doc-cards">
        {doctors.map((doc,i)=>(
          <div key={doc.id} className="doc-card" style={{animationDelay:`${i*.07}s`}}>
            <div className="doc-av">{doc.avatar||"👨‍⚕️"}</div>
            <div className="doc-name">{doc.name}</div>
            <div className="doc-spec">🩺 {doc.specialization}</div>
            <div className="doc-hosp">🏥 {doc.hospital}</div>
            <span className={doc.online?"on-bdg":"off-bdg"}>{doc.online?"🟢 Online":"⚫ Offline"}</span>
            <div style={{display:"flex",gap:5,marginTop:8}}>
              <button className="con-btn" onClick={()=>setModal({type:"chat",doctor:doc})}>💬 {t.chat}</button>
              <button className="con-btn" style={{background:"linear-gradient(135deg,#3182ce,#2b6cb0)"}} onClick={()=>setModal({type:"call",callType:"audio",doctor:doc})}>📞</button>
              <button className="con-btn" style={{background:"linear-gradient(135deg,#805ad5,#6b46c1)"}} onClick={()=>setModal({type:"call",callType:"video",doctor:doc})}>📹</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Appointments({ t, doctors, appointments, setAppointments, showToast }) {
  const [form, setForm] = useState({doctorId:doctors[0]?.id||"",date:"",time:"",notes:""});
  const slots = ["09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM"];
  const book = () => {
    if(!form.date||!form.time){showToast("Please select date and time.","err");return;}
    const doc=doctors.find(d=>d.id===form.doctorId);
    setAppointments(p=>[{id:Date.now(),doctor:doc,date:form.date,time:form.time,notes:form.notes,status:"confirmed",bookedAt:new Date().toLocaleString()},...p]);
    setForm({doctorId:doctors[0]?.id||"",date:"",time:"",notes:""});
    showToast(t.apptBooked,"ok");
  };
  return (
    <>
      <div className="sec-title">📅 {t.appointments}</div>
      <div className="appt-form">
        <div className="appt-form-title">📋 {t.bookAppt}</div>
        <div className="appt-grid">
          <div className="form-grp"><label className="form-lbl">{t.selectDoctor}</label><select className="fs" value={form.doctorId} onChange={e=>setForm({...form,doctorId:e.target.value})}>{doctors.map(d=><option key={d.id} value={d.id}>{d.name} • {d.specialization}</option>)}</select></div>
          <div className="form-grp"><label className="form-lbl">{t.chooseDate}</label><input className="fi" type="date" value={form.date} min={new Date().toISOString().split("T")[0]} onChange={e=>setForm({...form,date:e.target.value})}/></div>
          <div className="form-grp"><label className="form-lbl">{t.chooseTime}</label><select className="fs" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}><option value="">Select time slot</option>{slots.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
          <div className="form-grp"><label className="form-lbl">{t.notes}</label><input className="fi" placeholder="Reason for visit..." value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></div>
          <div className="form-grp full"><button className="btn-p" onClick={book}>✅ {t.bookAppt}</button></div>
        </div>
      </div>
      <div style={{fontFamily:"Sora,sans-serif",fontSize:"1rem",fontWeight:700,color:"var(--em-d)",marginBottom:12}}>📋 {t.upcomingAppts} ({appointments.length})</div>
      {appointments.length===0?(
        <div className="info-card" style={{textAlign:"center",padding:32,color:"var(--tl)"}}><div style={{fontSize:"2rem",marginBottom:8}}>📭</div><div>{t.noAppts}</div></div>
      ):(
        <div className="appt-list">
          {appointments.map((a,i)=>(
            <div key={a.id} className="appt-card" style={{animationDelay:`${i*.06}s`}}>
              <div className="appt-ic">{a.doctor?.avatar||"👨‍⚕️"}</div>
              <div style={{flex:1}}>
                <div className="appt-doc">{a.doctor?.name}</div>
                <div className="appt-meta">🩺 {a.doctor?.specialization} • 🏥 {a.doctor?.hospital}</div>
                <div className="appt-meta">📅 {a.date} &nbsp;⏰ {a.time}</div>
                {a.notes&&<div className="appt-notes">📝 {a.notes}</div>}
              </div>
              <div className="appt-status"><span className="appt-bdg">✅ Confirmed</span><span style={{fontSize:".65rem",color:"var(--tl)"}}>Booked {a.bookedAt}</span></div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function DoctorAuth({ t, mode, setMode, doctors, setDoctors, setCurrentDoctor, setPage, showToast }) {
  const [form, setForm] = useState({name:"",age:"",gender:"Male",specialization:"",hospital:"",phone:"",licenseNo:"",password:"",confirmPass:""});
  const [lf, setLf] = useState({phone:"",password:""});
  const [err, setErr] = useState(""); const [verifying, setV] = useState(false); const [verified, setVd] = useState(false);
  const vLic = () => { if(!form.licenseNo)return; setV(true); setTimeout(()=>{setV(false);setVd(true);},1800); };
  const reg = () => {
    if(!form.name||!form.phone||!form.password||!form.licenseNo){setErr(t.required);return;}
    if(form.password!==form.confirmPass){setErr(t.passwordMismatch);return;}
    setDoctors(p=>[...p,{...form,id:Date.now().toString(),avatar:form.gender==="Female"?"👩‍⚕️":"👨‍⚕️",online:true}]);
    showToast(t.registrationSuccess); setMode("login"); setErr("");
  };
  const login = () => {
    const f=doctors.find(d=>d.phone===lf.phone&&d.password===lf.password);
    if(f){setCurrentDoctor(f);setPage("doctor-dashboard");}else setErr(t.invalidCredentials);
  };
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-sw"><span>{mode==="register"?t.alreadyHaveAccount:t.noAccount}</span><button onClick={()=>{setMode(mode==="register"?"login":"register");setErr("");}}>{mode==="register"?t.loginHere:t.registerHere}</button></div>
        <div className="auth-hdr"><div className="auth-icon">👨‍⚕️</div><div className="auth-title">{mode==="register"?t.doctorRegister:t.doctorLogin}</div></div>
        {err&&<div className="alert alert-err">{err}</div>}
        {mode==="register"?(
          <div className="form-grid">
            <div className="form-grp"><label className="form-lbl">{t.name} *</label><input className="fi" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
            <div className="form-grp"><label className="form-lbl">{t.age}</label><input className="fi" type="number" value={form.age} onChange={e=>setForm({...form,age:e.target.value})}/></div>
            <div className="form-grp"><label className="form-lbl">{t.gender}</label><select className="fs" value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})}><option>{t.male}</option><option>{t.female}</option><option>{t.other}</option></select></div>
            <div className="form-grp"><label className="form-lbl">{t.specialization}</label><input className="fi" value={form.specialization} onChange={e=>setForm({...form,specialization:e.target.value})}/></div>
            <div className="form-grp full"><label className="form-lbl">{t.hospital}</label><input className="fi" value={form.hospital} onChange={e=>setForm({...form,hospital:e.target.value})}/></div>
            <div className="form-grp full"><label className="form-lbl">{t.docLicense} *</label>
              <div style={{display:"flex",gap:6}}>
                <input className="fi" style={{flex:1}} value={form.licenseNo} onChange={e=>{setForm({...form,licenseNo:e.target.value});setVd(false);}}/>
                <button className="btn-s" onClick={vLic}>{verifying?<span className="spinner"/>:"Verify"}</button>
              </div>
              {verified&&<span className="ver-bdg" style={{marginTop:4,display:"inline-block"}}>{t.licenseVerified}</span>}
            </div>
            <div className="form-grp full"><div className="file-wrap">📎 {t.docCertificate}</div></div>
            <div className="form-grp"><label className="form-lbl">{t.phone} *</label><input className="fi" type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
            <div className="form-grp"><label className="form-lbl">{t.password} *</label><input className="fi" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></div>
            <div className="form-grp full"><label className="form-lbl">{t.confirmPass}</label><input className="fi" type="password" value={form.confirmPass} onChange={e=>setForm({...form,confirmPass:e.target.value})}/></div>
            <div className="form-grp full"><button className="btn-p" onClick={reg}>{t.submit}</button></div>
          </div>
        ):(
          <div className="form-grid">
            <div className="form-grp full"><label className="form-lbl">{t.phone} *</label><input className="fi" type="tel" value={lf.phone} onChange={e=>setLf({...lf,phone:e.target.value})}/></div>
            <div className="form-grp full"><label className="form-lbl">{t.password} *</label><input className="fi" type="password" value={lf.password} onChange={e=>setLf({...lf,password:e.target.value})}/></div>
            <div className="form-grp full"><div className="alert alert-inf">💡 Demo: phone <strong>9801234567</strong> · password <strong>doctor123</strong></div><button className="btn-p" onClick={login}>{t.login}</button></div>
          </div>
        )}
        <div style={{marginTop:12}}><button className="btn-s" onClick={()=>setPage("landing")}>{t.back}</button></div>
      </div>
    </div>
  );
}

function DoctorDashboard({ t, lang, doctor, activeSection, setActiveSection, sentReports, patients, doctors, setModal, showToast }) {
  const [posts, setPosts] = useState(communityPostsData);
  const [np, setNp] = useState("");
  const navItems = [{id:"info",icon:"👤",label:t.myInfo},{id:"records",icon:"📋",label:t.patientRecords},{id:"community",icon:"👥",label:t.docCommunity},{id:"comm",icon:"💬",label:t.docPatientComm}];
  const addPost = () => {
    if(!np.trim())return;
    setPosts(p=>[{id:Date.now(),author:doctor.name,avatar:doctor.avatar||"👨‍⚕️",time:"Just now",content:np,likes:0,comments:0},...p]);
    setNp(""); showToast("Post published!","ok");
  };
  return (
    <div className="dash">
      <aside className="sidebar">
        <div className="sb-user"><div className="sb-av">{doctor.avatar||"👨‍⚕️"}</div><div className="sb-name">{doctor.name}</div><div className="sb-role">{doctor.specialization||"Doctor"}</div>{doctor.online&&<span className="on-bdg" style={{marginTop:4}}>🟢 Online</span>}</div>
        {navItems.map(it=><button key={it.id} className={`nav-it ${activeSection===it.id?"active":""}`} onClick={()=>setActiveSection(it.id)}><span>{it.icon}</span> {it.label}</button>)}
      </aside>
      <div className="bnav">
        {navItems.map(it=><button key={it.id} className={`bn-it ${activeSection===it.id?"active":""}`} onClick={()=>setActiveSection(it.id)}><span className="bn-icon">{it.icon}</span><span className="bn-lbl">{it.label.split(" ")[0]}</span></button>)}
      </div>
      <main className="main">
        {activeSection==="info"&&(
          <>
            <div className="sec-title">👤 {t.myInfo}</div>
            <div className="info-grid">
              {[{label:t.name,value:doctor.name},{label:t.specialization,value:doctor.specialization||"—"},{label:t.hospital,value:doctor.hospital||"—"},{label:t.phone,value:doctor.phone},{label:t.docLicense,value:doctor.licenseNo||"—"},{label:t.gender,value:doctor.gender}].map((f,i)=>(
                <div className="info-card" key={i}><div className="info-label">{f.label}</div><div className="info-value">{f.value}</div></div>
              ))}
            </div>
            <div className="info-card"><div className="info-label">Verification Status</div><div style={{marginTop:4}}><span className="ver-bdg">{t.licenseVerified} • Nepal Medical Council</span></div></div>
          </>
        )}
        {activeSection==="records"&&(
          <>
            <div className="sec-title">📋 {t.patientRecords}</div>
            {sentReports.length===0?(
              <div className="info-card" style={{textAlign:"center",padding:36,color:"var(--tl)"}}><div style={{fontSize:"2rem",marginBottom:8}}>📭</div><div>No patient reports yet. Reports from AI chatbot will appear here.</div></div>
            ):sentReports.map((r,i)=>(
              <div key={r.id} className={`rec-card ${r.urgency==="high"?"u-high":""}`} style={{animationDelay:`${i*.06}s`}}>
                <div className="rec-hdr">
                  <div><div className="rec-pname">{r.patientName} • {r.patientAge}y • {r.patientGender} • {r.blood}</div><div className="rec-time">📅 {r.time}</div></div>
                  <span className={`urg-bdg ${r.urgency}`}>{r.urgency==="high"?"🔴 High Priority":r.urgency==="medium"?"🟡 Medium":"🟢 Low"}</span>
                </div>
                <div className="rec-content">{r.content}</div>
                <div style={{display:"flex",gap:6,marginTop:10}}>
                  <button className="btn-s" onClick={()=>showToast("Reviewing record...","inf")}>📝 Review</button>
                  <button className="btn-s" onClick={()=>showToast("Appointment scheduled!","ok")}>📅 Schedule</button>
                </div>
              </div>
            ))}
          </>
        )}
        {activeSection==="community"&&(
          <>
            <div className="sec-title">👥 {t.docCommunity}</div>
            <div className="info-card" style={{marginBottom:16}}>
              <div className="info-label" style={{marginBottom:6}}>{t.postUpdate}</div>
              <textarea className="fta" value={np} onChange={e=>setNp(e.target.value)} placeholder={t.typePost}/>
              <button className="btn-p" style={{marginTop:7}} onClick={addPost}>{t.post}</button>
            </div>
            {posts.map((p,i)=>(
              <div key={p.id} className="post-card" style={{animationDelay:`${i*.05}s`}}>
                <div className="post-hdr"><span className="post-av">{p.avatar}</span><div><div className="post-auth">{p.author}</div><div className="post-time">⏰ {p.time}</div></div></div>
                <div className="post-content">{p.content}</div>
                <div className="post-acts"><button className="pa-btn">👍 {p.likes}</button><button className="pa-btn">💬 {p.comments} Comments</button><button className="pa-btn">🔗 Share</button></div>
              </div>
            ))}
          </>
        )}
        {activeSection==="comm"&&(
          <>
            <div className="sec-title">💬 {t.docPatientComm}</div>
            <div className="doc-cards">
              {(patients.length>0?patients:doctors.filter(d=>d.id!==doctor.id)).map((p,i)=>(
                <div key={i} className="doc-card" style={{animationDelay:`${i*.07}s`}}>
                  <div className="doc-av">{p.avatar||"🧑‍⚕️"}</div>
                  <div className="doc-name">{p.name}</div>
                  <div className="doc-spec">🩺 {p.specialization||"Patient"}</div>
                  <div className="doc-hosp">{p.hospital?`🏥 ${p.hospital}`:`📍 ${p.address||"Nepal"}`}</div>
                  <span className="on-bdg">🟢 Online</span>
                  <div style={{display:"flex",gap:5,marginTop:8}}>
                    <button className="con-btn" onClick={()=>showToast(`Opening chat with ${p.name}...`,"inf")}>💬 {t.chat}</button>
                    <button className="con-btn" style={{background:"linear-gradient(135deg,#3182ce,#2b6cb0)"}} onClick={()=>setModal({type:"call",callType:"audio",doctor:{name:p.name,avatar:p.avatar||"🧑‍⚕️"}})}>📞</button>
                    <button className="con-btn" style={{background:"linear-gradient(135deg,#805ad5,#6b46c1)"}} onClick={()=>setModal({type:"call",callType:"video",doctor:{name:p.name,avatar:p.avatar||"🧑‍⚕️"}})}>📹</button>
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

function ModalRenderer({ modal, setModal, t }) {
  const [ci, setCi] = useState("");
  const [msgs, setMsgs] = useState([{from:"doctor",text:`Hello! This is ${modal.doctor?.name}. How can I help you today?`}]);
  const send = () => {
    if(!ci.trim())return;
    const m=ci; setCi("");
    setMsgs(p=>[...p,{from:"user",text:m}]);
    setTimeout(()=>setMsgs(p=>[...p,{from:"doctor",text:"Thank you for sharing that. Based on what you've described, I'd recommend coming in for a proper examination. Please rest and stay hydrated in the meantime."}]),1200);
  };
  if(modal.type==="call") return (
    <div className="mo" onClick={()=>setModal(null)}>
      <div className="modal-box" onClick={e=>e.stopPropagation()}>
        <div className="call-anim">{modal.callType==="video"?"📹":"📞"}</div>
        <div className="call-name">{modal.doctor?.name}</div>
        <div className="call-stat">{modal.callType==="video"?"Video":"Audio"} Call • Connecting...</div>
        <div style={{fontSize:".75rem",color:"var(--tl)",margin:"0 0 20px",background:"var(--glass)",padding:"10px 13px",borderRadius:10}}>🔒 End-to-end encrypted • Real-time {modal.callType} call</div>
        <div className="mo-btns">{modal.callType==="video"&&<button className="btn-s">🎤 Mute</button>}<button className="end-btn" onClick={()=>setModal(null)}>📵 End Call</button></div>
      </div>
    </div>
  );
  if(modal.type==="chat") return (
    <div className="mo" onClick={()=>setModal(null)}>
      <div className="modal-box" style={{maxWidth:480,padding:0,overflow:"hidden",textAlign:"left"}} onClick={e=>e.stopPropagation()}>
        <div className="ch-hdr" style={{borderRadius:"18px 18px 0 0"}}>
          <div className="ch-av">{modal.doctor?.avatar||"👨‍⚕️"}</div>
          <div><div className="ch-name">{modal.doctor?.name}</div><div className="ch-status"><span className="sdot"></span> Online</div></div>
          <button onClick={()=>setModal(null)} style={{marginLeft:"auto",background:"none",border:"none",color:"#fff",fontSize:"1.1rem",cursor:"pointer"}}>✕</button>
        </div>
        <div style={{height:260,overflowY:"auto",padding:12,display:"flex",flexDirection:"column",gap:8,background:"#edf7f3"}}>
          {msgs.map((m,i)=>(
            <div key={i} style={{alignSelf:m.from==="user"?"flex-end":"flex-start",maxWidth:"80%"}}>
              <div style={{background:m.from==="user"?"var(--em)":"#fff",color:m.from==="user"?"#fff":"var(--td)",padding:"7px 12px",borderRadius:14,fontSize:".81rem",boxShadow:"0 2px 6px rgba(0,0,0,.06)"}}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="chat-inp-area" style={{borderRadius:"0 0 18px 18px"}}>
          <input className="ci" style={{borderRadius:10}} value={ci} onChange={e=>setCi(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={t.typeMsg}/>
          <button className="send-btn" onClick={send}>➤</button>
        </div>
      </div>
    </div>
  );
  return null;
}
