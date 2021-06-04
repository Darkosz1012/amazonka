export function revertDateFormat(dateStr) {
    const arr = dateStr.split("-");
    const res = arr[2] + "-" + arr[1] + "-" + arr[0];
    return res;
}
