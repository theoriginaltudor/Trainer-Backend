const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const VideoSchema = mongoose.Schema({
  clientId: {
    type: ObjectId
  },
  workoutId: {
    type: ObjectId
  },
  videosPaths: {
    type: Array
  }
});

VideoSchema.statics.videoForClient = (clientId, workoutId, callback) => {
  const query = {
    clientId: mongoose.Types.ObjectId(clientId),
    workoutId: mongoose.Types.ObjectId(workoutId)
  };
  Video.find(query, callback);
};

VideoSchema.statics.addNew = (
  clientId,
  workoutId,
  newEntry,
  callback
) => {
  newEntry = {
    ...newEntry,
    clientId: mongoose.Types.ObjectId(clientId),
    workoutId: mongoose.Types.ObjectId(workoutId)
  };

  const newVideo = new Video(newEntry);

  newVideo.save(callback);
};

VideoSchema.statics.purgeVideo = (clientId, callback) => {
  const query = {
    clientId: mongoose.Types.ObjectId(clientId)
  }
  Video.deleteMany(query, callback);
}

const Video = mongoose.model("Video", VideoSchema, "Video-history");
module.exports = Video;
