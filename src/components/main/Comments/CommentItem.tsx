import { DownOutlined, LoadingOutlined, UpOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "~/components/shared";
import { useDidMount } from "~/hooks";
import { getCommentReplies, likeComment, replyOnComment, updateComment } from "~/services/api";
import { IComment, IError } from "~/types/types";
import { CommentOptions } from "../Options";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

dayjs.extend(relativeTime);

interface IProps {
    comment: IComment;
    openDeleteModal: () => void;
}

const CommentItem: React.FC<IProps> = (props) => {
    const [offset, setOffset] = useState(0);
    const [comment, setComment] = useState<IComment>(props.comment);
    const [replies, setReplies] = useState<IComment[]>([]);
    const [isOpenInput, setOpenInput] = useState(false);
    const [isVisibleReplies, setVisibleReplies] = useState(true);
    const [editCommentBody, setEditCommentBody] = useState(comment.body || '');
    const [newCommentBody, setNewCommentBody] = useState('');
    const [isGettingReplies, setGettingReplies] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [isUpdateMode, setUpdateMode] = useState(false);
    const [error, setError] = useState<IError | null>(null);
    const didMount = useDidMount(true);
    const replyInputRef = useRef<HTMLInputElement | null>(null);
    const editCommentInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        didMount && setComment(props.comment);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.comment]);

    const getReplies = async () => {
        try {
            setGettingReplies(true);
            const data = await getCommentReplies({ offset, comment_id: comment.id, post_id: comment.post_id });

            setGettingReplies(false);
            setError(null);
            setReplies([...replies, ...data]);
            setOffset(offset + 1);
            setVisibleReplies(true);
        } catch (e) {
            console.log(e);
            setGettingReplies(false);
            setError(e);
        }
    }

    const onClickViewReplies = () => {
        if (isGettingReplies) return;
        if (didMount) setVisibleReplies(!isVisibleReplies);

        if (replies.length === 0) getReplies();
    }

    const handleSubmitReply = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            try {
                let data;
                setSubmitting(true);

                if (isUpdateMode && editCommentBody) {
                    data = await updateComment(comment.id, editCommentBody);
                } else {
                    data = await replyOnComment(newCommentBody, comment.id, comment.post_id);
                }

                // make sure it's mounted before setting states 
                if (didMount) {
                    if (isUpdateMode) {
                        setComment(data);
                        setEditCommentBody('');
                        setUpdateMode(false);
                    } else {
                        setReplies([...replies, data]);
                        setNewCommentBody('');
                        setOpenInput(false);
                    }

                    setError(null);
                    setVisibleReplies(true);
                    setSubmitting(false);
                    replies.length === 0 && getReplies();
                }
            } catch (e) {
                console.log(e);
                if (didMount) {
                    setSubmitting(false);
                    setError(e);
                    // setError(e.error.message);
                }
            }
        } else if (e.key === 'Escape') {
            // if (isUpdateMode) handleCancelUpdate();
            setUpdateMode(false);
            setOpenInput(false);
            editCommentInputRef.current && editCommentInputRef.current.blur();
            replyInputRef.current && replyInputRef.current.blur();
        }

    };

    const onClickReply = () => {
        setOpenInput(!isOpenInput);
        setUpdateMode(false);
    };

    const handleOnEditReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditCommentBody(e.target.value);
    };

    const handleOnNewReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCommentBody(e.target.value);
    };

    const onClickEdit = () => {
        setUpdateMode(true);
        setEditCommentBody(comment.body);
        setOpenInput(false);
    }

    const onClickLike = async () => {
        if (isLiking) return;

        try {
            setIsLiking(true);
            const { state, likesCount } = await likeComment(comment.id);

            if (didMount) {
                setIsLiking(false);
                setComment({ ...comment, isLiked: state, likesCount });
            }
        } catch (err) {
            didMount && setIsLiking(false);
            console.log(err);
        }
    }

    const updateCommentCallback = (comment: IComment) => {
        if (didMount) {
            setReplies(oldComments => oldComments.filter((cmt) => cmt.id !== comment.id));
        }
    }

    return (
        <div
            className="flex py-2 items-start w-full"
            key={comment.id}
        >
            <Link to={`/user/${comment.author.username}`} className="mr-2">
                <Avatar url={comment.author.profilePicture?.url} size="sm" />
            </Link>
            <div className="inline-flex items-start flex-col w-full">
                {isUpdateMode ? (
                    <CommentInput
                        value={editCommentBody}
                        placeholder="Write a reply..."
                        onChange={handleOnEditReplyChange}
                        isSubmitting={isSubmitting}
                        ref={editCommentInputRef}
                        isUpdateMode={isUpdateMode}
                        onKeyDown={handleSubmitReply}
                    />
                ) : (
                    <>
                        <div className="flex items-start w-full laptop:w-auto">
                            {/* ------ USERNAME AND COMMENT TEXT ----- */}
                            <div className="bg-gray-100 dark:bg-white px-2 py-1 rounded-md flex-grow laptop:flex-grow-0">
                                <Link className="inline-block" to={`/user/${comment.author.username}`}>
                                    <h5 className="dark:text-red-700">{comment.author.username}</h5>
                                </Link>
                                <p className="text-black-800 text-sm min-w-full break-all dark:text-black-400 inline-block">
                                    {comment.body}
                                </p>
                            </div>
                            {(comment.isOwnComment || comment.isPostOwner) && (
                                <CommentOptions
                                    comment={comment}
                                    onClickEdit={onClickEdit}
                                    openDeleteModal={props.openDeleteModal}
                                />
                            )}
                        </div>
                        <div className="mx-2">
                            {/* ---- DATE AND LIKE BUTTON ----- */}
                            <div className="mt-1 flex items-center space-x-2">
                                {/* ---- LIKE BUTTON ---- */}
                                {comment.likesCount > 0 && (
                                    <span className="text-sm text-black-500">{comment.likesCount}</span>
                                )}
                                <span
                                    className={` hover:cursor-pointer rounded-md text-red-700 hover:bg-gray-500 hover:text-white px-1 text-xs ${comment.isLiked && 'font-bold text-red-500 dark:text-red-600'} ${isLiking && 'opacity-50 hover:cursor-default'}`}
                                    onClick={onClickLike}
                                >
                                    {comment.isLiked ? 'Unlike' : 'Like'}
                                </span>
                                {/* ---- REPLY BUTTON */}
                                {comment.depth < 3 && (
                                    <span
                                        className=" hover:cursor-pointer rounded-md 
                                        text-red-700 hover:bg-gray-500 hover:text-white px-1 text-xs"
                                        onClick={onClickReply}
                                    >
                                        Reply
                                    </span>
                                )}
                                {/* ---- DATE ---- */}
                                <span className="text-xs text-black-400 dark:text-black-600">
                                    {dayjs(comment.createdAt).fromNow()}
                                </span>
                                {comment.isEdited && (
                                    <span className="text-xs text-black-400 dark:text-black-600 ml-2">
                                        Edited
                                    </span>
                                )}
                            </div>
                            {/* ---- VIEW REPLIES BUTTON ----  */}
                            {(comment.replyCount > 0 || replies.length > 0) && (
                                <div className="flex space-x-2">
                                    {!error && (
                                        <span
                                            className="text-xs text-black hover:text-gray-800 mt-2 hover:cursor-pointer"
                                            onClick={onClickViewReplies}
                                        >
                                            {(isVisibleReplies && replies.length !== 0) ? 'Hide Replies' : 'View Replies'}
                                            &nbsp;
                                            {isGettingReplies
                                                ? <LoadingOutlined className="text-1xs" />
                                                : (isVisibleReplies && replies.length !== 0) ? <UpOutlined className="text-1xs" />
                                                    : <DownOutlined className="text-1xs" />
                                            }
                                        </span>
                                    )}
                                    {error && error?.status_code !== 404 && (
                                        <span className="text-black-400 text-xs">{error?.error?.message}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                )}
                {/* ------ REPLY INPUT ----- */}
                {isOpenInput && !isUpdateMode && (
                    <div className="py-4 w-full">
                        <CommentInput
                            value={newCommentBody}
                            placeholder="Write a reply..."
                            onChange={handleOnNewReplyChange}
                            isSubmitting={isSubmitting}
                            ref={replyInputRef}
                            isUpdateMode={isUpdateMode}
                            onKeyDown={handleSubmitReply}
                        />
                    </div>
                )}
                {/* ---- REPLY LIST ------- */}
                {replies.length > 0 && isVisibleReplies && (
                    <CommentList comments={replies} updateCommentCallback={updateCommentCallback} />
                )}
            </div>
        </div>
    )
};

export default CommentItem;
