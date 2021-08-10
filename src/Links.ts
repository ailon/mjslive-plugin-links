import {
  MarkerView,
  IMarkerViewPlugin,
  PointerEventHandler,
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

    this.markerView.addEventListener('pointerdown', this.markerClicked);
  }

  private markerClicked: PointerEventHandler = (markerView, ev, marker) => {
    if (marker !== undefined && marker.notes !== undefined) {
      const linkExp = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/gm);
      const result = linkExp.exec(marker.notes);
      if (result && result.length > 0) {
        const link = document.createElement('a');
        link.href = result[0];
        link.target = this.target;
        link.click();
      }
    }
  };
}
