import moment from 'moment';

const findKey = (obj: { [key: string]: string }, target: string) => {
    return Object.keys(obj).find((key) => obj[key] === target);
};

const parseISODate = (date: string) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
};

export { findKey, parseISODate };
