import React from 'react'

function Adminheader() {
  return (
    <>
          <header className="main-header-two">
      <nav className="main-menu">
        <div className="container">
          {/* <div className="main-menu__logo">
            <a href="index.html">
              <img
                src="assets/images/logo-two.png"
                width={183}
                height={48}
                alt="Eduact"
              />
            </a>
          </div> */}
          {/* /.main-menu__logo */}
          <div className="main-menu__nav">
            <ul className="main-menu__list">
              {/* <li className="megamenu megamenu-clickable megamenu-clickable--toggler">
                <a href="/admin">Dashboard</a>
              </li> */}
              <li>
                <a href="/admin">Dashboard</a>
              </li>
              <li>
                <a href="/admin/category">Category</a>
              </li>
              <li>
                <a href="/admin/carosuel">Carousel</a>
              </li>
              <li>
                <a href="/admin/Users">Users</a>
              </li>
            </ul>
          </div>
          {/* /.main-menu__nav */}
        
          {/* /.main-menu__right */}
        </div>
        {/* /.container */}
      </nav>
      {/* /.main-menu */}
    </header>
        
    </>
  )
}

export default Adminheader