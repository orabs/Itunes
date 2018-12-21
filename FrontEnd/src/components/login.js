import React ,{Component} from 'react';
import '../style/LoginReg.scss';


class Login extends Component {
//   constructor(props: object) {
//       super(props);
//   }
    state=
    {
        user: '',
        pass: '',
        login_alert:false
    }
     // Registeration form request
SubmitHandler() {
    let data = {
        "user": this.state.user,
        "pass": this.state.pass
    }
    fetch("http://localhost:4100", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then((res)=>{
        if(res.status==200){
            console.log(res);
        this.props.login(true);
        }
        else this.setState({login_alert:true});
    });
}
userUpdate(event) {
    this.setState({user:event.target.value});
}
passUpdate(event) {
    this.setState({pass:event.target.value});
}

render() {
    return (
        <div>
            <div className="form">
                <div>
                    <div id="login">
                        <h1>AnyVision Itunes</h1>
                        <form  method="post">
                            <div className="red white-text alert">{this.state.login_alert? 'UserName or Password Invalid' :null}</div>

                            <div className="field-wrap">
                                <label>
                                    User Name<span className="req">*</span>
                                </label>
                                <input onChange = {this.userUpdate.bind(this)}
                                type = "text"
                                required />
                            </div>

                            <div className="field-wrap">
                                <label>
                                    Password<span className="req">*</span>
                                </label>
                                <input onChange = {this.passUpdate.bind(this)}
                                type = "password"
                                required autoComplete = "off" />
                            </div>
                            <button type="button" onClick={this.SubmitHandler.bind(this)} className="button button-block">Login</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
}

export default Login;

