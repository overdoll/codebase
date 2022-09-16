/**
 * @generated SignedSource<<07ad33608e0e62b393ed681ffbe5d301>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CinematicCarouselFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly media: {
      readonly " $fragmentSpreads": FragmentRefs<"ThumbnailCarouseItemFragment">;
    };
  }>;
  readonly id: string;
  readonly " $fragmentType": "CinematicCarouselFragment";
};
export type CinematicCarouselFragment$key = {
  readonly " $data"?: CinematicCarouselFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CinematicCarouselFragment">;
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
  "name": "CinematicCarouselFragment",
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
              "name": "ThumbnailCarouseItemFragment"
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

(node as any).hash = "858e0003eab2f760ab8ff14338a00f5e";

export default node;
