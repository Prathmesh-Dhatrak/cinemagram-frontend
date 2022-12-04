import dayjs from 'dayjs';

interface IProps {
    bio: string;
    dateJoined: string | Date;
}

const Bio: React.FC<IProps> = ({ bio, dateJoined }) => {
    return (
        <aside className="p-4 bg-white dark:bg-indigo-1000 shadow-lg rounded-md space-y-4">
            <div>
                <h4 className="mb-2 dark:text-black">Bio</h4>
                {
                    bio ? (
                        <p className="text-black-600 dark:text-black-400">{bio}</p>
                    ) : (
                        <p className="text-black-400 italic">No bio set.</p>
                    )
                }
            </div>
            <div>
                <h4 className="mb-2 dark:text-black">Joined</h4>
                <p className="text-black-600 dark:text-black-400">{dayjs(dateJoined).format('MMM.DD, YYYY')}</p>
            </div>
        </aside>
    );
};

export default Bio;
