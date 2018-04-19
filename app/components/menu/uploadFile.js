var React = require('react');

class UploadFile extends React.Component {
    constructor(props){
        super(props);
        this.setRouteFile = this.setRouteFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.closePopUp2 = this.closePopUp2.bind(this);
        this.state = {
            rute1: "",
            rute2:"",
            view: 0
        };
    }
    setRouteFile(){
        this.props.closePopUp();
        console.log(this.state.rute1,this.state.rute2);
        this.props.actions.setFiles(this.state.rute1,this.state.rute2);
        console.log(this.state.rute1,this.state.rute2);
        this.setState({view: 1});
        //this.closePopUp2();
    }
    closePopUp2(){
        console.log(this.props);
        console.log("estoy llamando close2");
        this.props.closePopUp();
        
    }
    uploadFile(event){
        for(let size=0; size < event.target.files.length; size++){
          console.log('Selected file:', event.target.files[size]);
          if(event.target.className==="val"){
            console.log("Entro al route1, event");
            this.setState({rute1: event.target.files[size].name});
          }else{
            console.log("Entro al route2");
            this.setState({rute2: event.target.files[size].name});
          }
        }
    }
    renderSelectFiles(){
        return(
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
    render() {
        return (
            <div className="popUpContainer">
                <div className='setRouteFileContainer'>
                    {this.state.view === 0 ? this.renderSelectFiles() : this.state.view === 1 ? this.renderSuccess() : null}  
                </div>
            </div>
            );
    }
  }
  export default UploadFile;

