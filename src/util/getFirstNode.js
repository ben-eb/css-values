import valueParser from 'postcss-value-parser';

export default value => valueParser(value).nodes[0];
