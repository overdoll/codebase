/**
 * @generated SignedSource<<64d5734ec856e8689351bf162df36245>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AuthenticationTokenMethod = "CODE" | "MAGIC_LINK" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ViewAuthenticationTokenJoinFragment$data = {
  readonly accountStatus: {
    readonly multiFactor: {
      readonly __typename: "MultiFactor";
    } | null;
    readonly registered: boolean;
  } | null;
  readonly id: string;
  readonly method: AuthenticationTokenMethod;
  readonly verified: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"CodeAuthenticationTokenJoinFragment" | "GrantAuthenticationTokenJoinFragment" | "LobbyAuthenticationTokenJoinFragment" | "MultiFactorAuthenticationTokenFragment" | "RegisterAuthenticationTokenFragment">;
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
      "kind": "ScalarField",
      "name": "method",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CodeAuthenticationTokenJoinFragment"
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "a57ce4af4f9e7e8b7737b212f97c0ca4";

export default node;
