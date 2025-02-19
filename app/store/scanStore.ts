import { create } from "zustand";

interface ScanState {
  scanned: boolean; // 스캔중
  setScanned: (value: boolean) => void; // 스캔 설정
  urlCode: string; // URL정보
  setUrlCode: (value: string) => void; // URL 설정
  analyzing: boolean; // 분석중
  setAnalyzing: (value: boolean) => void; // 분석중
}

export const useScanStore = create<ScanState>((set) => ({
  scanned: false,
  setScanned: (value: boolean) => set({ scanned: value }), // 값을 직접 설정
  urlCode: "",
  setUrlCode: (value: string) => set({ urlCode: value }),
  analyzing: false,
  setAnalyzing: (value: boolean) => set({ analyzing: value }),
}));
