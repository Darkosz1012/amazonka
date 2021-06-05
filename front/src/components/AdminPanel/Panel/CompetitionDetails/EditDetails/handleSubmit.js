export function handleSubmit(history, address, id) {
    return (event) => {
        event.preventDefault();
        alert("Zatwierdzono");
        history.push(address);
    };
}
