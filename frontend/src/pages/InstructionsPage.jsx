import { useLanguage } from "../components/LanguageContext.jsx";

const content = {
  ar: {
    title: "تعليمات وشروط مخيم الدفاع",
    subtitle: "يرجى قراءة التعليمات قبل إتمام الحجز للحفاظ على سلامة الزوار وتنظيم المخيم.",
    sections: [
      {
        icon: "📋",
        title: "الضوابط والشروط العامة",
        items: [
          "المحافظة على نظافة المكان والالتزام بإجراءات الأمن والسلامة وعدم إتلاف المحتويات.",
          "يمنع استخدام الألعاب النارية داخل أو خارج الخيمة أو إدخال أي مواد قد تسبب تلفاً.",
          "يمنع استغلال الخيمة لغرض استثماري أو تجاري أو بيع السلع داخلها أو خارجها.",
          "يمنع صعود الزوار إلى المسرح المخصص لإقامة الحفلات أثناء العروض.",
          "لإدارة المخيم الحق في منع الدخول أو إخلاء المخيم في حال مخالفة التعليمات أو التسبب بأي ضرر.",
          "إدارة المخيم غير مسؤولة عن سرقة الممتلكات الخاصة أو تلف السيارات داخل أو خارج المخيم."
        ]
      },
      {
        icon: "🏕️",
        title: "شروط حجز الخيام",
        items: [
          "الحجز مخصص ليوم واحد فقط، ويجب الالتزام بموعد الحجز ومواعيد عمل المخيم.",
          "يجب تقديم إثبات الحجز عند الدخول أو عند طلبه من إدارة المخيم.",
          "في حال عدم تأكيد الحجز أو عدم سداد المبلغ في الموعد المحدد، يحق للإدارة إلغاء الحجز.",
          "يحق لإدارة المخيم إلغاء الحجز للمصلحة العامة مع إبلاغ المستخدم قبل الموعد متى أمكن.",
          "لا يتم استرداد قيمة الحجز عند عدم استخدام الخيمة في يوم الحجز، ويكون المستخدم مسؤولاً عن أي ضرر يحدث للخيمة."
        ]
      },
      {
        icon: "🤝",
        title: "الالتزام بالآداب العامة",
        items: [
          "عدم حمل الأسلحة أو الأدوات الحادة.",
          "عدم إشعال المواد الحارقة أو الألعاب النارية.",
          "عدم قطع الأشجار أو إتلاف الممتلكات العامة.",
          "المحافظة على النظافة العامة.",
          "عدم إدخال الحيوانات أو الشيشة.",
          "عدم لعب الكرة إلا في الساحة المخصصة."
        ]
      },
      {
        icon: "⏰",
        title: "مواعيد مهمة",
        items: [
          "مواعيد دخول المخيم: من الساعة 1:00 ظهراً إلى الساعة 10:00 مساءً.",
          "مواعيد عمل المخيم: من الساعة 12:00 ظهراً إلى الساعة 11:00 مساءً.",
          "مواعيد إدارة المخيم: الأحد إلى الخميس من 9:00 صباحاً إلى 8:00 مساءً، وأيام العطل الرسمية من 1:00 مساءً إلى 7:00 مساءً."
        ]
      }
    ]
  },
  en: {
    title: "Defence Camp Instructions and Rules",
    subtitle: "Please read the instructions before completing your booking to keep the camp safe and organized.",
    sections: [
      {
        icon: "📋",
        title: "General Rules",
        items: [
          "Keep the camp clean, follow safety procedures, and do not damage camp property.",
          "Fireworks and any harmful materials are not allowed inside or outside the tent.",
          "The tent may not be used for investment, commercial activity, or selling goods.",
          "Visitors are not allowed to go on the theater stage during shows.",
          "Camp management may refuse entry or ask visitors to leave if rules are violated or damage is caused.",
          "Camp management is not responsible for lost private belongings or damage to cars inside or outside the camp."
        ]
      },
      {
        icon: "🏕️",
        title: "Tent Booking Conditions",
        items: [
          "Booking is for one day only, and visitors must follow the selected booking time and camp working hours.",
          "A booking confirmation must be shown when entering the camp or when requested by camp staff.",
          "If the booking is not confirmed or paid on time, management may cancel it.",
          "Camp management may cancel bookings for public interest and notify the user when possible.",
          "The booking value is not refunded if the tent is not used on the booking date, and the user is responsible for any tent damage."
        ]
      },
      {
        icon: "🤝",
        title: "Public Conduct",
        items: [
          "Weapons and sharp tools are not allowed.",
          "Burning materials and fireworks are not allowed.",
          "Do not cut trees or damage public property.",
          "Keep the public areas clean.",
          "Animals and shisha are not allowed.",
          "Football is allowed only in the designated play area."
        ]
      },
      {
        icon: "⏰",
        title: "Important Times",
        items: [
          "Camp entry time: 1:00 PM to 10:00 PM.",
          "Camp working hours: 12:00 PM to 11:00 PM.",
          "Camp administration: Sunday to Thursday from 9:00 AM to 8:00 PM, and public holidays from 1:00 PM to 7:00 PM."
        ]
      }
    ]
  }
};

function InstructionsPage() {
  const { language } = useLanguage();
  const page = content[language];

  return (
    <section className="instructions-page">
      <div className="section-heading center-heading">
        <h1>{page.title}</h1>
        <p>{page.subtitle}</p>
      </div>

      <div className="accordion-grid">
        {page.sections.map((section) => (
          <details className="rule-accordion" key={section.title} open>
            <summary>
              <span className="rule-icon">{section.icon}</span>
              <span>{section.title}</span>
            </summary>
            <ol>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </details>
        ))}
      </div>
    </section>
  );
}

export default InstructionsPage;
