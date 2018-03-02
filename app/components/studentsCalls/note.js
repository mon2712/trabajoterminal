var React = require('react');

class Note extends React.Component {
    constructor(props){
        super(props);
        this.viewNote = this.viewNote.bind(this);
    }
    viewNote(active,name,id, note){
        this.props.actions.getNote(false, name, id, note);
    }
    render() {
        return (
            <div>
                {this.props.store.note.note}     
            </div>
        );
    }
  }
  export default Note;

