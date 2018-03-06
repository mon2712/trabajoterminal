var React = require('react');
import Title from '../header/title';

class Header extends React.Component {
    
    render() {
        return (
        <div>
            <header>
                Header
            </header>
            <span> hey </span>
            <Title {...this.props} type="recepcion"/>
        </div>
       );
    }
  }
export default Header;