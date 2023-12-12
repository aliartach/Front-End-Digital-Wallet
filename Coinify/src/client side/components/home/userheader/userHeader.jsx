import { IoIosNotifications } from "react-icons/io";
import { MdHome } from "react-icons/md";
import "../userheader/userHeader.css";
import { useUser } from "../../../../Context/useUser";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Snackbar from "@mui/joy/Snackbar";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { SettingsEthernet } from "@mui/icons-material";
import { Fa500Px } from "react-icons/fa";

const getNotifications = () => {
  return JSON.parse(localStorage.getItem("notifications")) || [];
};
const UserHeader = ({ name, title }) => {
  let { user, socket } = useUser();
  const [open, setOpen] = useState(false);
  const [openALL, setOpenALL] = useState(false);

  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [notifications, setNotifications] = useState(getNotifications());
  const [text, setTextData] = useState({});

  useEffect(() => {
    const handleGetNotification = (data) => {
      // Use the callback form of setNotifications to access the latest state
      setNotifications((prevNotifications) => {
        const newNotifications = [...prevNotifications, data];
        localStorage.setItem("notifications", JSON.stringify(newNotifications));
        return newNotifications;
      });
    };

    // Attach the event listener
    socket?.on("getNotification", handleGetNotification);
    socket?.on("getText", (data) => {
      setTextData(data);
      setOpen(true);
      setOpenALL(false)
    });

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      socket?.off("getNotification", handleGetNotification);
    };
  }, [socket,user]);

  return (
    <div className="homepage1">
      <Snackbar
        variant="soft"
        color="success"
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        key={vertical + horizontal}
        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
      >
        {text.senderName} have sent you ${text.amount}{" "}
      </Snackbar>
      {socket && (
        <div className="MainHeader">
          <header className="headerhomepage">
            <>
              <br></br>
            </>
            <h2 className="hellousername">HELLO {name} !</h2>
      <div className="notificationDiv">
      <IoIosNotifications
              className="notificationlogo"
              onClick={() => {
                setOpenALL(!openALL);
              }}
            />
            <h3 className="notificationNumber">{notifications.length}</h3>
      </div>
          </header>
          <div className="homepagedescription">
            <MdHome className="homelogopage" /> <p>{title}</p>
          </div>
        </div>
      )}

      <div className={notifications.length > 0 && openALL?"allthenotifications":"none"} >
        {notifications.length > 0 && openALL && (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {notifications.map((value) => (
              <ListItem
                key={value}
                disableGutters
                secondaryAction={
                  <IconButton aria-label="comment">
                    <CommentIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${value.senderName} have sent you ${value.amount}`}
                />
              </ListItem>
            ))}
            <button
              onClick={() => {
                localStorage.removeItem("notifications");
                setNotifications([]);
              }}
            >
              Read all
            </button>
          </List>
        )}
      </div>
    </div>
  );
};

export default UserHeader;
