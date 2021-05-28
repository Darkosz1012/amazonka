
import DataLoader from "dataloader";

export default function (model, parameter){ 
    return new DataLoader(async keys => {
        const filter = {}
        filter[parameter] = {$in : keys};
        const db_results = await model.find(filter);
        const dataMap = db_results.reduce((acc, curr) => {
            (acc[curr[parameter]] = acc[curr[parameter]] || []).push(curr);
            return acc;
        }, {});

        return keys.map((parameter) => dataMap[parameter]);
    })
}