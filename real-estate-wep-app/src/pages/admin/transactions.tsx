import { useEffect, useState } from "react";
import { dateToWords } from "../../services/Util/ConvertDateToWords";
import { ITransactions } from "../../models/interfaces/TransactionInterface";
import { fetchTransactions } from "../../services/dbservices/admin/transactions/fetchTransactions";
import { copyToClipboard } from "../../services/Util/CopyText";

const TransactionsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    getTransactions();
  }, [searchKeyword]);

  const getTransactions = async () => {
    setLoading(true);
    const fetchedData = await fetchTransactions(searchKeyword);
    setTransactions(fetchedData);
    setLoading(false);
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card" id="invoiceList">
          <div className="card-header border-0 d-flex align-items-center">
            <h5 className="card-title mb-0 flex-grow-1">User Transactions</h5>
          </div>

          {/* Search Input */}
          <div className="card-body p-0 border-bottom border-bottom-dashed">
            <div className="search-box">
              <input
                type="text"
                className="form-control search border-0 py-3"
                placeholder="Search for transaction..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <i className="ri-search-line search-icon"></i>
            </div>
          </div>

          {/* Users List */}
          <div className="card-body">
            <div className="table-responsive table-card">
              {loading ? (
                <div className="text-center mt-5 mb-5 d-flex justify-content-center align-items-center gap-2">
                <div className="spinner-border text-dark" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <h5 className="mb-0">Loading...</h5>
              </div>              
              ) : transactions.length === 0 ? (
                <div className="noresult text-center">
                  <h5 className="mt-2">Sorry! No Result Found</h5>
                  <p className="text-muted mb-0">
                    We've searched more than 150+ results but found none from your search.
                  </p>
                </div>
              ) : (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Payment Method</th>
                      <th>Transaction Id</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="mb-5">
                    {transactions.map((transaction, index) => (
                      <tr key={transaction.id}>
                        <td>{index + 1}.</td>
                        <td>
                          {transaction.transaction_type}
                        </td>
                        <td>{transaction.payment_method}</td>
                        <td>{transaction.transaction_id}</td>
                        <td>
                          <span className={transaction.status == "Completed" ? "badge badge-soft-success" : transaction.status == "Pending" ? "badge badge-soft-warning" : "badge badge-soft-danger"}>{transaction.status?.toUpperCase()}</span>
                          <br />
                          {dateToWords(transaction.created_on ?? "")}
                        </td>
                        <td>
                        <div className="dropdown">
                                <button className="btn btn-sm btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                  Actions
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a className="dropdown-item" href={`/invoice?id=${transaction.id}`} target="blank">
                                      View Invoice
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#" onClick={() => copyToClipboard(transaction.transaction_id, "Transaction ID")}>
                                      Copy Transaction Id
                                    </a>
                                  </li>
                                </ul>
                              </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default TransactionsPage;
