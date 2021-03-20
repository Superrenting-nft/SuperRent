const SuperfluidSDK = require("@superfluid-finance/js-sdk");

export const getSuperClient = async (provider) => {
  console.log("PROVIDER: ", provider);
  const sf = new SuperfluidSDK.Framework({
    ethers: provider,
    tokens: ["fDAI"],
  });
  await sf.initialize();
  return sf;
};
