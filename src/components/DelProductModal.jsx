import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Modal } from 'bootstrap';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DelProductModal({ selectedProduct, isOpen, setIsOpen, getProducts }) {

    const [isContent, setIsContent] = useState(false);

    const [modalData, setModalData] = useState(selectedProduct);

    const delProductModalRef = useRef(null);

    useEffect(() => {
        new Modal(delProductModalRef.current, { backdrop: false });
    }, [])

    useEffect(() => {
        if (isOpen) {
            const modalInstance = Modal.getInstance(delProductModalRef.current);
            modalInstance.show();
        }
    }, [isOpen])

    useEffect(() => {
        setModalData({
            ...selectedProduct
        })
    }, [selectedProduct])

    const handleCloseDelProductModal = () => {
        const modalInstance = Modal.getInstance(delProductModalRef.current);
        modalInstance.hide();
        setIsOpen(false);
    }

    const delProduct = async () => {
        try {
            await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${modalData.id}`, { data: { ...modalData, origin_price: Number(modalData.origin_price), price: Number(modalData.price), is_enabled: modalData.is_enabled ? 1 : 0 } });
            getProducts();
            setIsContent(true);
        } catch (error) {
            alert('刪除產品失敗');
        }
    }

    const handleDelProduct = async () => {
        try {
            await delProduct();
            getProducts();
            handleCloseDelProductModal();
        } catch (error) {
            alert('刪除產品失敗');
        }
    }

    return (
        <div
            ref={delProductModalRef}
            className="modal fade"
            id="delProductModal"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">刪除產品</h1>
                        <button
                            onClick={handleCloseDelProductModal}
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        你是否要刪除
                        <span className="text-danger fw-bold">{modalData.title}</span>
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={handleCloseDelProductModal}
                            type="button"
                            className="btn btn-secondary"
                        >
                            取消
                        </button>
                        <button onClick={handleDelProduct} type="button" className="btn btn-danger">
                            刪除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DelProductModal