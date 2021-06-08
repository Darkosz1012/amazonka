import DataLoader from "dataloader";

export default function (model) {
    return new DataLoader(async (keys) => {
        const db_results = await model.find({ _id: { $in: keys } });

        const dataMap = db_results.reduce((acc, curr) => {
            acc[curr._id] = curr;
            return acc;
        }, {});

        return keys.map((id) => dataMap[id]);
    });
}
