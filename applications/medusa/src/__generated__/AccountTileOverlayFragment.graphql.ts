/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountTileOverlayFragment = {
    readonly avatar: {
        readonly " $fragmentRefs": FragmentRefs<"ResourceIconFragment" | "ResourceItemFragment">;
    } | null;
    readonly username: string;
    readonly " $refType": "AccountTileOverlayFragment";
};
export type AccountTileOverlayFragment$data = AccountTileOverlayFragment;
export type AccountTileOverlayFragment$key = {
    readonly " $data"?: AccountTileOverlayFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AccountTileOverlayFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountTileOverlayFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "avatar",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceItemFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = '436a37e51807ec98c1a77820f5cbb178';
export default node;
