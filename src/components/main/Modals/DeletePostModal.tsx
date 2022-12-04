import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDidMount } from '~/hooks';
import { setTargetPost } from '~/redux/action/helperActions';
import { hideModal } from '~/redux/action/modalActions';
import { deletePost } from '~/services/api';
import { EModalType, IError, IRootReducer } from '~/types/types';

interface IProps {
    onAfterOpen?: () => void;
    deleteSuccessCallback: (postID: string) => void;
}

Modal.setAppElement('#root');

const DeletePostModal: React.FC<IProps> = (props) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<IError | null>(null);
    const didMount = useDidMount();
    const dispatch = useDispatch();
    const { targetPost, isOpen } = useSelector((state: IRootReducer) => ({
        targetPost: state.helper.targetPost,
        isOpen: state.modal.isOpenDeletePost
    }))

    const handleDeletePost = async () => {
        try {
            setIsDeleting(true);
            await deletePost(targetPost?.id as string);

            didMount && setIsDeleting(false);

            closeModal();
            props.deleteSuccessCallback(targetPost?.id as string);
            toast.dark('Post successfully deleted.', {
                progressStyle: { backgroundColor: '#4caf50' }
            });
        } catch (e) {
            if (didMount) {
                setIsDeleting(false);
                setError(e);
            }
        }
    };

    const closeModal = () => {
        if (isOpen && !isDeleting) {
            dispatch(setTargetPost(null));
            dispatch(hideModal(EModalType.DELETE_POST));
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onAfterOpen={props.onAfterOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="modal"
            shouldCloseOnOverlayClick={!isDeleting}
            overlayClassName="modal-overlay"
            style={
                { 
                    overlay: { backgroundColor: 'rgba(255, 255, 255, 0.55)' }, 
                    content: { background: '#fff', border: '1px solid #ccc'} 
                }
            }
        >
            <div className="relative">
                <div
                    className="absolute right-2 top-2 p-1 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-indigo-1100"
                    onClick={closeModal}
                >
                    <CloseOutlined className="p-2  outline-none text-black-500 dark:text-black" />
                </div>
                {error && (
                    <span className="p-4 bg-red-100 text-red-500 block">
                        {error?.error?.message || 'Unable to process your request.'}
                    </span>
                )}
                <div className="p-4 laptop:px-8">
                    <h2 className="dark:text-black">
                        <ExclamationCircleOutlined className="text-red-500 mr-2 pt-2" />
                        Delete Post
                    </h2>
                    <p className="text-black-600 my-4 dark:text-black-400">Are you sure you want to delete this post?</p>
                    <div className="flex justify-between">
                        <button
                            className="button--muted !rounded-full dark:bg-indigo-1100 dark:text-black dark:hover:bg-indigo-1100"
                            onClick={closeModal}
                            disabled={isDeleting}
                        >
                            Cancel
                        </button>
                        <button
                            className="button--danger"
                            disabled={isDeleting}
                            onClick={handleDeletePost}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

        </Modal>
    );
};

export default DeletePostModal;
