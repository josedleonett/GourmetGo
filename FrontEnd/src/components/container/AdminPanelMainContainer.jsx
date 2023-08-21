import { useParams } from "react-router-dom";
import AdminPanelMainDisplay from "../display/AdminPanelMainDisplay";

const AdminPanelMainContainer = () => {
  const { plateType, menuSelected } = useParams();

  return <AdminPanelMainDisplay />;
}

export default AdminPanelMainContainer