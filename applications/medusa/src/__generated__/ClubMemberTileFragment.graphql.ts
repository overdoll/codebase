/**
 * @generated SignedSource<<26d1a3080f5279677228cdbed3e8cae0>>
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
    readonly username: string;
    readonly isDeleted: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"AccountTileOverlayFragment">;
  };
  readonly isSupporter: boolean;
  readonly " $fragmentType": "ClubMemberTileFragment";
};
export type ClubMemberTileFragment = ClubMemberTileFragment$data;
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
