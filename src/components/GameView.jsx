import Alert from 'react-bootstrap/Alert';

function gameView({ viewBackground, viewPathData, viewColorMap}) {

  const handleOnClick = (event) => {
    const clickedPath = event.target;

    const theThing = viewColorMap[clickedPath.getAttribute('fill')];
    if (typeof theThing === 'function') {
      theThing();
    } else {
      Alert(`No action defined for color: ${clickedPath.getAttribute('fill')}`);
    }
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="28.4444in" height="18.6528in"
      viewBox="0 0 2048 1343"
      preserveAspectRatio="xMinYMin meet"
      style={{ width: '100%', height: '100%', pointerEvents: "fill", cursor: "pointer" }}
      onClick={handleOnClick}
      onTouch={handleOnClick}
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
            id={`${viewBackground.slice(0, viewBackground.indexOf(/V\d/) - 1)}${index + 1}`}
            key={index}
            fill={path.fill}
            d={path.d}
          />
        )
      )};

    </svg>
  );
}
export default gameView;