import { IoIosNotifications } from "react-icons/io";
import { MdHome} from "react-icons/md";
import "../userheader/userHeader.css";
import { useUser } from "../../../../Context/useUser";
import { useState,useEffect } from "react";
import { io } from "socket.io-client";

const getNotifications = () => {
  return JSON.parse(localStorage.getItem('notifications')) || [];
};
const UserHeader = ({ name, title}) => {
  let {user,socket}=useUser();

  const [notifications, setNotifications] = useState(getNotifications());

  useEffect(() => {
    const handleGetNotification = (data) => {
      // Use the callback form of setNotifications to access the latest state
      setNotifications((prevNotifications) => {
        const newNotifications = [...prevNotifications, data];
        localStorage.setItem('notifications', JSON.stringify(newNotifications));
        return newNotifications;
      });
    };
  
    // Attach the event listener
    socket?.on('getNotification', handleGetNotification);
  
    console.log('rendered');
  
    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      socket?.off('getNotification', handleGetNotification);
    };
  }, [socket]);
console.log("notifications",notifications);
  return (
    <div className="homepage1">
{ socket && <div>
  <header className="headerhomepage">
      <h1> socket{socket?.id}</h1>
        <>
          <br></br>
        </>
        <h2 className="hellousername">HELLO {name} !</h2>
        <h1>{notifications.length}</h1>
        <IoIosNotifications className="notificationlogo" />
      </header>
      <div className="homepagedescription">
        <MdHome className="homelogopage" /> <p>{title}</p>
      </div>
  </div>}
    </div>
  );
};

export default UserHeader;
