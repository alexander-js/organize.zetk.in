import PersonPane from '../components/panes/PersonPane';

var _panes = {
    'person': PersonPane
};

function resolve(name) {
    if (name in _panes) {
        return _panes[name];
    }
    else {
        return null;
    }
}

export default {
    resolve: resolve
};