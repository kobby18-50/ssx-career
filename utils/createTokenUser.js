const createTokenUser = (industry) => {
  return {
    industryId: industry._id,
    industryName: industry.name,
    role: industry.industryType,
  };
};

export default createTokenUser;
