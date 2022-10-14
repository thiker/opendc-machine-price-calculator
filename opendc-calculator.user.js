// ==UserScript==
// @name         opendc-calculator
// @description  basic calculator for rack prices
// @version      0.1
// @author       Thiker
// @match        *://*/*
// @grant        none
// ==/UserScript==


const prices = {
    "Intel i7 v6 6700k": 400,
    "Intel i5 v6 6700k": 200,
    "Intel® Xeon® E-2224G": 300,
    "Intel® Xeon® E-2244G": 300,
    "Intel® Xeon® E-2246G": 400,
    "NVIDIA GTX 4 1080": 600,
    "NVIDIA Tesla V100": 9500,
    "Samsung PC DRAM K4A4G045WD": 50,
    "Samsung PC DRAM M393A2K43BB1-CRC": 150,
    "Crucial MTA18ASF4G72PDZ-3G2E1": 300,
    "Crucial MTA9ASF2G72PZ-3G2E1": 150,
    "Samsung EVO 2016 SATA III": 25,
    "Western Digital MTA9ASF2G72PZ-3G2E1": 100,
}

let infoContainer;

window.addEventListener("keypress", function (e) {
    if (infoContainer) {
        infoContainer.remove();
    }
    if (e.key != "c") {
        return;
    }

    const buttonParents = document.querySelectorAll("*[data-ouia-component-type='PF4/Title']");
    let buttonParent;
    for (const parent of buttonParents) {
        if (parent.innerHTML == "Actions") {
            buttonParent = parent;
        }
    }
    infoContainer = document.createElement("div");
    infoContainer.id = "tk-info-container";
    infoContainer.innerHTML = "calculated cost";

    buttonParent.parentNode.prepend(infoContainer);

    function calculate() {
        const machineUnits = document.querySelectorAll('*[aria-label="Machine Units"] .pf-c-data-list__cell');
        let totalPrice = 0;
        for (const unit of machineUnits) {
            if (prices[unit.innerHTML]) {
                totalPrice += prices[unit.innerHTML];
            }
        }
        infoContainer.innerHTML = "<strong>Machine Price total: </strong>€" + totalPrice + "<br> Press <strong>C</strong> to recalculate.";
    }
    calculate()
})

