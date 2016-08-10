import {attachments} from '../validators/isAttachment';

export default {
    valid: [
        ...attachments,
        ...attachments.map(value => value.toUpperCase()),
    ],
    invalid: ['local-scroll'],
};
