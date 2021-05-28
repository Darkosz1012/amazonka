export function pushToHistoryEvent(history, address) {
    return (event) => {
        event.preventDefault();
        alert("Zatwierdzono");
        history.push(address);
    };
}
