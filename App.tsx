import React, { useState, useMemo, useEffect, useCallback } from 'react';

// --- TYPE DEFINITIONS ---
interface Multilingual {
  ar: string;
  en: string;
}

interface Course {
  id: number;
  title: Multilingual;
  instructor: Multilingual;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: number;
  isEnrolled: boolean;
  description: Multilingual;
}

interface Instructor {
    id: number;
    name: Multilingual;
    title: Multilingual;
    bio: Multilingual;
    avatar: string;
}

interface BlogPost {
    id: number;
    title: Multilingual;
    author: Multilingual;
    date: Multilingual;
    excerpt: Multilingual;
}

interface User {
  id: string;
  name: string;
  role: 'student' | 'admin';
}

type View = 'home' | 'courses' | 'courseDetail' | 'dashboard' | 'checkout' | 'instructors' | 'blog';

interface Message {
  id: number;
  text: string;
  type: 'success' | 'info' | 'error';
}

type Language = 'ar' | 'en';


// --- MOCK DATA (MULTILINGUAL) ---
const initialCoursesData: Course[] = [
    { id: 1, title: { ar: 'إدارة المشاريع الاحترافية (PMP)', en: 'Professional Project Management (PMP)' }, instructor: { ar: 'أحمد الزهراني', en: 'Ahmed Al-Zahrani' }, level: 'Advanced', duration: '40', price: 1200, isEnrolled: false, description: { ar: 'دورة متقدمة تركز على تطبيق أحدث منهجيات PMBOK لإدارة المشاريع الكبرى.', en: 'An advanced course focusing on applying the latest PMBOK methodologies for managing major projects.' } },
    { id: 2, title: { ar: 'أساسيات التحليل المالي', en: 'Financial Analysis Fundamentals' }, instructor: { ar: 'سارة العلي', en: 'Sarah Al-Ali' }, level: 'Intermediate', duration: '25', price: 750, isEnrolled: true, description: { ar: 'تعلم كيفية قراءة الميزانيات وتحليل التدفقات النقدية واتخاذ القرارات الاستثمارية.', en: 'Learn how to read balance sheets, analyze cash flows, and make investment decisions.' } },
    { id: 3, title: { ar: 'مقدمة في الذكاء الاصطناعي', en: 'Introduction to Artificial Intelligence' }, instructor: { ar: 'د. خالد الحربي', en: 'Dr. Khalid Al-Harbi' }, level: 'Beginner', duration: '15', price: 400, isEnrolled: false, description: { ar: 'نظرة عامة على مفاهيم الذكاء الاصطناعي، والتعلم الآلي، وتطبيقاتهما في الحياة اليومية.', en: 'An overview of AI concepts, machine learning, and their applications in daily life.' } },
];

