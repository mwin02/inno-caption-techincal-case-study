import { Button, ButtonGroup } from "react-bootstrap";

/*
A component with a minus button, a number and a plus button for counting
@param number : the number value displayed
@param onPlusClick : the function called when the plus button is clicked
@param onMinusClick : the function called when the minus button is clicked
*/

const PlusMinusButton = ({ number, onPlusClick, onMinusClick }) => {
    return (
        <ButtonGroup>
            <Button variant="outline-dark" onClick={onMinusClick}>-</Button>
            <Button disabled>{number}</Button>
            <Button variant="outline-dark" onClick={onPlusClick}>+</Button>
        </ButtonGroup>
    );
}

export default PlusMinusButton;