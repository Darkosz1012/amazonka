export default function (number) {
    let log = Math.Log(number, 2);
    let pow = Math.Pow(2, Math.Round(log));
    return pow == number;
}
