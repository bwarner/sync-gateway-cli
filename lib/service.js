module.exports = {
  put(gateway, options, json, cb) {
    const key = json[options.key || '_id'];
    if (!key) {
      return cb(new Error("not key found at: %s", key));
    }
    var opts = {};
    if (options.rev) {
      opts.rev = options.rev;
    }
    gateway.createOrUpdate(key, json, opts, cb);
  },

  get(gateway, options, id,  cb) {
    var opts = {};
    if (options.rev) {
      opts.revs = options.rev;
    }
    gateway.get(id, opts, cb);
  }
};
