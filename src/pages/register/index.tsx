import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGIN } from '~/constants/routes';
import { useDocumentTitle } from '~/hooks';
import logo from '~/images/logo-cg.svg';
import { registerStart } from '~/redux/action/authActions';
import { setAuthErrorMessage } from '~/redux/action/errorActions';
import { IRootReducer } from '~/types/types';
// import { SocialLogin } from '~/components/shared';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const dispatch = useDispatch();

    useDocumentTitle('Register to Cinemagram');
    useEffect(() => {
        return () => {
            dispatch(setAuthErrorMessage(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { error, isLoading } = useSelector((state: IRootReducer) => ({
        error: state.error.authError,
        isLoading: state.loading.isLoadingAuth
    }));

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.trim();

        setEmail(val.toLowerCase());
    };

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.trim();

        setPassword(val);
    };

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.trim();

        setUsername(val.toLowerCase());
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email && password && username) {
            dispatch(registerStart({ email, password, username }));
        }
    };
    return (
        <div className="min-h-screen flex justify-center">
            <div className="relative animate-fade w-full bg-indigo-1000 text-center laptop:w-5/12 laptop:text-left flex items-center flex-col justify-center pt-8 laptop:pt-0">
                <Link
                    to={{
                        pathname: '/'
                    }}
                >
                    <img
                        src={logo}
                        alt=""
                        className="w-36"
                        style={{ filter: `brightness(1)` }}
                    />
                </Link>
                {error && (
                    <div className="p-4 w-full text-center bg-red-100 border-red-400 absolute top-0 left-0">
                        <p className="text-red-500 text-sm">{error?.error?.message || 'Something went wrong :('}</p>
                    </div>
                )}
                <div className="w-full px-8 laptop:px-14">
                    <div className='flex justify-center laptop:w-12/12 mt-6'>
                        <h2 className="text-xl px-1 laptop:text-2xl font-extrabold text-black-900">
                            Create your account
                        </h2>

                    </div>
                    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                        <div className="rounded-md shadow-sm space-y-2">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    className={` ${error ? 'input--error' : ''}`}
                                    onChange={onUsernameChange}
                                    autoComplete="username"
                                    maxLength={30}
                                    required
                                    readOnly={isLoading}
                                    placeholder="Username"
                                    value={username}
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    className={` ${error ? 'input--error' : ''}`}
                                    onChange={onEmailChange}
                                    autoComplete="email"
                                    maxLength={64}
                                    required
                                    readOnly={isLoading}
                                    placeholder="Email Address"
                                    value={email}
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    className={`!pr-12 ${error ? 'input--error' : ''}`}
                                    onChange={onPasswordChange}
                                    autoComplete="current-password"
                                    required
                                    minLength={8}
                                    maxLength={100}
                                    readOnly={isLoading}
                                    placeholder="Password"
                                    value={password}
                                />
                                <div className="absolute right-0 top-0 bottom-0 my-auto flex items-center justify-center w-12 h-12 hover:bg-gray-200 cursor-pointer rounded-tr-full rounded-br-full z-10">
                                    {isPasswordVisible ? (
                                        <EyeInvisibleOutlined
                                            className="h-full w-full outline-none text-black-500"
                                            onClick={() => setPasswordVisible(false)}
                                        />
                                    ) : (
                                        <EyeOutlined
                                            className="h-full w-full outline-none"
                                            onClick={() => setPasswordVisible(true)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="button--stretch text-white" disabled={isLoading}>
                                {isLoading ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                        {/* <i className="social-login-divider">OR</i>
                        <div className="flex justify-between space-x-2">
                            <SocialLogin isLoading={isLoading} />
                        </div> */}
                    </form>
                    <div className="text-center mt-8">
                        <Link
                            className="underline font-medium"
                            onClick={(e) => isLoading && e.preventDefault()}
                            to={LOGIN}
                        >
                            Login instead
                        </Link>
                    </div>
                    {/* --- COPYRIGHT -- */}
                    <span className="text-black-400 text-xs mx-auto text-center block mt-4">
                        &copy;Copyright {new Date().getFullYear()} Cinemagram
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Register;
