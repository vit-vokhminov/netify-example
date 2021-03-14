import Button from "./Button.js";
// При попытке замены расширения файла с js на ts браузер валится с ошибкой
// Failed to load module script: The server responded with a non-JavaScript MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.
// Я себе все волосы вырвал, не могу понять откуда она берётся.
// с расширением js работает, с расширением ts ошибка

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}
// @ts-ignore
const button = new Button({
    text: 'Авторизация',
    events: {
        click: event => {
            console.log(event);
        },
    },
});

render("#bt_root", button);

