import React, { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { 
  Package, ClipboardList, AlertCircle, Plus, Edit, Trash2, 
  CheckCircle, Truck, Clock, Terminal, Search, Filter,
  TrendingUp, Activity, Box, ShieldAlert, Cpu, BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

export default function AdminPanel() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'orders' | 'alerts'>('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('/api/products').then(res => res.data),
  });

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => axios.get('/api/orders').then(res => res.data),
  });

  const lowStockThreshold = 5;
  const categories = useMemo(() => ['All', ...Array.from(new Set(Array.isArray(products) ? products.map((p: any) => p.category) : []))], [products]);
  
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter((p: any) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.assetId?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const lowStockProducts = Array.isArray(products) ? products.filter((p: any) => p.stockCount < lowStockThreshold) : [];
  const averageStock = Array.isArray(products) && products.length > 0 ? Math.round(products.reduce((acc: number, p: any) => acc + p.stockCount, 0) / products.length) : 0;


  const [logisticsTransmissions, setLogisticsTransmissions] = useState<any[]>([]);

  useEffect(() => {
    if (orders && Array.isArray(orders)) {
      const transmissions = orders.map((o: any) => ({
        id: o._id,
        timestamp: new Date(o.createdAt).toLocaleTimeString(),
        type: 'ORDER_INTAKE',
        status: o.status === 'Pending' ? 'DISPATCHING...' : o.status === 'Shipped' ? 'EN_ROUTE' : 'DELIVERED',
        payload: `${o.customerName} - ${o.items.length} Units`,
        raw: o
      })).reverse().slice(0, 10);
      setLogisticsTransmissions(transmissions);
    }
  }, [orders]);

  const StockIndicator = ({ count }: { count: number }) => {
    const percentage = Math.min(100, (count / 20) * 100); 
    const color = count < lowStockThreshold ? '#ef4444' : count < 10 ? '#f59e0b' : '#00f7ff';
    return (
      <div className="flex items-center gap-3">
        <svg className="w-8 h-8 transform -rotate-90">
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-white/5" />
          <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="3" strokeDasharray={75.4} strokeDashoffset={75.4 - (percentage / 100) * 75.4} fill="transparent" strokeLinecap="round" className="transition-all duration-1000 ease-out" />
        </svg>
        <span className={`text-[10px] font-mono font-black ${count < lowStockThreshold ? 'text-red-500' : 'text-slate-300'}`}>
          {count.toString().padStart(2, '0')} UNITS
        </span>
      </div>
    );
  };

  const productMutation = useMutation({
    mutationFn: (data: any) => axios.post('/api/products', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowProductForm(false);
      setEditingProduct(null);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/products/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      axios.patch(`/api/orders/${id}/status`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
  });

  const handleProductSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    productMutation.mutate({
      ...data,
      id: editingProduct?._id,
      price: Number(data.price),
      stockCount: Number(data.stockCount),
      featured: data.featured === 'on',
      specifications: (data.specifications as string).split(',').map(s => s.trim())
    });
  };

  return (
    <div className="pt-24 px-6 pb-20 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-16">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-500 mb-2">
            <Activity className="animate-pulse" size={16} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] font-black font-sans">AEGIS STORE MANAGEMENT</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">ADMIN PANEL</h1>
          <p className="text-slate-400 text-sm font-medium tracking-tight">Manage inventory, track customer orders, and monitor real-time sales performance.</p>
        </div>

        <div className="flex flex-wrap gap-2 bg-slate-900/50 p-2 rounded-3xl border border-white/5 backdrop-blur-xl">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all flex items-center gap-3 ${activeTab === 'dashboard' ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,247,255,0.4)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <BarChart3 size={16} /> DASHBOARD
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-6 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all flex items-center gap-3 ${activeTab === 'inventory' ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,247,255,0.4)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Package size={16} /> INVENTORY
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all flex items-center gap-3 ${activeTab === 'orders' ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,247,255,0.4)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Truck size={16} /> LOGISTICS
          </button>
          <button 
            onClick={() => setActiveTab('alerts')}
            className={`px-6 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all flex items-center gap-3 relative ${activeTab === 'alerts' ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <ShieldAlert size={16} /> 
            ALERTS
            {lowStockProducts.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 text-[8px] flex items-center justify-center font-black">!</span>
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'TOTAL_REVENUE', value: `$${orders ? orders.reduce((acc: number, o: any) => acc + o.totalAmount, 0).toLocaleString() : '0'}`, icon: TrendingUp, color: 'text-cyan-500' },
                { label: 'ACTIVE_ORDERS', value: orders?.length || 0, icon: Package, color: 'text-white' },
                { label: 'STOCK_ALERTS', value: lowStockProducts.length, icon: ShieldAlert, color: 'text-red-500' },
                { label: 'AVG_STOCK_DEPTH', value: averageStock, icon: Box, color: 'text-slate-400' }
              ].map((stat, i) => (
                <div key={i} className="p-6 glass-dark rounded-[2rem] border border-white/5 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${stat.color.replace('text-', 'bg-')}/5 blur-[50px] pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity`} />
                  <div className="flex justify-between items-start mb-4">
                    <stat.icon className={`${stat.color} w-8 h-8`} />
                  </div>
                  <p className="text-4xl font-black text-white font-mono uppercase tracking-tighter">{stat.value}</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-8 glass-dark rounded-[2rem] border border-white/5">
                <div className="flex items-center gap-2 mb-8">
                  <BarChart3 className="text-cyan-500 w-5 h-5" />
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">REVENUE_TELEMETRY (LAST 7 DAYS)</h3>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { day: 'Mon', revenue: 12500 }, { day: 'Tue', revenue: 18000 }, 
                      { day: 'Wed', revenue: 15400 }, { day: 'Thu', revenue: 22000 }, 
                      { day: 'Fri', revenue: 28000 }, { day: 'Sat', revenue: 31000 }, 
                      { day: 'Sun', revenue: 29000 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="day" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#00F0FF', fontSize: '12px', fontWeight: 'bold' }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                      />
                      <Bar dataKey="revenue" fill="#00F0FF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-8 glass-dark rounded-[2rem] border border-white/5">
                <div className="flex items-center gap-2 mb-8">
                  <Activity className="text-cyan-500 w-5 h-5" />
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">ORDER_VOLUME_METRICS</h3>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { day: 'Mon', orders: 24 }, { day: 'Tue', orders: 35 }, 
                      { day: 'Wed', orders: 28 }, { day: 'Thu', orders: 42 }, 
                      { day: 'Fri', orders: 55 }, { day: 'Sat', orders: 60 }, 
                      { day: 'Sun', orders: 58 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="day" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#00F0FF', fontSize: '12px', fontWeight: 'bold' }}
                        formatter={(value: number) => [value, 'Orders']}
                      />
                      <Line type="monotone" dataKey="orders" stroke="#00F0FF" strokeWidth={3} dot={{ fill: '#0a0a0a', stroke: '#00F0FF', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'inventory' && (
          <motion.div 
            key="inventory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Search and Filters */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text"
                  placeholder="SEARCH_BY_TITLE_OR_ASSET_ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-white/5 rounded-[2rem] pl-14 pr-6 py-4 text-white text-xs font-mono focus:border-cyan-500 outline-none transition-all shadow-inner placeholder:opacity-30"
                />
              </div>
              <div className="lg:col-span-4 relative group">
                <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" size={18} />
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-white/5 rounded-[2rem] pl-14 pr-10 py-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-cyan-500 outline-none appearance-none cursor-pointer transition-all"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <Plus size={14} className="rotate-45" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center px-4">
              <div className="flex items-center gap-3">
                <Box size={24} className="text-cyan-500" />
                <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">ASSET_MANIFEST</h2>
              </div>
              <button 
                onClick={() => { setShowProductForm(true); setEditingProduct(null); }}
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-[1.5rem] text-[10px] font-black tracking-widest flex items-center gap-3 transition-all accent-glow active:scale-95 shadow-xl"
              >
                <Plus size={18} /> INITIALIZE_NEW_ASSET
              </button>
            </div>

            <div className="glass-dark rounded-[3rem] border border-white/5 overflow-hidden">
              <div className="overflow-x-auto overflow-y-auto max-h-[600px] scrollbar-hide">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 sticky top-0 z-10 backdrop-blur-xl">
                    <tr>
                      <th className="px-10 py-6">Hardware_Unit</th>
                      <th className="px-10 py-6">Asset_ID</th>
                      <th className="px-10 py-6">Category</th>
                      <th className="px-10 py-6">Price</th>
                      <th className="px-10 py-6">Integrity_Safe</th>
                      <th className="px-10 py-6">Protocols</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredProducts.map((product: any) => (
                      <tr key={product._id} className="hover:bg-white/[0.03] transition-colors group">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-6">
                            <img src={product.imageUrl} className="w-16 h-16 rounded-2xl object-cover bg-slate-800 border border-white/5" referrerPolicy="no-referrer" />
                            <div>
                              <p className="text-white font-black text-sm tracking-tight uppercase italic">{product.title}</p>
                              <div className="flex gap-2 mt-2">
                                {product.specifications?.slice(0, 2).map((s: string, i: number) => (
                                  <span key={i} className="text-[8px] bg-cyan-500/5 text-cyan-500 px-2 py-0.5 rounded-md border border-cyan-500/10 font-mono">{s}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6 font-mono text-xs text-slate-400">{product.assetId || 'ETG-UNKNOWN'}</td>
                        <td className="px-10 py-6 text-[10px] font-black text-cyan-500 uppercase tracking-widest">{product.category}</td>
                        <td className="px-10 py-6 text-sm font-mono font-bold text-white">${product.price.toLocaleString()}</td>
                        <td className="px-10 py-6">
                          <StockIndicator count={product.stockCount} />
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => { setEditingProduct(product); setShowProductForm(true); }}
                              className="text-slate-500 hover:text-cyan-400 transition-colors bg-white/5 p-3 rounded-xl hover:bg-white/10"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => { if(confirm('Erase this data point?')) deleteProductMutation.mutate(product._id) }}
                              className="text-slate-500 hover:text-red-500 transition-colors bg-white/5 p-3 rounded-xl hover:bg-white/10"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'alerts' && (
          <motion.div 
            key="alerts"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-12"
          >
            <div className="p-12 glass-dark bg-red-500/5 border border-red-500/20 rounded-[4rem] text-center max-w-4xl mx-auto">
              <ShieldAlert className="w-24 h-24 text-red-600 mx-auto mb-8 animate-bounce" />
              <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4">SYSTEM_CRITICAL_ALERTS</h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                The following hardware manifests have dropped below the safety threshold. Immediate replenishment requested to maintain ecosystem integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {lowStockProducts.map((p: any) => (
                 <div key={p._id} className="p-8 glass-dark border border-red-500/20 rounded-[3rem] group hover:border-red-500/40 transition-all">
                    <div className="flex justify-between items-start mb-6">
                       <div className="w-16 h-16 bg-red-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                          <AlertCircle size={32} />
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-red-500 uppercase font-mono mb-1">Stock_Deficit</p>
                          <p className="text-3xl font-mono font-black text-white">{p.stockCount} Units</p>
                       </div>
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase italic tracking-tight mb-2">{p.title}</h3>
                    <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">{p.assetId}</p>
                    <button 
                      onClick={() => { setEditingProduct(p); setShowProductForm(true); }}
                      className="w-full mt-8 bg-white/5 border border-white/5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                    >
                      PATCH_MANIFEST_DATA
                    </button>
                 </div>
               ))}
               {lowStockProducts.length === 0 && (
                 <div className="col-span-full py-32 text-center text-slate-500 uppercase tracking-[0.5em] font-black text-sm opacity-30">
                   All systems within safety bounds.
                 </div>
               )}
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div 
            key="orders"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid lg:grid-cols-12 gap-10"
          >
            {/* Logistics Feed Visualization */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3 mb-6 px-4">
                <Terminal className="text-cyan-500" size={20} />
                <h2 className="text-xl font-black text-white uppercase italic tracking-widest">LOG_STREAM</h2>
              </div>
              <div className="space-y-4 max-h-[800px] overflow-y-auto scrollbar-hide">
                {logisticsTransmissions.map((t, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className="p-5 glass-dark border-l-4 border-cyan-500 rounded-r-3xl bg-slate-900/40 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-black text-cyan-500 font-mono uppercase tracking-[0.2em]">{t.type}</span>
                      <span className="text-[8px] text-slate-600 font-mono tracking-tighter">{t.timestamp}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-white uppercase leading-none">{t.status}</p>
                      <p className="text-[9px] text-slate-500 font-mono truncate">{t.payload}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Active Delivery Transmissions */}
            <div className="lg:col-span-8 space-y-6">
               <div className="flex items-center justify-between mb-6 px-4">
                  <div className="flex items-center gap-3">
                    <Truck className="text-cyan-500" size={20} />
                    <h2 className="text-xl font-black text-white uppercase italic tracking-widest">DELIVERY_CHANNELS</h2>
                  </div>
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-500 px-4 py-1 rounded-full font-black border border-cyan-500/20">{orders?.length || 0} TOTAL_TRANSMISSIONS</span>
               </div>
               
               <div className="space-y-6">
                {Array.isArray(orders) && orders.map((order: any) => (
                  <div key={order._id} className="p-8 glass-dark bg-slate-900/20 border border-white/5 rounded-[3rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[60px] pointer-events-none group-hover:bg-cyan-500/10 transition-all" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="space-y-4 max-w-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full animate-pulse shadow-[0_0_8px] ${order.status === 'Delivered' ? 'bg-green-500 shadow-green-500' : 'bg-cyan-500 shadow-cyan-500'}`} />
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">{order.status}</span>
                          <span className="text-[10px] font-mono text-slate-600 font-bold uppercase ml-4">#TXN-{order._id.slice(-8)}</span>
                        </div>
                        <div>
                          <p className="text-2xl font-black text-white uppercase italic tracking-tighter mb-1">{order.customerName}</p>
                          <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">{order.customerEmail}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                           {order.items.map((item: any, i: number) => (
                             <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl">
                               <span className="text-[10px] text-cyan-500 font-black">0{item.quantity}</span>
                               <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tight">{item.title}</span>
                             </div>
                           ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between min-h-[140px]">
                        <p className="text-4xl font-mono font-black text-white tracking-tighter italic drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">${order.totalAmount.toLocaleString()}</p>
                        <div className="flex gap-4">
                           <button 
                            onClick={() => updateOrderStatusMutation.mutate({ id: order._id, status: 'Shipped' })}
                            disabled={order.status === 'Shipped' || order.status === 'Delivered'}
                            className="w-14 h-14 bg-white/5 flex items-center justify-center rounded-2xl text-slate-400 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(0,247,255,0.4)] transition-all disabled:opacity-30 disabled:pointer-events-none group/btn"
                          >
                            <Truck size={24} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                          <button 
                            onClick={() => updateOrderStatusMutation.mutate({ id: order._id, status: 'Delivered' })}
                            disabled={order.status === 'Delivered'}
                            className="w-14 h-14 bg-white/5 flex items-center justify-center rounded-2xl text-slate-400 hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all disabled:opacity-30 disabled:pointer-events-none group/btn"
                          >
                            <CheckCircle size={24} className="group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[1000] flex items-center justify-center p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full max-w-3xl glass-dark rounded-[4rem] p-12 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/10 blur-[120px] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-16 h-16 bg-cyan-500 rounded-[1.5rem] flex items-center justify-center text-black shadow-xl">
                    <Terminal size={32} />
                 </div>
                 <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                   {editingProduct ? 'OVERRIDE_ASSET' : 'INITIALIZE_ASSET'}
                 </h3>
              </div>
              
              <form onSubmit={handleProductSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Asset_Nomenclature</label>
                    <input name="title" defaultValue={editingProduct?.title} required className="w-full bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm font-bold focus:border-cyan-500 outline-none transition-all focus:bg-black" placeholder="RTX 5090 Prototype..." />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Sector_Classification</label>
                    <input name="category" defaultValue={editingProduct?.category} required className="w-full bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm font-bold focus:border-cyan-500 outline-none transition-all focus:bg-black" placeholder="Processors / GPU..." />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Internal_Asset_ID</label>
                    <input name="assetId" defaultValue={editingProduct?.assetId} required className="w-full bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm font-mono focus:border-cyan-500 outline-none transition-all focus:bg-black" placeholder="ETG-9901..." />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Hardware_Manifest_Visuals (URL)</label>
                    <input name="imageUrl" defaultValue={editingProduct?.imageUrl} required className="w-full bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm font-mono focus:border-cyan-500 outline-none transition-all focus:bg-black" placeholder="https://unsplash..." />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Technical_Briefing</label>
                  <textarea name="description" defaultValue={editingProduct?.description} required rows={2} className="w-full bg-slate-900 border border-white/5 rounded-3xl px-6 py-4 text-white text-sm font-medium focus:border-cyan-500 outline-none transition-all focus:bg-black resize-none" placeholder="Primary hardware function briefing..." />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Technical_Specs (Comma Separated)</label>
                  <input name="specifications" defaultValue={editingProduct?.specifications?.join(', ')} required className="w-full bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm font-mono focus:border-cyan-500 outline-none transition-all focus:bg-black" placeholder="RT Cores, TDP, VRAM..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Universal_Currency_Valuation ($)</label>
                    <input name="price" type="number" step="0.01" defaultValue={editingProduct?.price} required className="w-full bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm font-mono focus:border-cyan-500 outline-none transition-all focus:bg-black" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Unit_Manifest_Depth (Qty)</label>
                    <input name="stockCount" type="number" defaultValue={editingProduct?.stockCount} required className="w-full bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm font-mono focus:border-cyan-500 outline-none transition-all focus:bg-black" />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" name="featured" defaultChecked={editingProduct?.featured} className="sr-only peer" />
                      <div className="w-14 h-7 bg-slate-800 rounded-full border border-white/10 peer-checked:bg-cyan-500 transition-colors"></div>
                      <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-7 peer-checked:bg-black"></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">Sector_Highlight_Protocol</span>
                  </label>
                </div>

                <div className="flex gap-6 pt-10">
                  <button 
                    type="button"
                    onClick={() => setShowProductForm(false)}
                    className="flex-1 py-5 rounded-[1.5rem] border border-white/10 text-slate-500 font-extrabold text-[10px] uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all"
                  >
                    ABORT_LINK
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-5 rounded-[1.5rem] bg-cyan-500 text-black font-extrabold text-[10px] uppercase tracking-widest hover:bg-cyan-400 accent-glow shadow-xl shadow-cyan-500/20 transition-all"
                    disabled={productMutation.isPending}
                  >
                    {productMutation.isPending ? 'SYNCHRONIZING...' : 'COMMIT_DATA_ENTRY'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
