/**
 * @generated SignedSource<<94c9725d3e6e9ca7082cc585ce6b0193>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostLinkTileFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly reference: string;
  readonly " $fragmentType": "PostLinkTileFragment";
};
export type PostLinkTileFragment$key = {
  readonly " $data"?: PostLinkTileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostLinkTileFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostLinkTileFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "0777a91e4ec7e5830b565e85f2208d61";

export default node;
