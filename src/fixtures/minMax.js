export default {
    valid: ['minmax(2em, 300px)', 'minmax(max-content, 2fr)', 'minmax(20%, 80vmax)'],
    invalid: [
        'minmax(20kHz, max-content)', 
        'minmax(80vmax, 20kHz)', 
        'minmax(1rem 20px)',
        'maxmin(auto, 30%)',
    ],
};
