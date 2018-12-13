
import Loader from '../general/loader';

var React = require('react');

class UploadFile extends React.Component {
    constructor(props){
        super(props);
        this.setRouteFile = this.setRouteFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.renderSelectFiles = this.renderSelectFiles.bind(this);
        this.renderSuccess = this.renderSuccess.bind(this);
        this.renderNotSuccess = this.renderNotSuccess.bind(this);
        this.state = {
            rute1: "",
            rute2:"",
            view: 0
        };
    }
    setRouteFile(){
        this.props.closePopUp();
        if(this.state.rute1 !== "" && this.state.rute2 !== ""){
            this.props.actions.setFiles(this.state.rute1,this.state.rute2);
        }
        //this.setState({view: 1});
    }
    uploadFile(event){
        for(let size=0; size < event.target.files.length; size++){
          if(event.target.className==="val"){
            this.setState({rute1: event.target.files[size].name});
          }else{
            this.setState({rute2: event.target.files[size].name});
          }
        }
    }
    renderSelectFiles(){
        return(
            <div>
                {this.props.store.setFiles.upLoadFileError === null ?  
                <div>
                    <div className="headerSetRouteFile">
                        <span className="ico icon-file-excel file"></span>
                        <span className="setRouteText">Seleccionar Archivos</span>
                        <span className="ico icon-multiply close" onClick={this.props.closePopUp()}></span>
                    </div>
                    <form encType="multipart/form-data">
                        <div className="setRoute">
                            <span className="fileText">Base de datos: </span>
                            <div className="files">
                                <span className="route">{this.state.rute1}</span>
                                <div className="icon">
                                    <label for="upload" className="ico icon-enter"></label>
                                </div>
                                <input type="file" id="upload" className="val" name="file[]" accept=".xls" onChange={this.uploadFile}></input>
                            </div>
                        </div>
                        <div className="setRoute">
                            <span className="fileText">Reporte mensual: </span>
                            <div className="files">
                                <span className="route">{this.state.rute2}</span>
                                <div className="icon">
                                    <label for="upload2" className="ico icon-enter"></label>
                                </div>
                                <input type="file" id="upload2" className="val2" name="file[]" accept=".xls"  onChange={this.uploadFile}></input>
                            </div>
                        </div>
                        <div className="buttonSetFiles">
                            <span className="icoUp icon-upload3" ></span>
                            <span className="fileText2" onClick={this.setRouteFile}>Subir archivos</span>
                        </div>
                    </form>
                </div>
                : this.props.store.setFiles.upLoadFileError === 0  ? this.renderSuccess() 
                : this.props.store.setFiles.upLoadFileError === 1  ? this.renderNotSuccess() : null}
            </div>
        );
    }
    renderSuccess(){
        return(
            <div>
                <div className="headerSetRouteFile">
                    <span className="ico icon-check file"></span>
                    <span className="setRouteText">Carga exitosa de archivos!</span>
                    <span className="ico icon-multiply close" onClick={this.props.closePopUp()}></span>
                </div>
            </div>
        );
    }
    renderNotSuccess(){
        return(
            <div>
                <div className="headerSetRouteFile">
                    <span className="ico icon-warning"></span>
                    <span className="setRouteText">Hubo un problema al cargar el Archivo</span>
                    <span className="ico icon-multiply close" onClick={this.props.closePopUp()}></span>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="popUpContainer">
                <div className='setRouteFileContainer'>
                    {this.props.store.loader.document===true ? <Loader {...this.props}/> :
                    this.renderSelectFiles()}
                </div>
            </div>
            );
    }
  }
  export default UploadFile;

