import { Button } from '@/@/components/ui/Button';
import { FC } from 'react'
import { useNavigate } from 'react-router-dom';

type FinishedProps = {

}

const Finished: FC<FinishedProps> = ({ }) => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-8 justify-center items-center">
            <span className="font-black font-">カナ助手</span>
            <div className="">
                <p className="text-center text-lg">All done!</p>
                <p className="text-center text-lg">See you next time.</p>
            </div>
            <Button className="w-20" onClick={() => navigate('/')}>Back</Button>
        </div>
    )
}

export default Finished;