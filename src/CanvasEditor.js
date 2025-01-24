import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const CanvasEditor = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState({});
  const [caption, setCaption] = useState("");

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current);
    console.log(fabricCanvas);
    setCanvas(fabricCanvas);
    return () => fabricCanvas.dispose();
  }, []);

  useEffect(() => {
    if (canvas && imageUrl) {
      console.log(canvas, " this", imageUrl);
      fabric.Image.fromURL(
        imageUrl,
        (img) => {
          img.set({ left: 0, top: 0 });

          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height,
          });
        },
        { crossOrigin: "Anonymous" }
      );
    }
  }, [canvas, imageUrl]);

  const addText = () => {
    const text = new fabric.Text(caption || "Add Caption", {
      left: 100,
      top: 100,
      fontFamily: "Arial",
      fontSize: 30,
      fill: "#000000",
    });
    canvas.add(text);
    setCaption("");
  };

  const addShape = (type) => {
    let shape;
    switch (type) {
      case "rectangle":
        shape = new fabric.Rect({
          left: 150,
          top: 150,
          fill: "red",
          width: 100,
          height: 60,
        });
        break;
      case "circle":
        shape = new fabric.Circle({
          left: 200,
          top: 200,
          fill: "green",
          radius: 50,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          left: 250,
          top: 250,
          fill: "blue",
          width: 100,
          height: 100,
        });
        break;
      default:
        return;
    }
    canvas.add(shape);
  };

  const downloadCanvas = () => {
    const dataUrl = canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "modified_image.png";
    link.click();
  };

  return (
    <div className="canvas-editor">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <canvas ref={canvasRef} width={800} height={600}></canvas>
      </div>

      <div className="controls">
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Enter Caption"
        />
        <button onClick={addText}>Add Caption</button>

        <button onClick={() => addShape("rectangle")}>Add Rectangle</button>
        <button onClick={() => addShape("circle")}>Add Circle</button>
        <button onClick={() => addShape("triangle")}>Add Triangle</button>

        <button onClick={downloadCanvas}>Download Image</button>
      </div>
    </div>
  );
};

export default CanvasEditor;
