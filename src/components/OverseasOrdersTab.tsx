import React, { useState, useMemo } from 'react';
import { mockOrderStats } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Filter, Download, DollarSign, ShoppingCart, Percent, TrendingUp, Calendar, RefreshCw, HelpCircle, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function OverseasOrdersTab() {
  const [dateRange, setDateRange] = useState('7days');
  const [paymentMethod, setPaymentMethod] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [appFilter, setAppFilter] = useState('all');
  const [activeDateFilter, setActiveDateFilter] = useState('昨天');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Process data based on filters
  const filteredData = useMemo(() => {
    return mockOrderStats.filter(stat => {
      if (paymentMethod !== 'all' && stat.paymentMethod !== paymentMethod) return false;
      if (clientFilter !== 'all' && stat.client !== clientFilter) return false;
      if (appFilter !== 'all' && stat.app !== appFilter) return false;
      return true;
    });
  }, [paymentMethod, clientFilter, appFilter]);

  // Calculate summary metrics
  const summary = useMemo(() => {
    return filteredData.reduce((acc, curr) => {
      const tax = curr.grossRevenue * (curr.taxRate / 100);
      const commission = curr.grossRevenue * (curr.commissionRate / 100);
      const net = curr.grossRevenue - tax - commission;

      return {
        totalOrders: acc.totalOrders + curr.orderCount,
        totalGross: acc.totalGross + curr.grossRevenue,
        totalTax: acc.totalTax + tax,
        totalCommission: acc.totalCommission + commission,
        totalNet: acc.totalNet + net,
      };
    }, { totalOrders: 0, totalGross: 0, totalTax: 0, totalCommission: 0, totalNet: 0 });
  }, [filteredData]);

  // Prepare chart data (aggregated by country)
  const chartData = useMemo(() => {
    const countryMap = new Map();
    
    filteredData.forEach(stat => {
      const tax = stat.grossRevenue * (stat.taxRate / 100);
      const commission = stat.grossRevenue * (stat.commissionRate / 100);
      const net = stat.grossRevenue - tax - commission;

      if (countryMap.has(stat.country)) {
        const existing = countryMap.get(stat.country);
        existing.orders += stat.orderCount;
        existing.gross += stat.grossRevenue;
        existing.net += net;
      } else {
        countryMap.set(stat.country, {
          country: stat.country,
          orders: stat.orderCount,
          gross: stat.grossRevenue,
          net: net,
        });
      }
    });

    return Array.from(countryMap.values());
  }, [filteredData]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">海外支付订单统计</h2>
          <p className="text-sm text-slate-500 mt-1">统计 App Store, Google Play 等海外支付渠道的订单、税费及佣金（已统一换算为美金）。</p>
        </div>
        <button
          onClick={() => setIsHelpModalOpen(true)}
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          数据说明
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        {/* Row 1: Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Picker */}
          <div className="flex items-center border border-slate-300 rounded-md px-3 py-1.5 bg-white text-sm text-slate-600 w-72">
            <Calendar className="h-4 w-4 mr-2 text-slate-400" />
            <span>2026-03-17</span>
            <span className="mx-2 text-slate-400">至</span>
            <span>2026-03-17</span>
          </div>
          
          {/* Client Filter */}
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-slate-300 text-slate-700 py-1.5 pl-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
            >
              <option value="all">所有客户端</option>
              <option value="Android">Android (安卓端)</option>
              <option value="iOS">iOS (苹果端)</option>
            </select>
            <Filter className="absolute right-2.5 top-2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

          {/* App Filter */}
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-slate-300 text-slate-700 py-1.5 pl-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={appFilter}
              onChange={(e) => setAppFilter(e.target.value)}
            >
              <option value="all">所有应用</option>
              <option value="01drama">01drama</option>
              <option value="02drama">02drama</option>
            </select>
            <Filter className="absolute right-2.5 top-2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Payment Method Filter */}
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-slate-300 text-slate-700 py-1.5 pl-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="all">所有支付方式</option>
              <option value="App Store">App Store</option>
              <option value="Google Play">Google Play</option>
            </select>
            <Filter className="absolute right-2.5 top-2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-colors">
            <Search className="h-4 w-4" /> 搜索
          </button>
          <button className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-colors">
            <RefreshCw className="h-4 w-4" /> 重置
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-colors">
            <Download className="h-4 w-4" /> 导出
          </button>
          <button className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-1.5 rounded-md text-sm transition-colors">
            自定义列
          </button>
        </div>
        
        {/* Row 2: Quick Date Filters */}
        <div className="flex items-center">
          <div className="flex border border-slate-300 rounded-md overflow-hidden bg-white text-sm">
            {['昨天', '今天', '近7天', '本月', '上月', '所有'].map((label) => (
              <button
                key={label}
                onClick={() => setActiveDateFilter(label)}
                className={cn(
                  "px-4 py-1.5 border-r border-slate-300 last:border-r-0 transition-colors",
                  activeDateFilter === label 
                    ? "bg-blue-500 text-white" 
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">总订单数</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{formatNumber(summary.totalOrders)}</h3>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <ShoppingCart className="h-5 w-5" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">总流水 (USD)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{formatCurrency(summary.totalGross)}</h3>
            </div>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">总代扣国税 (USD)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{formatCurrency(summary.totalTax)}</h3>
            </div>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <Percent className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">应用市场佣金 15% (USD)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{formatCurrency(summary.totalCommission)}</h3>
            </div>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Percent className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm ring-1 ring-indigo-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-indigo-600">预估净收入 (USD)</p>
              <h3 className="text-2xl font-bold text-indigo-900 mt-1">{formatCurrency(summary.totalNet)}</h3>
            </div>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Table (Full Width) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-base font-semibold text-slate-900">详细数据对账单</h3>
          <div className="relative">
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索国家..." 
              className="pl-9 pr-4 py-1.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
            />
          </div>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium">日期</th>
                <th className="px-4 py-3 font-medium">客户端</th>
                <th className="px-4 py-3 font-medium">应用</th>
                <th className="px-4 py-3 font-medium">支付方式</th>
                <th className="px-4 py-3 font-medium">国家</th>
                <th className="px-4 py-3 font-medium text-right">订单数</th>
                <th className="px-4 py-3 font-medium text-right">总流水(USD)</th>
                <th className="px-4 py-3 font-medium text-right">国税</th>
                <th className="px-4 py-3 font-medium text-right">应用市场佣金</th>
                <th className="px-4 py-3 font-medium text-right text-indigo-600">净收入(USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((row) => {
                const tax = row.grossRevenue * (row.taxRate / 100);
                const commission = row.grossRevenue * (row.commissionRate / 100);
                const net = row.grossRevenue - tax - commission;
                
                return (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.date}</td>
                    <td className="px-4 py-3 text-slate-600">{row.client}</td>
                    <td className="px-4 py-3 text-slate-600 font-medium">{row.app}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        row.paymentMethod === 'App Store' ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                      )}>
                        {row.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{row.country}</div>
                      {row.taxRegion && row.taxRegion !== row.country && (
                        <div className="text-[11px] text-slate-500 mt-0.5">税属: {row.taxRegion}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600">{formatNumber(row.orderCount)}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-900">{formatCurrency(row.grossRevenue)}</td>
                    <td className="px-4 py-3 text-right text-slate-500">
                      <div className="flex flex-col items-end">
                        <span>{formatCurrency(tax)}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-slate-400">{row.taxRate}%</span>
                          {row.taxVersion && <span className="text-[9px] bg-slate-100 text-slate-500 px-1 rounded">{row.taxVersion}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500">
                      <div className="flex flex-col items-end">
                        <span>{formatCurrency(commission)}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-slate-400">{row.commissionRate}%</span>
                          {row.commissionVersion && <span className="text-[9px] bg-slate-100 text-slate-500 px-1 rounded">{row.commissionVersion}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-indigo-600">{formatCurrency(net)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart (Full Width, Bottom) */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900 mb-4">各国家收入分布</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="country" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="gross" name="总流水" fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={60} />
              <Bar dataKey="net" name="净收入" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Help/Documentation Modal */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-500" />
                订单统计数据说明
              </h3>
              <button
                onClick={() => setIsHelpModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-slate-600">
              <section>
                <h4 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-500" />
                  核心指标定义与计算公式
                </h4>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="font-semibold text-slate-800 mb-1 flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-blue-500" /> 总订单数
                    </div>
                    <p><strong>含义：</strong>在所选时间段和筛选条件下，成功支付的订单总笔数。</p>
                    <p className="font-mono text-xs bg-white p-1.5 mt-2 rounded border border-slate-200 text-slate-500">
                      公式 = Σ(有效订单数量)
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="font-semibold text-slate-800 mb-1 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-500" /> 总流水 (Gross Revenue)
                    </div>
                    <p><strong>含义：</strong>用户实际支付的总金额（已按照支付时的汇率统一折算为美元）。这包含了应用商店的佣金和各国政府收取的税费。</p>
                    <p className="font-mono text-xs bg-white p-1.5 mt-2 rounded border border-slate-200 text-slate-500">
                      公式 = Σ(订单支付金额 × 支付时汇率)
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="font-semibold text-slate-800 mb-1 flex items-center gap-2">
                      <Percent className="w-4 h-4 text-rose-500" /> 总代扣国税 (Tax)
                    </div>
                    <p><strong>含义：</strong>由苹果 (App Store) 或谷歌 (Google Play) 代扣代缴给当地政府的税费（如 VAT, GST, Sales Tax）。</p>
                    <p className="font-mono text-xs bg-white p-1.5 mt-2 rounded border border-slate-200 text-slate-500">
                      公式 = 总流水 × 该国适用税率 (Tax Rate)
                    </p>
                    <p className="text-xs text-slate-500 mt-2">注：不同国家的税率和计算基准可能有所不同，此处的税率取自“国税设置”中的配置。</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="font-semibold text-slate-800 mb-1 flex items-center gap-2">
                      <Percent className="w-4 h-4 text-amber-500" /> 应用市场佣金 (Commission)
                    </div>
                    <p><strong>含义：</strong>应用商店（Apple/Google）收取的渠道服务费。通常为 15% 或 30%。</p>
                    <p className="font-mono text-xs bg-white p-1.5 mt-2 rounded border border-slate-200 text-slate-500">
                      公式 = 总流水 × 应用市场佣金比例 (Commission Rate)
                    </p>
                  </div>

                  <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                    <div className="font-semibold text-indigo-900 mb-1 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-600" /> 预估净收入 (Net Income)
                    </div>
                    <p className="text-indigo-800"><strong>含义：</strong>扣除所有税费和应用市场抽成后，开发者最终可获得的实际收入预估值。</p>
                    <p className="font-mono text-xs bg-white p-1.5 mt-2 rounded border border-indigo-200 text-indigo-600">
                      公式 = 总流水 - 总代扣国税 - 应用市场佣金
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-base font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-500" />
                  数据对账单字段说明
                </h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>税属 (Tax Region)：</strong>某些小国家或海外领地（如波多黎各）的税收会归属到主税区（如美国）进行统一计算。</li>
                  <li><strong>税率版本 / 佣金版本：</strong>由于税率和佣金政策会随时间变化，系统会记录该笔订单发生时所采用的“快照版本”（如 v1.2），确保历史数据对账的准确性。</li>
                </ul>
              </section>
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setIsHelpModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
