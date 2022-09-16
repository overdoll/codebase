/**
 * @generated SignedSource<<a8833700299221c256ba4528850be053>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RawCinematicGalleryFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly media: {
      readonly " $fragmentSpreads": FragmentRefs<"RawCinematicMediaFragment">;
    };
  }>;
  readonly id: string;
  readonly " $fragmentType": "RawCinematicGalleryFragment";
};
export type RawCinematicGalleryFragment$key = {
  readonly " $data"?: RawCinematicGalleryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RawCinematicGalleryFragment">;
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
  "name": "RawCinematicGalleryFragment",
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
              "name": "RawCinematicMediaFragment"
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

(node as any).hash = "1547964da28658069d8f6ada3c70db51";

export default node;
