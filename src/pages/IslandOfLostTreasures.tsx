
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IslandOfLostTreasures = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirigir a la nueva vista de exploración de la isla
    navigate('/explore/lost-treasures');
  }, [navigate]);

  return null;
};

export default IslandOfLostTreasures;