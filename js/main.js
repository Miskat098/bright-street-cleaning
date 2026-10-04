// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Booking Form Handler
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = bookingForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending...';

    const data = {
        name: bookingForm.name.value.trim(),
        phone: bookingForm.phone.value.trim(),
        service: bookingForm.service.value
    };

    try {
        const res = await fetch('http://localhost:3000/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();

        if (res.ok) {
            alert('Thank you! We will contact you soon.');
            bookingForm.reset();
        } else {
            alert(result.message || 'Something went wrong, please try again.');
        }
    } catch (err) {
        alert('Could not connect to the server.');
    } finally {
        btn.disabled = false;
        btn.textContent = originalText;
    }
});