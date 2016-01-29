import moment from "moment";

export function formatDate(date) {

    const format = "DD/MM/YYYY";

    if (!date) {
        return moment.utc().format(format);
    }

    return moment.utc(date).format(format);
}
