import React from "react";
import Phaser from "phaser";

export default function TitleScene() {
  class TitleScene extends Phaser.Scene {
    preload() {}

    create() {
      this.add.text(100, 100, "Hello World!");
    }
  }

  return TitleScene;
}
