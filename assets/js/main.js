 class ValidCPF {
  constructor(cpfSent) {
    Object.defineProperty(this, 'clearCpf', {
      writable: false,
      enumerable: false,
      configurable: false,
      value: cpfSent.replace(/\D+/g, '')
    });
  }

  isSequence() {
    return this.clearCpf.charAt(0).repeat(11) === this.clearCpf;
  }

  generatesNewCpf() {
    const cpfWithoutDigits = this.clearCpf.slice(0, -2);
    const digit1 = ValidCPF.generatesDigit(cpfWithoutDigits);
    const digit2 = ValidCPF.generatesDigit(cpfWithoutDigits + digit1);
    this.newCPF = cpfWithoutDigits + digit1 + digit2;
  }

  static generatesDigit(cpfWithoutDigits) {
    let total = 0;
    let reverse = cpfWithoutDigits.length + 1;
    for(let value of cpfWithoutDigits) {
      total += reverse * Number(value);
      reverse--;
    }

    const digit = 11 - (total % 11);
    return digit <= 9 ? String(digit) : '0';
  }

  valid() {
    if(!this.clearCpf) return false;
    if(typeof this.clearCpf !== 'string') return false;
    if(this.clearCpf.length !== 11) return false;
    if(this.isSequence()) return false;
    this.generatesNewCpf();

    return this.newCPF === this.clearCpf;
  }
}

class Form {
  constructor(form) {
    this.form = form;
    this.userInput = form.querySelector('#user');
    this.password = form.querySelector('#password-user');
    this.repeatPassword = form.querySelector('#repeat-password-user');
    this.allInputs = form.querySelectorAll('.input-user');
    this.nameUser = form.querySelector('#name-user');
    this.surnameUser = form.querySelector('#surname-user');
    this.cpfUser = form.querySelector('#cpf-user');
  }

  isValid() {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = this.nameUser.value;
      let regex = /[^A-Za-z]/;
      const foundName = name.match(regex);
      const messageErrorName = form.querySelector('#error-name');
      if(foundName) {
        messageErrorName.textContent = 'Nome só recebe caracteres de Texto.';
        this.nameUser.value = '';
        foundName = [];
      }

      if(!foundName) {
        messageErrorName.textContent = '';
      }

      const surname = this.surnameUser.value;
      const foundSurname = surname.match(regex);
      const messageErrorSurname = form.querySelector('#error-surname');
      if(foundSurname) {
        const messageErrorSurname = form.querySelector('#error-surname');
        messageErrorSurname.textContent = 'Sobrenome só recebe caracteres de Texto.';
        this.surnameUser.value = '';
        foundSurname = [];
      }

      if(!foundSurname) {
        messageErrorSurname.textContent = '';
      }

      // Usuário letras ou números
      const user = this.userInput.value;
      regex = /[^A-Za-z0-9]/;
      const foundUser = user.match(regex);
      const messageErrorUser = form.querySelector('#error-user');
      if(foundUser) {
        messageErrorUser.textContent = 'Usuário só é valido com Numeros e letras!';
        this.userInput.value = '';
        foundUser = [];
        return;
      }

      if(!foundUser) {
        messageErrorUser.textContent = '';
      }

      // Usuário entre 3 e 12 caracteres
      if(this.userInput.value.length < 3 || this.userInput.value.length > 12) {
        messageErrorUser.textContent = 'Usuário entre 3 e 12 caracteres !';
        this.userInput.value = '';
        return;
      } else {
        messageErrorUser.textContent = '';
      }

      // Senha precisa ter 8 e 12 carcteres
      const messageErrorPassword = form.querySelector('#error-password');
      if(this.password.value.length < 8 || this.password.value.length > 12) {
        messageErrorPassword.textContent = 'Senha entre 8 a 12 Caracteres !';
        this.password.value = '';
        return;
      } else {
        messageErrorPassword.textContent = '';
      }

      // Senha repetida é a mesma da senha digitada
      const messageErrorRepeatPassword = form.querySelector('#error-repeat-password');
      if(this.repeatPassword.value !== this.password.value) {
        messageErrorRepeatPassword.textContent = 'As senhas digitadas estão diferentes !';
        this.repeatPassword.value = '';
        return;
      } else {
        messageErrorRepeatPassword.textContent = '';
      }

      // Essa class precisa extender cpf
      const cpf = new ValidCPF(this.cpfUser.value);
      const messageErrorCpf = form.querySelector('#error-cpf');
      if(!cpf.valid()) {
        messageErrorCpf.textContent = 'Cpf não é valido';
      } else {
        messageErrorCpf.textContent = '';
      }
    });
  }
}

// Analisando pra ver se os campos estão vazios
const form = document.querySelector('#form-registration');
const objForm = new Form(form);
objForm.isValid();  // se for valido esse form será enviado

