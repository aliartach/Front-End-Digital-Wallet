import { IoIosNotifications } from "react-icons/io";
import { MdHome} from "react-icons/md";
import "../userheader/userHeader.css";
const UserHeader = ({ name, title, logo: LogoComponent }) => {

  return (
    <div className="homepage1">
      <header className="headerhomepage">
      
        <>
          <br></br>
        </>
        <h2 className="hellousername">HELLO {name} !</h2>
        <IoIosNotifications className="notificationlogo" />
      </header>
      <div className="homepagedescription">
      {LogoComponent && <LogoComponent className="homelogopage" />} <p>{title}</p>
        
      </div>
    </div>
  );
};

export default UserHeader;
