import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import Modal from 'react-modal';
import { Loader } from '~/components/shared';
import getCroppedImg from '~/helpers/cropImage';
import { IImage } from '~/types/types';

interface IProps {
    isOpen: boolean;
    onAfterOpen?: () => void;
    closeModal: () => void;
    openModal: () => void;
    file: IImage;
    onCropSuccessCallback: (file: File) => void;
}

Modal.setAppElement('#root');

const CropProfileModal: React.FC<IProps> = (props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1.5);
    const [aspect, setAspect] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isCropping, setIsCropping] = useState(false);

    const getCroppedImage = useCallback(async () => {
        try {
            setIsCropping(true);
            const { url, blob } = await getCroppedImg(props.file.url, croppedAreaPixels);

            setIsCropping(false);
            const file = new File([blob], props.file.id, { type: 'image/jpeg' });
            props.onCropSuccessCallback(file);
            clearState();
            URL.revokeObjectURL(url);
        } catch (e) {
            console.error('ERROR CROPPING: ', e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [croppedAreaPixels]);

    const onCropChange = (crop: { x: number; y: number }) => {
        setCrop(crop)
    }

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const onZoomChange = (zoom: number) => {
        setZoom(zoom)
    }

    const clearState = () => {
        setCroppedAreaPixels(null);
        setZoom(1);
        setAspect(1);
        setCrop({ x: 0, y: 0 });
        props.closeModal();
    }

    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                onAfterOpen={props.onAfterOpen}
                onRequestClose={props.closeModal}
                contentLabel="Example Modal"
                className="modal"
                shouldCloseOnOverlayClick={false}
                overlayClassName="modal-overlay"
                style={
                    { 
                        overlay: { backgroundColor: 'rgba(255, 255, 255, 0.55)' }, 
                        content: { background: '#fff', border: '1px solid #ccc'} 
                    }
                }
            >
                <div className="w-full laptop:w-30rem rounded-md">
                    <div className="p-4 flex items-start justify-between">
                        <h2 className="text-xl laptop:text-2xl dark:text-black">Crop Photo</h2>
                        <div className="flex items-center">
                            <button
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow"
                                disabled={isCropping}
                                onClick={clearState}
                            >
                                Cancel
                            </button>
                            &nbsp;
                            <button
                                onClick={getCroppedImage}
                                disabled={isCropping}
                                className="text-white font-semibold py-2 px-4 border border-gray-400 rounded-full shadow"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="crop-container w-full h-20rem relative">
                        {isCropping && (
                            <div className="w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50 absolute">
                                <h3 className="text-black mb-2">Cropping</h3>
                                <Loader mode="light" />
                            </div>
                        )}
                        <Cropper
                            image={props.file?.url || ''}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspect}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={onCropChange}
                            onCropComplete={onCropComplete}
                            onZoomChange={onZoomChange}
                        />
                    </div>
                    <div className="controls p-4">
                        <input
                            className="w-full outline-none"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            readOnly={isCropping}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onZoomChange(Number(e.target.value))}
                            type="range"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CropProfileModal;
