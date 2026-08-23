
function TransactionRecords ({ records, onDelete, onEdit }) {

    return (
        <>
            <tbody>
                {records.map((record, index) => {
                    return(
                        <tr key={index}>
                            <td>{record.date}</td>
                            <td>
                                <small className="text-muted">{record.title}</small>
                            </td>
                            <td><span className="text-muted">{record.category}</span></td>
                            <td><span className="badge-expense text-uppercase">{record.type}</span></td>
                            <td className="text-danger fw-bold">{record.amount}</td>
                            <td className="text-end">
                                <button onClick={() => onEdit(record.id)} data-bs-toggle="modal" data-bs-target="#transactionModal" className="btn btn-sm btn-outline-custom me-1" title="Edit Transaction">
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </button>
                                <button onClick={() => onDelete(record.id)} className="btn btn-sm btn-outline-custom text-danger" data-bs-toggle="modal" data-bs-target="#deleteTransactionModal" title="Delete Transaction">
                                    <i className="fa-regular fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                    )
                })}              
            </tbody>
        </>
    )
}


export default TransactionRecords;
