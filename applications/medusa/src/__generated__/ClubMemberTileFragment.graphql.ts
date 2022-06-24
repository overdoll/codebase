/**
 * @generated SignedSource<<94d6e57731a2774fcc9e3cd02dcb80e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubMemberTileFragment$data = {
  readonly account: {
    readonly isDeleted: boolean;
    readonly username: string;
    readonly " $fragmentSpreads": FragmentRefs<"AccountTileOverlayFragment">;
  };
  readonly isSupporter: boolean;
  readonly " $fragmentType": "ClubMemberTileFragment";
};
export type ClubMemberTileFragment$key = {
  readonly " $data"?: ClubMemberTileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubMemberTileFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubMemberTileFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "account",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isDeleted",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AccountTileOverlayFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSupporter",
      "storageKey": null
    }
  ],
  "type": "ClubMember",
  "abstractKey": null
};

(node as any).hash = "2160036fa9ee9eabf66fec708ce625c8";

export default node;
