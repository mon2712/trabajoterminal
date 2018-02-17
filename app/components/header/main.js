var React = require('react');
import Title from '../header/title';

class Header extends React.Component {
    
    render() {
        console.log("yo soy el hijo y tengo estas propiedades", this.props.store.password)
        var vane = this.props.store.password
        console.log(vane)
        return (
        <div>
            <header>
                Header
            </header>
            <span> hey </span>
            <Title {...this.props}/>
        </div>
       );
    }
  }
export default Header;