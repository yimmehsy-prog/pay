export interface OrderStat {
  id: string;
  date: string;
  client: string;
  app: string;
  paymentMethod: string;
  country: string;
  taxRegion?: string; // The tax entity this country falls under
  orderCount: number;
  grossRevenue: number; // USD
  taxRate: number; // percentage
  commissionRate: number; // percentage
  taxVersion?: string; // e.g., 'v2026.03'
  commissionVersion?: string; // e.g., 'v2026.01'
}

export const mockOrderStats: OrderStat[] = [
  { id: '1', date: '2026-03-17', client: 'iOS', app: '01drama', paymentMethod: 'App Store', country: 'US (美国)', taxRegion: 'US (美国及海外领地)', orderCount: 1520, grossRevenue: 15200, taxRate: 8, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '2', date: '2026-03-17', client: 'Android', app: '01drama', paymentMethod: 'Google Play', country: 'US (美国)', taxRegion: 'US (美国及海外领地)', orderCount: 1200, grossRevenue: 12000, taxRate: 8, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '3', date: '2026-03-17', client: 'iOS', app: '02drama', paymentMethod: 'App Store', country: '泰国', taxRegion: 'TH (泰国)', orderCount: 3746, grossRevenue: 18730, taxRate: 7, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '4', date: '2026-03-17', client: 'Android', app: '02drama', paymentMethod: 'Google Play', country: '印度尼西亚', taxRegion: 'ID (印度尼西亚)', orderCount: 10, grossRevenue: 50, taxRate: 11, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '5', date: '2026-03-17', client: 'iOS', app: '01drama', paymentMethod: 'App Store', country: '老挝', taxRegion: 'LA (老挝)', orderCount: 23, grossRevenue: 115, taxRate: 10, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '6', date: '2026-03-17', client: 'Android', app: '01drama', paymentMethod: 'Google Play', country: '韩国', taxRegion: 'KR (韩国)', orderCount: 13, grossRevenue: 130, taxRate: 10, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '7', date: '2026-03-17', client: 'iOS', app: '02drama', paymentMethod: 'App Store', country: '巴西', taxRegion: 'BR (巴西)', orderCount: 6, grossRevenue: 60, taxRate: 17, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '8', date: '2026-03-17', client: 'Android', app: '02drama', paymentMethod: 'Google Play', country: '柬埔寨', taxRegion: 'KH (柬埔寨)', orderCount: 5, grossRevenue: 25, taxRate: 10, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '17', date: '2026-03-17', client: 'iOS', app: '01drama', paymentMethod: 'App Store', country: '土耳其', taxRegion: 'TR (土耳其)', orderCount: 4, grossRevenue: 20, taxRate: 20, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '18', date: '2026-03-17', client: 'Android', app: '01drama', paymentMethod: 'Google Play', country: '英国', taxRegion: 'UK (英国及皇家属地)', orderCount: 4, grossRevenue: 40, taxRate: 20, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '19', date: '2026-03-17', client: 'iOS', app: '02drama', paymentMethod: 'App Store', country: '日本', taxRegion: 'JP (日本)', orderCount: 2, grossRevenue: 20, taxRate: 10, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '20', date: '2026-03-17', client: 'Android', app: '02drama', paymentMethod: 'Google Play', country: '马来西亚', taxRegion: 'MY (马来西亚)', orderCount: 2, grossRevenue: 10, taxRate: 6, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '21', date: '2026-03-17', client: 'iOS', app: '01drama', paymentMethod: 'App Store', country: '香港', taxRegion: 'CN (中国及港澳台地区)', orderCount: 2, grossRevenue: 20, taxRate: 0, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '22', date: '2026-03-17', client: 'Android', app: '01drama', paymentMethod: 'Google Play', country: '阿曼', taxRegion: 'OM (阿曼)', orderCount: 1, grossRevenue: 5, taxRate: 5, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '23', date: '2026-03-17', client: 'iOS', app: '02drama', paymentMethod: 'App Store', country: '缅甸', taxRegion: 'MM (缅甸)', orderCount: 1, grossRevenue: 5, taxRate: 5, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '24', date: '2026-03-17', client: 'Android', app: '02drama', paymentMethod: 'Google Play', country: '墨西哥', taxRegion: 'MX (墨西哥)', orderCount: 1, grossRevenue: 5, taxRate: 16, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '25', date: '2026-03-17', client: 'iOS', app: '01drama', paymentMethod: 'App Store', country: '波多黎各', taxRegion: 'US (美国及海外领地)', orderCount: 8, grossRevenue: 80, taxRate: 8, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '26', date: '2026-03-17', client: 'Android', app: '01drama', paymentMethod: 'Google Play', country: '关岛', taxRegion: 'US (美国及海外领地)', orderCount: 3, grossRevenue: 30, taxRate: 8, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '27', date: '2026-03-17', client: 'iOS', app: '02drama', paymentMethod: 'App Store', country: '马恩岛', taxRegion: 'UK (英国及皇家属地)', orderCount: 2, grossRevenue: 20, taxRate: 20, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '28', date: '2026-03-17', client: 'Android', app: '02drama', paymentMethod: 'Google Play', country: '留尼汪', taxRegion: 'FR (法国海外领地)', orderCount: 4, grossRevenue: 40, taxRate: 20, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '29', date: '2026-03-17', client: 'iOS', app: '01drama', paymentMethod: 'App Store', country: '德国', taxRegion: 'EU (欧盟VIES增值税区)', orderCount: 450, grossRevenue: 4500, taxRate: 19, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  { id: '30', date: '2026-03-17', client: 'Android', app: '01drama', paymentMethod: 'Google Play', country: '格陵兰', taxRegion: 'DK (丹麦自治领地)', orderCount: 1, grossRevenue: 10, taxRate: 25, commissionRate: 15, taxVersion: 'v2026.03', commissionVersion: 'v2026.01' },
  // Older data with different tax/commission rates
  { id: '9', date: '2025-12-16', client: 'iOS', app: '01drama', paymentMethod: 'App Store', country: 'US (美国)', taxRegion: 'US (美国及海外领地)', orderCount: 1480, grossRevenue: 14800, taxRate: 7.5, commissionRate: 30, taxVersion: 'v2025.01', commissionVersion: 'v2025.01' },
  { id: '10', date: '2025-12-16', client: 'Android', app: '01drama', paymentMethod: 'Google Play', country: 'US (美国)', taxRegion: 'US (美国及海外领地)', orderCount: 1150, grossRevenue: 11500, taxRate: 7.5, commissionRate: 30, taxVersion: 'v2025.01', commissionVersion: 'v2025.01' },
  { id: '11', date: '2025-12-16', client: 'iOS', app: '02drama', paymentMethod: 'App Store', country: '泰国', taxRegion: 'TH (泰国)', orderCount: 810, grossRevenue: 4050, taxRate: 7, commissionRate: 30, taxVersion: 'v2025.01', commissionVersion: 'v2025.01' },
  { id: '12', date: '2025-12-16', client: 'Android', app: '02drama', paymentMethod: 'Google Play', country: '泰国', taxRegion: 'TH (泰国)', orderCount: 890, grossRevenue: 4450, taxRate: 7, commissionRate: 30, taxVersion: 'v2025.01', commissionVersion: 'v2025.01' },
];
