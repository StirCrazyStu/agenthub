document.addEventListener("DOMContentLoaded", function () {
    const untilDeparture = document.getElementById("untilDeparture").textContent;
    const cancelFee = document.getElementById("cancelFee").textContent;
    const changeLater = document.getElementById("changeDateLater").textContent;
    const changeAccom = document.getElementById("changeAccom").textContent;
    const changeEarlier = document.getElementById("changeDateEarlier").textContent;
    const changeUpgrade = document.getElementById("changeUpgrade").textContent;
    const changeName = document.getElementById("changeName").textContent;

    const feeCurrency = '&pound;';
    const feeFiftyPP = "50 per person.";
    const feeTwentyFivePP = "25 per person.";
    const feeCancel = "Treat as cancellation.";
    const feeFree = "FREE.";
    const feeDeposit = "Deposit Only.";
    const enterDate = "Please enter a departure date.";

    let feeCancellation = '', feeChangeLater = '', feeChangeAccom = '', feeChangeEarlier = '', feeChangeUpgrade = '', feeChangeName = '';

    document.getElementById("bookingAmount").addEventListener("input", function (e) {
        e.target.value = e.target.value.replace(/[^\d.]/g, '');
    });

    document.getElementById("reset").addEventListener("click", function () {
        document.getElementById("feesOutput").innerHTML = '';
    });

    function parseDateInput(dateString) {
        const [year, month, day] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day);
    }

    function getDaysUntilDeparture(dateString) {
        const departureDate = parseDateInput(dateString);

        const today = new Date();
        const todayLocal = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        const departureLocal = new Date(
            departureDate.getFullYear(),
            departureDate.getMonth(),
            departureDate.getDate()
        );

        return Math.round(
            (departureLocal - todayLocal) / (1000 * 60 * 60 * 24)
        );
    }

    document.getElementById("calculate").addEventListener("click", function () {
        const departureDateInput = document.getElementById("departureDate");

        if (!departureDateInput.value) {
            document.getElementById("feesOutput").innerHTML = enterDate;
            return;
        }

        const daysDifference = getDaysUntilDeparture(departureDateInput.value);
        const bookingAmount = parseFloat(document.getElementById("bookingAmount").value) || 0;

        if (daysDifference >= 70) {
            feeCancellation = 0;
            feeChangeLater = feeCurrency + feeFiftyPP;
            feeChangeAccom = feeCurrency + feeFiftyPP;
            feeChangeEarlier = feeCurrency + feeFiftyPP;
            feeChangeUpgrade = feeFree;
            feeChangeName = feeCurrency + feeTwentyFivePP;
        } else if (daysDifference <= 14) {
            feeCancellation = 100;
            feeChangeLater = feeCancel;
            feeChangeAccom = feeCancel;
            feeChangeEarlier = feeCurrency + feeFiftyPP;
            feeChangeUpgrade = feeFree;
            feeChangeName = feeCurrency + feeTwentyFivePP;
        } else if (daysDifference <= 28) {
            feeCancellation = 90;
            feeChangeLater = feeCancel;
            feeChangeAccom = feeCancel;
            feeChangeEarlier = feeCurrency + feeFiftyPP;
            feeChangeUpgrade = feeFree;
            feeChangeName = feeCurrency + feeTwentyFivePP;
        } else if (daysDifference <= 48) {
            feeCancellation = 70;
            feeChangeLater = feeCancel;
            feeChangeAccom = feeCurrency + feeFiftyPP;
            feeChangeEarlier = feeCurrency + feeFiftyPP;
            feeChangeUpgrade = feeFree;
            feeChangeName = feeCurrency + feeTwentyFivePP;
        } else if (daysDifference <= 62) {
            feeCancellation = 50;
            feeChangeLater = feeCancel;
            feeChangeAccom = feeCurrency + feeFiftyPP;
            feeChangeEarlier = feeCurrency + feeFiftyPP;
            feeChangeUpgrade = feeFree;
            feeChangeName = feeCurrency + feeTwentyFivePP;
        } else if (daysDifference <= 69) {
            feeCancellation = 30;
            feeChangeLater = feeCancel;
            feeChangeAccom = feeCurrency + feeFiftyPP;
            feeChangeEarlier = feeCurrency + feeFiftyPP;
            feeChangeUpgrade = feeFree;
            feeChangeName = feeCurrency + feeTwentyFivePP;
        }

        function getCancellationFees(amount, percentage) {
            const feeAmount = (amount / 100) * percentage;
            const feePercentage = feeCurrency + feeAmount.toFixed(2) + ' (' + percentage + '%)';
            const percentageOnly = percentage === 0 ? feeDeposit : percentage + '%';
            return (amount === 0 || percentage === 0) ? percentageOnly : feePercentage;
        }

        feeCancellation = getCancellationFees(bookingAmount, feeCancellation);

        const output = `
        <div id="fees" class="block block-rounded bg-light">
            <div class="block-content block-content-full d-flex justify-content-between p-3">
                <div class="me-3">
                    <div>${untilDeparture} <strong>${daysDifference}</strong></div>
                    <div>${cancelFee} <strong>${feeCancellation}</strong></div>
                    <div>${changeLater} <strong>${feeChangeLater}</strong></div>
                    <div>${changeAccom} <strong>${feeChangeAccom}</strong></div>
                    <div>${changeEarlier} <strong>${feeChangeEarlier}</strong></div>
                    <div>${changeUpgrade} <strong>${feeChangeUpgrade}</strong></div>
                    <div>${changeName} <strong>${feeChangeName}</strong></div>
                </div>
                <div class="row items-push-2x text-center text-sm-start">
                    <div class="col-sm-6 col-xl-4">
                        <button id="copybutton" type="button" class="btn btn-sm btn-outline-secondary">
                            <i class="fa fa-regular fa-copy text-primary"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>`;

        document.getElementById("feesOutput").innerHTML = output;
        document.getElementById("feesOutput").scrollIntoView({ behavior: 'smooth' });
    });

    document.addEventListener("click", function (e) {
        const btn = e.target.closest("#copybutton");
        if (!btn) return;

        const feesBlock = document.querySelector("#fees .me-3") || document.getElementById("outputText");
        if (!feesBlock) return;

        const htmlToCopy = feesBlock.innerHTML;
        const plainText = feesBlock.innerText;

        function flashCopied(targetBtn) {
            const flash = document.createElement("span");
            flash.textContent = "Copied";
            flash.className = "copy-flash";
            flash.style.position = "absolute";

            targetBtn.style.position = "relative";
            targetBtn.appendChild(flash);

            setTimeout(() => flash.remove(), 1300);
        }

        if (navigator.clipboard && window.ClipboardItem) {
            const blobHtml = new Blob([htmlToCopy], { type: "text/html" });
            const blobText = new Blob([plainText], { type: "text/plain" });

            const clipboardItem = new ClipboardItem({
                "text/html": blobHtml,
                "text/plain": blobText
            });

            navigator.clipboard.write([clipboardItem])
                .then(() => flashCopied(btn))
                .catch(err => console.error("Clipboard copy failed:", err));
        } else {
            navigator.clipboard.writeText(plainText)
                .then(() => flashCopied(btn));
        }
    });

    function calculateFutureDate(days) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        today.setDate(today.getDate() + days);

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return today.toLocaleDateString('en-GB', options);
    }

    document.getElementById('dateOutput').textContent = calculateFutureDate(70);
});
