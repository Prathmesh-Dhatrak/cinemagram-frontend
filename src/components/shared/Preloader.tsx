import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import logo from '~/images/logo-cg.svg';

const Preloader = () => (
    <div className="w-full bg-white h-screen z-9999 flex flex-col justify-center items-center animate-fade">
        <img src={logo} alt="Cinemagram Logo" className="w-48" />
        <p className="text-sm mt-4 text-black">Nothing unites people like quality Cinema.</p>
        <LoadingOutlined className="text-xl mt-4 text-black" />
    </div>
);

export default Preloader;
