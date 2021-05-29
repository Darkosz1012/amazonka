export function handleEditLinkClick(history, path) {
    return (event) => {
        event.preventDefault();
        history.push(path);
    };
}
