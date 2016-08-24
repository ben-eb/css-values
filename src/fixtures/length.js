import calc from './calc';

export default {
    valid: [
        ...calc.valid,
        '0', 
        '16px', 
        '1pc', 
        '2.34254645654324rem', 
    ],
    invalid: [
        ...calc.invalid,
        '16.px', 
        'px16', 
        'one rem', 
        '"1rem"',        
    ],
};
