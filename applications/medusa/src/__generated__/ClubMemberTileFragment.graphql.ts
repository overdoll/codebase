/**
 * @generated SignedSource<<6d786bb375c926c2705b761d114e7720>>
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
    }
  ],
  "type": "ClubMember",
  "abstractKey": null
};

(node as any).hash = "5d240a7e0094a56bf818fba6f8994dac";

export default node;
