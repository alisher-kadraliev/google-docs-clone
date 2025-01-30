
const AVATAR_SIZE = 36

interface AvatarProps {
    src: string;
    name: string;
}

const Avatar = ({ src, name }: AvatarProps) => {
    return (
        <div
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
            className="group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400">
            <div className="opacity-0 group ">

            </div>
        </div>
    )
}

export default Avatar