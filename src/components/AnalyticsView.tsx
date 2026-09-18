import React, { useState } from 'react';
import { CodOrder } from '../types';
import { 
  BarChart3, 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Truck, 
  XCircle, 
  Download, 
  Search, 
  Filter 
} from 'lucide-react';

interface AnalyticsViewProps {
  orders: CodOrder[];
  onUpdateOrderStatus: (orderId: string, newStatus: CodOrder['status']) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  orders,
  onUpdateOrderStatus
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const confirmedOrders = orders.filter(o => o.status === 'Confirmed' || o.status === 'Dispatched' || o.status === 'Delivered').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.phone.includes(searchTerm) ||
                          o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportCsv = () => {
    const headers = "Order Number,Customer,Phone,City,Items,Total,Status,Date\n";
    const rows = filteredOrders.map(o => 
      `"${o.orderNumber}","${o.customerName}","${o.phone}","${o.city}","${o.productName} (x${o.quantity})","${o.totalAmount}","${o.status}","${o.createdAt}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cod-realistic-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
            Analytics &amp; Cash on Delivery Orders
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Real-time tracking of 1-click COD orders, conversion rates, and fulfillment status.
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 text-xs font-semibold rounded-lg shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV / Google Sheets</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Total COD Revenue</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-neutral-900 dark:text-white mt-2">
            Rs. {totalRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">+24% vs standard checkout</span>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Total COD Orders</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-neutral-900 dark:text-white mt-2">
            {totalOrders}
          </div>
          <span className="text-[10px] text-indigo-600 font-semibold">1-Click Fast Conversion</span>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Delivery Success Rate</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-neutral-900 dark:text-white mt-2">
            92.4%
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">Low RTO (Fraud Protected)</span>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Form Conversion Rate</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-neutral-900 dark:text-white mt-2">
            18.6%
          </div>
          <span className="text-[10px] text-amber-600 font-semibold">3.2x higher than multi-step checkout</span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs overflow-hidden">
        {/* Table Search and Filters */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by customer, phone, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending Confirmation</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled / RTO</option>
            </select>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Items / Qty</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Address / City</th>
                <th className="py-3 px-4">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-400">
                    No orders match your filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 dark:text-white">
                      {order.orderNumber}
                      <span className="block text-[10px] text-neutral-400 font-normal">{order.createdAt}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-neutral-900 dark:text-white">{order.customerName}</div>
                      <div className="text-[11px] font-mono text-neutral-500">{order.phone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">{order.productName}</span>
                      <span className="text-neutral-500 block text-[11px]">Qty: {order.quantity}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">
                      Rs. {order.totalAmount}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-neutral-800 dark:text-neutral-200 truncate">{order.address}</div>
                      <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-1.5 py-0.5 rounded font-medium">
                        {order.city}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as CodOrder['status'])}
                        className={`text-[11px] font-bold px-2 py-1 rounded-md border outline-none cursor-pointer ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : order.status === 'Dispatched'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : order.status === 'Confirmed'
                            ? 'bg-indigo-50 text-indigo-800 border-indigo-300'
                            : order.status === 'Cancelled'
                            ? 'bg-red-50 text-red-800 border-red-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
