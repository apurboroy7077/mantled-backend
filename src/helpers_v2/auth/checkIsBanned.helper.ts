export const checkIsBanned = (userData: {
  isBanned: boolean;
  [key: string]: any;
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (userData.isBanned) {
        reject('User is banned');
      } else {
        resolve('User is not banned');
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
