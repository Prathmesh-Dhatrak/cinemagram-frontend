import { LikeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDidMount } from '~/hooks';
import { likePost } from '~/services/api';

interface IProps {
    postID: string;
    isLiked: boolean;
    likeCallback: (postID: string, state: boolean, newLikeCount: number) => void;
}

const LikeButton: React.FC<IProps> = (props) => {
    const [isLiked, setIsLiked] = useState(props.isLiked);
    const [isLoading, setLoading] = useState(false);
    const didMount = useDidMount();

    useEffect(() => {
        setIsLiked(props.isLiked);
    }, [props.isLiked]);

    const dispatchLike = async () => {
        if (isLoading) return;

        try {
            setLoading(true);

            const { state, likesCount } = await likePost(props.postID);
            if (didMount) {
                setLoading(false);
                setIsLiked(state);
            }

            props.likeCallback(props.postID, state, likesCount);
        } catch (e) {
            didMount && setLoading(false);
            console.log(e);
        }
    }

    return (
        <span
            className={` px-1 py-2 m-1 rounded-md flex items-center justify-center hover:bg-gray-300 cursor-pointer text-l w-2/4  ${isLiked ? 'font-bold dark:text-red-700 dark:bg-white' : 'text-black dark:hover:bg-gray-300 dark:hover:text-black  dark:bg-white '} ${isLoading && 'opacity-50'}`}
            onClick={dispatchLike}
        >

            <LikeOutlined />
            &nbsp;
            {isLiked ? 'Unlike' : 'Like'}
        </span>
    );
};

export default LikeButton;
