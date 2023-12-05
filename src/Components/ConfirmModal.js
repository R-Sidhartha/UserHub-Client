import React from "react";

const ConfirmModal = ({
  title,
  message,
  handleCancelDelete,
  handleConfirmDelete,
}) => {

  return (
    <>
      <div className="modal z-10  top-32 left-1/3 bg-gray-500 p-8 rounded-lg" tabIndex="-1" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title text-center font-semibold" >{title}</h5>
              <button
                type="button"
                className="close absolute top-0 right-2"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span
                className="text-3xl"
                  aria-hidden="true"
                  onClick={handleCancelDelete}
                >
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body border-0" >
              <p>{message}</p>
            </div>
            <div className="modal-footer border-0 flex justify-between mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleCancelDelete}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;