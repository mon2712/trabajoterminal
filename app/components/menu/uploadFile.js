var React = require('react');

class UploadFile extends React.Component {
    constructor(props){
        super(props);
        this.setRoutFile = this.setRoutFile.bind(this);
    }
    setRoutFile(active,fileBase,fileReport){
        this.props.actions.getSetFiles(false, fileBase,fileReport);
    }

    render() {
        return (
            <div className="frontContainer">
            <div className='setRouteFileContainer'>
                <div className="headerSetRouteFile">
                    <span className="setRouteTextText">Seleccionar Archivos</span>
                    <span className="ico icon-file-excel"></span>
                    <span className="ico icon-multiply" onClick={this.setRoutFile.bind(this,null,null)}></span>
                </div>
                <div>
                    <span className="fileText">Base de datos: </span>
                    <input type="file">Archivo</input>
                </div>
                <div>
                <span className="fileText">Reporte mensual: </span>
                    <input type="file">Reporte</input>
                </div>
                <div className="buttonSetFiles">
                <span className="fileText" onClick={this.setRoutFile.bind(this,null,null,null)}>Subir archivos</span>
                </div>
            </div>
            </div>
            );
    }
  }
  export default UploadFile;

