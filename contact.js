const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const subject = formData.get("subject").trim();
    const message = formData.get("message").trim();
    const body = `From: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoUrl = `mailto:georgenjoro@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    formStatus.textContent = "Your email app should open with your message ready to send.";
    window.location.href = mailtoUrl;
});