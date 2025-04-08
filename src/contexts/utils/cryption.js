import CryptoJS from "crypto-js";

export const encrypt = (data, key, min = true) => {
  try {
    if (min && data?.meta) {
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(data.data),
        key
      ).toString();
      return {
        ...data,
        data: encryptedData,
      };
    }
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

export const decrypt = (encryptedData, key, min = true) => {
  try {
    if (typeof encryptedData === "string") {
      const bytes = CryptoJS.AES.decrypt(encryptedData, key);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    if (min && typeof encryptedData === "object" && encryptedData.data) {
      const bytes = CryptoJS.AES.decrypt(encryptedData.data, key);
      return {
        ...encryptedData,
        data: JSON.parse(bytes.toString(CryptoJS.enc.Utf8)),
      };
    }

    throw new Error("Invalid encrypted data format");
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
