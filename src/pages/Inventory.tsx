import bgWumpaIsland from '../assets/background_wumpa_island.png'
import Navbar from '../components/Islands/Navbar';
import InventoryView from '../components/Islands/InventoryView';

const Inventory = () => {
  return (
    <div
      className="w-screen min-h-screen bg-cover bg-center transition-all duration-700 relative"
      style={{ backgroundImage: `url(${bgWumpaIsland})` }}
    >
      <Navbar username="Kevin" />      {/* Título e inventario en contenedor scrolleable */}
      <div style={{ 
        paddingTop: '100px', 
        paddingBottom: '30px',
        minHeight: 'calc(100vh - 70px)', // Altura menos navbar
        overflow: 'auto'
      }}>
        <h1 style={{ paddingBottom: '30px', textAlign: 'center', color: '#fff' }}>Inventario</h1>
        <InventoryView />
      </div>
    </div>
  );

};

export default Inventory;