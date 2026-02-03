import "./ConfiramationModel.css";

const ConfiramationModal =({
    title,
    desc,
    onConfirm,
    onClose,
    confirmBtnText,
})=>{
    return(
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{title}</h2>
                <p>{desc}</p>
                
                <div className="modal-actions">
                    <button 
                        className="btn btn-cancel" 
                        onClick={onClose}
                    >
                        Cancle
                    </button>
                    <button 
                        className="btn btn-delete" 
                        onClick={onConfirm}
                    >
                        {confirmBtnText}
                    </button>


                </div>
            </div>

        </div>
    )
}

export default ConfiramationModal ;