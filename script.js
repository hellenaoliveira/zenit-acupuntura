const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const form = document.querySelector("#lead-form");
const formNote = document.querySelector("#form-note");
const testimonials = [...document.querySelectorAll(".testimonial-card")];
const carouselButtons = document.querySelectorAll("[data-carousel]");
let activeTestimonial = 0;

navToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const nome = formData.get("nome");
  const telefone = formData.get("telefone");
  const servico = formData.get("servico");
  const mensagem = formData.get("mensagem") || "Sem mensagem adicional";
  const whatsappNumber = "351000000000";
  const text = encodeURIComponent(
    `Olá, sou ${nome}. Gostaria de marcar uma avaliação na Zenit.%0A` +
      `Telefone: ${telefone}%0A` +
      `Serviço: ${servico}%0A` +
      `Mensagem: ${mensagem}`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${text}`;

  sessionStorage.setItem("zenitLeadWhatsappUrl", whatsappUrl);
  formNote.textContent = "Pedido recebido. A encaminhar para a página de confirmação...";
  window.location.href = "obrigado.html";
});

function showTestimonial(index) {
  if (!testimonials.length) return;

  activeTestimonial = (index + testimonials.length) % testimonials.length;
  testimonials.forEach((testimonial, currentIndex) => {
    testimonial.classList.toggle("is-active", currentIndex === activeTestimonial);
  });
}

carouselButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.carousel === "next" ? 1 : -1;
    showTestimonial(activeTestimonial + direction);
  });
});

if (testimonials.length) {
  setInterval(() => showTestimonial(activeTestimonial + 1), 6500);
}
