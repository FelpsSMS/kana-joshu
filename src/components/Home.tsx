import { Button } from '@/@/components/ui/Button';
import { FC } from 'react'
import { useNavigate } from 'react-router-dom';

type HomeProps = {

}

const Home: FC<HomeProps> = ({ }) => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-8 justify-center items-center">
            <span className="font-black font-">カナ助手</span>
            <p className="w-36 text-center text-lg">Welcome back! Ready to start?</p>
            <Button className="w-20" onClick={() => navigate('/session', { state: { kana: ["あ", "い", "う"] } })}>Study</Button>
        </div>
    )
}

export default Home;