import threeSceneNightcamp from 'three-scene-nightcamp';
import domready from 'domready';

domready(() => {
  const scene = threeSceneNightcamp({
    canvas: document.getElementById('container'),
    width: window.innerWidth,
    height: 300,
  });

  window.addEventListener('resize', () => {
    console.log(Math.min(300, window.innerWidth / 2))
    scene.updateView(window.innerWidth, Math.min(300, window.innerWidth / 2));
  });
});
