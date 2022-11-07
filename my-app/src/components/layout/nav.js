import '../css/styles.css';
import {
    FaShoppingCart,
    FaUser,
    FaBars
} from "react-icons/fa";
// import '../layout/navbars';

const Nav1 = () => {
    return (
        <header>
            {/* <div id="menu-bar" class="fa fa-bars"></div> */}
            <FaBars id="menu-bar" class="fa fa-bars"></FaBars>
            <i class="fa-sharp fa-solid fa-bars"></i>
            {/* <img className='logo1' src='logo1.png'></img> */}
            <a href="#" class="logo">LuTra Shoes</a>
            <nav class="navbar">
                <a href="#home">Home</a>
                <a href="#product">Product</a>
                <a href="#fearured">Fearured</a>
                <a href="#blog">blog</a>
                <a href="#news">news</a>
            </nav>
            <div class="icons">
                <a href="#"><i class="fa fa-heart"></i></a>
                <a href="#"><FaShoppingCart></FaShoppingCart></a>
                <a href="#"><FaUser></FaUser><a class="user">Nguyễn văn A</a></a>
            </div>
        </header>
    );
}

export default Nav1;