import React, { useState } from 'react';
import { Save, RefreshCw, Percent, DollarSign, Globe, Smartphone, Map, Search, Plus, Check, ArrowLeft, HelpCircle, X } from 'lucide-react';

export default function SettingsTab() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [taxSearchQuery, setTaxSearchQuery] = useState('');
  const [exchangeSearchQuery, setExchangeSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('tax');
  const [taxPage, setTaxPage] = useState(1);
  const [exchangePage, setExchangePage] = useState(1);
  const [syncModal, setSyncModal] = useState({ isOpen: false, type: '', target: null as string | null });
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const ITEMS_PER_PAGE = 50;

  const initialTaxRates = [
    { flag: '🇺🇸', country: 'US (美国)', type: 'Sales Tax', rate: 8.0 },
    { flag: '🇹🇭', country: 'TH (泰国)', type: 'VAT', rate: 7.0 },
    { flag: '🇮🇳', country: 'IN (印度)', type: 'GST', rate: 18.0 },
    { flag: '🇯🇵', country: 'JP (日本)', type: 'Consumption Tax', rate: 10.0 },
    { flag: '🇪🇺', country: 'EU (欧盟通用)', type: 'VAT', rate: 20.0 },
    { flag: '🇬🇧', country: 'UK (英国)', type: 'VAT', rate: 20.0 },
    { flag: '🇨🇦', country: 'CA (加拿大)', type: 'GST/HST', rate: 5.0 },
    { flag: '🇦🇺', country: 'AU (澳大利亚)', type: 'GST', rate: 10.0 },
    { flag: '🇸🇬', country: 'SG (新加坡)', type: 'GST', rate: 9.0 },
    { flag: '🇰🇷', country: 'KR (韩国)', type: 'VAT', rate: 10.0 },
    { flag: '🇮🇩', country: 'ID (印度尼西亚)', type: 'VAT', rate: 11.0 },
    { flag: '🇲🇾', country: 'MY (马来西亚)', type: 'SST', rate: 6.0 },
    { flag: '🇻🇳', country: 'VN (越南)', type: 'VAT', rate: 10.0 },
    { flag: '🇵🇭', country: 'PH (菲律宾)', type: 'VAT', rate: 12.0 },
    { flag: '🇧🇷', country: 'BR (巴西)', type: 'ICMS/ISS', rate: 17.0 },
    { flag: '🇲🇽', country: 'MX (墨西哥)', type: 'VAT', rate: 16.0 },
    { flag: '🇿🇦', country: 'ZA (南非)', type: 'VAT', rate: 15.0 },
    { flag: '🇦🇪', country: 'AE (阿联酋)', type: 'VAT', rate: 5.0 },
    { flag: '🇸🇦', country: 'SA (沙特阿拉伯)', type: 'VAT', rate: 15.0 },
    { flag: '🇹🇷', country: 'TR (土耳其)', type: 'VAT', rate: 20.0 },
  ];

  const [taxRates, setTaxRates] = useState(initialTaxRates);
  const [latestTaxRates, setLatestTaxRates] = useState<Record<string, number>>({});

  const filteredTaxes = taxRates.filter(t => 
    t.country.toLowerCase().includes(taxSearchQuery.toLowerCase()) || 
    t.type.toLowerCase().includes(taxSearchQuery.toLowerCase())
  );
  const paginatedTaxes = filteredTaxes.slice((taxPage - 1) * ITEMS_PER_PAGE, taxPage * ITEMS_PER_PAGE);
  const totalTaxPages = Math.ceil(filteredTaxes.length / ITEMS_PER_PAGE);

  const defaultTaxMappings = [
    { region: 'US (美国及海外领地)', countries: '波多黎各, 关岛, 美属维尔京群岛, 美属萨摩亚, 北马里亚纳群岛' },
    { region: 'EU (欧盟VIES增值税区)', countries: '德国, 法国, 意大利, 西班牙, 荷兰, 比利时, 奥地利, 瑞典, 丹麦, 芬兰, 爱尔兰, 葡萄牙, 希腊, 波兰, 捷克, 匈牙利, 罗马尼亚, 保加利亚, 克罗地亚, 斯洛伐克, 斯洛文尼亚, 爱沙尼亚, 拉脱维亚, 立陶宛, 塞浦路斯, 马耳他' },
    { region: 'UK (英国及皇家属地)', countries: '英国, 马恩岛, 泽西岛, 根西岛' },
    { region: 'FR (法国海外领地)', countries: '瓜德罗普, 马提尼克, 法属圭亚那, 留尼汪, 马约特, 法属波利尼西亚, 新喀里多尼亚, 圣巴泰勒米, 圣马丁' },
    { region: 'NL (荷兰加勒比区)', countries: '阿鲁巴, 库拉索, 荷属圣马丁, 博奈尔, 圣尤斯特歇斯, 萨巴' },
    { region: 'DK (丹麦自治领地)', countries: '格陵兰, 法罗群岛' },
    { region: 'AU (澳大利亚及领地)', countries: '澳大利亚, 圣诞岛, 科科斯(基林)群岛, 诺福克岛' },
    { region: 'NZ (新西兰及联系国)', countries: '新西兰, 库克群岛, 纽埃, 托克劳' },
    { region: 'CN (中国及港澳台地区)', countries: '中国大陆, 香港, 澳门, 台湾' }
  ];

  const iosExchangeRates = [
    { flag: '🇺🇸', country: 'US (美国)', currency: 'USD', rate: 1.00 },
    { flag: '🇨🇳', country: 'CN (中国大陆)', currency: 'CNY', rate: 7.20 },
    { flag: '🇪🇺', country: 'EU (欧元区)', currency: 'EUR', rate: 0.92 },
    { flag: '🇬🇧', country: 'GB (英国)', currency: 'GBP', rate: 0.79 },
    { flag: '🇯🇵', country: 'JP (日本)', currency: 'JPY', rate: 150.00 },
    { flag: '🇰🇷', country: 'KR (韩国)', currency: 'KRW', rate: 1350.00 },
    { flag: '🇭🇰', country: 'HK (香港)', currency: 'HKD', rate: 7.80 },
    { flag: '🇹🇼', country: 'TW (台湾)', currency: 'TWD', rate: 31.50 },
    { flag: '🇦🇺', country: 'AU (澳大利亚)', currency: 'AUD', rate: 1.52 },
    { flag: '🇨🇦', country: 'CA (加拿大)', currency: 'CAD', rate: 1.35 },
    { flag: '🇨🇭', country: 'CH (瑞士)', currency: 'CHF', rate: 0.88 },
    { flag: '🇸🇬', country: 'SG (新加坡)', currency: 'SGD', rate: 1.34 },
    { flag: '🇲🇾', country: 'MY (马来西亚)', currency: 'MYR', rate: 4.70 },
    { flag: '🇹🇭', country: 'TH (泰国)', currency: 'THB', rate: 35.00 },
    { flag: '🇮🇩', country: 'ID (印度尼西亚)', currency: 'IDR', rate: 15600.00 },
    { flag: '🇻🇳', country: 'VN (越南)', currency: 'VND', rate: 24500.00 },
    { flag: '🇵🇭', country: 'PH (菲律宾)', currency: 'PHP', rate: 56.00 },
    { flag: '🇮🇳', country: 'IN (印度)', currency: 'INR', rate: 83.00 },
    { flag: '🇧🇷', country: 'BR (巴西)', currency: 'BRL', rate: 5.00 },
    { flag: '🇲🇽', country: 'MX (墨西哥)', currency: 'MXN', rate: 16.80 },
    { flag: '🇿🇦', country: 'ZA (南非)', currency: 'ZAR', rate: 18.80 },
    { flag: '🇦🇪', country: 'AE (阿联酋)', currency: 'AED', rate: 3.67 },
    { flag: '🇸🇦', country: 'SA (沙特阿拉伯)', currency: 'SAR', rate: 3.75 },
    { flag: '🇹🇷', country: 'TR (土耳其)', currency: 'TRY', rate: 32.00 },
    { flag: '🇪🇬', country: 'EG (埃及)', currency: 'EGP', rate: 47.00 },
    { flag: '🇳🇬', country: 'NG (尼日利亚)', currency: 'NGN', rate: 1500.00 },
    { flag: '🇵🇰', country: 'PK (巴基斯坦)', currency: 'PKR', rate: 278.00 },
    { flag: '🇨🇱', country: 'CL (智利)', currency: 'CLP', rate: 950.00 },
    { flag: '🇨🇴', country: 'CO (哥伦比亚)', currency: 'COP', rate: 3900.00 },
    { flag: '🇵🇪', country: 'PE (秘鲁)', currency: 'PEN', rate: 3.70 },
    { flag: '🇳🇿', country: 'NZ (新西兰)', currency: 'NZD', rate: 1.65 },
    { flag: '🇮🇱', country: 'IL (以色列)', currency: 'ILS', rate: 3.70 },
    { flag: '🇶🇦', country: 'QA (卡塔尔)', currency: 'QAR', rate: 3.64 },
  ];

  const [exchangeRates, setExchangeRates] = useState(iosExchangeRates);
  const [latestExchangeRates, setLatestExchangeRates] = useState<Record<string, number>>({});

  const filteredExchangeRates = exchangeRates.filter(t => 
    t.country.toLowerCase().includes(exchangeSearchQuery.toLowerCase()) || 
    t.currency.toLowerCase().includes(exchangeSearchQuery.toLowerCase())
  );
  const paginatedExchange = filteredExchangeRates.slice((exchangePage - 1) * ITEMS_PER_PAGE, exchangePage * ITEMS_PER_PAGE);
  const totalExchangePages = Math.ceil(filteredExchangeRates.length / ITEMS_PER_PAGE);

  const handleSyncTaxes = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const fetched: Record<string, number> = {};
      taxRates.forEach((t, i) => {
        // Mock differences for demonstration
        fetched[t.country] = i % 3 === 0 ? Number((t.rate + 0.5).toFixed(2)) : t.rate;
      });
      setLatestTaxRates(fetched);
    }, 1000);
  };

  const handleSyncExchange = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const fetched: Record<string, number> = {};
      exchangeRates.forEach((t, i) => {
        // Mock differences for demonstration
        fetched[t.country] = i % 4 === 0 ? Number((t.rate * 1.05).toFixed(4)) : t.rate;
      });
      setLatestExchangeRates(fetched);
    }, 1000);
  };

  const applyTaxRate = (country: string, newRate: number) => {
    setTaxRates(prev => prev.map(t => t.country === country ? { ...t, rate: newRate } : t));
  };

  const applyExchangeRate = (country: string, newRate: number) => {
    setExchangeRates(prev => prev.map(t => t.country === country ? { ...t, rate: newRate } : t));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">国税设置</h2>
          <p className="text-sm text-slate-500 mt-1">管理国家税率、地区映射、应用市场佣金以及 iOS 兑换美元汇率等核心参数。</p>
        </div>
        <button
          onClick={() => setIsHelpModalOpen(true)}
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          功能说明
        </button>
      </div>

      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('tax')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'tax'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            国税设置
          </button>
          <button
            onClick={() => setActiveTab('mapping')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'mapping'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            地区税收归属映射
          </button>
          <button
            onClick={() => setActiveTab('exchange')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'exchange'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            iOS国家兑换美元
          </button>
          <button
            onClick={() => setActiveTab('commission')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'commission'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            应用市场佣金
          </button>
        </nav>
      </div>

      {activeTab === 'commission' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Platform Commissions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
              <Percent className="h-5 w-5 text-indigo-500" />
              <h3 className="text-base font-semibold text-slate-900">应用市场佣金比例</h3>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">App Store 佣金 (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    defaultValue={15}
                    className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Google Play 佣金 (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    defaultValue={15}
                    className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400">%</span>
                </div>
              </div>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Save className="h-4 w-4" /> 保存设置
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tax' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Country Tax Rates */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-500" />
            <h3 className="text-base font-semibold text-slate-900">国家税率设置</h3>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-0.5 rounded-full ml-2">
              共 {taxRates.length} 个国家/地区
            </span>
          </div>
          <button 
            onClick={() => setSyncModal({ isOpen: true, type: 'tax', target: null })}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} /> 
            {isSyncing ? '同步中...' : '获取最新国税税率'}
          </button>
        </div>
        
        {/* Search and Add Bar */}
        <div className="p-4 border-b border-slate-100 bg-white flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索国家名称、代码或税种..." 
              value={taxSearchQuery}
              onChange={(e) => setTaxSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
          <button className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-colors">
            <Plus className="h-4 w-4" /> 新增国家税率
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-5 py-3 font-medium">国家/地区</th>
                <th className="px-5 py-3 font-medium">税种</th>
                <th className="px-5 py-3 font-medium">当前税率 (%)</th>
                <th className="px-5 py-3 font-medium">最新获取</th>
                <th className="px-5 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedTaxes.length > 0 ? (
                paginatedTaxes.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-900 flex items-center gap-2">
                      <span className="text-lg" title="国旗">{item.flag}</span>
                      {item.country}
                    </td>
                    <td className="px-5 py-3 text-slate-500">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="relative w-28">
                        <input 
                          type="number" 
                          value={item.rate}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            if (!isNaN(val)) {
                              setTaxRates(prev => prev.map(t => t.country === item.country ? { ...t, rate: val } : t));
                            }
                          }}
                          step="0.1"
                          className="w-full pl-3 pr-7 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700"
                        />
                        <span className="absolute right-3 top-1.5 text-slate-400 text-sm">%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      {latestTaxRates[item.country] !== undefined ? (
                        latestTaxRates[item.country] === item.rate ? (
                          <span className="text-slate-400 text-xs flex items-center gap-1">
                            <Check className="w-3 h-3" /> 无差异
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-orange-600 font-medium text-sm">{latestTaxRates[item.country]} %</span>
                            <button 
                              onClick={() => applyTaxRate(item.country, latestTaxRates[item.country])}
                              className="text-indigo-600 hover:bg-indigo-50 p-1 rounded transition-colors flex items-center gap-1 text-xs font-medium"
                              title="应用此数值"
                            >
                              <ArrowLeft className="w-3 h-3" /> 填入
                            </button>
                          </div>
                        )
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm px-3 py-1.5 rounded hover:bg-indigo-50 transition-colors">
                        保存
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-slate-300 mb-3" />
                      <p>没有找到匹配的国家或税种</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {totalTaxPages > 1 && (
          <div className="p-4 border-t border-slate-100 bg-white flex justify-between items-center">
            <span className="text-sm text-slate-500">
              显示 {(taxPage - 1) * ITEMS_PER_PAGE + 1} 到 {Math.min(taxPage * ITEMS_PER_PAGE, filteredTaxes.length)} 条，共 {filteredTaxes.length} 条
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setTaxPage(p => Math.max(1, p - 1))}
                disabled={taxPage === 1}
                className="px-3 py-1 border border-slate-300 rounded text-sm disabled:opacity-50"
              >
                上一页
              </button>
              <span className="text-sm font-medium text-slate-700">
                {taxPage} / {totalTaxPages}
              </span>
              <button 
                onClick={() => setTaxPage(p => Math.min(totalTaxPages, p + 1))}
                disabled={taxPage === totalTaxPages}
                className="px-3 py-1 border border-slate-300 rounded text-sm disabled:opacity-50"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
      )}

      {activeTab === 'mapping' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Tax Region Mapping */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
          <Map className="h-5 w-5 text-orange-500" />
          <h3 className="text-base font-semibold text-slate-900">地区税收归属映射</h3>
        </div>
        <div className="p-5">
          <p className="text-sm text-slate-500 mb-4">配置哪些国家/地区在计算税务时，归属于特定的主税区（例如将波多黎各、阿曼等归入美国税区计算）。</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-slate-200 rounded-lg overflow-hidden">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3 font-medium w-1/4">主税区</th>
                  <th className="px-5 py-3 font-medium">包含的国家/地区 (逗号分隔)</th>
                  <th className="px-5 py-3 font-medium text-right w-24">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {defaultTaxMappings.map((mapping, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-medium text-slate-900">{mapping.region}</td>
                    <td className="px-5 py-3">
                      <textarea 
                        className="w-full p-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-y text-slate-600"
                        rows={2}
                        defaultValue={mapping.countries}
                      />
                    </td>
                    <td className="px-5 py-3 text-right align-top">
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-2">保存</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="mt-4 text-sm text-indigo-600 font-medium hover:text-indigo-800 flex items-center gap-1">
            + 添加映射规则
          </button>
        </div>
      </div>
      </div>
      )}

      {activeTab === 'exchange' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* iOS Exchange Rates */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-blue-500" />
            <h3 className="text-base font-semibold text-slate-900">iOS 国家兑换美元汇率</h3>
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full ml-2">
              共 {exchangeRates.length} 个国家/地区
            </span>
          </div>
          <button 
            onClick={() => setSyncModal({ isOpen: true, type: 'exchange', target: null })}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} /> 同步 App Store 最新汇率
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-white flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索国家名称或货币代码 (如 USD, EUR)..." 
              value={exchangeSearchQuery}
              onChange={(e) => setExchangeSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-5 py-3 font-medium">国家/地区</th>
                <th className="px-5 py-3 font-medium">本地货币</th>
                <th className="px-5 py-3 font-medium">汇率 (1 USD = ? 本地货币)</th>
                <th className="px-5 py-3 font-medium">最新获取</th>
                <th className="px-5 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedExchange.length > 0 ? (
                paginatedExchange.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-900 flex items-center gap-2">
                      <span className="text-lg" title="国旗">{item.flag}</span>
                      {item.country}
                    </td>
                    <td className="px-5 py-3 text-slate-500">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                        {item.currency}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-medium">$ 1 = </span>
                        <div className="relative w-36">
                          <input 
                            type="number" 
                            value={item.rate}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value);
                              if (!isNaN(val)) {
                                setExchangeRates(prev => prev.map(t => t.country === item.country ? { ...t, rate: val } : t));
                              }
                            }}
                            step="0.01"
                            className="w-full pl-3 pr-12 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700"
                          />
                          <span className="absolute right-3 top-1.5 text-slate-400 text-sm font-medium">{item.currency}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      {latestExchangeRates[item.country] !== undefined ? (
                        latestExchangeRates[item.country] === item.rate ? (
                          <span className="text-slate-400 text-xs flex items-center gap-1">
                            <Check className="w-3 h-3" /> 无差异
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-orange-600 font-medium text-sm">{latestExchangeRates[item.country]}</span>
                            <button 
                              onClick={() => applyExchangeRate(item.country, latestExchangeRates[item.country])}
                              className="text-indigo-600 hover:bg-indigo-50 p-1 rounded transition-colors flex items-center gap-1 text-xs font-medium"
                              title="应用此数值"
                            >
                              <ArrowLeft className="w-3 h-3" /> 填入
                            </button>
                          </div>
                        )
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm px-3 py-1.5 rounded hover:bg-indigo-50 transition-colors">
                        保存
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-slate-300 mb-3" />
                      <p>没有找到匹配的国家或货币</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {totalExchangePages > 1 && (
          <div className="p-4 border-t border-slate-100 bg-white flex justify-between items-center">
            <span className="text-sm text-slate-500">
              显示 {(exchangePage - 1) * ITEMS_PER_PAGE + 1} 到 {Math.min(exchangePage * ITEMS_PER_PAGE, filteredExchangeRates.length)} 条，共 {filteredExchangeRates.length} 条
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setExchangePage(p => Math.max(1, p - 1))}
                disabled={exchangePage === 1}
                className="px-3 py-1 border border-slate-300 rounded text-sm disabled:opacity-50"
              >
                上一页
              </button>
              <span className="text-sm font-medium text-slate-700">
                {exchangePage} / {totalExchangePages}
              </span>
              <button 
                onClick={() => setExchangePage(p => Math.min(totalExchangePages, p + 1))}
                disabled={exchangePage === totalExchangePages}
                className="px-3 py-1 border border-slate-300 rounded text-sm disabled:opacity-50"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
      )}
      
      {/* Sync Confirmation Modal */}
      {syncModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {syncModal.type === 'tax' ? '确认获取最新国税税率' : '确认同步最新汇率'}
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                您确定要获取最新的{syncModal.type === 'tax' ? '国税税率' : '汇率'}吗？获取后，您可以选择性地将有差异的数据填入当前设置。
              </p>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setSyncModal({ isOpen: false, type: '', target: null })}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={() => {
                    if (syncModal.type === 'tax') {
                      handleSyncTaxes();
                    } else {
                      handleSyncExchange();
                    }
                    setSyncModal({ isOpen: false, type: '', target: null });
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> 确认获取
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help/Documentation Modal */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-500" />
                设置页面功能说明
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
                <h4 className="text-base font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-500" />
                  国税设置
                </h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>功能概述：</strong>管理各个国家/地区的税率（如 Sales Tax, VAT, GST 等）。支持按国家名称、代码或税种进行搜索，数据超过 50 条时可分页浏览。</li>
                  <li>
                    <strong>获取最新国税税率：</strong>点击后会从服务器获取最新税率。如果有差异，会在“最新获取”列显示红色数值和“填入”按钮。点击“填入”可将最新数值应用到当前输入框。
                    <div className="mt-1 text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="font-medium text-slate-700">技术建议：</span>获取全球数字产品税率，推荐集成专业税务合规 API（如 <strong>Stripe Tax</strong>、<strong>Avalara</strong> 或 <strong>TaxJar</strong>），这些服务会实时维护全球增值税(VAT)、消费税(GST)的最新法规。
                    </div>
                  </li>
                  <li><strong>保存与修改：</strong>修改当前税率后，点击对应行的“保存”按钮使更改生效。也可以点击“新增国家税率”手动添加新数据。</li>
                </ul>
              </section>

              <section>
                <h4 className="text-base font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Map className="w-4 h-4 text-orange-500" />
                  地区税收归属映射
                </h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>功能概述：</strong>将一些较小的国家或海外领地映射到主税区（例如将波多黎各、关岛归入美国税区计算），以便统一计算税务。</li>
                  <li><strong>操作：</strong>可以直接在文本框中编辑包含的国家/地区（以逗号分隔），编辑完成后点击“保存”。也可以点击底部“添加映射规则”新增映射。</li>
                </ul>
              </section>

              <section>
                <h4 className="text-base font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-500" />
                  iOS国家兑换美元
                </h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>功能概述：</strong>管理各个国家本地货币兑换美元的汇率。支持按国家名称或货币代码搜索，数据超过 50 条时可分页浏览。</li>
                  <li>
                    <strong>同步 App Store 最新汇率：</strong>获取苹果官方的最新汇率数据。获取后，有差异的汇率会显示在“最新获取”列，可选择性点击“填入”更新本地数据。
                    <div className="mt-1 text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="font-medium text-slate-700">技术建议：</span>获取 iOS 汇率，推荐通过 <strong>App Store Connect API</strong> 定期拉取苹果官方的价格矩阵 (Pricing Matrix)。对于通用汇率，可使用 <strong>Open Exchange Rates</strong> 或 <strong>Fixer.io</strong> 等金融 API。
                    </div>
                  </li>
                  <li><strong>保存与修改：</strong>修改当前汇率后，点击对应行的“保存”按钮使更改生效。</li>
                </ul>
              </section>

              <section>
                <h4 className="text-base font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Percent className="w-4 h-4 text-indigo-500" />
                  应用市场佣金
                </h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>功能概述：</strong>设置 App Store 和 Google Play 的默认抽成比例（通常为 15% 或 30%）。</li>
                  <li><strong>操作：</strong>修改比例后点击右下角的“保存设置”即可应用到全局计算中。</li>
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
