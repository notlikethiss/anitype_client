import React from 'react';
import Footer from "../../components/main/Footer";
import HeaderNew from '../../components/HeaderNew';

const AboutPage = () => {
    return (
        <>
            <HeaderNew/>

            <div className="page">
                <div className="page_content">
                    <h1>AniType</h1>

                    <span>Telegram <a href="https://t.me/anitypenews">telegram</a></span>
                    <span>Discord <a href="https://discord.gg/RJqPpnQ3pT">discord</a></span>


                </div>
            </div>

            <Footer/>
        </>
    );
};

export default AboutPage;