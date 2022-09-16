/**
 * @generated SignedSource<<bf52e7d19abb620c72ebbb39e788fdbb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RawCinematicCarouselFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly media: {
      readonly " $fragmentSpreads": FragmentRefs<"RawThumbnailCarouselItemFragment">;
    };
  }>;
  readonly id: string;
  readonly " $fragmentType": "RawCinematicCarouselFragment";
};
export type RawCinematicCarouselFragment$key = {
  readonly " $data"?: RawCinematicCarouselFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RawCinematicCarouselFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RawCinematicCarouselFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "media",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "RawThumbnailCarouselItemFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "cc22f8ca2216c4778432f536bb57924a";

export default node;
