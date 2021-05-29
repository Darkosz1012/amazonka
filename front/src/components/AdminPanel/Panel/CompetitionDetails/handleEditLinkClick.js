export function handleEditLinkClick(history, path) {
    return (event) => {
        console.log("was clicked");
        event.preventDefault();
        history.push(path);
    };
}
