import { BarChart3, Package, Zap, Users, BarChart2, RefreshCw, Ticket, MessageSquare } from 'lucide-react';

export default function Sidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'products', label: 'Products', icon: Zap },
    { id: 'coupons', label: 'Coupons', icon: Ticket },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'refunds', label: 'Refunds', icon: RefreshCw },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border shadow-sm flex flex-col">
      <div className="h-16 border-b border-border flex items-center px-6">
        <h1 className="text-xl font-bold text-foreground">Spirboost</h1>
      </div>
      
      <nav className="mt-6 px-3 space-y-2 flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="font-medium text-sm sm:text-base">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
