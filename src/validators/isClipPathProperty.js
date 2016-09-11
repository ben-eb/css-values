import isUrl from './isUrl';
import isGeometryBox from './isGeometryBox';
import isBasicShape from './isBasicShape';

export default node => {
    return isUrl(node)
    	|| isBasicShape(node)
        || isGeometryBox(node);
};
