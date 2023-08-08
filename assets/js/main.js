var mux = 10;
var regex = /^[A-Za-z\s]+$/; // Expressão regular para letras maiúsculas, minúsculas e espaços em branco


function verificaDigit(sumCpfNums) {
    let digit = 11 - (sumCpfNums % 11);
    // console.log(digit);
    //Se o digito for maior que 9, retorna 0, senão, retorna o proprio digito
    return digit > 9 ? 0 : digit;
}

function sumDigits(cpfNums, mux) {

    let valueMux = mux;

    //Ajustando multiplicador para o segundo digito
    if (cpfNums.length === 10) valueMux += 1;

    return cpfNums.reduce((acumulador, value, index, arr) => {
        // console.log(`A conta é ${value} * ${valueMux}`);
        acumulador += (value * valueMux);
        // console.log(acumulador);
        valueMux--;
        return acumulador;
    }, 0); // Valor inicial do acumulador
}

function calculaCpf(cpfBruto) {

    //Formatando CPF
    const cpfLimpo = cpfBruto.replace(/\./g, '');
    //Separando em um vetor com cada digito/caractere
    const cpfArr = cpfLimpo.split('');
    // Cortando o CPF no traço dos ultimos dois digitos
    let cpfSliced = cpfArr.slice(0, cpfArr.length - 3);
    // Transformando em Number
    let cpfNums = cpfSliced.map((value) => {
        return Number(value);
    });

    //Fazendo o cálculo da soma + mux dos digitos
    let sumCpfNums = sumDigits(cpfNums, mux);
    // console.log(sumCpfNums);
    //Calculando o penultimo digito
    let penuDigit = verificaDigit(sumCpfNums);
    //Adicionando penultimo digito ao vetor de numeros do cpf
    cpfNums.push(penuDigit);

    //Fazendo o cálculo da soma + mux novamente com mais um digito
    sumCpfNums = sumDigits(cpfNums, mux);
    // console.log(`Soma depois do penultimo digit ser adicionado ${sumCpfNums}`);
    //Calculando o nultimo digito
    let lastDigit = verificaDigit(sumCpfNums);
    // console.log(`ultimo digito: ${lastDigit}`);
    //Adicionando penultimo digito ao vetor de numeros do cpf
    cpfNums.push(lastDigit);

    //Juntando o CPF num numero só para comparar
    const cpfFinal = cpfNums.join('');

    return cpfFinal
}

function formataCpf(cpfBruto) {
    // Tirando ponto e traço do CPF
    const cpfNoPeriod = cpfBruto.replace(/\./g, '');
    const cpfNoDash = cpfNoPeriod.replace(/-/g, '');
    return cpfNoDash
}


function mostraErros(msg) {
    console.log(msg);
}

function createsElement(element) {
    const newElement = document.createElement(element);
    return newElement
}

class Form {
    constructor() {
        this.formulario = document.querySelector('#formulario');
        this.btn1 = document.querySelector('#button');
        this.inputName = document.querySelector('#nome');
        this.divInput = document.querySelector('.user-information');
        this.regexChar = /^[a-zA-Z]+$/;
        this.regexNums = /^[0-9]+$/;
        this.regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        this.regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.password = document.querySelector('#password');
        this.confirmPassword = document.querySelector('#password2');
    }

    isJustNumbers(input) {
        return this.regexNums.test(input.value);
    }
    isJustChar(input) {
        return this.regexChar.test(input.value);
    }
    isJustCpf(input) {
        return this.regexCpf.test(input.value);
    }
    isJustEmail(input) {
        return this.regexEmail.test(input.value);
    }

