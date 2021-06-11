import { useState } from "react";

const PositionRow = (props) => {
    let [position, setPosition] = useState(props.position);
    let [order, setOrder] = useState(props.order);

    const handlePositionChange = (event) => {
        let pos = Math.min(Math.max(event.target.value, props.min), props.max);
        setPosition(pos);
    };

    const handleOrderChange = (event) => {
        let ord = "";
        if (/[A-Z]/i.test(event.target.value) && event.target.value) {
            ord = event.target.value.toUpperCase();
        }
        setOrder(ord);
    };
    console.log(props);

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.surname}</td>
            <td>{props.year}</td>
            <td>{props.gender}</td>
            <td>{props.licenceNumber}</td>
            <td>{props.club}</td>
            <td>
                <input
                    type="number"
                    min={props.min}
                    max={props.max}
                    value={position}
                    placeholder={props.stand}
                    onChange={handlePositionChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    maxLength="1"
                    value={order}
                    placeholder={props.stand}
                    onChange={handleOrderChange}
                />
            </td>
            <td>{props.access_code}</td>
        </tr>
    );
};

export default PositionRow;
