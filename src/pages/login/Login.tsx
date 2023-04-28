import './Login.scss';
import LoginComponent from '../../components/login/LoginComponent';

export default function Login() {
    return (
        <main>
            <div className='panel'>
                <div className='box'>
                    <LoginComponent />
                </div>
            </div>
        </main>
    )
}