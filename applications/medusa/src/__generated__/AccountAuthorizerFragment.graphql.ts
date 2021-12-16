/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountAuthorizerFragment = {
    readonly lock: {
        readonly __typename: string;
    } | null;
    readonly isModerator: boolean;
    readonly isStaff: boolean;
    readonly " $refType": "AccountAuthorizerFragment";
};
export type AccountAuthorizerFragment$data = AccountAuthorizerFragment;
export type AccountAuthorizerFragment$key = {
    readonly " $data"?: AccountAuthorizerFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AccountAuthorizerFragment">;
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
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = 'ca7c8a6fbbaee601868f43208836444a';
export default node;
