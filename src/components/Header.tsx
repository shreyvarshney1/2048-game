import Control from './Control';
import useAppSelector from '@/hooks/useAppSelector';

const Header = () => {
  const score = useAppSelector((state: any) => state.app.score);
  const best = useAppSelector((state: any) => state.app.best);

  return (
    <>
      <div className="flex justify-between mb-6 lg:items-center">
        <h1 className="text-7xl font-bold lg:tracking-wide text-brown-100 pl-6">2048</h1>
        <div className="flex gap-1 pr-6">
          <div className="m-auto rounded-md bg-[#bbada0] px-6 py-2 text-center font-bold">
            <div className="uppercase text-[#eee4da] text-sm font-semibold">Score</div>
            <div className="text-2xl font-bold leading-none text-white">{score}</div>
          </div>
          <div className="m-auto rounded-md bg-[#bbada0] px-6 py-2 text-center font-bold">
            <div className="uppercase text-[#eee4da] text-sm font-semibold">Best</div>
            <div className="text-2xl font-bold leading-none text-white">{best}</div>
          </div>
        </div>
      </div>

      <Control />
    </>
  );
};

export default Header;
