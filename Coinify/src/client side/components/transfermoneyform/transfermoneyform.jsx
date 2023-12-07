import "./transfermoneyform.css"
import { GrTransaction } from "react-icons/gr";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";


const transfermoneyform = () => {
  return (
    <div>
        <form className="transfermoneyform">
            <div className="transfermoneyheader">
              <h3>Transfer money</h3>
              <GrTransaction className="transactionlogo" />
            </div>
            <div className="hrtransfermoneyform"></div>
            <div className="transfermoneyheader email">
              <label className="recieveremail">Reciever Email Address</label>
              <MdOutlineEmail className="inputemailicon" />
              <input className="inputmoneytransfer" type="email"></input>
            </div>
            <br></br><br></br>
            <div className="transfermoneyheader amount">
              <label className="recieveramount">Amount</label>
              <RiMoneyDollarCircleFill className="inputmoneyicon" />
              <input className="inputmoneytransfer" type="integer"></input>
            </div>
            <div className="transfermmoneybuttondiv">
            <button className="transfermoneybutton" type="submit">Transfer</button>
            </div>
        </form>
    </div>
  )
}

export default transfermoneyform