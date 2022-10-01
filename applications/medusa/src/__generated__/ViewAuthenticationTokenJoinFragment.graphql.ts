/**
 * @generated SignedSource<<4f0fa97e6d2249759cc90b1257ac696a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewAuthenticationTokenJoinFragment$data = {
  readonly accountStatus: {
    readonly multiFactor: {
      readonly __typename: "MultiFactor";
    } | null;
    readonly registered: boolean;
  } | null;
  readonly id: string;
  readonly verified: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"GrantAuthenticationTokenJoinFragment" | "LobbyAuthenticationTokenJoinFragment" | "MultiFactorAuthenticationTokenFragment" | "RegisterAuthenticationTokenFragment">;
  readonly " $fragmentType": "ViewAuthenticationTokenJoinFragment";
};
export type ViewAuthenticationTokenJoinFragment$key = {
  readonly " $data"?: ViewAuthenticationTokenJoinFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewAuthenticationTokenJoinFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewAuthenticationTokenJoinFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "verified",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuthenticationTokenAccountStatus",
      "kind": "LinkedField",
      "name": "accountStatus",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "registered",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "MultiFactor",
          "kind": "LinkedField",
          "name": "multiFactor",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GrantAuthenticationTokenJoinFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LobbyAuthenticationTokenJoinFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MultiFactorAuthenticationTokenFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RegisterAuthenticationTokenFragment"
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "f2f57d2638647c6c73cf9361c9094dc9";

export default node;
