/**
 * @generated SignedSource<<5032fd979ca7a0cecc1532c2c3d2be6b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteGalleryFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly media: {
      readonly " $fragmentSpreads": FragmentRefs<"RouletteMediaFragment">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"SupporterSlideFragment">;
  }>;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"SupporterSlidePostFragment">;
  readonly " $fragmentType": "RouletteGalleryFragment";
};
export type RouletteGalleryFragment$key = {
  readonly " $data"?: RouletteGalleryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteGalleryFragment">;
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
  "name": "RouletteGalleryFragment",
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
              "name": "RouletteMediaFragment"
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SupporterSlideFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupporterSlidePostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "ad35762ad0e20889758a17d56fde1e4c";

export default node;
