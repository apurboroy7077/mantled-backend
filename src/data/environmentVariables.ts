export const databaseUrlOfWeatherConsumerReport = `mongodb+srv://ar7:12345@cluster0.1g8wuka.mongodb.net/weather_consumer_report?retryWrites=true&w=majority`;
export const databaseUrlOfMantled = `mongodb+srv://ar7:12345@cluster0.1g8wuka.mongodb.net/mantled?retryWrites=true&w=majority`;
export const jwtSecretKey = 'mantled_nexus';
export const jwtSecretKeyOfVault = 'mantled_nexus_vault';
export const adminChangingPasswordJwtSecretKey =
  'weather_consumer_report_admin_changing_password_jwt_key';
export const secretKeyOfChangingPasswordToken =
  'mantled_changing_password_secret_key_orca';
export const frontendAddress = 'http://localhost:3000';
export const myPort = 4000;
export const stripePublishableKey =
  'pk_test_51Qk1iMFxqeIeIgIv4jauq9SUOcKvo995GZSoOmQL0lKi5dDTlF7eeBvNSCuQR3XOUcsQ8DnEq9ZxiV4z4mKCwfZ600p5lxsKQd';
export const stripeSecretKey =
  'sk_test_51Qk1iMFxqeIeIgIvD07l65DZLJewZBAcDLgYrE5K4twe8Ji51rnXZBKBvMBIzWuZC4AAx3HeW1WRsCKNoRCP8Zq100RvHQ6Nkg';
const rawEncryptionKey =
  'e50a3ac12385b32a75d2ec58c715f2bc7f8e38d4748a8b2d907ff2325f0243df';
export const encryptionSecretKey = Buffer.from(rawEncryptionKey, 'hex');
