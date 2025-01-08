import Kyc from "../../models/Kyc.js";

const getAllRequestedUsers = async (req, res) => {
  try {
    const requestedUsers = await Kyc.find({}).sort({ submittedAt: -1 });
    res.status(200).json({ success: true, data: requestedUsers });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getKycStats = async (req, res) => {
  try {
    const stats = await Kyc.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);    

    const totalUsers = await Kyc.distinct("userId").then(users => users.length);    

    const formattedStats = stats.reduce(
      (acc, { _id, count }) => {
        acc[_id] = count;
        return acc;
      },
      { approved: 0, rejected: 0, pending: 0 }
    );    

    res.status(200).json({
      success: true,
      data: {
        ...formattedStats,
        totalUsers,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Please select status" });
    }

    const request = await Kyc.findById(requestId);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    request.status = status;
    await request.save();

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export { getAllRequestedUsers, getKycStats, updateRequestStatus };
