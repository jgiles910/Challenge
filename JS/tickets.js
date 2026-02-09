document.getElementById("calculateFinalPrize").addEventListener("click", function () {

            // DECLARACIONES DE VARIABLES CONSTANTES PARA GESTIONAR ELEMENTOS DEL HTML
            const name = document.getElementById("fname").value.trim();
            const email = document.getElementById("email").value.trim();
            const visit = document.getElementById("visit").value;
            const tslot = document.getElementById("select").value;
            const quantity = parseInt(document.getElementById("quantity").value);
            const guided = document.getElementById("guided").checked;
            const discount = document.getElementById("discount").value.trim();
            const type = document.querySelector("input[name='ticketType']:checked");
            const error = document.getElementById("error");
            const summary = document.getElementById("summary");
            error.textContent = "";
            summary.textContent = "";

            // VALIDACION POR SI NO SE A RELLENADO ALGUN DATO CORRECTAMENTE
            if (!name || !email || !visit || !tslot || !quantity || !type) {
                error.textContent = "You must complete all mandatory fields.";
                return;
            }

            // PRECIOS DE LOS DIFERENTES TICKETS
            let price = 0;
            if (type.value === "adult") {
                price = 12;
            }
            if (type.value === "student") {
                price = 8;
            }
            if (type.value === "child") {
                price = 5;
            }

            // CALCULO DEL TOTAL
            let total = price * quantity;

            // SE AÑADE EL COSTE DE LA GUIA
            if (guided) {
                total += 5;
            }
            // EN CASO DE DESCUENTO SE APLICA EL -10%
            if (discount === "MUSEUM10") {
                total *= 0.9;
            }
            // UNA VEZ REALIZADO LOS CALCULOS SE MUETRA UN PEQUEÑO DESGLOSE DE LOS DATOS INTRODUCIDOS
            summary.innerHTML = `
        <strong style="font-size: 1.5em; display:"block";">Summary:</strong><br><br>
        Name: ${name}<br>
        Email: ${email}<br>
        Tickets: ${quantity} (${type.value})<br>
        Date: ${visit}<br>
        Time slot: ${tslot}<br>
        Guided visit: ${guided ? "Yes" : "No"}<br>
        Total price: ${total.toFixed(2)}€
    `;
            // DISPLAY BLOCK PARA QUE APAREZCA VISIBLE
            document.getElementById("summary").style.display = "block";
        });
