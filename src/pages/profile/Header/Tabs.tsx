import { FormOutlined, InfoCircleOutlined, StarOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface IProps {
    followersCount: number;
    followingCount: number;
    username: string;
    isOwnProfile: boolean;
}

const linkStyleName = `
    text-sm laptop:text-lg font-medium text-black text-white
   rounded-t-md cursor-pointer px-2 laptop:px-4 py-2 border-transparent
   border-b-2 laptop:border-white flex justify-center items-center space-x-2
`;

const Tabs: React.FC<IProps> = ({ username, isOwnProfile, followersCount, followingCount }) => {
    const { pathname } = useLocation();
    const [activeNav, setActiveNav] = useState('');

    useEffect(() => {
        const splitPath = pathname.split('/');
        const currentNav = splitPath[splitPath.length - 1];

        setActiveNav(currentNav);
    }, [pathname]);

    return (
        <ul className="flex my-2 py-2 items-center justify-between tablet:justify-evenly flex-wrap laptop:justify-start space-x-1 laptop:space-x-4 px-4 bg-indigo-1000 laptop:bg-transparent laptop:p-0">
            <li>
                <Link
                    to={`/user/${username}/`}
                    className={`${linkStyleName} ${(activeNav === username || activeNav === '') && 'border-turquoise-700 text-red-600 laptop:text-white  border-b-4'}`}
                >
                    <span className="hidden laptop:inline-block">Posts</span>
                    <FormOutlined className="laptop:hidden text-2xl" />
                </Link>
            </li>
            <li>
                <Link
                    to={`/user/${username}/info`}
                    className={`${linkStyleName} ${activeNav === 'info' && 'border-turquoise-700 text-red-600 border-b-4'}`}
                >
                    <span className="hidden laptop:inline-block" style={{ color: 'inherit' }}>Info</span>
                    <InfoCircleOutlined className="laptop:hidden text-2xl" />
                </Link>
            </li>
            <li>
                <Link
                    to={`/user/${username}/followers`}
                    className={`${linkStyleName} ${activeNav === 'followers' && 'border-turquoise-700 text-red-600 border-b-4'}`}
                >
                    {/* <span className="laptop:text-lg text-lg" style={{ color: 'inherit' }}>{followersCount}</span> */}
                    <span className="hidden laptop:inline-block">{followersCount > 1 ? 'Followers' : 'Follower'}</span>
                    <TeamOutlined className="laptop:hidden text-2xl" />
                </Link>
            </li>
            <li>
                <Link
                    to={`/user/${username}/following`}
                    className={`${linkStyleName} ${activeNav === 'following' && 'border-turquoise-700 text-red-600 border-b-4'}`}
                >
                    {/* <span className="laptop:text-lg text-lg" style={{ color: 'inherit' }}>{followingCount}</span> */}
                    <span className="hidden laptop:inline-block">Following</span>
                    <UserAddOutlined className="laptop:hidden text-2xl" />
                </Link>
            </li>
            {isOwnProfile && (
                <li>
                    <Link
                        to={`/user/${username}/bookmarks`}
                        className={`${linkStyleName} ${activeNav === 'bookmarks' && 'border-turquoise-700 text-red-600 border-b-4'}`}
                    >
                        <span className="hidden laptop:inline-block" style={{ color: 'inherit' }}>Bookmarks</span>
                        <StarOutlined className="laptop:hidden text-2xl" />
                    </Link>
                </li>
            )}
        </ul>
    );
};

export default Tabs;
