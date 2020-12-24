import React from "react";
import styled from "styled-components";
// import numeral from "numeral";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3rem 0;
  max-width: 900px;
  margin: auto;


  h1 {
    font-size: 35px;
    font-weight: 500;
    color: #2a6279;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  h3 {
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    padding: 1rem;
  }

  form {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
`

const InputSection = styled.div`
  width: 46%;
  min-width: 350px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  label {
    text-transform: uppercase;
    font-weight: 400;
    color: grey;
  }

  input {
    background: rgba(255, 255, 255, 0.3);
    height: 35px;
    border: none;
    border-radius: 10px;
    padding: 0 1rem;
    color: #2a6279;
    font-weight: 500;
    margin-top: 1rem;
    box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
    0 6px 6px -1px rgba(8, 11, 14, 0.1);
    transition: all 0.3s ease-in-out;

    &:hover, &:focus {
      box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
      0 10px 10px -1px rgba(8, 11, 14, 0.1);
    }
  }
`

const SubmitBtn = styled.button`
  background-color: #d8a051;
  color: #fff;
  border: none;
  width: 150px;
  height: 36px;
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  letter-spacing: 0.04em;
  line-height: 36px;
  border-radius: 2px;
  cursor: pointer;
  margin: 1rem;
  box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
  0 6px 6px -1px rgba(8, 11, 14, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover, &:focus {
    box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
    0 10px 10px -1px rgba(8, 11, 14, 0.1);;
  }
`

const ResultContainer = styled.div`
display: flex;
flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  max-width: 600px;
  margin: auto;
  color: #2a6279;
  background-color: #fff;
  box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
  0 6px 6px -1px rgba(8, 11, 14, 0.1);
  border-radius: 1rem;
`

const AnchorSection = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 0.5rem;
`

const AnchorBtn = styled.button`
  border: 2px solid black;
  cursor: pointer;
  border-radius: 5px;
  border-color: #d8a051;
  color: grey;
  background-color: transparent;
  &:hover {
    background-color: #d8a051;
    color: white;
  }
`

export default class Fields extends React.Component {
  constructor(props) {
    super(props);
    // numeral.localeData().delimiters.thousands = " ";
    if (localStorage.getItem("stateCalc")) {
      const localState = JSON.parse(localStorage.getItem("stateCalc"));

      this.state = {
        inFocus: false,
        purchasePrice: localState["purchasePrice"],
        downPayment: localState["downPayment"],
        loanTerm: localState["loanTerm"],
        loanApr: localState["loanApr"],

        monthlyPayments: localState["monthlyPayments"],
        loanBody: localState["loanBody"],
        requiredIncome: localState["requiredIncome"],
        overpayment: localState["overpayment"]
      };
    } else {
      this.state = {
        inFocus: false,
        purchasePrice: '',
        downPayment: '',
        loanTerm: '',
        loanApr: '',

        monthlyPayments: '',
        loanBody: '',
        requiredIncome: '',
        overpayment: ''
      };
    }
  }

  saveState(e) {
    e.preventDefault();
    const stateCalc = JSON.stringify(this.state)
    localStorage.setItem("stateCalc", stateCalc);
  }

  cleanRes() {
    this.setState({monthlyPayments: ''});
    this.setState({loanBody: ''});
    this.setState({requiredIncome: ''});
    this.setState({overpayment: ''});
  }

  deleteState(e) {
    e.preventDefault();
    if (localStorage.getItem("stateCalc")) {
      localStorage.clear()
    }
    this.setState({purchasePrice: ''});
    this.setState({downPayment: ''});
    this.setState({loanTerm: ''});
    this.setState({loanApr: ''});
    this.cleanRes()
  }

  trimNum(str) {
    return str.split('').filter((el) => el !== ' ').join('');
  }

  validateFields() {
    const validatedPrice = +this.trimNum(this.state.purchasePrice);
    const validatedPayment = +this.trimNum(this.state.downPayment);
    const validatedLoanTerm = +this.trimNum(this.state.loanTerm);
    const validatedApr = +this.trimNum(this.state.loanApr);
    if (validatedPrice && validatedPayment && validatedLoanTerm && validatedApr) {
        this.calculateValues(validatedPrice, validatedPayment, validatedLoanTerm, validatedApr);
    } else {
     this.cleanRes();
    }
  }

  handleAnchor(e, percent) {
    if (e) {
      e.preventDefault();
    }
    let newDP = this.trimNum(this.state.purchasePrice) * percent / 100;
    this.setState(prevState => ({
      downPayment: newDP.toString(),
    }), () => {
      this.validateFields()
    });
  }

  calculateValues(purchasePrice, downPayment, loanTerm, loanApr) {
    let loanBody = purchasePrice - downPayment;
    let monthlyInterest = loanApr / 100 / 12;
    let numberOfPayments = loanTerm * 12;
    let monthlyPrice = (loanBody * [monthlyInterest * (1 + monthlyInterest) ** numberOfPayments]) /
        [(1 + monthlyInterest) ** numberOfPayments - 1];
    let requiredIncome = monthlyPrice / 3 * 5;
    let overpayment = monthlyPrice * (loanTerm * 12) - purchasePrice + downPayment;
    this.setState({monthlyPayments: this.displayLocale(monthlyPrice)});
    this.setState({loanBody: this.displayLocale(loanBody)});
    this.setState({requiredIncome: this.displayLocale(requiredIncome)});
    this.setState({overpayment: this.displayLocale(overpayment)});

  }

  displayLocale(num) {
    let parts = Math.floor(num).toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (parts[1] ? '.' + parts[1] : '');
  }

  updateField(event) {
    const target = event.target;
    let value =  target.value;
    const name = target.name;
    value = value.split('').filter((el) => el !== ' ').join('');
    this.setState(prevState => ({
      [name]: this.displayLocale(value),
    }), () => {
      this.validateFields();
    });
  }

  render() {
    return (<Container>
        <h1>Калькуляптор ипотеки</h1>
        <form >
          <InputSection>
            <label>Стоимость недвижимости</label>
            <input
              name="purchasePrice"
              value={this.state.purchasePrice}
              onChange={this.updateField.bind(this)}
              type="text"/>
          </InputSection>
          <InputSection>
            <label>Первоначальный взнос</label>
            <input
              name="downPayment"
              value={this.state.downPayment}
              onChange={this.updateField.bind(this)}
              type="text"/>
              <AnchorSection>
                <AnchorBtn onClick={(e) => this.handleAnchor(e, 10)}>10%</AnchorBtn>
                <AnchorBtn onClick={(e) => this.handleAnchor(e, 15)}>15%</AnchorBtn>
                <AnchorBtn onClick={(e) => this.handleAnchor(e, 20)}>20%</AnchorBtn>
                <AnchorBtn onClick={(e) => this.handleAnchor(e, 25)}>25%</AnchorBtn>
                <AnchorBtn onClick={(e) => this.handleAnchor(e, 30)}>30%</AnchorBtn>
              </AnchorSection>
          </InputSection>
          <InputSection>
            <label>Срок кредита (лет)</label>
            <input
              name="loanTerm"
              value={this.state.loanTerm}
              onChange={this.updateField.bind(this)}
              type="text"/>
          </InputSection>
          <InputSection>
            <label>Процентная ставка</label>
            <input
              name="loanApr"
              value={this.state.loanApr}
              onChange={this.updateField.bind(this)}
              type="text"/>
          </InputSection>
          <SubmitBtn id="save" onClick={(e) => this.saveState(e)}>Сохранить</SubmitBtn>
          <SubmitBtn id="delete" onClick={(e) => this.deleteState(e)}>Очистить</SubmitBtn>
        </form>
          <ResultContainer>
            <h3>Ежемесячный платеж: {this.state.monthlyPayments} руб.</h3>
            <h3>Необходимый доход: {this.state.requiredIncome} руб.</h3>
            <h3>Переплата: {this.state.overpayment} руб.</h3>
            <h3>Тело кредита: {this.state.loanBody} руб.</h3>
          </ResultContainer>
      </Container>
    )
  }
}

