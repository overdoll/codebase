/**
 * @generated SignedSource<<10328e370751e2a4fedc026fd6631d7d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CinematicGalleryFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly media: {
      readonly " $fragmentSpreads": FragmentRefs<"CinematicMediaFragment">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"SupporterSlideFragment">;
  }>;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"SupporterSlidePostFragment">;
  readonly " $fragmentType": "CinematicGalleryFragment";
};
export type CinematicGalleryFragment$key = {
  readonly " $data"?: CinematicGalleryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CinematicGalleryFragment">;
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
  "name": "CinematicGalleryFragment",
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
              "name": "CinematicMediaFragment"
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

(node as any).hash = "735a787f19f881659d6511ef22aa822c";

export default node;
