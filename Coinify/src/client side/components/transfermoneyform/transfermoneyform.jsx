import "./transfermoneyform.css"
import { GrTransaction } from "react-icons/gr";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";


const transfermoneyform = ({toggle}) => {

  return (
    <div>
        <form className="transfermoneyform">
            <div className="transfermoneyheader">
            <IoArrowBackCircle className="backbutton" onClick={()=>{toggle()}} />
              <h3 className="h3transfermoney">Transfer money</h3>
              <GrTransaction className="transactionlogo1" />
            
            </div>
            <div className="hrtransfermoneyform"></div>
            <div className="transfermoneyheader email">
              <label className="recieveremail">Reciever Email Address</label>
              <MdOutlineEmail className="inputemailicon" />
              <input placeholder="Email-Address" className="inputmoneytransfer" type="email"></input>
            </div>
            <br></br><br></br>
            <div className="transfermoneyheader amount">
              <label className="recieveramount">Amount</label>
              <RiMoneyDollarCircleFill className="inputmoneyicon" />
              <input placeholder="Amount" className="inputmoneytransfer" type="integer"></input>
            </div>
            <div className="transfermmoneybuttondiv">
            <button className="transfermoneybutton" type="submit">TRANSFER</button>
            </div>
        </form>
    </div>
  )
}


export default transfermoneyform