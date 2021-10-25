import { observer } from "mobx-react-lite";
import React from "react";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../stores/store";



export default observer( function ModalContainer(){
    const {modalStroe} = useStore();
    return (
        <Modal open={modalStroe.modal.open} onClose={modalStroe.closeModal} size='mini'>
            <Modal.Content>
                {modalStroe.modal.body}
            </Modal.Content>

        </Modal>

    );


})