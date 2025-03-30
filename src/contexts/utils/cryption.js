import CryptoJS from "crypto-js";

export const encrypt = (data, key, min = true) => {
  if (min && data?.meta) {
    return {
      ...data,
      data: CryptoJS.AES.encrypt(JSON.stringify(data.data), key).toString(),
    };
  }
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

export const decrypt = (encryptedData, key, min = true) => {
  try {
    if (min && typeof encryptedData === "object") {
      const bytes = CryptoJS.AES.decrypt(encryptedData.data, key);
      return {
        ...encryptedData,
        data: JSON.parse(bytes.toString(CryptoJS.enc.Utf8)),
      };
    }

    const bytes = CryptoJS.AES.decrypt(encryptedData.toString(), key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    console.error("Decryption failed:", e);
    return null;
  }
};
