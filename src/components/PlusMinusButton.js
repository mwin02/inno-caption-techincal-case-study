import { Button, ButtonGroup } from "react-bootstrap";

const PlusMinusButton = ({ number, setNumber }) => {
    const onButtonClick = (button) => {
        if (button === "-") {
            if (number > 0) {
                setNumber(number - 1);
            }
        } else {
            setNumber(number + 1);
        }
    }
    return (
        <ButtonGroup>
            <Button variant="outline-dark" onClick={() => onButtonClick("-")}>-</Button>
            <Button disabled>{number}</Button>
            <Button variant="outline-dark" onClick={() => onButtonClick("+")}>+</Button>
        </ButtonGroup>
    );
}

export default PlusMinusButton;