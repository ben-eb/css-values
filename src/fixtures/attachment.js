import toWord from '../util/toWord';
import {attachments} from '../validators/isAttachment';

export const fixtures = {
    valid: [
        ...attachments,
        ...attachments.map(value => value.toUpperCase()),
    ],
    invalid: ['local-scroll'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
