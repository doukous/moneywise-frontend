import React from 'react';
import {
    LogOut

} from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';

/*interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}*/

//const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
// const { user, logout } = useAuth();



<div className="p-4 border-t border-gray-200">
    <button
        onClick={logout}
        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
    >
        <LogOut className="h-5 w-5" />
        <span className="text-sm font-medium">Déconnexion</span>
    </button>
</div>
  //);
//};

export default Sidebar;