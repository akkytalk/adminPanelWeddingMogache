import React from "react";
import profilephoto from "../../assets/images/users/1.jpg";
import {
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeLogin } from "../../redux/action";

function ProfileDrop(props) {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  async function handleLogout() {
    dispatch(removeLogin());
  }

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret className="pro-pic">
        <img
          src={profilephoto}
          alt="user"
          className="rounded-circle"
          width="31"
        />
      </DropdownToggle>
      <DropdownMenu right className="user-dd">
        <span className="with-arrow">
          <span className="bg-primary" />
        </span>
        <DropdownItem
          header
          tabIndex="-1"
          className="d-flex no-block align-items-center p-3 bg-primary text-white mb-2"
        >
          <img
            src={profilephoto}
            alt="user"
            className="rounded-circle"
            width="60"
          />
          <div className="ml-2">
            <h4 className="mb-0">{login.login?.user?.email}</h4>
            {/* <h6 className="mb-0">
                {userdata
                  ? userdata.user
                    ? userdata.user.email
                    : "User"
                  : "User"}
              </h6> */}
            {/* <Button color="success" className="btn-rounded mb-2 mt-2">
                View Profile
              </Button> */}
          </div>
        </DropdownItem>
        {/* <DropdownItem>
            <i className="ti-user mr-1 ml-1" /> My Account
          </DropdownItem>
          <DropdownItem>
            <i className="ti-wallet mr-1 ml-1" /> My Balance
          </DropdownItem>
          <DropdownItem>
            <i className="ti-email mr-1 ml-1" /> Inbox
          </DropdownItem>
          <DropdownItem>
            <i className="ti-settings mr-1 ml-1" /> Account Settings
          </DropdownItem> */}
        <DropdownItem className="text-danger" onClick={() => handleLogout()}>
          <i className="fa fa-power-off mr-1 ml-1" /> Logout
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

export default ProfileDrop;
