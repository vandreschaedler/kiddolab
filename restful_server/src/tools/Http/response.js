export default {
  successRes: (res, data) => {
    res.send({
      status: true,
      info: data.data.info,
    });
  },

  errorRes: (res, data, code) => {
    console.log(data);
    res.status(code || 500).json({
      status: false,
      info: data,
    });
  },
};
