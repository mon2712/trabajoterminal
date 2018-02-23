var React = require('react');

class InputSearch extends React.Component {
    
    render() {
       return (
         <form>
            <div>
                  <input type="text"/>
                  <div className='buttonLupa'>
                  </div>
            </div>
          </form>
       );
    }
  }
  export default InputSearch;