    calculaCpf(cpfBruto) {

        //Formatando CPF
        const cpfLimpo = cpfBruto.replace(/\./g, '');
        //Separando em um vetor com cada digito/caractere
        const cpfArr = cpfLimpo.split('');
        // Cortando o CPF no traço dos ultimos dois digitos
        let cpfSliced = cpfArr.slice(0, cpfArr.length - 3);
        // Transformando em Number
        let cpfNums = cpfSliced.map((value) => {
            return Number(value);
        });

        //Fazendo o cálculo da soma + mux dos digitos
        let sumCpfNums = sumDigits(cpfNums, mux);
        // console.log(sumCpfNums);
        //Calculando o penultimo digito
        let penuDigit = verificaDigit(sumCpfNums);
        //Adicionando penultimo digito ao vetor de numeros do cpf
        cpfNums.push(penuDigit);

        //Fazendo o cálculo da soma + mux novamente com mais um digito
        sumCpfNums = sumDigits(cpfNums, mux);
        // console.log(`Soma depois do penultimo digit ser adicionado ${sumCpfNums}`);
        //Calculando o nultimo digito
        let lastDigit = verificaDigit(sumCpfNums);
        // console.log(`ultimo digito: ${lastDigit}`);
        //Adicionando penultimo digito ao vetor de numeros do cpf
        cpfNums.push(lastDigit);

        //Juntando o CPF num numero só para comparar
        const cpfFinal = cpfNums.join('');

        return cpfFinal
    }

    formataCpf(cpfBruto) {
        // Tirando ponto e traço do CPF
        // console.log(`CPF na função: ${cpfBruto}`);
        const cpfNoPeriod = cpfBruto.replace(/\./g, '');
        const cpfNoDash = cpfNoPeriod.replace(/-/g, '');
        return cpfNoDash
    }

    //métodos
    start() {
        this.formulario.addEventListener('submit', event => {

            this.handleSubmit(event);
        });
    }

    existsParagraph(parent) {
        // se for diferente de null, existe ja uma mensagem de erro
        if (parent.querySelector('p') !== null) return true;
        //senão retorna falso
        return false;
    }

    takesLabel(parent) {
        const label = parent.querySelector('label');
        return label.innerHTML;
    }

    checksInput(input) {

        //pai do elemento
        const parent = input.parentElement;
        //pega o label correspondente
        const label = this.takesLabel(parent);
        let password, confirmPassword;
        let isValid = false;

        //verifica se já existe um <p> na div antes de cria-la
        const errorAlreadyExists = this.existsParagraph(parent);
        if (errorAlreadyExists) {
            //Se já existe uma mensagem de erro, delete-a e substitua pela nova
            const elementToRemove = parent.querySelector('p');
            elementToRemove.remove();
            // return
        }

        //Verificando se tá vazio
        if (!input.value) {
            this.showError(`Erro! o campo ${label} está vazio.`, input, parent);
            return isValid
        }

        //Colocar um IF se for o campo do nome
        if (label == 'Nome Completo') {
            if (!this.isJustChar(input)) {

                this.showError(`O ${label} deve ter apenas letras!`, input, parent);
                return isValid
            }
            if (input.value.length < 3 || input.value.length > 12) {
                this.showError(`O ${label} deve ter entre 3 a 12 letras!`, input, parent);
                return isValid
            }
        }
        if (label == 'CPF') {
            if (!this.isJustCpf(input)) {
                // console.log("CHEGUEI NO CPF");
                this.showError(`O ${label} deve estar no formato 000.000.000-00`, input, parent);
                return isValid
            }
            const cpfFormatado = formataCpf(input.value);
            const cpfFinal = calculaCpf(input.value);
            if (cpfFormatado != cpfFinal) {
                this.showError(`${label} inválido!`, input, parent);
                return isValid
            }

        }
        if (label == 'Email') {
            if (!this.isJustEmail(input)) {
                this.showError(`O ${label} está no formato inválido!`, input, parent);
                return isValid
            }
        }

        if (label == 'Senha' || label == 'Confirme sua senha') {

            // password = input.value;
            if (input.value.length < 3 || input.value.length > 8) {
                this.showError(`Sua senha deve ter entre 3 a 8 caracteres!`, input, parent);
                return isValid
            }

            // confirmPassword = input.value;
            if (input.value.length < 3 || input.value.length > 8) {
                this.showError(`Sua senha deve ter entre 3 a 8 caracteres!`, input, parent);
                return isValid
            }
            if (this.password.value != this.confirmPassword.value) {
                this.showError(`Suas senhas estão diferentes uma da outra!`, input, parent);
                return isValid
            }

        }

        //FIM DA VERIFICAÇÃO
        isValid = true;
        return isValid

    }


