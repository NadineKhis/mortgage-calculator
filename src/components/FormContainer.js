import React, {useState} from "react";
import styled from "styled-components";

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
    margin-top: 3rem;
    background: #fff;
    padding: 3rem;
    color: #2a6279;
    box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
    0 6px 6px -1px rgba(8, 11, 14, 0.1);
    border-radius: 1rem;
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
  margin-top: 1rem;
  box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
  0 6px 6px -1px rgba(8, 11, 14, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover, &:focus {
    box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06),
    0 10px 10px -1px rgba(8, 11, 14, 0.1);;
  }
`

const Error = styled.h4`
  color: red;
  font-size: 13px;
  margin-top: 0.5rem;
`

const FormContainer = () => {

  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [loanApr, setLoanApr] = useState("");
  const [monthlyPayments, setMonthlyPayments] = useState(0.0);

  const submitCalculation = async (e) => {
    e.preventDefault();

    // validate fields
    const validatedPrice = await validateField(purchasePrice, setPurchasePrice);
    const validatedPayment = await validateField(downPayment, setDownPayment);
    const validatedLoanTerm  =  await validateField(loanTerm, setLoanTerm);
    const validatedApr  =  await validateField(loanApr, setLoanApr);
    // calculate
    if (validatedPrice && validatedPayment && validatedLoanTerm && validatedApr) {
      console.log('validated')
      calculateValues();
    }
  }

  const calculateValues = () => {
    let principal = purchasePrice - downPayment;
    let monthlyInterest = loanApr / 100 / 12;
    let numberOfPayments = loanTerm * 12;
    let monthlyPrice = (principal * [monthlyInterest * (1 + monthlyInterest) ** numberOfPayments]) /
      [(1 + monthlyInterest) ** numberOfPayments - 1];
    setMonthlyPayments(displayLocale(monthlyPrice));
  }

  const displayLocale = (num) => {
    let parts = Math.ceil(num).toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (parts[1] ? '.' + parts[1] : '');
  }

  const validateField = (field, setValue) => {
    // console.log("gigig")
    let int = parseFloat(field);
    if (field === "" || field === 0) {
      setValue({ ...field.values, error: "Обязательное поле"});
      return false
    } else if (isNaN(int)) {
      setValue({ ...field.values, error: "Введите число"});
      return false;
    } else {
      setValue(int);
      // console.log('gigi')
      return true;
    }
  }

  return (
    <Container>
      <h1>Калькулятор ипотеки</h1>
      <form>
        <InputSection>
          <label>Стоимость недвижимости</label>
          <Error>{purchasePrice.error}</Error>
          <input
            onChange={(e) => setPurchasePrice(e.target.value)}
            type="text"/>
        </InputSection>
        <InputSection>
          <label>Первоначальный взнос</label>
          <Error>{downPayment.error}</Error>
          <input
            onChange={(e) => setDownPayment(e.target.value)}
            type="text"/>
        </InputSection>
        <InputSection>
          <label>Срок кредита</label>
          <Error>{loanTerm.error}</Error>
          <input
            onChange={(e) => setLoanTerm(e.target.value)}
            type="text"/>
        </InputSection>
        <InputSection>
          <label>Процентная ставка</label>
          <Error>{loanApr.error}</Error>
          <input
            onChange={(e) => setLoanApr(e.target.value)}
            type="text"/>
        </InputSection>
        <SubmitBtn onClick={(e) => submitCalculation(e)}>Рассчитать</SubmitBtn>
      </form>
      <h3>Ежемесячный платеж: {monthlyPayments} руб.</h3>
    </Container>
  )
}

export default FormContainer;