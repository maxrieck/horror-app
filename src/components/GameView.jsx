import '../styles/GameView.css';
import { useState, useLayoutEffect } from 'react';

function GameView({ viewBackground, viewPathData, viewColorMap}) {

  const [paths, setPaths] = useState(viewPathData);
  const [showFill, setShowFill] = useState(false);
  
  

  useLayoutEffect(() => {
    setPaths(viewPathData);
  }, [viewPathData]);

  const handleOnClick = async(event) => {
    // await setAlertMessage("");
    const clickedPath = event.target;
    const clickedId = clickedPath.id;

    const activeColor = clickedPath.getAttribute('fill');
    if (!activeColor) {
      // setAlertMessage({message: "There is nothing of interest here", variant: "info"});
      return;
    }

    setPaths((prev) =>
      prev.map((p) =>
        p.id === clickedId && !p.className.includes("pathVisited")
          ? { ...p, className: `${p.className} pathVisited` }
          : p
      )
    );
    
    viewColorMap[activeColor]()
  }

  return (<>
    <svg xmlns="http://www.w3.org/2000/svg"
      width="28.4444in" height="18.6528in"
      viewBox="0 0 2048 1343"
      preserveAspectRatio="xMinYMin meet"
      style={{ width: '100%', height: '100%'}}
      onClick={handleOnClick}
    >
      <image
          href={viewBackground}
          x="0"
          y="0"
          width="2048"
          height="1343"
          style={{ pointerEvents: "none !important", cursor: "default" }}
      />
      {viewPathData.map((path, index) =>
            (
              <path
              id={path.id}
              className={path.className}
              key={index}
              fill={showFill ? path.fill.slice(0,7) : path.fill}
              d={path.d}
              >
                {/* SHOW PATH ID FOR DEV */}
                <title>{path.id} {path.fill}</title>
              </path>
            )
      )};
          {/* IMG CUTOUTS
          <defs>
            <clipPath id="clipPath">
              {paths.map((path, index) =>
                (
                  <path
                    id={`img_${path.id}`}
                    className={`${path.className} pathVisited`}
                    key={index}
                    fill={path.fill}
                    d={path.d}
                  >
                    <title>{path.id} {path.fill}</title>
                  </path>
                )
              )};
            </clipPath>
          </defs>
          <image
              id='cutouts'
              href={viewBackground}
              x="0"
              y="0"
              width="2048"
              height="1343"
              clip-path="url(#clipPath)"
              title={true}
          /> */}
    </svg>
    <button style={{position: 'absolute', top: 10, right: 10, zIndex: 200}} onClick={() => setShowFill(!showFill)}>{showFill ? "Hide Fill" : "Show Fill"}</button>
  </>);
}
export default GameView;