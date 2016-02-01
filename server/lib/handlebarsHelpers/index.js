import moment from "moment";
import os from "os";

moment.locale("es", {
    months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ]
});

export function formatDate(date, format) {
    const ensuredDate = date || new Date();

    return moment.utc(ensuredDate).format(format);
}

export function pad(number) {
    return (number < 10) ? ("0" + number) : number;
}

export function platformInformation() {
    return os.platform();
}

export function times(to, block) {
    let accumulator = "";

    for (let i = 0; i < to; ++i) {
        accumulator += block.fn(i);
    }

    return accumulator;
}
