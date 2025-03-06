export const scanUrl = async (url: string): Promise<number> => {
  try {
    const response = await fetch("http://localhost:8080/api/check-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    const data: { result: number } = await response.json();
    return data.result;
  } catch (error) {
    console.error("API 호출 실패:", error);
    return -1;
  }
};
