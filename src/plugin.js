import videojs from "video.js";
import { version as VERSION } from "../package.json";

const Plugin = videojs.getPlugin("plugin");

// Default options for the plugin.
const defaults = {
  image: "/logo-example.png",
  title: "Logo Title",
  destination: "http://www.google.com",
  destinationTarget: "_blank",
};

class Brand extends Plugin {
  /**
   * Create a Brand plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);

    this.options = videojs.mergeOptions(defaults, options);

    let containerElement = document.createElement("div");
    containerElement.className = "vjs-brand-container";

    let linkElement = document.createElement("a");
    linkElement.className = "vjs-brand-container-link";
    linkElement.setAttribute(
      "href",
      options.destination || defaults.destination
    );
    linkElement.setAttribute("title", options.title || defaults.title);
    linkElement.setAttribute(
      "target",
      options.destinationTarget || defaults.destinationTarget
    );

    let imageElement = document.createElement("img");
    imageElement.src = options.image || defaults.image;

    linkElement.appendChild(imageElement);
    containerElement.appendChild(linkElement);

    player.controlBar
      .el()
      .insertBefore(containerElement, player.controlBar.fullscreenToggle.el());
    player.addClass("vjs-brand");
  }
}

// Define default values for the plugin's `state` object here.
Brand.defaultState = {};

// Include the version number.
Brand.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin("brand", Brand);

export default Brand;