    inputIsValid() {
        let isValid = true;
        //função pra ver se os campos estão vazios  

        for (let errorMsg of this.formulario.querySelectorAll('.error-message')) {
            errorMsg.remove();
        }

        for (let input of this.formulario.querySelectorAll('.data-input')) {

            //VERIFICAÇÂO
            //pai do elemento
            const parent = input.parentElement;
            // console.log(input);
            // console.log(parent);

            //pega o label correspondente
            const label = this.takesLabel(parent);
            let password, confirmPassword;


            //verifica se já existe um <p> na div antes de cria-la
            const errorAlreadyExists = this.existsParagraph(parent);
            if (errorAlreadyExists) {
                console.log('cheguei aqui no erro existente');
                //Se já existe uma mensagem de erro, delete-a e substitua pela nova
                const elementToRemove = parent.querySelector('p');
                elementToRemove.remove();
                // return
            }

            //Verificando se tá vazio
            if (!input.value) {
                this.showError(`Erro! o campo ${label} está vazio.`, input, parent);
                isValid = false;
            }
            else {
                //Colocar um IF se for o campo do nome
                if (label == 'Nome Completo') {
                    if (!this.isJustChar(input)) {
                        this.showError(`O ${label} deve ter apenas letras!`, input, parent);
                        isValid = false;
                    }
                    else {
                        if (input.value.length < 3 || input.value.length > 12) {
                            this.showError(`O ${label} deve ter entre 3 a 12 letras!`, input, parent);
                            isValid = false;
                        }
                    }
                }
                if (label == 'CPF') {
                    if (!this.isJustCpf(input)) {
                        // console.log("CHEGUEI NO CPF");
                        this.showError(`O ${label} deve estar no formato 000.000.000-00`, input, parent);
                        isValid = false;
                    }
                    else {

                        const cpfFormatado = formataCpf(input.value);
                        const cpfFinal = calculaCpf(input.value);
                        if (cpfFormatado != cpfFinal) {
                            this.showError(`${label} inválido!`, input, parent);
                            isValid = false;
                        }
                    }

                }
                if (label == 'Email') {
                    if (!this.isJustEmail(input)) {
                        this.showError(`O ${label} está no formato inválido!`, input, parent);
                        isValid = false;
                    }
                }

                if (label == 'Senha' || label == 'Confirme sua senha') {

                    // password = input.value;
                    if (input.value.length < 3 || input.value.length > 8) {
                        this.showError(`Sua senha deve ter entre 3 a 8 caracteres!`, input, parent);
                        isValid = false;
                    }

                    // confirmPassword = input.value;
                    if (input.value.length < 3 || input.value.length > 8) {
                        this.showError(`Sua senha deve ter entre 3 a 8 caracteres!`, input, parent);
                        isValid = false;
                    }
                    if (this.password.value != this.confirmPassword.value) {
                        this.showError(`Suas senhas estão diferentes uma da outra!`, input, parent);
                        isValid = false;
                    }

                }
            }



        }
        return isValid

    }

    handleSubmit(event) {
        event.preventDefault();
        const isValid = this.inputIsValid();
        if (isValid) {
            alert("enviado");
            // this.formulario.submit();
        }
    }

    showError(msg, input, parent) {

        const errorMsg = createsElement('p');
        errorMsg.classList.add('error-message');
        //criando erro com a mensagem
        errorMsg.innerHTML = msg;
        //Colocando a mensagem de erro na caixa do pai
        parent.appendChild(errorMsg);
    }

}


const form1 = new Form();
form1.start();

