/**
 * @generated SignedSource<<c91b37a4662ccd706400f97ac6489e69>>
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
    readonly isSupporterOnly: boolean;
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporterOnly",
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

(node as any).hash = "e80f45a371462466a36d0f47850e59f6";

export default node;
