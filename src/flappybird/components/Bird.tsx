type BirdProps = { y: number };

const BIRD_SIZE = 40;

const Bird = ({ y }: BirdProps) => (
  <div style={{
    position: 'absolute',
    left: 80,
    top: y,
    width: BIRD_SIZE,
    height: BIRD_SIZE,
    background: 'orange',
    borderRadius: '50%',
    border: '3px solid #b96d00',
    boxShadow: '0 0 10px #0008',
    backgroundImage: 'url(/src/assets/react.svg)',
    backgroundSize: 'cover'
  }} title="Crash" />
);

export default Bird;