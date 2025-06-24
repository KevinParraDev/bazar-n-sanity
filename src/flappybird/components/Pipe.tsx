import pipeTotemTop from '../../assets/pipe_totem_top.png';
import pipeTotemBottom from '../../assets/pipe_totem_bottom.png';

type PipeProps = { x: number; height: number; isTop: boolean };

const PIPE_WIDTH = 60;
const GAME_HEIGHT = 600;

const Pipe = ({ x, height, isTop }: PipeProps) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: isTop ? 0 : GAME_HEIGHT - height,
      width: PIPE_WIDTH,
      height,
      backgroundImage: `url(${isTop ? pipeTotemTop : pipeTotemBottom})`,
      backgroundSize: `100% ${height}px`, // Estira la imagen verticalmente
      backgroundRepeat: 'repeat-y',        // O 'no-repeat' si prefieres estirado puro
      backgroundPosition: 'top',
      zIndex: 1,
    }}
  />
);

export default Pipe;