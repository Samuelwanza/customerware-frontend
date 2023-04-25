document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("churn-form");
  console.log(form);
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const contract = document.getElementById("contract").value;

    const dependents = document.getElementById("dependents").value;
    const internetService = document.getElementById("internetService").value;
    const connectionType = document.getElementById("connectionType").value;
    const monthlyCharges = document.getElementById("monthlyCharges").value;
    const multipleLines = document.getElementById("multipleLines").value;
    const onlineBackup = document.getElementById("onlineBackup").value;
    const onlineSecurity = document.getElementById("onlineSecurity").value;
    const paperlessBilling = document.getElementById("paperlessBilling").value;
    const partner = document.getElementById("partner").value;
    const paymentMethod = document.getElementById("paymentMethod").value;
    const phoneService = document.getElementById("phoneService").value;
    let seniorCitizen = document.getElementById("seniorCitizen").value;
    const streamMovies = document.getElementById("streamMovies").value;
    const streamTV = document.getElementById("streamTV").value;
    const techSupport = document.getElementById("techSupport").value;
    const deviceProtection = document.getElementById("deviceProtection").value;
    const totalCharges = document.getElementById("totalCharges").value;
    const gender = document.getElementById("gender").value;
    const tenure = document.getElementById("tenure").value;

    if (seniorCitizen == "Yes") seniorCitizen = 1;
    if (seniorCitizen == "No") seniorCitizen = 0;
    console.log(typeof parseFloat(monthlyCharges));
    console.log(typeof contract);

    const data = {
      Contract: [contract],
      Dependents: [dependents],
      DeviceProtection: [deviceProtection],
      InternetService: [internetService],
      MonthlyCharges: [parseFloat(monthlyCharges)],
      MultipleLines: [multipleLines],
      OnlineBackup: [onlineBackup],
      OnlineSecurity: [onlineSecurity],
      PaperlessBilling: [paperlessBilling],
      Partner: [partner],
      PaymentMethod: [paymentMethod],
      PhoneService: [phoneService],
      SeniorCitizen: [seniorCitizen],
      StreamingMovies: [streamMovies],
      StreamingTV: [streamTV],
      TechSupport: [techSupport],
      TotalCharges: [parseFloat(totalCharges)],
      gender: [gender],
      tenure: [parseInt(tenure)],
    };
    //const formData = new FormData(form);

    //const data = Object.fromEntries(formData.entries());
    //console.log(contract);

    try {
      const prediction = await predictChurn(data);

      displayPrediction(prediction);
    } catch (error) {
      handleError(error);
    }
  });
});

async function predictChurn(data) {
  try {
    const sam = {
      Contract: ["One year"],
      Dependents: ["No"],
      DeviceProtection: ["No"],
      InternetService: ["No"],
      MonthlyCharges: [123],
      MultipleLines: ["No"],
      OnlineBackup: ["No"],
      OnlineSecurity: ["No"],
      PaperlessBilling: ["No"],
      Partner: ["No"],
      PaymentMethod: ["Electronic check"],
      PhoneService: ["No"],
      SeniorCitizen: ["No"],
      StreamingMovies: ["No"],
      StreamingTV: ["No"],
      TechSupport: ["No"],
      TotalCharges: [1234],
      gender: ["Male"],
      tenure: [12],
    };

    const sams = {
      Contract: ["One year"],
      Dependents: ["No"],
      DeviceProtection: ["No"],
      InternetService: ["DSL"],
      MonthlyCharges: [58.35],
      MultipleLines: ["Yes"],
      OnlineBackup: ["No"],
      OnlineSecurity: ["Yes"],
      PaperlessBilling: ["Yes"],
      Partner: ["Yes"],
      PaymentMethod: ["Electronic check"],
      PhoneService: ["Yes"],
      SeniorCitizen: [0],
      StreamingMovies: ["No"],
      StreamingTV: ["No"],
      TechSupport: ["Yes"],
      TotalCharges: [1346.9],
      gender: ["Male"],
      tenure: [24],
    };

    console.log(sams, "How it looks before");
    console.log(JSON.stringify(data), "After it has been stringified");
    const res = await fetch(
      "https://web-production-ffc5.up.railway.app/predict_churn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sams),
      }
    )
      .then((res) => res.json())
      .then((data) => data.prediction);
    console.log(res);

    //const res = aw/ait fetch("https://flask-production-9868.up.railway.app");
    //console.log(res);
    // const response = await fetch(
    //   "https://flask-production-9868.up.railway.app/predict_churn",
    //   {
    //     method: "POST",

    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(sams),
    //   }
    // ).then((res) => res.json());

    //const json = await response.json();
    //console.log(response, "The jeson response");

    return res;
  } catch (error) {
    console.log("The error", error);
    return error.stack;
  }
}
function displayPrediction(prediction) {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `${prediction} churn`;
}

function handleError(error) {
  console.error(error);
  alert("An error occurred. Please try again later.");
}

// Dialogs functionality
const settingsDialog = document.getElementById("settings-dialog");
const aboutDialog = document.getElementById("about-dialog");
const errorDialog = document.getElementById("error-dialog");

document.getElementById("settings").addEventListener("click", () => {
  settingsDialog.classList.remove("hidden");
});

document.getElementById("about").addEventListener("click", () => {
  aboutDialog.classList.remove("hidden");
});

document.getElementById("settings-close").addEventListener("click", () => {
  settingsDialog.classList.add("hidden");
});

document.getElementById("about-close").addEventListener("click", () => {
  aboutDialog.classList.add("hidden");
});

document.getElementById("error-close").addEventListener("click", () => {
  errorDialog.classList.add("hidden");
});

document.getElementById("dark-theme").addEventListener("click", () => {
  document.body.classList.add("dark-theme");
  document.body.classList.remove("light-theme");
});

document.getElementById("light-theme").addEventListener("click", () => {
  document.body.classList.add("light-theme");
  document.body.classList.remove("dark-theme");
});

// Screenshot functionality
document.getElementById("screenshot").addEventListener("click", () => {
  html2canvas(document.querySelector("body")).then((canvas) => {
    let link = document.createElement("a");
    link.download = "screenshot.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

// Print functionality
document.getElementById("print").addEventListener("click", () => {
  window.print();
});

// Rerun functionality
document.getElementById("rerun").addEventListener("click", () => {
  location.reload();
});

// Hamburger menu
