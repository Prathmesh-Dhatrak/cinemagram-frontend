interface IProps {
    children?: React.ReactNode,
    count: number;
}

const Badge: React.FC<IProps> = ({ children, count = 0 }) => {
    return (
        <div className="relative">
            {count > 0 && (
                <div className="w-5 h-5 flex items-center justify-center rounded-md absolute -right-1 -top-1 bg-red-700 text-1xs text-white border-2 border-white dark:border-turquoise-1000">
                    {count}
                </div>
            )}
            {children && children}
        </div>
    );
};

export default Badge;
