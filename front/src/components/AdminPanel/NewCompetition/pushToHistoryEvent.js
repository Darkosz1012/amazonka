export function pushToHistoryEvent(history, address) {
    return (event) => {
        event.preventDefault();
        history.push(address);
    };
}
