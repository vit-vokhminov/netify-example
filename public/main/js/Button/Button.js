import Block from "./Block.js";
// При попытке замены расширения файла с js на ts браузер валится с ошибкой
// Failed to load module script: The server responded with a non-JavaScript MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.
// Я себе все волосы вырвал, не могу понять откуда она берётся.
// с расширением js работает, с расширением ts ошибка

class Button extends Block {
    constructor(props) {
        // Создаём враппер дом-элемент button
        super('div',props);
    }

    render() {
        const { text } = this.props;
        const source = '<button type="submit" class="btn">{{text}}</button>';
        // @ts-ignore
        const template = Handlebars.compile(source);
        return template({ text });
    }
}

export default Button;
