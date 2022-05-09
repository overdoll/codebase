/**
 * @generated SignedSource<<c13700ac529f4b33222a851255735bdd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountAuthorizerFragment$data = {
  readonly lock: {
    readonly __typename: string;
  } | null;
  readonly isModerator: boolean;
  readonly isStaff: boolean;
  readonly isArtist: boolean;
  readonly " $fragmentType": "AccountAuthorizerFragment";
};
export type AccountAuthorizerFragment = AccountAuthorizerFragment$data;
export type AccountAuthorizerFragment$key = {
  readonly " $data"?: AccountAuthorizerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountAuthorizerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountAuthorizerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountLock",
      "kind": "LinkedField",
      "name": "lock",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isModerator",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isStaff",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isArtist",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "2b3f5e95fba7b044bee0b16ebd83901e";

export default node;
