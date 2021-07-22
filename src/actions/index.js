import streams from '../apis/streams';

export const putCachedEntry = formValues => async dispatch => {
    streams.post('/streams', formValues);
};
