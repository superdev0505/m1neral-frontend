import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { NavigationContext } from "../Navigation/NavigationContext";
import ImageModal from "./ImageModal";
import ProfileActions from "./ProfileActions";
import ProfileContent from "./ProfileContent";
import { ProfileContextProvider } from "./ProfileContext";
import ProfileTitle from "./ProfileTitle";

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: "100px",
    marginLeft: "auto",
    marginBottom: "auto",
    maxHeight: "calc(100% - 72px)",
    minHeight: "85%",
    overflow: 'hidden'
  },
}));

const Profile = () => {
  const [stateNav, setStateNav] = useContext(NavigationContext);
  const { isProfileOpen } = stateNav;
  const classes = useStyles();
  const history = useHistory();

  const handleClose = () => {
    setStateNav({ ...stateNav, isProfileOpen: false });
    history.goBack();
  };

  return (
    <ProfileContextProvider>
      <Dialog
        onClose={handleClose}
        aria-labelledby="profile-dialog"
        open={isProfileOpen}
        fullWidth={true}
        maxWidth={"xl"}
        classes={{ paper: classes.paper }}
      >
        {/* <ImageModal/> */}
        {/* <ProfileTitle /> */}
        <ProfileContent />
        {/* <ProfileActions /> */}
      </Dialog>
    </ProfileContextProvider>
  );
};

export default Profile;
