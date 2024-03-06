
document.getElementById('generateScript').addEventListener('click', function() {
    const googleSheetsData = document.getElementById('googleSheetsData').value;
    const currentPrice = parseFloat(document.getElementById('currentPrice').value);

    const priceLevelsInput = googleSheetsData.trim().replace(/\n/g, ',');
    const priceLevels = priceLevelsInput.split(',');

    let initialization = `//@version=5\nindicator("price levels", "price_levels", overlay=true)\n`;
    let defineLines = "// Specify multiple price levels for the horizontal lines\n";
    let plotLines = "\n// Plot the horizontal lines\n";

    priceLevels.forEach((priceStr, i) => {
        const price = parseFloat(priceStr);
        const color = price > currentPrice ? "color=color.red" : "color=color.green";
        defineLines += `priceLevel${i + 1} = ${price}\n`;
        plotLines += `hline(priceLevel${i + 1}, "Price Level ${i + 1}", ${color})\n`;
    });

    const fullScript = initialization + defineLines + plotLines;
    document.getElementById('pineScriptOutput').value = fullScript;
});
    