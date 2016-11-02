import cx from 'classnames';
import React from 'react';
import { DropTarget } from 'react-dnd';
import { FormattedMessage as Msg } from 'react-intl';

import Link from '../Link';
import PersonCollectionItem from './PersonCollectionItem';


const personTarget = {
    canDrop(props, monitor) {
        let person = monitor.getItem();
        let persons = props.items;
        let duplicate = persons.find(p => (p.id == person.id));

        // Only allow drops if it wouldn't result in duplicate
        return (duplicate === undefined);
    },

    drop(props) {
        return {
            targetType: 'person',
            onDropPerson: p => props.onAdd(p)
        };
    }
};

function collectPerson(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isPersonOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}


@DropTarget('person', personTarget, collectPerson)
export default class PersonCollection extends React.Component {
    static propTypes = {
        items: React.PropTypes.array.isRequired,
        itemComponent: React.PropTypes.func.isRequired,
        addPersonMsg: React.PropTypes.string.isRequired,
        selectLinkMsg: React.PropTypes.string.isRequired,
        onSelect: React.PropTypes.func.isRequired,
        onRemove: React.PropTypes.func.isRequired,
        onAdd: React.PropTypes.func,
    };

    render() {
        let selectLink = (
            <Link msgId={ this.props.selectLinkMsg }
                onClick={ this.onClickAddPersons.bind(this) }/>
        );

        let addItem = this.props.connectDropTarget(
            <li className="PersonCollection-addItem">
                <Msg tagName="p"
                    id={ this.props.addPersonMsg }
                    values={{ selectLink }}/>
            </li>
        );

        let classes = cx('PersonCollection', {
            'PersonCollection-isPersonOver': this.props.isPersonOver,
        });

        return (
            <ul className={ classes }>
                { addItem }
            { this.props.items.map(i => (
                <li className="PersonCollection-item">
                    <PersonCollectionItem key={ i.id } item={ i }
                        itemComponent={ this.props.itemComponent }
                        onSelect={ this.props.onSelect.bind(this) }
                        onRemove={ this.props.onRemove.bind(this) }/>
                </li>
            )) }
            </ul>
        );
    }

    onClickAddPersons(ev) {
        if (this.props.onAdd) {
            this.props.onAdd(null);
        }
    }
}
