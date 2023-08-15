import { useParams } from "react-router-dom";
import AdminPanelMainDisplay from "../display/AdminPanelMainDisplay";

const AdminPanelMainContainer = () => {
  const { plateType, menuSelected } = useParams();

  console.log(plateType + " si " + menuSelected);
  return <AdminPanelMainDisplay />;
}

export default AdminPanelMainContainer