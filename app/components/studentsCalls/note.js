var React = require('react');

class Note extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="note">
                {this.props.note}     
            </div>
        );
    }
  }
  export default Note;

