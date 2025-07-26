 const colorPicker = document.getElementById("colorPicker");
    const palette = document.getElementById("palette");

    function hexToRgb(hex) {
      hex = hex.replace("#", "");
      const bigint = parseInt(hex, 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }

    function rgbToHex(r, g, b) {
      return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join("");
    }

    function adjustBrightness([r, g, b], factor) {
      return [
        Math.min(255, Math.max(0, r * factor)),
        Math.min(255, Math.max(0, g * factor)),
        Math.min(255, Math.max(0, b * factor))
      ];
    }

    function getComplementary([r, g, b]) {
      return [255 - r, 255 - g, 255 - b];
    }

    function renderPalette(baseHex) {
      palette.innerHTML = "";
      const baseRgb = hexToRgb(baseHex);
      const colors = [
        { name: "Original", rgb: baseRgb },
        { name: "Brighter 10X", rgb: adjustBrightness(baseRgb, 4.5)},
        { name: "Brighter 5X", rgb: adjustBrightness(baseRgb, 2.5)},
        { name: "Brighter 2X", rgb: adjustBrightness(baseRgb, 1.5)},
        { name: "Slightly Bright", rgb: adjustBrightness(baseRgb, 1.1)},
        { name: "Slightly Dark", rgb: adjustBrightness(baseRgb, 0.9)},
        { name: "Dark 30%", rgb: adjustBrightness(baseRgb, 0.7)},
        { name: "Dark 60%", rgb: adjustBrightness(baseRgb, 0.4)},
        { name: "Dark 90%", rgb: adjustBrightness(baseRgb, 0.17)},
        { name: "Complementary", rgb: getComplementary(baseRgb) }
      ];

      colors.forEach(color => {
        const hex = rgbToHex(...color.rgb.map(c => Math.round(c)));
        const box = document.createElement("div");
        box.className = "color-box";
        box.style.backgroundColor = hex;
        box.innerHTML = `<div>${color.name}</div><div>${hex}</div>`;
        box.onclick = () => {
          navigator.clipboard.writeText(hex);
          box.innerHTML = `<div>Copied!</div><div>${hex}</div>`;
          setTimeout(() => renderPalette(baseHex), 1000);
        };
        palette.appendChild(box);
      });
    }

    colorPicker.addEventListener("input", (e) => {
      renderPalette(e.target.value);
    });

    renderPalette(colorPicker.value);
