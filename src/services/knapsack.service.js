export const optimizeVehicles = (vehicles, capacity) => {
    const n = vehicles.length;

    const dp = Array.from({
        length: n+1
    }, () => Array(capacity + 1).fill(0));

    for(let i = 1; i <=n; i++){
        const {Duration, Impact} = vehicles[i -1];
        for(let j = 0; j <= capacity; j++){
            if(Duration <= j) {
                dp[i][j] = Math.max(
                    dp[i - 1][j], Impact + dp[i - 1][j - Duration]   
                );
            } else {
                dp[i][j] = dp[i -1][j];
            }
        }
    }

    const tasks = [];
    let c = capacity;

    for (let i = n; i > 0; i--) {
        if (dp[i][c] !== dp[i - 1][c]) {
            tasks.push(vehicles[i - 1]);
            c -= vehicles[i - 1].Duration;
    }
  }

  return {
    totalImpact : dp[n][capacity],
    selectedTasks: tasks.reverse(),
  };
};