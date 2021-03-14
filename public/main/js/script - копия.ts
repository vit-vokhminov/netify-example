console.log('daw')
function showBalloon() {
    let balloon = this.parentElement.querySelector('.balloon');
    balloon.classList.toggle('balloon_show');
}

let balloons = document.querySelectorAll<HTMLInputElement>('.attach_bt,.option_bt');

for (let i = 0; i < balloons.length; i++) {
    balloons[i].onclick = showBalloon;
}

// открытие и скрытие попапов
function openPopup() {
    let attr = this.dataset.popup;
    let popup = document.querySelector(`#${attr}`);
    popup.classList.toggle('hidden');
    popup.addEventListener("click", function(event) {
        // @ts-ignore
        e = event || window.event;
        // @ts-ignore
        if (e.target == this) {
            popup.classList.add("hidden");
        }
    });
}
let popups = document.querySelectorAll<HTMLInputElement>('[data-popup]');

for (let i = 0; i < popups.length; i++) {
    popups[i].onclick = openPopup;
}


// Обработка форм
const forms = document.querySelectorAll<HTMLInputElement>('form');
const validInput = document.querySelectorAll<HTMLInputElement>('.valid');
const inputFile = document.querySelectorAll<HTMLInputElement>('input[type="file"]');

// загрузка файлов
inputFile.forEach(function (el) {
    el.addEventListener('change', function (e) {
        const parentForm = el.closest('form');
        const fileInputText = parentForm.querySelector('.file-input_text');

        fileInputText.textContent = el.files[0].name;
        fileInputText.classList.remove('hidden');
        parentForm.querySelector('label[for="file-input"]').classList.add('hidden');
        parentForm.querySelector('.text_error').classList.add('hidden');
    });
});

// при вводе в valid инпут, скрывать ошибку отсутствия значения
validInput.forEach(function (input) {
    input.addEventListener('input', function (e) {
        if(input.value){
            input.classList.remove('input_error')
        }
    });
});

// submit форм
if (forms) {
    // проверка на равенство паролей
    function validPass(conf_password) {
        const parentForm = conf_password.closest('form');
        const text_error = parentForm.querySelector(`.text_error`);
        const password = parentForm.querySelector(`input[name="password"]`);

        if(password.value !== conf_password.value){
            text_error.classList.remove('hidden');
            return;
        }else{
            text_error.classList.add('hidden');
        }
    }
    forms.forEach(el => {
        el.addEventListener('submit', function (e) {
            e.preventDefault();

            // собираем значения инпутов в объект
            const fData = {};
            el.querySelectorAll('input').forEach(input => {
                if(input.getAttribute("type") === "file"){
                    fData[input.name] = input.files[0];
                }else{
                    fData[input.name] = input.value;
                }
            });

            // проверка равенства паролей при изменении паролей
            if(el.querySelector<HTMLInputElement>(`[name="conf_password"]`)){
                validPass(el.querySelector<HTMLInputElement>(`[name="conf_password"]`))
            }


            const popup = el.closest('.popup');
            if(popup){
                // поведение при submit для попапов загрузки файлов
                if(popup.querySelector<HTMLInputElement>('input[type="file"]')){
                    // @ts-ignore
                    if(fData.file){
                        popup.querySelector<HTMLInputElement>('input[type="file"]').value = "";
                        popup.querySelector<HTMLInputElement>('.file-input_text').innerHTML = "";
                        popup.querySelector<HTMLInputElement>('label[for="file-input"]').classList.remove('hidden');
                    }else{
                        popup.querySelector<HTMLInputElement>('.text_error').classList.remove('hidden');
                        return;
                    }
                }


                let errorFlag = true;
                Object.keys(fData).map((key,i)=>{
                    // проверка на заполненность полей
                    if(fData[key] === ""){
                        popup.querySelector(`input[name="${key}"]`).classList.add('input_error');
                        errorFlag = false;
                    }else{
                        popup.querySelector(`input[name="${key}"]`).classList.remove('input_error');
                    }

                    // проверка равенства паролей при регистрации
                    if(popup.querySelector(`[name="conf_password"]`)){
                        validPass(popup.querySelector(`[name="conf_password"]`))
                    }
                });


                // попап авторизации и регистрации при submit не скрывать
                if(errorFlag) {
                    popup.classList.add('hidden')
                }

            }
            console.log('fData',fData)
        });
    });
};