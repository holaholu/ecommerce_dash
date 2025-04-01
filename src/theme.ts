// import { theme } from 'antd';
import type { ThemeConfig } from 'antd';

export const customTheme: ThemeConfig = {
  token: {
    colorPrimary: '#2c5282',
    colorSuccess: '#2f855a',
    colorWarning: '#c05621',
    colorError: '#c53030',
    colorInfo: '#2b6cb0',
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f7fafc',
    screenXS: 480,
    screenSM: 576,
    screenMD: 768,
    screenLG: 992,
    screenXL: 1200,
    screenXXL: 1600,
  },
  components: {
    Layout: {
      bodyBg: '#f7fafc',
      siderBg: '#1a365d',
    },
    Card: {
      borderRadiusLG: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      paddingLG: 24,
    },
    Menu: {
      itemSelectedBg: '#ebf8ff',
      itemSelectedColor: '#2c5282',
      itemHoverBg: '#f7fafc',
      itemHoverColor: '#2c5282',
      darkItemBg: '#1a365d',
      darkItemSelectedBg: '#2c5282',
      darkItemHoverBg: '#2b6cb0',
      darkItemColor: '#e2e8f0',
    },
    Button: {
      borderRadius: 8,
      controlHeight: 40,
    },
    Input: {
      borderRadius: 8,
      controlHeight: 40,
    },
    Table: {
      borderRadius: 8,
      headerBg: '#f7fafc',
      rowHoverBg: '#edf2f7',
      padding: 16,
      paddingLG: 24,
      paddingSM: 8,
      fontSize: 14,
      fontSizeLG: 16,
      fontSizeSM: 12,
    },
    Tag: {
      borderRadius: 6,
      fontSize: 12,
    },
    Select: {
      borderRadius: 8,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
    },
    DatePicker: {
      borderRadius: 8,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
    },
    Modal: {
      borderRadiusLG: 12,
      paddingContentHorizontalLG: 24,
      paddingContentVerticalLG: 24,
      paddingContentHorizontal: 16,
      paddingContentVertical: 16,
    },
    Form: {
      labelFontSize: 14,
    },
  },
};

// Page-specific themes
export const pageThemes = {
  dashboard: {
    primary: '#2c5282',
    secondary: '#4299e1',
    background: '#f0f2f5',
    cardBg: '#ffffff',
  },
  orders: {
    primary: '#2f855a',
    secondary: '#48bb78',
    background: '#f0faf5',
    cardBg: '#ffffff',
  },
  products: {
    primary: '#c05621',
    secondary: '#ed8936',
    background: '#fff7ed',
    cardBg: '#ffffff',
  },
  customers: {
    primary: '#2b6cb0',
    secondary: '#4299e1',
    background: '#ebf8ff',
    cardBg: '#ffffff',
  },
};

export default customTheme; 