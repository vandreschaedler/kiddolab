export default {
  successRes: (res, data) => {
    res.json({
      status: true,
      info: data,
    });
  },

  errorRes: (res, data, code) => {
    res.status(code || 500).json({
      status: false,
      info: data,
    });
  },
};
