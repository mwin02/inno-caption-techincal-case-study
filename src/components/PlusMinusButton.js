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
        <>
            <button onClick={() => onButtonClick("-")}>-</button>
            {number}
            <button onClick={() => onButtonClick("+")}>+</button>
        </>
    );
}

export default PlusMinusButton;