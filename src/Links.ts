import {
  MarkerView,
  IMarkerViewPlugin,
  PointerEventHandler,
  MarkerViewEventHandler,
} from 'markerjs-live';

export class Links implements IMarkerViewPlugin {
  private markerView: MarkerView;

  private readonly FADEIN_SUFFIX = 'mva_fade_in';
  private readonly FADEOUT_SUFFIX = 'mva_fade_out';

  /**
   * Click target (same as target attribute of an HTML anchor element)
   * 
   * @default _blank
   */
  public target = '_blank';

  public init(markerView: MarkerView): void {
    this.markerView = markerView;

    this.markerView.addEventListener('load', this.markersLoaded);
    this.markerView.addEventListener('pointerdown', this.markerClicked);
  }

  private markersLoaded: MarkerViewEventHandler = (markerView) => {
    markerView.markers.forEach(m => {
      // change cursor style on markers containing links
      if (this.getLink(m.notes)) {
        m.container.style.cursor = 'pointer';
      }
    });
  }

  private getLink = (notes?: string): string | undefined => {
    if (notes !== undefined) {
      const linkExp = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/gm);
      const result = linkExp.exec(notes);
      return (result && result.length > 0) ? result[0] : undefined;
    } else {
      return undefined;
    }
  }

  private markerClicked: PointerEventHandler = (markerView, ev, marker) => {
    if (marker !== undefined && marker.notes !== undefined) {
      const linkURL = this.getLink(marker.notes);
      if (linkURL !== undefined) {
        const link = document.createElement('a');
        link.href = linkURL;
        link.target = this.target;
        link.click();
      }
    }
  };
}
