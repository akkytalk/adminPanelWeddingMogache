import React from "react";
import { Redirect } from "react-router-dom";
import ProfileDrop from "./profiledrop";
import { Nav, Navbar, NavLink, NavbarBrand, Collapse } from "reactstrap";

/* Import images which are need for the HEADER */
import logo from "../../assets/logo/logo.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.showMobilemenu = this.showMobilemenu.bind(this);
    this.toggleMiniSidebar = this.toggleMiniSidebar.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      isOpen: false,
      miniSidebar: false,
    };
  }

  async handleLogout() {
    // await this.props.removeLogin();
    return <Redirect to={"/login"} />;
  }

  /*To open NAVBAR in MOBILE VIEW */
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  /*To open SIDEBAR-MENU in MOBILE VIEW */
  showMobilemenu() {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar");
  }
  toggleMiniSidebar() {
    if (this.state.miniSidebar === true) {
      let toggleElement = document.getElementById("main-wrapper");
      toggleElement.setAttribute("data-sidebartype", "full");
      toggleElement.classList.remove("mini-sidebar");
      this.setState({
        miniSidebar: !this.state.miniSidebar,
      });
    } else {
      let toggleElement = document.getElementById("main-wrapper");
      toggleElement.setAttribute("data-sidebartype", "mini-sidebar");
      toggleElement.classList.add("mini-sidebar");
      this.setState({
        miniSidebar: !this.state.miniSidebar,
      });
    }
  }

  render() {
    return (
      <header className="topbar navbarbg" data-navbarbg="skin1">
        <Navbar className="top-navbar" dark expand="md">
          <div className="navbar-header" id="logobg" data-logobg="skin1">
            {/*--------------------------------------------------------------------------------*/}
            {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
            {/*--------------------------------------------------------------------------------*/}
            <NavbarBrand href="/">
              <b className="logo-icon">
                <img
                  src={logo}
                  width="70px"
                  height="40px"
                  alt="homepage"
                  className="dark-logo"
                  style={{ backgroundColor: "white", borderRadius: "10px" }}
                />
                <img
                  src={logo}
                  width="70px"
                  height="40px"
                  alt="Logo"
                  style={{ backgroundColor: "white", borderRadius: "10px" }}
                  className="light-logo"
                />
              </b>
            </NavbarBrand>
            <Nav className="ml-auto float-right d-block d-md-none" navbar>
              <ProfileDrop />
            </Nav>
            {/* Mobile View Toggler  [visible only after 768px screen]  */}
            <a
              className="nav-toggler d-block d-md-none"
              onClick={this.showMobilemenu}
            >
              <i className="ti-menu ti-close" />
            </a>
          </div>
          <Collapse
            className="navbarbg"
            isOpen={this.state.isOpen}
            navbar
            data-navbarbg="skin1"
          >
            <Nav className="float-left text-white" navbar>
              <NavLink
                className="nav-toggler d-none d-md-block"
                onClick={this.toggleMiniSidebar}
              >
                <i className="ti-menu" />
              </NavLink>
            </Nav>
            <Nav className="ml-auto float-right" navbar>
              {/* Start Profile Dropdown */}
              <ProfileDrop />
              {/* End Profile Dropdown */}
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
export default Header;
