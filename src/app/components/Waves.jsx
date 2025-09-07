import React from "react";
import Wave from "react-wavify";

const Waves = ({ theme }) => {
  // color palettes
  const themes = {
    starryNight: {
      wave1_bottom: "#000B2C",
      wave1_top_and_wave2_bottom: "#1A2350",
      wave2_top: "#3B4A8D",
      wave3_fill: "#93A6D8",
    },
    acid: {
      wave1_bottom: "#2F3B2C",
      wave1_top_and_wave2_bottom: "#4A5A35",
      wave2_top: "#6C7D4A",
      wave3_fill: "#B0D47C",
    },
    sereneLake: {
      wave1_bottom: "#182C40",
      wave1_top_and_wave2_bottom: "#26526E",
      wave2_top: "#3A809C",
      wave3_fill: "#7FB3CD",
    },
    retroSunset: {
      wave1_bottom: "#2A1637",
      wave1_top_and_wave2_bottom: "#4B1C56",
      wave2_top: "#A62B64",
      wave3_fill: "#F0763C",
    },
    sunset: {
      wave1_bottom: "#59364B",
      wave1_top_and_wave2_bottom: "#7B4B5A",
      wave2_top: "#A36F6D",
      wave3_fill: "#D89B74",
    },
    sky: {
      wave1_bottom: "#323B5A",
      wave1_top_and_wave2_bottom: "#4B5E87",
      wave2_top: "#648CA6",
      wave3_fill: "#9DBCCA",
    },
    default: {
      wave1_bottom: "#0b3155",
      wave1_top_and_wave2_bottom: "#204b6e",
      wave2_top: "#346485",
      wave3_fill: "#adf0ff",
    },
  };

  // get the correct palette based on the theme prop, w/ default as fallback
  const palette = themes[theme] || themes.default;

  return (
    <div className="w-full">
      {/* Wave 1: The bottom, darkest gradient layer */}
      <Wave
        fill="url(#gradient-wave1)"
        className="z-9 absolute bottom-0 h-60 w-full"
      >
        <defs>
          <linearGradient id="gradient-wave1" gradientTransform="rotate(90)">
            <stop offset="20%" stopColor={palette.wave1_top_and_wave2_bottom} />
            <stop offset="80%" stopColor={palette.wave1_bottom} />
          </linearGradient>
        </defs>
      </Wave>

      {/* Wave 2: The middle gradient layer */}
      <div className="z-8 absolute bottom-0 h-80 w-full">
        <Wave
          fill="url(#gradient-wave2)"
          options={{
            amplitude: 5,
          }}
        >
          <defs>
            <linearGradient id="gradient-wave2" gradientTransform="rotate(90)">
              <stop offset="10%" stopColor={palette.wave2_top} />
              <stop
                offset="90%"
                stopColor={palette.wave1_top_and_wave2_bottom}
              />
            </linearGradient>
          </defs>
        </Wave>
      </div>

      {/* Wave 3: The top solid layer, for shimmer/seafoam effect */}
      <div className="absolute bottom-0 h-83 w-full">
        <Wave
          fill={palette.wave3_fill}
          options={{
            amplitude: 10,
          }}
        />
      </div>
    </div>
  );
};

export default Waves;
