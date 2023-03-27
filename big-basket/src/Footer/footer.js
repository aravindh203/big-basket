import React from "react";
import './footer.scss'

const Footer = () =>{
    return(
        <div className="footer">
            <div className="footer-card">
                <h4>bigbasket</h4>
                <ul>
                    <li>About Us</li>
                    <li>In News</li>
                    <li>Green bigbasket</li>
                    <li>Privacy policy</li>
                    <li>Affiliate</li>
                    <li>Terms and Conditions</li>
                    <li>Careers At bigbasket</li>
                    <li>bb Insant</li>
                    <li>bbDaily</li>
                    <li>bb Blog</li>
                    <li>bbnow</li>
                </ul>
            </div>
            <div className="footer-card">
                <h4>Help</h4>
                <ul>
                    <li>FAqs</li>
                    <li>contact Us</li>
                    <li>bb wallet FAQs</li>
                    <li>bb Wallet T&Cs</li>
                    <li>Vendor Connect</li>
                </ul>
            </div>
            <div className="footer-card">
                <h4>Download Our App</h4>
                <ul>
                    <li><img src={require('../Asserts/images/Google-App-store-icon.webp')} alt={'no image'}/></li>
                    <li><img src={require('../Asserts/images/Apple-App-store-icon.png')} alt={'no image'}/></li> 
                </ul>
            </div>
            <div className="footer-card">
                <h4>Get Social With Us</h4>
                <div className="footer-icons">
                    <div className="footer-icon facebook">
                        <i className="fa fa-facebook"></i>
                    </div>
                    <div className="footer-icon pinterest">
                        <i className="fa fa-pinterest-p"></i>
                    </div>
                    <div className="footer-icon twitter">
                        <i className="fa fa-twitter"></i>
                    </div>
                    <div className="footer-icon instagram">
                        <i className="fa fa-instagram"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;  