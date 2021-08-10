# Linkeable markers plugin for marker.js Live

This plugin makes clicks on markers in [marker.js Live] open links in marker's `notes` (if any). The first link found in the `notes` is opened.

## Installation

Make sure you have [marker.js Live] installed. Then run

```
npm install mjslive-plugin-links
```

or 

```
yarn add mjslive-plugin-links
```

## Usage

To add the functionality to marker.js Live instance simply pass a new instance of `Links` to its `addPlugins()` method.

```
import { Links } from 'mjslive-plugin-links';

...
markerView.addPlugin(new Links());

markerView1.show(markerViewState);

```

## Configuration

You can control the target of links by setting the `target` property. 
It accepts the same values as HTML anchor element. The default is `_blank`.

This example changes the default behavior to open links in the same tab/window.

```
import { Links } from 'mjslive-plugin-links';

...
const links = new Links();
links.target = '_self';
markerView.addPlugin(links);

markerView1.show(markerViewState);

```

## License

This [marker.js Live] plugin is distributed under the MIT License. See LICENSE file for details.

[marker.js Live]: https://markerjs.com/products/markerjs-live