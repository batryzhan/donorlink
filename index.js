document.addEventListener('DOMContentLoaded', function () {
    const kiru_tuymesі = document.querySelector("#sign-in-btn");
    const tirkelu_tuymesі = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    tirkelu_tuymesі.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
    });

    kiru_tuymesі.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
    });

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            if (form.classList.contains('sign-up-form')) {
                // Тіркеу формасын өңдеу
                const atyZhoniInput = document.getElementById('fullName');
                const emailInput = document.getElementById('signupEmail');
                const qupiyaSozInput = document.getElementById('signupPassword');
                
                if (!emailInput.value.includes('@')) {
                    alert('Дұрыс электрондық пошта мекенжайын енгізіңіз!');
                    return;
                }

                if (qupiyaSozInput.value.length < 8) {
                    alert('Құпия сөз кемінде 8 таңбадан тұруы керек!');
                    return;
                }
                
                // Пайдаланушы деректерін сақтау
                localStorage.setItem('userFullName', atyZhoniInput.value);
                localStorage.setItem('userEmail', emailInput.value);
                
                document.body.classList.add('page-exit');
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 500);
            } else {
                // Кіру формасын өңдеу
                const emailInput = document.getElementById('email');
                const qupiyaSozInput = document.getElementById('password');
                
                if (!emailInput.value.includes('@')) {
                    alert('Дұрыс электрондық пошта мекенжайын енгізіңіз!');
                    return;
                }

                if (qupiyaSozInput.value.length < 8) {
                    alert('Құпия сөз кемінде 8 таңбадан тұруы керек!');
                    return;
                }
                
                document.body.classList.add('page-exit');
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 500);
            }
        });
    });
});
