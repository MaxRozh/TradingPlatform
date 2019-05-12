/* eslint no-console: 0 */

const handleDeleteLink = (args) => {
    const newArgs = {};

    Object.keys(args).forEach((i) => {
        try {
            newArgs[i] = typeof args[i] === 'object' ? JSON.parse(JSON.stringify(args[i])) : args[i];
        } catch (e) {
            newArgs[i] = args[i];
        }
    });

    return newArgs;
};

const handleConsoleLogging = (logName = 'WITHOUT NAME', args = 'WITHOUT ARGS', type = 'error') => {
    const displayArgs = handleDeleteLink(args);

    console.group(logName);
    console[type](displayArgs);
    console.groupEnd();
};

export const log = (logName, ...args) => {
    handleConsoleLogging(logName, args, 'log');
};

export const warn = (logName, ...args) => {
    handleConsoleLogging(logName, args, 'warn');
};

export const error = (logName, ...args) => {
    handleConsoleLogging(logName, args, 'error');
};

export const table = (logName, ...args) => {
    handleConsoleLogging(logName, args, 'table');
};

export const params = (logName, ...args) => {
    const newArgs = [];

    const modifiedLogName = `CHECK ${logName} PARAMS`;

    Object.keys(args).forEach((i) => {
        if (args[i].params) {
            newArgs.push(args[i].params);
        }
    });

    handleConsoleLogging(modifiedLogName, newArgs, 'warn');
};

export const props = (logName, ...args) => {
    const newArgs = [];

    const modifiedLogName = `CHECK ${logName} PROPS`;

    Object.keys(args).forEach((i) => {
        if (args[i].props) {
            newArgs.push(args[i].props);
        }
    });

    handleConsoleLogging(modifiedLogName, newArgs, 'warn');
};

export const check = (name = '') => {
    console.group(`CHECK -> ${name}`);
    console.groupEnd();
};

export const time = (logName = 'WITHOUT NAME', fn) => {
    if (typeof fn !== 'function') {
        error('ERROR. You must pass the function to the second argument!', { argType: typeof fn, arg: fn, logName });
        return;
    }

    const timeName = `Time spent on "${logName}", is`;
    console.group('CHECKING THE SPENT TIME');
    console.time(timeName);
    fn();
    console.timeEnd(timeName);
    console.groupEnd();
};

export const profile = (logName = 'WITHOUT NAME', fn) => {
    if (typeof fn !== 'function') {
        error('ERROR. You must pass the function to the second argument!', { argType: typeof fn, arg: fn, logName });
        return;
    }

    console.group('PROFILE');
    console.profile(logName);
    fn();
    console.profileEnd();
    console.groupEnd();
};
