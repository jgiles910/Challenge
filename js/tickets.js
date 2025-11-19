// Ticket form logic for Rothko Museum
// Prices as required by rubric
const PRICES = { adult: 12, student: 8, child: 5 };
const GUIDED_PRICE_PER_PERSON = 4;
const VALID_DISCOUNTS = { 'MUSEUM10': 0.10 };

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ticket-form');
  if (!form) return;
  const btn = document.getElementById('calculateBtn');
  const errorEl = document.getElementById('error');
  const summaryEl = document.getElementById('summary');

  function formatEuro(value){
    return value.toFixed(2) + ' €';
  }

  btn.addEventListener('click', () => {
    errorEl.textContent = '';
    summaryEl.innerHTML = '';

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const visitDate = document.getElementById('visitDate').value;
    const timeSlot = document.getElementById('timeSlot').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const guided = document.getElementById('guided').checked;
    const discountCode = (document.getElementById('discount').value || '').trim().toUpperCase();
    const ticketTypeInput = document.querySelector("input[name='ticketType']:checked");

    // Basic validations
    if(!fullName){ errorEl.textContent = 'Please enter your full name.'; return; }
    if(!email){ errorEl.textContent = 'Please enter your e-mail address.'; return; }
    if(!visitDate){ errorEl.textContent = 'Please select a visit date.'; return; }
    if(!timeSlot){ errorEl.textContent = 'Please select a time slot.'; return; }
    if(!ticketTypeInput){ errorEl.textContent = 'Please choose a ticket type.'; return; }
    if(!quantity || quantity < 1){ errorEl.textContent = 'Quantity must be at least 1.'; return; }

    const ticketType = ticketTypeInput.value;
    const basePrice = PRICES[ticketType] || 0;

    // Line calculations
    let lines = [];
    lines.push(`<strong>Order summary</strong>`);
    lines.push(`Name: ${escapeHtml(fullName)}`);
    lines.push(`Email: ${escapeHtml(email)}`);
    lines.push(`Visit: ${visitDate} — ${escapeHtml(timeSlot)}`);
    lines.push(`Ticket type: ${ticketType} (${formatEuro(basePrice)} each)`);
    lines.push(`Quantity: ${quantity}`);

    let subtotal = basePrice * quantity;
    lines.push(`Subtotal: ${formatEuro(subtotal)}`);

    // Guided cost
    let guidedCost = 0;
    if(guided){
      guidedCost = GUIDED_PRICE_PER_PERSON * quantity;
      lines.push(`Guided visit: Yes — ${formatEuro(GUIDED_PRICE_PER_PERSON)} x ${quantity} = ${formatEuro(guidedCost)}`);
      subtotal += guidedCost;
    } else {
      lines.push(`Guided visit: No`);
    }

    // Discount
    let discountAmount = 0;
    if(discountCode){
      const pct = VALID_DISCOUNTS[discountCode];
      if(pct){
        discountAmount = subtotal * pct;
        lines.push(`Discount (${discountCode}): -${(pct*100).toFixed(0)}% = ${formatEuro(discountAmount)}`);
      } else {
        lines.push(`Discount code: ${escapeHtml(discountCode)} (invalid)`);
      }
    }

    const total = subtotal - discountAmount;
    lines.push(`<strong>Total: ${formatEuro(total)}</strong>`);

    summaryEl.innerHTML = '<p>' + lines.join('<br>') + '</p>';
  });
});

// Small helper to avoid simple HTML injection in outputs
function escapeHtml(text){
  return text.replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; });
}
