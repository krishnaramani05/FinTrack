
function TransactionRecords ({ records, onDelete, onEdit }) {

    return (
        <>
            <tbody>
                {records.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="text-center py-5">
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <div
                                    className="empty-state-icon mb-3"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "50%",
                                        background: "rgba(124, 34, 229, 0.05)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "1px dashed rgba(124, 34, 229, 0.25)"
                                    }}
                                >
                                    <i className="fa-solid fa-magnifying-glass text-muted fs-4"></i>
                                </div>

                                <h5 className="fw-semibold text-muted mb-1">
                                    No transaction matches
                                </h5>

                                <p className="text-muted small mb-0">
                                    Try adjusting your search terms or filters.
                                </p>
                            </div>
                        </td>
                    </tr>
                    ) : (
                        records.map((record, index) => (
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
                    )
                )}             
            </tbody>
        </>
    );
}


export default TransactionRecords;
