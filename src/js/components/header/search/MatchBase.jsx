import React from 'react/addons';
import cx from 'classnames';


export default class MatchBase extends React.Component {
    render() {
        const classes = cx({
            'focused': this.props.focused
        });

        return (
            <li className={ classes }
                onClick={ this.props.onSelect }>
                { this.getImage() }
                { this.getTitle() }
            </li>
        );
    }

    getImage() {
        return null;
    }
}

MatchBase.propTypes = {
    focused: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    data: React.PropTypes.object.isRequired
};

MatchBase.defaultProps = {
    focused: false
};
