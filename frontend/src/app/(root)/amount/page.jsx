import dynamic from 'next/dynamic';
export default dynamic(() => import('./AmountPageImpl'), { ssr: false });