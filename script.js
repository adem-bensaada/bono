// ضع رقم WhatsApp الخاص بالمحل بصيغة دولية، دون + أو مسافات.
// مثال الجزائر: 2135XXXXXXXX
const BONO_WHATSAPP_NUMBER = "213XXXXXXXXX";

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => navMenu.classList.toggle("open"));
navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

const dateInput = document.querySelector('input[name="date"]');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
dateInput.min = localToday;

document.getElementById("bookingForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = [
    "السلام عليكم، أريد حجز موعد في BONO.",
    `الاسم: ${data.get("name")}`,
    `الهاتف: ${data.get("phone")}`,
    `الخدمة: ${data.get("service")}`,
    `التاريخ: ${data.get("date")}`,
    `الوقت: ${data.get("time")}`,
    `ملاحظة: ${data.get("note") || "لا توجد"}`
  ].join("\n");

  if (BONO_WHATSAPP_NUMBER.includes("X")) {
    document.getElementById("formNote").textContent =
      "قبل استقبال الحجوزات، أضف رقم WhatsApp الحقيقي للمحل داخل ملف script.js مكان 213XXXXXXXXX.";
    return;
  }
  window.open(`https://wa.me/${BONO_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
});
