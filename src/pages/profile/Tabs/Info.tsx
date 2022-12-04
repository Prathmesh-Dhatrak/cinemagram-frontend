import dayjs from 'dayjs';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDocumentTitle } from '~/hooks';
import { IRootReducer } from "~/types/types";

const Info = () => {
    const { profile, isOwnProfile } = useSelector((state: IRootReducer) => ({
        profile: state.profile,
        isOwnProfile: state.auth.username === state.profile.username
    }));
    const history = useHistory();
    useDocumentTitle(`Info - ${profile.username} | Cinemagram`);

    console.log(profile);


    return (
        <div className=" bg-white rounded-md min-h-10rem shadow-lg">
            <div className="p-4 rounded-t-md border-b-2 border-black flex justify-between dark:bg-indigo-1000">
                <h3 className="text-black-500 dark:text-black">Info</h3>
                {isOwnProfile && (
                    <span
                        className="underline cursor-pointer text-red-700 dark:text-red-700 pr-4"
                        onClick={() => history.push(`/user/${profile.username}/edit`)}
                    >
                        Edit
                    </span>
                )}
            </div>
            <div className="divide-y p-4 divide-gray-100 dark:divide-gray-800 space-y-4">
                <div className="grid grid-cols-3 py-4">
                    <h5 className="text-black font-bold">Full Name</h5>
                    {profile.fullname || profile.firstname ? (
                        <span className="text-black col-span-2">{profile.fullname ? profile.fullname : profile.firstname}</span>
                    ) : (
                        <span className="text-gray-400 italic">Name not set.</span>
                    )}
                </div>
                <div className="grid grid-cols-3 py-4">
                    <h5 className="text-black font-bold">Gender</h5>
                    {profile.info.gender ? (
                        <span className="text-black col-span-2 capitalize">{profile.info.gender}</span>
                    ) : (
                        <span className="text-gray-400 italic">Gender not set.</span>
                    )}
                </div>
                <div className="grid grid-cols-3 py-4">
                    <h5 className="text-black font-bold">Birthday</h5>
                    {profile.info.birthday ? (
                        <span className="text-black col-span-2">{dayjs(profile.info.birthday).format('MMM.DD, YYYY')}</span>
                    ) : (
                        <span className="text-gray-400 italic">Birthday not set.</span>
                    )}
                </div>
                <div className="grid grid-cols-3 py-4">
                    <h5 className="text-black font-bold">Bio</h5>
                    {profile.info.bio ? (
                        <span className="text-black col-span-2">{profile.info.bio}</span>
                    ) : (
                        <span className="text-gray-400 italic">Bio not set.</span>
                    )}
                </div>
                <div className="grid grid-cols-3 py-4">
                    <h5 className="text-black font-bold">Date Joined</h5>
                    <span className="text-black col-span-2">{dayjs(profile.dateJoined).format('MMM.DD, YYYY')}</span>
                </div>
            </div>
        </div>
    );
};

export default Info;
