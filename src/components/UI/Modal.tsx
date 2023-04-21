import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

// const Backdrop: React.FC<{ onClose: () => void }> = (props) => {

const Backdrop = (props:{ onClose: () => void }) => {
  return <div className='backdrop' onClick={props.onClose}/>;
};

const ModalOverlay = (props:ModalProps) => {
  return (
    <div className="modal">
      <div className='content'>{props.children}</div>
    </div>
  );
};

const Modal = (props:ModalProps) => {
  const portalElement = document.getElementById('overlays');
  if (!portalElement) {
    throw new Error('Could not find portal element!');
  }

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};


export default Modal;
