const WHATSAPP_NUMBER = "919949577511";


function orderProduct(productName, quantityId) {

    const quantityElement = document.getElementById(quantityId);

    const quantity = quantityElement.value;

    const message =
        `Hello Madhavi's Pickle Pot, I want ${quantity} of ${productName}.`;

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
}


document.getElementById("year").textContent =
    new Date().getFullYear();