const instructorsData: Instructor[] = [
    { id: 1, name: { ar: 'أحمد الزهراني', en: 'Ahmed Al-Zahrani' }, title: { ar: 'خبير إدارة المشاريع', en: 'Project Management Expert' }, bio: { ar: 'مدير مشاريع معتمد يتمتع بخبرة 15 عامًا في قيادة الفرق وتقديم المشاريع الناجحة عبر مختلف الصناعات.', en: 'A certified project manager with 15 years of experience leading teams and delivering successful projects across various industries.' }, avatar: 'https://i.pravatar.cc/150?u=ahmed' },
    { id: 2, name: { ar: 'سارة العلي', en: 'Sarah Al-Ali' }, title: { ar: 'محللة مالية معتمدة', en: 'Certified Financial Analyst' }, bio: { ar: 'خبيرة مالية متخصصة في تقييم الاستثمار وتحليل السوق، وشغوفة بتبسيط المفاهيم المالية المعقدة.', en: 'A financial expert specializing in investment valuation and market analysis, passionate about simplifying complex financial concepts.' }, avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { id: 3, name: { ar: 'د. خالد الحربي', en: 'Dr. Khalid Al-Harbi' }, title: { ar: 'عالم بيانات وذكاء اصطناعي', en: 'AI & Data Scientist' }, bio: { ar: 'باحث ومطور في مجال التعلم الآلي، يركز على جعل تكنولوجيا الذكاء الاصطناعي متاحة للجميع.', en: 'A researcher and developer in the field of machine learning, focusing on making AI technology accessible to everyone.' }, avatar: 'https://i.pravatar.cc/150?u=khalid' },
];

const blogPostsData: BlogPost[] = [
    { id: 1, title: { ar: 'خمس اتجاهات ستشكل مستقبل التعليم الإلكتروني', en: 'Five Trends Shaping the Future of E-Learning' }, author: { ar: 'فريق EduPlatform', en: 'EduPlatform Team' }, date: { ar: '١٥ يوليو ٢٠٢٤', en: 'July 15, 2024' }, excerpt: { ar: 'من الذكاء الاصطناعي إلى التعلم المخصص، نستكشف أهم الاتجاهات التي تغير طريقة تعلمنا عبر الإنترنت.', en: 'From AI to personalized learning, we explore the top trends that are changing how we learn online.' } },
    { id: 2, title: { ar: 'كيف تختار الدورة التدريبية المناسبة لمسارك المهني؟', en: 'How to Choose the Right Course for Your Career Path' }, author: { ar: 'علياء منصور', en: 'Alia Mansour' }, date: { ar: '٢ يونيو ٢٠٢٤', en: 'June 2, 2024' }, excerpt: { ar: 'دليلك خطوة بخطوة لتحديد أهدافك المهنية واختيار البرنامج التدريبي الذي سيساعدك على تحقيقها.', en: 'Your step-by-step guide to identifying your career goals and selecting the training program that will help you achieve them.' } },
];


// --- TRANSLATIONS ---
const translations = {
    ar: {
        // General
        logoEnd: "Platform",
        by: "بواسطة:",
        hours: "ساعة",
        price: "السعر:",
        level: "المستوى:",
        duration: "المدة:",
        instructor: "المدرب:",
        totalPayment: "إجمالي الدفع:",
        switchToEnglish: "English",
        // Header
        navHome: "الرئيسية",
        navCourses: "البرامج والدورات",
        navInstructors: "المدربون",
        navBlog: "المدونة",
        dashboardAdmin: "إدارة النظام",
        dashboardStudent: "لوحة الطالب",
        logout: "تسجيل خروج",
        loginStudent: "تسجيل دخول كطالب",
        loginAdmin: "مسؤول النظام",
        // Home View
        homeTitle: "مستقبلك يبدأ من هنا",
        homeSubtitle: "منصة تعليمية متكاملة توفر لك أحدث البرامج التدريبية المعتمدة في مختلف المستويات، مع شهادات إكمال قابلة للتصميم.",
        homeExploreButton: "استكشف الدورات الآن",
        homeCertificatesTitle: "📜 شهادات معتمدة وقابلة للطباعة",
        homeCertificateCardTitle: "شهادة إكمال الدورة",
        homeCertificateCardSubtitle: "تصميم تلقائي بالاسم والمستوى.",
        homePreviewDesignButton: "معاينة التصميم",
        homeInstructorsCardTitle: "صفحة المدربين الجذابة",
        homeInstructorsCardSubtitle: "تعرض نبذة عن المدربين وخبراتهم.",
        homeViewPageButton: "عرض الصفحة",
        // Courses View
        coursesTitle: "جميع البرامج التدريبية المتاحة",
        courseDetailsButton: "عرض التفاصيل / التسجيل",
        // Course Detail View
        backToCourses: "العودة إلى الدورات",
        alreadyEnrolled: "✅ أنت مسجل بالفعل في هذه الدورة!",
        goToDashboard: "اذهب إلى لوحة الطالب",
        enrollmentTitle: "التسجيل والشراء",
        couponPlaceholder: "أدخل كوبون الخصم (محاكاة)",
        applyButton: "تطبيق",
        checkoutButton: "الانتقال إلى الدفع الآمن",
        paymentGateways: "ندعم Paymob, PayTabs, PayPal وجميع البطاقات المحلية والدولية.",
        // Checkout View
        checkoutTitle: "صفحة الدفع الآمنة (محاكاة)",
        courseLabel: "الدورة:",
        totalLabel: "الإجمالي:",
        payWithCard: "الدفع ببطاقة مدى / فيزا (PayTabs/Paymob)",
        payWithPayPal: "PayPal (محاكاة الربط الدولي)",
        completePaymentButton: "إكمال الدفع بنجاح",
        sslProtected: "تم حماية هذه الصفحة ببروتوكولات SSL.",
        // Dashboard View
        dashboardAdminTitle: "لوحة تحكم المسؤول",
        dashboardStudentTitle: "لوحة تحكم الطالب",
        kpiRevenue: "إجمالي الإيرادات (شهري)",
        kpiNewStudents: "الطلاب الجدد المسجلون",
        kpiCompletionRate: "معدل إكمال الدورات",
        kpiRevenueChangeUp: "+18% عن الشهر الماضي",
        kpiNewStudentsChangeDown: "-5% عن الشهر الماضي",
        kpiCompletionRateChangeUp: "تحسن طفيف",
        systemManagementTitle: "إدارة النظام",
        manageUsers: "إدارة المعلمين/الطلاب",
        manageTests: "إنشاء / مراجعة اختبارات",
        salesReports: "تقارير المبيعات (WooCommerce)",
        seoSettings: "إعدادات SEO والميتا",
        welcomeStudent: "أهلاً بك،",
        enrolledCoursesTitle: "الدورات المسجل بها",
        startLearning: "بدء التعلم (متابعة)",
        noCoursesEnrolled: "لم يتم التسجيل في أي دورة بعد.",
        browseCoursesLink: "ابدأ التصفح",
        progressTrackingTitle: "ملف التقدم (Progress Tracking)",
        avgCompletion: "متوسط الإكمال:",
        lastReviewed: "آخر مراجعة للدرس: قبل 3 أيام",
        // Instructors View
        instructorsTitle: "تعرف على مدربينا الخبراء",
        instructorsSubtitle: "نحن نفخر بوجود فريق من المهنيين ذوي الخبرة العالية والمتحمسين لمشاركة معارفهم.",
        // Blog View
        blogTitle: "أحدث المقالات من مدونتنا",
        blogSubtitle: "ابق على اطلاع بآخر الأخبار والاتجاهات والنصائح في عالم التعليم الإلكتروني.",
        readMore: "اقرأ المزيد",
        // Messages
        loginStudentSuccess: "تم تسجيل الدخول كطالب. يمكنك الآن تتبع تقدمك.",
        loginAdminSuccess: "تم تسجيل الدخول كمسؤول النظام.",
        logoutSuccess: "تم تسجيل الخروج بنجاح.",
        purchaseSuccess: "✅ تهانينا! تم التسجيل بنجاح في دورة {courseTitle}. يمكنك الآن البدء.",
        simulatedAccess: "تم محاكاة الوصول لصفحة {pageName}",
        simulatedCertificate: "تم محاكاة توليد الشهادة القابلة للطباعة",
        simulatedDiscount: "تم محاكاة تطبيق الخصم",
        simulatedLesson: "تم محاكاة الدخول لصفحة الدرس",
    },
    en: {
        // General
        logoEnd: "Platform",
        by: "By:",
        hours: "hours",
        price: "Price:",
        level: "Level:",
        duration: "Duration:",
        instructor: "Instructor:",
        totalPayment: "Total Payment:",
        switchToEnglish: "العربية",
        // Header
        navHome: "Home",
        navCourses: "Programs & Courses",
        navInstructors: "Instructors",
        navBlog: "Blog",
        dashboardAdmin: "Admin Panel",
        dashboardStudent: "Student Dashboard",
        logout: "Logout",
        loginStudent: "Login as Student",
        loginAdmin: "System Admin",
        // Home View
        homeTitle: "Your Future Starts Here",
        homeSubtitle: "An integrated educational platform providing you with the latest accredited training programs at various levels, with designable completion certificates.",
        homeExploreButton: "Explore Courses Now",
        homeCertificatesTitle: "📜 Accredited & Printable Certificates",
        homeCertificateCardTitle: "Course Completion Certificate",
        homeCertificateCardSubtitle: "Automatically designed with name and level.",
        homePreviewDesignButton: "Preview Design",
        homeInstructorsCardTitle: "Attractive Instructors Page",
        homeInstructorsCardSubtitle: "Showcases a profile of instructors and their expertise.",
        homeViewPageButton: "View Page",
        // Courses View
        coursesTitle: "All Available Training Programs",
        courseDetailsButton: "View Details / Enroll",
        // Course Detail View
        backToCourses: "Back to Courses",
        alreadyEnrolled: "✅ You are already enrolled in this course!",
        goToDashboard: "Go to Student Dashboard",
        enrollmentTitle: "Enrollment and Purchase",
        couponPlaceholder: "Enter discount coupon (simulation)",
        applyButton: "Apply",
        checkoutButton: "Proceed to Secure Checkout",
        paymentGateways: "We support Paymob, PayTabs, PayPal, and all local and international cards.",
        // Checkout View
        checkoutTitle: "Secure Checkout (Simulation)",
        courseLabel: "Course:",
        totalLabel: "Total:",
        payWithCard: "Pay with Mada / Visa (PayTabs/Paymob)",
        payWithPayPal: "PayPal (International Integration Simulation)",
        completePaymentButton: "Complete Payment Successfully",
        sslProtected: "This page is protected by SSL protocols.",
        // Dashboard View
        dashboardAdminTitle: "Administrator Control Panel",
        dashboardStudentTitle: "Student Control Panel",
        kpiRevenue: "Total Revenue (Monthly)",
        kpiNewStudents: "New Registered Students",
        kpiCompletionRate: "Course Completion Rate",
        kpiRevenueChangeUp: "+18% from last month",
        kpiNewStudentsChangeDown: "-5% from last month",
        kpiCompletionRateChangeUp: "Slight improvement",
        systemManagementTitle: "System Management",
        manageUsers: "Manage Teachers/Students",
        manageTests: "Create / Review Tests",
        salesReports: "Sales Reports (WooCommerce)",
        seoSettings: "SEO & Meta Settings",
        welcomeStudent: "Welcome,",
        enrolledCoursesTitle: "Enrolled Courses",
        startLearning: "Start Learning (Continue)",
        noCoursesEnrolled: "Not enrolled in any course yet.",
        browseCoursesLink: "Start Browsing",
        progressTrackingTitle: "Progress Tracking",
        avgCompletion: "Average Completion:",
        lastReviewed: "Last lesson reviewed: 3 days ago",
        // Instructors View
        instructorsTitle: "Meet Our Expert Instructors",
        instructorsSubtitle: "We pride ourselves on having a team of highly experienced professionals who are passionate about sharing their knowledge.",
        // Blog View
        blogTitle: "Latest Articles From Our Blog",
        blogSubtitle: "Stay up-to-date with the latest news, trends, and tips in the world of e-learning.",
        readMore: "Read More",
        // Messages
        loginStudentSuccess: "Logged in as a student. You can now track your progress.",
        loginAdminSuccess: "Logged in as System Administrator.",
        logoutSuccess: "Successfully logged out.",
        purchaseSuccess: "✅ Congratulations! You have successfully enrolled in {courseTitle}. You can start now.",
        simulatedAccess: "Simulated access to {pageName} page.",
        simulatedCertificate: "Simulated generation of a printable certificate.",
        simulatedDiscount: "Simulated discount application.",
        simulatedLesson: "Simulated entry to the lesson page.",
    }
};

const App: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [language, setLanguage] = useState<Language>('ar');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>(initialCoursesData);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- TRANSLATION HELPER ---
  const t = useCallback((key: keyof typeof translations.ar, replacements: Record<string, string> = {}) => {
      let text = translations[language][key] || key;
      Object.keys(replacements).forEach(rKey => {
        text = text.replace(`{${rKey}}`, replacements[rKey]);
      });
      return text;
  }, [language]);

  // --- LANGUAGE & DOM EFFECTS ---
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    setLanguage(browserLang === 'en' ? 'en' : 'ar');
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);


  // --- DERIVED STATE ---
  const enrolledCourses = useMemo(() => courses.filter(c => c.isEnrolled), [courses]);
  
  // --- UTILITY & HANDLER FUNCTIONS ---
  const showMessage = (text: string, type: Message['type']) => {
    const id = Date.now();
    setMessages(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== id));
    }, 6000);
  };

  const setView = (view: View) => {
    setCurrentView(view);
    setSelectedCourse(null);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };
  
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'ar' ? 'en' : 'ar');
  };

  const viewCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('courseDetail');
    window.scrollTo(0, 0);
  };

  const loginAs = (role: 'student' | 'admin') => {
    if (role === 'student') {
      setCurrentUser({ id: 'user-001', name: 'علي المحمد', role: 'student' });
      showMessage(t('loginStudentSuccess'), 'success');
      setView('dashboard');
    } else {
      setCurrentUser({ id: 'admin-001', name: 'فاطمة مديرة النظام', role: 'admin' });
      showMessage(t('loginAdminSuccess'), 'success');
      setView('dashboard');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setView('home');
    showMessage(t('logoutSuccess'), 'info');
  };

  const completePurchase = () => {
    if (selectedCourse) {
      setCourses(prevCourses => prevCourses.map(c => 
        c.id === selectedCourse.id ? { ...c, isEnrolled: true } : c
      ));
      
      if (!currentUser) {
        setCurrentUser({ id: 'user-001', name: 'علي المحمد', role: 'student' });
      }
      showMessage(t('purchaseSuccess', { courseTitle: selectedCourse.title[language] }), 'success');
      setView('dashboard');
    }
  };
  
  const formatCurrency = useCallback((price: number) => {
    const options = { 
        style: 'currency', 
        currency: language === 'ar' ? 'SAR' : 'USD', 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
    };
    const locale = language === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale, options).format(price);
  }, [language]);

  // --- STYLING HELPERS ---
  const getNavLinkClass = (view: View) => 
    `transition py-2 ${currentView === view ? 'text-white border-b-2 border-[#fcd34d] font-bold' : 'text-gray-300 hover:text-white'}`;
  
  const getNavLinkClassMobile = (view: View) => 
    `transition py-1 px-2 ${currentView === view ? 'text-white font-bold bg-[#1a3478] rounded-md' : 'text-gray-300 hover:text-white'}`;
    
  const getLevelBadgeClass = (level: Course['level']) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-100 text-blue-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // --- RENDER LOGIC ---
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 border-t-4 border-[#1e3a8a]">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e3a8a] mb-4">{t('homeTitle')}</h2>
              <p className="text-xl text-gray-600 mb-6 max-w-3xl">{t('homeSubtitle')}</p>
              <button onClick={() => setView('courses')} className="bg-[#fcd34d] text-gray-900 text-lg font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-[#eab308] transition duration-300">
                {t('homeExploreButton')}
              </button>
            </div>
            
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{t('homeCertificatesTitle')}</h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 w-full md:w-72">
                  <p className="font-bold text-green-700">{t('homeCertificateCardTitle')}</p>
                  <p className="text-sm text-gray-600">{t('homeCertificateCardSubtitle')}</p>
                  <button onClick={() => showMessage(t('simulatedCertificate'), 'success')} className="mt-3 text-xs text-[#1e3a8a] font-semibold hover:underline">
                    {t('homePreviewDesignButton')}
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500 w-full md:w-72">
                  <p className="font-bold text-indigo-700">{t('homeInstructorsCardTitle')}</p>
                  <p className="text-sm text-gray-600">{t('homeInstructorsCardSubtitle')}</p>
                  <button onClick={() => setView('instructors')} className="mt-3 text-xs text-[#1e3a8a] font-semibold hover:underline">
                    {t('homeViewPageButton')}
                  </button>
                </div>
              </div>
            </section>
          </>
        );
      case 'courses':
        return (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">{t('coursesTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map(course => (
                <div key={course.id} className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-200">
                  <div className="p-6">
                    <span className={`${getLevelBadgeClass(course.level)} text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block`}>{course.level}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title[language]}</h3>
                    <p className="text-sm text-gray-500 mb-4">{t('by')} {course.instructor[language]}</p>
                    <div className="flex justify-between items-center text-gray-700 text-sm mb-4">
                      <span>{course.duration} {t('hours')}</span>
                      <span className="font-bold text-lg text-green-600">{formatCurrency(course.price)}</span>
                    </div>
                    <button onClick={() => viewCourse(course)} className="w-full bg-[#1e3a8a] text-white py-2 rounded-lg font-semibold hover:bg-[#1a3478] transition">
                      {t('courseDetailsButton')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
    case 'instructors':
        return (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('instructorsTitle')}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('instructorsSubtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructorsData.map(instructor => (
                <div key={instructor.id} className="bg-white rounded-xl shadow-xl text-center p-8 border border-gray-200 hover:shadow-2xl transition duration-300">
                  <img src={instructor.avatar} alt={instructor.name[language]} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200" />
                  <h3 className="text-xl font-bold text-gray-900">{instructor.name[language]}</h3>
                  <p className="text-sm text-[#1e3a8a] font-semibold mb-3">{instructor.title[language]}</p>
                  <p className="text-gray-600 text-sm">{instructor.bio[language]}</p>
                </div>
              ))}
            </div>
          </>
        );
    case 'blog':
        return (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('blogTitle')}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('blogSubtitle')}</p>
            </div>
            <div className="space-y-8 max-w-4xl mx-auto">
              {blogPostsData.map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{post.title[language]}</h3>
                  <p className="text-sm text-gray-500 mb-4">{t('by')} {post.author[language]} - {post.date[language]}</p>
                  <p className="text-gray-700 mb-6">{post.excerpt[language]}</p>
                  <button className="text-[#1e3a8a] font-semibold hover:underline">{t('readMore')}</button>
                </div>
              ))}
            </div>
          </>
        );
      case 'courseDetail':
        if (!selectedCourse) return null;
        return (
          <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl">
            <button onClick={() => setView('courses')} className="text-[#1e3a8a] mb-6 flex items-center text-sm font-semibold">
              <svg className="w-4 h-4 me-1 ms-1 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={language === 'ar' ? { transform: 'rotate(180deg)'} : {}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              {t('backToCourses')}
            </button>
            <h2 className="text-3xl font-extrabold text-[#1e3a8a] mb-4">{selectedCourse.title[language]}</h2>
            <p className="text-lg text-gray-600 mb-6">{selectedCourse.description[language]}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
              <p><span className="font-semibold">{t('instructor')}</span> {selectedCourse.instructor[language]}</p>
              <p><span className="font-semibold">{t('level')}</span> {selectedCourse.level}</p>
              <p><span className="font-semibold">{t('duration')}</span> {selectedCourse.duration} {t('hours')}</p>
              <p><span className="font-semibold">{t('price')}</span> {formatCurrency(selectedCourse.price)}</p>
            </div>
            {selectedCourse.isEnrolled ? (
              <div className="p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg text-lg font-semibold">
                {t('alreadyEnrolled')}
                <button onClick={() => setView('dashboard')} className="text-sm mt-2 block underline text-green-700">{t('goToDashboard')}</button>
              </div>
            ) : (
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t('enrollmentTitle')}</h3>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-semibold text-lg">{t('totalPayment')}</p>
                  <p className="text-2xl font-extrabold text-[#1e3a8a]">{formatCurrency(selectedCourse.price)}</p>
                </div>
                <div className="mb-4">
                  <input type="text" placeholder={t('couponPlaceholder')} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fcd34d]" />
                  <button onClick={() => showMessage(t('simulatedDiscount'), 'info')} className="mt-2 text-sm text-[#1e3a8a] hover:underline">{t('applyButton')}</button>
                </div>
                <button onClick={() => setView('checkout')} className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition">
                  {t('checkoutButton')}
                </button>
                <p className="text-xs text-center text-gray-500 mt-3">{t('paymentGateways')}</p>
              </div>
            )}
          </div>
        );
      case 'checkout':
         return (
             <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-red-600">
                <h2 className="text-3xl font-extrabold text-red-600 mb-6">{t('checkoutTitle')}</h2>
                <div className="p-4 bg-gray-100 rounded-lg mb-6">
                    <p className="text-sm font-semibold text-gray-700">{t('courseLabel')}</p>
                    <p className="text-xl font-bold text-gray-900">{selectedCourse?.title[language]}</p>
                    <p className="text-3xl font-extrabold text-green-600 mt-2">{t('totalLabel')} {formatCurrency(selectedCourse?.price || 0)}</p>
                </div>
                <div className="space-y-4">
                    <button className="w-full flex items-center justify-center p-3 border-2 border-indigo-500 rounded-lg bg-indigo-50 font-bold text-indigo-700 hover:bg-indigo-100 transition">
                        <svg className="w-6 h-6 mx-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z"></path></svg>
                        {t('payWithCard')}
                    </button>
                    <button className="w-full flex items-center justify-center p-3 border-2 border-blue-500 rounded-lg bg-blue-50 font-bold text-blue-700 hover:bg-blue-100 transition">
                        <svg className="w-6 h-6 mx-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z"></path></svg>
                        {t('payWithPayPal')}
                    </button>
                    <button onClick={completePurchase} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition mt-6">
                        {t('completePaymentButton')}
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-3">{t('sslProtected')}</p>
                </div>
             </div>
          );
      case 'dashboard':
        return (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {currentUser?.role === 'admin' ? t('dashboardAdminTitle') : t('dashboardStudentTitle')}
            </h2>
            {currentUser?.role === 'admin' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-lg border-b-4 border-red-500"><p className="text-sm font-medium text-gray-500">{t('kpiRevenue')}</p><p className="text-3xl font-extrabold text-gray-900 mt-1">125,500 {language === 'ar' ? 'ر.س' : 'SAR'}</p><span className="text-sm text-green-600 font-semibold">{t('kpiRevenueChangeUp')}</span></div>
                  <div className="bg-white p-6 rounded-xl shadow-lg border-b-4 border-indigo-500"><p className="text-sm font-medium text-gray-500">{t('kpiNewStudents')}</p><p className="text-3xl font-extrabold text-gray-900 mt-1">840</p><span className="text-sm text-red-600 font-semibold">{t('kpiNewStudentsChangeDown')}</span></div>
                  <div className="bg-white p-6 rounded-xl shadow-lg border-b-4 border-green-500"><p className="text-sm font-medium text-gray-500">{t('kpiCompletionRate')}</p><p className="text-3xl font-extrabold text-gray-900 mt-1">72%</p><span className="text-sm text-green-600 font-semibold">{t('kpiCompletionRateChangeUp')}</span></div>
                </div>
                <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{t('systemManagementTitle')}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button onClick={() => showMessage(t('simulatedAccess', {pageName: t('manageUsers')}), 'info')} className="bg-gray-100 text-gray-800 p-3 rounded-lg hover:bg-gray-200 transition text-sm">{t('manageUsers')}</button>
                    <button onClick={() => showMessage(t('simulatedAccess', {pageName: t('manageTests')}), 'info')} className="bg-gray-100 text-gray-800 p-3 rounded-lg hover:bg-gray-200 transition text-sm">{t('manageTests')}</button>
                    <button onClick={() => showMessage(t('simulatedAccess', {pageName: t('salesReports')}), 'info')} className="bg-gray-100 text-gray-800 p-3 rounded-lg hover:bg-gray-200 transition text-sm">{t('salesReports')}</button>
                    <button onClick={() => showMessage(t('simulatedAccess', {pageName: t('seoSettings')}), 'info')} className="bg-gray-100 text-gray-800 p-3 rounded-lg hover:bg-gray-200 transition text-sm">{t('seoSettings')}</button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <p className="text-xl font-semibold text-gray-700 mb-4">{t('welcomeStudent')} {currentUser?.name}</p>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{t('enrolledCoursesTitle')}</h3>
                {enrolledCourses.length > 0 ? (
                  enrolledCourses.map(course => (
                    <div key={course.id} className="flex justify-between items-center p-4 mb-3 border-b border-gray-100">
                      <div><p className="font-bold text-lg text-[#1e3a8a]">{course.title[language]}</p><p className="text-sm text-gray-500">{t('instructor')} {course.instructor[language]}</p></div>
                      <button onClick={() => showMessage(t('simulatedLesson'), 'info')} className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition">{t('startLearning')}</button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">{t('noCoursesEnrolled')} <button onClick={() => setView('courses')} className="text-indigo-600 underline">{t('browseCoursesLink')}</button></p>
                )}
                <div className="mt-6 border-t pt-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{t('progressTrackingTitle')}</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{t('avgCompletion')} <span className="font-bold text-[#1e3a8a]">65%</span></p>
                    <p className="text-sm text-gray-600">{t('lastReviewed')}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        );
       default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-[#1e3a8a] shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-white text-2xl font-extrabold cursor-pointer" onClick={() => setView('home')}>
                <span className="text-[#fcd34d]">Edu</span>{t('logoEnd')}
              </span>
            </div>
            <nav className="hidden md:flex space-x-8 rtl:space-x-reverse text-sm font-medium">
              <button onClick={() => setView('home')} className={getNavLinkClass('home')}>{t('navHome')}</button>
              <button onClick={() => setView('courses')} className={getNavLinkClass('courses')}>{t('navCourses')}</button>
              <button onClick={() => setView('instructors')} className={getNavLinkClass('instructors')}>{t('navInstructors')}</button>
              <button onClick={() => setView('blog')} className={getNavLinkClass('blog')}>{t('navBlog')}</button>
            </nav>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button onClick={toggleLanguage} className="text-gray-300 hover:text-white transition text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-700">{t('switchToEnglish')}</button>
              {currentUser ? (
                <>
                  <button onClick={() => setView('dashboard')} className="flex items-center bg-[#fcd34d] text-gray-900 px-3 py-1.5 rounded-full text-sm font-semibold shadow-md hover:bg-[#eab308] transition">
                    <svg className="w-5 h-5 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H9a1 1 0 01-1-1v-1a6 6 0 016-6h.027M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {currentUser.role === 'admin' ? t('dashboardAdmin') : t('dashboardStudent')}
                  </button>
                  <button onClick={logout} className="text-gray-400 hover:text-white text-sm hidden sm:block">{t('logout')}</button>
                </>
              ) : (
                <>
                  <button onClick={() => loginAs('student')} className="bg-white text-[#1e3a8a] px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition">{t('loginStudent')}</button>
                  <button onClick={() => loginAs('admin')} className="bg-gray-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-600 transition hidden sm:block">{t('loginAdmin')}</button>
                </>
              )}
            </div>
             <div className="flex md:hidden">
                <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
          </div>
        </div>
         {isMobileMenuOpen && (
            <div className="md:hidden bg-[#1e3a8a] p-2 text-center border-t border-gray-700">
                <nav className="flex flex-col space-y-2 text-sm font-medium">
                    <button onClick={() => setView('home')} className={getNavLinkClassMobile('home')}>{t('navHome')}</button>
                    <button onClick={() => setView('courses')} className={getNavLinkClassMobile('courses')}>{t('navCourses')}</button>
                    <button onClick={() => setView('instructors')} className={getNavLinkClassMobile('instructors')}>{t('navInstructors')}</button>
                    <button onClick={() => setView('blog')} className={getNavLinkClassMobile('blog')}>{t('navBlog')}</button>
                </nav>
            </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {renderView()}
      </main>

      {/* Message Box Container */}
      <div className={`fixed bottom-4 z-[100] w-full max-w-xs ${language === 'ar' ? 'left-4' : 'right-4'}`}>
        {messages.map(msg => {
          const styles = {
            success: { bg: 'bg-green-600', icon: '✅' },
            info: { bg: 'bg-blue-600', icon: 'ℹ️' },
            error: { bg: 'bg-red-600', icon: '❌' },
          };
          return (
            <div key={msg.id} className={`${styles[msg.type].bg} p-4 rounded-xl shadow-xl text-white font-semibold mb-3 transition-all duration-300 flex items-center ${language === 'ar' ? 'justify-end text-right' : 'justify-start text-left'}`}>
               <span className={language === 'ar' ? 'order-1' : 'order-2'}>{msg.text}</span>
               <span className={language === 'ar' ? 'ml-2 order-2' : 'mr-2 order-1'}>{styles[msg.type].icon}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;