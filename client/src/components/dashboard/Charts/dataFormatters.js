export const multipleChoice = question => {
  let respCount = [0, 0, 0, 0];
  question.responses.forEach(resp => {
    if (resp === 0) respCount[0] = respCount[0] + 1;
    if (resp === 1) respCount[1] = respCount[1] + 1;
    if (resp === 2) respCount[2] = respCount[2] + 1;
    if (resp === 3) respCount[3] = respCount[3] + 1;
  });
  //   Make it so an empty option doesnt show up
  //   let emptyIndex = question.opts.indexOf("");
  //   if (emptyIndex >= 0) {
  //     question.opts.slice(emptyIndex, 1);
  //     [
  //         ...question.opts.slice(0, emptyIndex),
  //         ...question.opts.slice(emptyIndex + 1, question.opts.length + 1)
  //       ],
  //   }
  let chartData = {
    labels: question.opts,
    type: "horizontalBar",
    datasets: [
      {
        label: "Multiple Choice",
        data: respCount,
        backgroundColor: ["#E74C3C", "#9B59B6", "#2E86C1", "#17A589"]
      }
    ]
  };

  return chartData;
};

export const range = question => {
  let respCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  question.responses.forEach(resp => {
    respCount[resp]++;
  });
  let chartData = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: "Range",
        data: respCount,
        backgroundColor: [
          "#E74C3C",
          "#9B59B6",
          "#2E86C1",
          "#17A589",
          "##F1C40F",
          "#E67E22",
          "#5D6D7E",
          "#A93226",
          "#F8C471",
          "#212F3C"
        ]
      }
    ]
  };
  return chartData;
};

export const trueOrFalse = question => {
  let respCount = [0, 0];

  question.responses.forEach(resp => {
    if (resp === 0) respCount[1] = respCount[1] + 1;
    if (resp === 1) respCount[0] = respCount[0] + 1;
  });
  let chartData = {
    labels: ["True", "False"],
    datasets: [
      {
        label: "True or False",
        data: respCount,
        backgroundColor: ["#1ABC9C", "#2980B9"]
      }
    ]
  };

  return chartData;
};
