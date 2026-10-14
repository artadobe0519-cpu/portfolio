import { ImageResponse } from "next/og";

export const alt = "Rajni Goswami, graphic designer in Sri Ganganagar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3eee6",
          color: "#1c1714",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", fontSize: 24 }}>
          <span>Rajni Goswami</span>
          <span style={{ color: "#722f37" }}>Sri Ganganagar</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            lineHeight: 1.02,
            letterSpacing: -2,
            maxWidth: 920,
          }}
        >
          Designs that make brands impossible to ignore.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#6e665f" }}>
          Graphic Designer and Visual Brand Designer
        </div>
      </div>
    ),
    { ...size },
  );
}
