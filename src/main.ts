import "./style.css";
import {
  Engine,
  Scene,
  Vector3,
  SceneLoader,
  ArcRotateCamera,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF/2.0";
import "@babylonjs/core/Helpers/sceneHelpers";
import model from "./rusty_container.glb";

const canvas = document.querySelector("canvas");

if (!canvas) {
  throw Error("canvas not found");
}

const engine = new Engine(canvas, true);
const scene = new Scene(engine);
const camera = new ArcRotateCamera("camera", 1, 1, 20, new Vector3(0, 2, 0));

camera.attachControl(canvas, true);
scene.createDefaultEnvironment();

scene.createDefaultEnvironment();

engine.runRenderLoop(() => {
  scene.render();
});

SceneLoader.ImportMeshAsync(null, model, "", scene).then((result) => {
  scene.onBeforeRenderObservable.add(() => {
    result.meshes[0].rotate(new Vector3(0, 1, 0), 0.01);
  });
});
