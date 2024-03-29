import { StarOutlined, TeamOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Avatar } from "~/components/shared";

interface IProps {
    username: string;
    profilePicture?: string;
}

const SideMenu: React.FC<IProps> = ({ username, profilePicture }) => {
    return (
        <ul className="overflow-hidden">
            <li className="px-4 py-3 dark:text-black hover:text-white cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-500 border-b-2 border-gray-600">
                <Link to={`/user/${username}`} className="flex items-center" style={{ color: 'inherit' }}>
                    <Avatar url={profilePicture} className="mr-4" />
                    <h6 className="text-sm " style={{ color: 'inherit' }}>My Profile</h6>
                </Link>
            </li>
            <li className="px-4 py-3 cursor-pointer dark:text-black hover:text-white hover:bg-indigo-100  dark:hover:bg-indigo-500 ">
                <Link to={`/user/${username}/following`} className="flex items-center" style={{ color: 'inherit' }}>
                    <TeamOutlined style={{ fontSize: '30px', marginRight: '25px', color: 'inherit' }} />
                    <h6 className="text-sm" style={{ color: 'inherit' }}>Following</h6>
                </Link>
            </li>
            <li className="px-4 py-3 cursor-pointer mt-4 dark:text-black hover:text-white hover:bg-indigo-100  dark:hover:bg-indigo-500">
                <Link to={`/user/${username}/followers`} className="flex items-center" style={{ color: 'inherit' }}>
                    <TeamOutlined style={{ fontSize: '30px', marginRight: '25px', color: 'inherit' }} />
                    <h6 className="text-sm" style={{ color: 'inherit' }}>Followers</h6>
                </Link>
            </li>
            <li className="px-4 py-3 cursor-pointer mt-4 dark:text-black hover:text-white hover:bg-indigo-100  dark:hover:bg-indigo-500">
                <Link to={`/user/${username}/bookmarks`} className="flex items-center" style={{ color: 'inherit' }}>
                    <StarOutlined style={{ fontSize: '30px', marginRight: '25px', color: 'inherit' }} />
                    <h6 className="text-sm" style={{ color: 'inherit' }}>Bookmarks</h6>
                </Link>
            </li>
        </ul>
    )
};

export default SideMenu;
