import { Button, ButtonGroup } from "react-bootstrap";

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