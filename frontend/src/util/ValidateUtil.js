class ValidateUtil {
  isEmptyString = (str) => {
    return !str || /^\s*$/.test(str);
  };
}

export default ValidateUtil;
