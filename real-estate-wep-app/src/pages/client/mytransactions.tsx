import { useEffect, useState } from "react";
import HeroComponentLite from "../../components/client/HeroLite";
import { fetchUserTransactions } from "../../services/dbservices/user/FetchUserTransactions";
import { ITransactions } from "../../models/interfaces/TransactionInterface";
import { dateToWords } from "../../services/Util/ConvertDateToWords";


  const MyTransactionsPage: React.FC<{ savedUserId: string}> = ( {savedUserId} )  => {

  const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
  
    useEffect(() => {
        getTransactions();       
    }, [savedUserId]);

    const getTransactions = async () => {
      if(!savedUserId || savedUserId == "0")
      {
          return;
      }
      setLoading(true);
      const fetchedTransactions = await fetchUserTransactions(savedUserId);
      setTransactions(fetchedTransactions);
      setLoading(false);
    };

  return (
    <>
      <HeroComponentLite
        breadcrumbLinks={[
          { href: "home", text: "Home" },
          { href: "#", text: "Transactions" },
        ]}
        title="My Transactions"
      />
      
      <div className="dashboard-section-area sp1">
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="heading1">
            <h2>Transactions</h2>
            {loading && <><div className="space20"></div><p>Fetching transactions...</p></>}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="space30"></div>
          <div className="dashboard-info-sider-deatils">
            <div className="dashboard-info-sider">

            {loading
        ? Array(1)
            .fill(0)
            .map((_) => (
              <div className="content-area d-flex justify-content-center align-items-center" style={{ minHeight: "30vh" }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Fetching your data...</span>
              </div>
            </div>            
            ))
        : transactions.length < 1 ? 
        <div className="text-center p-4">
          <div className="space30"></div>
          <p className="fw-bold">You are yet to make a transaction</p>
          <div className="space10"></div>
          <a href="/listing" className="btn btn-dark">Start Shopping</a>
        </div>
        :transactions.map((transaction) => (
          <div className="message-boxarea mb-4">
          <div className="img1">
            <img src="//client/img/all-images/bank-icon.png" alt="housebox"/>
          </div>
          <div className="conatent-area">
            <div className="content">
              <h5>₦ {transaction.amount.toLocaleString()}</h5>
              <p className="d-none d-md-block">{dateToWords(transaction.updated_on)}</p>
              <p>#{transaction.transaction_id}</p>
            </div>
            <div className="space14"></div>
            <p><b>Payment Method</b> {transaction.payment_method}</p><br/>
            <p><b>Transaction</b> {transaction.transaction_type}</p>
            <p className="d-block  d-md-none"><b>Date</b> {dateToWords(transaction.updated_on)}</p>
          </div>
        </div>
          ))}


              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
};

export default MyTransactionsPage;
