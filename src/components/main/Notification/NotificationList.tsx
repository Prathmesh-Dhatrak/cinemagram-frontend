import { CommentOutlined, LikeOutlined, UserAddOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Avatar } from '~/components/shared';
import { displayTime } from '~/helpers/utils';
import { INotification } from "~/types/types";

interface IProps {
    notifications: INotification[],
    toggleNotification: (bool: boolean) => void;
    readNotification: (id: string) => void;
    infiniteScrollRef: React.RefObject<HTMLElement>;
}

const NotificationList: React.FC<IProps> = (props) => {
    const { toggleNotification, notifications, readNotification, infiniteScrollRef } = props;
    const history = useHistory();
    const handleNotificationClick = (link: string, id: string) => {
        readNotification(id);
        toggleNotification(false);
        history.push(link);
    };

    return (
        <div className="relative">
            {notifications.length === 0 ? (
                <div className="text-center p-4">
                    <p className="text-black-400 italic">No new notifications</p>
                </div>
            ) : (
                <div
                    className="max-h-80vh laptop:max-h-70vh relative overflow-y-scroll divide-y divide-gray-100 scrollbar"
                >
                    <TransitionGroup component={null}>
                        <div ref={infiniteScrollRef as React.RefObject<HTMLDivElement>}>
                            {notifications.map((notif) => notif.initiator && (
                                <CSSTransition
                                    timeout={500}
                                    classNames="fade"
                                    key={notif.id}
                                >
                                    <div
                                        style={{ backgroundColor: notif.unread ? '#70b5f933' : '#ffffffe1' }}
                                        className={`p-4 ${notif.unread ? 'hover:bg-blue-300' : 'hover:bg-gray-100'} hover:opacity-95 divide-y divide-y-2 divide-gray-100`}
                                        key={notif.id}

                                        onClick={() => handleNotificationClick(notif.link, notif.id)}
                                    >
                                        <div className="relative">
                                            <div className="flex items-start">
                                                <Avatar
                                                    url={notif.initiator.profilePicture?.url}
                                                    size={window.screen.width < 1024 ? 'sm' : 'lg'}
                                                    className="mr-2 flex-shrink-0"
                                                />
                                                <div>
                                                    <span className="dark:text-red-700 font-medium break-all">
                                                        {notif.initiator.username}
                                                    </span>
                                                    &nbsp;
                                                    <span className="text-black-600 dark:text-black-400 break-all">
                                                        {
                                                            notif.type === 'like' ? 'likes your post.'
                                                                : notif.type === 'comment' ? 'commented on your post.'
                                                                    : notif.type === 'comment-like' ? 'likes your comment.'
                                                                        : notif.type === 'follow' ? 'started following you.'
                                                                            : notif.type === 'reply' ? 'replied to your comment'
                                                                                : ''
                                                        }
                                                    </span>
                                                    <br />
                                                    <span className="text-black-500 text-1xs block">
                                                        {displayTime(notif.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                            {(notif.type === 'like' || notif.type === 'comment-like') ? (
                                                <LikeOutlined className="text-2xl text-red-700 dark:text-red-700 absolute right-4 top-0 bottom-0 my-auto" />
                                            ) : (notif.type === 'comment' || notif.type === 'reply') ? (
                                                <CommentOutlined className="text-2xl text-red-700 dark:text-red-700 absolute right-4 top-0 bottom-0 my-auto" />
                                            ) : (
                                                <UserAddOutlined className="text-2xl text-red-700 dark:text-red-700 absolute right-4 top-0 bottom-0 my-auto" />
                                            )}
                                        </div>
                                    </div>
                                </CSSTransition>
                            ))}
                        </div>
                    </TransitionGroup>
                </div>
            )}
        </div>
    );
};

export default NotificationList;
