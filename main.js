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
    const res = await fetch(
      "https://web-production-ffc5.up.railway.app/predict_churn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => data.prediction);
    console.log(res);

    return res;
  } catch (error) {
    console.log("The error", error);
    return "Server is down";
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
