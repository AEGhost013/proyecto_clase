
window.onload = function() {
    const num1 = document.getElementById("num1")
    const num2 = document.getElementById("num2")
    let sumar = document.getElementById("sumar")
    let resultado = document.getElementById("resultado")


    sumar.onclick = function() {
                let a = parseFloat(num1.value)
                let b = parseFloat(num2.value)
        if (Number.isNaN(a) || Number.isNaN(b)) {
            resultado.textContent = "Introduce números válidos."
            return;
        }

        resultado.textContent = "El resultado de la suma es: " + (a + b)
    };
};