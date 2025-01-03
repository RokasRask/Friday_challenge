document.getElementById('phone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/[^+\d]/g, '');
    if (value.startsWith('+')) {
        value = value.replace(/\D/g, '').replace(/^(.{3})(.{3})(.{5})$/, '+$1 $2 $3');
    } else {
        value = '+' + value.replace(/\D/g, '').replace(/^(.{3})(.{3})(.{5})$/, '$1 $2 $3');
    }
    e.target.value = value;
});

function validateForm() {
    let isValid = true;
    document.getElementById('successMessage').innerText = '';

    // Vardas
    const name = document.getElementById('name').value;
    const nameError = document.getElementById('nameError');
    if (!/^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]{3,30}$/.test(name)) {
        nameError.innerText = 'Vardas turi būti 3-30 raidžių be skaičių ir specialių simbolių';
        isValid = false;
    } else {
        nameError.innerText = '';
    }

    // El. paštas
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.innerText = 'Įveskite teisingą el. pašto adresą';
        isValid = false;
    } else {
        emailError.innerText = '';
    }

    // Gimimo data
    const birthdate = document.getElementById('birthdate').value;
    const birthdateError = document.getElementById('birthdateError');
    const birthYear = new Date(birthdate).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    if (age < 18 || age > 120 || isNaN(age)) {
        birthdateError.innerText = 'Amžius turi būti tarp 18 ir 120 metų';
        isValid = false;
    } else {
        birthdateError.innerText = '';
    }

    // Telefono numeris
    const phone = document.getElementById('phone').value;
    const phoneError = document.getElementById('phoneError');
    if (!/^\+\d{3} \d{3} \d{5}$/.test(phone)) {
        phoneError.innerText = 'Telefono numeris turi atitikti formatą +xxx xxx xxxxx';
        isValid = false;
    } else {
        phoneError.innerText = '';
    }

    // Slaptažodis
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        passwordError.innerText = 'Slaptažodis turi būti bent 8 simbolių, turėti didžiąją raidę, skaičių ir specialų simbolį';
        isValid = false;
    } else {
        passwordError.innerText = '';
    }

    if (password !== confirmPassword) {
        confirmPasswordError.innerText = 'Slaptažodžiai nesutampa';
        isValid = false;
    } else {
        confirmPasswordError.innerText = '';
    }

    if (isValid) {
        document.getElementById('successMessage').innerText = 'Registracija sėkminga!';
    }
}