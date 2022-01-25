/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CategoryTileOverlayFragment = {
    readonly title: string;
    readonly thumbnail: {
        readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
    } | null;
    readonly " $refType": "CategoryTileOverlayFragment";
};
export type CategoryTileOverlayFragment$data = CategoryTileOverlayFragment;
export type CategoryTileOverlayFragment$key = {
    readonly " $data"?: CategoryTileOverlayFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"CategoryTileOverlayFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoryTileOverlayFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceItemFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Category",
  "abstractKey": null
};
(node as any).hash = '06c2c7611584165411bd477ed0bc0050';
export default node;
