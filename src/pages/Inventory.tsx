import bgWumpaIsland from '../assets/background_wumpa_island.png'
import Navbar from '../components/Islands/Navbar';
import InventoryView from '../components/Islands/InventoryView';

const Inventory = () => {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center transition-all duration-700 relative overflow-hidden"
      style={{ backgroundImage: bgWumpaIsland }}
    >
      <Navbar username="Kevin" />      {/* Botón principal */}
      <h1 style={{paddingTop: '100px', paddingBottom: '30px'}}>Inventory</h1>
      <InventoryView />
    </div>
  );

};

export default Inventory;