import sampleData from "./sampleData";

const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms)); //calls back resolve once setTtimeout is done
};

export const fetchSampleData = () => {
  return delay(1000).then(() => {
    return Promise.resolve(sampleData);
  });
};
