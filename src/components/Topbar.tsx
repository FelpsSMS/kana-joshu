import { FC } from 'react'
import { ModeToggle } from './ModeToggle';

type TopbarProps = {

}

const Topbar: FC<TopbarProps> = ({ }) => {
    return (
        <div className="flex items-center justify-center h-20 bg-primary">
            <ModeToggle />

        </div>
    )
}

export default Topbar;