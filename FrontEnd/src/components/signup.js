import React ,{Component} from 'react';
// import "../style/LoginReg.scss";
import '../style/LoginReg.scss';



class SignUp extends Component {



state = {
        first: '',
        user: '',
        mail: '',
        pass: ''
         }



    // Registeration form request
SubmitHandler()
    {
        let data=
            {
            "name":this.state.first,
            "email":this.state.mail,
            "user":this.state.user,
            "pass":this.state.pass
            }
        fetch("http://localhost:4100/signup", {
                method: 'post',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(data)
        }).then((res)=>{
            console.log(res);
        });
    }

firstNameUpdate(event) {
    this.setState({first:event.target.value});

}
userNameUpdate(event) {
    this.setState({user:event.target.value});
}
emailUpdate(event) {
    this.setState({mail:event.target.value});
}

passUpdate(event) {
    this.setState({pass:event.target.value});
}

    render() {
        return (
            <div>
                <div className="form">
                    <div>
                        <div id="signup">
                            <h1>Registration</h1>
                            <form>
                                <div className="top-row">
                                    <div className="field-wrap">
                                        <label>
                                            First Name<span className="req">*</span>
                                        </label>
                                        <input onChange={this.firstNameUpdate.bind(this)} type="text" required autoComplete="off"/>
                                    </div>

                                    <div className="field-wrap">
                                        <label>
                                            user Name<span className="req">*</span>
                                        </label>
                                        <input onChange={this.userNameUpdate.bind(this)} type="text" required autoComplete="off"/>
                                    </div>
                                </div>

                                <div className="field-wrap">
                                    <label>
                                        Email Address<span className="req">*</span>
                                    </label>
                                    <input onChange={this.emailUpdate.bind(this)} type="email" required autoComplete="off"/>
                                </div>

                                <div className="field-wrap">
                                    <label>
                                        Set A Password<span className="req">*</span>
                                    </label>
                                    <input onChange={this.passUpdate.bind(this)} type="password" required autoComplete="off"/>
                                </div>
                                <button  onClick={this.SubmitHandler.bind(this)} className="button button-block">Sign Up</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

    export default SignUp;

