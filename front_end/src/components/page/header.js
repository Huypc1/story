import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [activeLink, setActiveLink] = useState('home');
    const navigate = useNavigate();
    const handleNavLinkClick = (link) => {
        setActiveLink(link);
    };
    
    const handleClick = () => {
        var dropdownMenu = document.getElementById('dropdown-menu');
        var userAction = document.getElementById('user-dropdown');
        userAction.addEventListener("click", function() {
            // Your code to handle the click event goes here
            if( dropdownMenu.style.display=== "none"){
                dropdownMenu.style.display="block";
            }
            else{
                dropdownMenu.style.display="none";
            }
        });
    }
    
    // Lấy giá trị 'role' từ localStorage
    const role = localStorage.getItem('role');
    console.log(role);
    
    const storedUsername = localStorage.getItem('username');

    const handleLogout = () => {
        // Xoá thông tin người dùng từ localStorage
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('req');
        // Thêm logic đăng xuất bổ sung (ví dụ: chuyển hướng đến trang đăng nhập)
        navigate('/login?');
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/" onClick={() => handleNavLinkClick('home')}>Truyện 24h</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={`nav-link ${activeLink === 'home' ? 'active' : ''}`} exact to="/" onClick={() => handleNavLinkClick('home')}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${activeLink === 'theloai' ? 'active' : ''}`} to="/theloai" onClick={() => handleNavLinkClick('theloai')}>Thể loại</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${activeLink === 'author' ? 'active' : ''}`} to="/author" onClick={() => handleNavLinkClick('author')}>Tác giả</NavLink>
                        </li>
                        {role === "true" ? (
                            <>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${activeLink === 'create' ? 'active' : ''}`} to="/create" onClick={() => handleNavLinkClick('admin')}>Create</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${activeLink === 'createAuthor' ? 'active' : ''}`} to="/createAuthor" onClick={() => handleNavLinkClick('createAuthor')}>CreateAuthor</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${activeLink === 'tap' ? 'active' : ''}`} to="/tap" onClick={() => handleNavLinkClick('tap')}>CreateTap</NavLink>
                                </li>
                            </>
                        ): null }
                    </ul>
                    {storedUsername ? (
                        <div className="nav-item dropdown">
                            <NavLink onClick={handleClick} href="#" id="user-dropdown" data-toggle="dropdown" className="nav-item nav-link dropdown-toggle user-action"><i className="fa-solid fa-circle-user" style={{fontSize:"20px"}}></i> {storedUsername}<b className="caret"></b></NavLink>
                            <div className="dropdown-menu" id="dropdown-menu">
                                <NavLink href="#" className="dropdown-item" onClick={handleLogout}><i className="material-icons">&#xE8AC;</i> Logout</NavLink>
                            </div>
                        </div>
                    ) : (
                        <form className="" style={{marginLeft:"10px"}}>
                            <button className="btn btn-outline-success" type="submit"><NavLink to="/login" style={{textDecoration:"none"}}>Login</NavLink></button>
                        </form> 
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
