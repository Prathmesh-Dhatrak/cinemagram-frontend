import { LoadingOutlined } from "@ant-design/icons";
import { lazy, Suspense } from "react";
import { IPost } from "~/types/types";

const EditPostModal = lazy(() => import('./EditPostModal'));
const PostLikesModal = lazy(() => import('./PostLikesModal'));
const DeletePostModal = lazy(() => import('./DeletePostModal'));

interface IProps {
    deleteSuccessCallback: (postID: string) => void;
    updateSuccessCallback: (post: IPost) => void;
}

const PostModals: React.FC<IProps> = (props) => {
    return (
        <Suspense fallback={<LoadingOutlined className="text-black-800 dark:text-black" />}>
            <DeletePostModal deleteSuccessCallback={props.deleteSuccessCallback} />
            <EditPostModal updateSuccessCallback={props.updateSuccessCallback} />
            <PostLikesModal />
        </Suspense>
    );
}

export default PostModals;
