import { generateTime } from "./distributions";

export function simulateQueue(config) {
  const {
    arrival,
    service,
    servers,
    capacity,
    population,
    customerCount,
    arrivalMean,
    arrivalValue,
    serviceMean,
    serviceValue,
    serviceK,
    arrivalK,
  } = config;

  const generalArrivalDist = [
    { value: 5, probability: 0.4 },
    { value: 8, probability: 0.15 },
    { value: 10, probability: 0.3 },
    { value: 15, probability: 0.15 },
  ];

  const generalServiceDist = [
    { value: 5, probability: 0.2 },
    { value: 10, probability: 0.3 },
    { value: 15, probability: 0.3 },
    { value: 20, probability: 0.2 },
  ];

  let arrivedCustomers = 0;
  const events = [];
  const serversState = Array(servers).fill(null);
  let prevArrivalTime = 0;

  for (let i = 0; i < customerCount; i++) {
    if (population !== "∞" && arrivedCustomers >= parseInt(population)) break;

    const interarrivalTime =
      i === 0
        ? 0
        : generateTime(arrival, {
            mean: arrivalMean,
            value: arrivalValue,
            k: arrivalK,
            distribution: generalArrivalDist,
          });

    const arrivalTime = prevArrivalTime + interarrivalTime;
    prevArrivalTime = arrivalTime;

    const inSystemNow = events.filter(
      (e) =>
        !e.rejected &&
        e.arrivalTime <= arrivalTime &&
        e.finishTime > arrivalTime
    ).length;

    if (capacity !== "∞" && inSystemNow >= parseInt(capacity)) {
      events.push({
        id: i + 1,
        arrivalTime,
        interarrivalTime,
        rejected: true,
      });
      continue;
    }

    arrivedCustomers++;

    const rawServiceTime = generateTime(service, {
      mean: serviceMean,
      value: serviceValue,
      k: serviceK,
      distribution: generalServiceDist,
    });

    let serverId = serversState.findIndex(
      (t) => t === null || t <= arrivalTime
    );
    let startTime;

    if (serverId !== -1) {
      startTime = Math.max(arrivalTime, serversState[serverId] || 0);
    } else {
      const earliestFinish = Math.min(...serversState);
      serverId = serversState.findIndex((t) => t === earliestFinish);
      startTime = earliestFinish;
    }

    const finishTime = startTime + rawServiceTime;

    const customer = {
      id: i + 1,
      arrivalTime,
      interarrivalTime,
      startTime,
      serviceTime: rawServiceTime,
      rawServiceTime,
      waitingTime: startTime - arrivalTime,
      finishTime,
      timeInSystem: finishTime - arrivalTime,
      serverId: serverId + 1,
      rejected: false,
    };

    serversState[serverId] = finishTime;
    events.push(customer);
  }

  return events;
}
