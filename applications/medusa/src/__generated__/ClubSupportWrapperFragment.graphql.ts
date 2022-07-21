/**
 * @generated SignedSource<<d5945e587058875b728daa47378f24ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportWrapperFragment$data = {
  readonly canSupport: boolean;
  readonly viewerMember: {
    readonly isSupporter: boolean;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubTransactionProcessFragment">;
  readonly " $fragmentType": "ClubSupportWrapperFragment";
};
export type ClubSupportWrapperFragment$key = {
  readonly " $data"?: ClubSupportWrapperFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportWrapperFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportWrapperFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubMember",
      "kind": "LinkedField",
      "name": "viewerMember",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporter",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canSupport",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportClubTransactionProcessFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "9aa71eca41cfa87a05ea5791939e220d";

export default node;
